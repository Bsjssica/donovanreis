import React from 'react';
import { Search, Filter } from 'lucide-react';

interface TrafficFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedSeverity: string;
  setSelectedSeverity: (severity: string) => void;
}

const TrafficFilter: React.FC<TrafficFilterProps> = ({
  searchQuery,
  setSearchQuery,
  selectedSeverity,
  setSelectedSeverity
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Buscar
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por localização..."
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Filtrar por Severidade
          </label>
          <div className="relative">
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-green-500 focus:ring-green-500 appearance-none"
            >
              <option value="">Todas</option>
              <option value="high">Crítico</option>
              <option value="medium">Moderado</option>
              <option value="low">Leve</option>
            </select>
            <Filter className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrafficFilter;