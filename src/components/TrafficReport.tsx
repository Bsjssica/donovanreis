import React, { useState, useEffect } from 'react';
import { Car, AlertTriangle, Loader2 } from 'lucide-react';
import { useTrafficStore } from '../stores/trafficStore';
import TrafficNewsCard from './traffic/TrafficNewsCard';
import TrafficFilter from './traffic/TrafficFilter';

const TrafficReport = () => {
  const { news, loading, error, setNews, setLoading, setError } = useTrafficStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('');

  useEffect(() => {
    const fetchTrafficNews = () => {
      setLoading(true);
      // Simulando dados em tempo real
      const mockNews = [
        {
          id: '1',
          title: 'Congestionamento na Linha Vermelha',
          description: 'Acidente entre dois veículos causa lentidão no sentido Centro.',
          location: 'Linha Vermelha, km 4',
          severity: 'high',
          timestamp: new Date().toISOString(),
          source: 'CET-Rio'
        },
        {
          id: '2',
          title: 'Obras na Avenida Brasil',
          description: 'Obras de manutenção causam interdição parcial da via.',
          location: 'Avenida Brasil, altura de Bonsucesso',
          severity: 'medium',
          timestamp: new Date().toISOString(),
          source: 'CET-Rio'
        },
        {
          id: '3',
          title: 'Tráfego normal na Ponte Rio-Niterói',
          description: 'Fluxo de veículos dentro da normalidade em ambos os sentidos.',
          location: 'Ponte Rio-Niterói',
          severity: 'low',
          timestamp: new Date().toISOString(),
          source: 'CCR Ponte'
        }
      ];
      setNews(mockNews);
      setLoading(false);
    };

    fetchTrafficNews();
    const interval = setInterval(fetchTrafficNews, 60000); // Atualiza a cada minuto

    return () => clearInterval(interval);
  }, [setNews, setLoading]);

  const filteredNews = news.filter(item => {
    const matchesSearch = item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = selectedSeverity ? item.severity === selectedSeverity : true;
    return matchesSearch && matchesSeverity;
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Car className="h-8 w-8 text-green-500" />
          <h2 className="text-3xl font-bold text-green-500">
            Boletim de Trânsito
          </h2>
        </div>
        {loading && (
          <div className="flex items-center gap-2 text-gray-400">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Atualizando...</span>
          </div>
        )}
      </div>

      <TrafficFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedSeverity={selectedSeverity}
        setSelectedSeverity={setSelectedSeverity}
      />

      {error ? (
        <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 text-red-500">
            <AlertTriangle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredNews.map(item => (
            <TrafficNewsCard key={item.id} news={item} />
          ))}
          {filteredNews.length === 0 && (
            <div className="text-center text-gray-400 py-8">
              Nenhuma ocorrência encontrada
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TrafficReport;