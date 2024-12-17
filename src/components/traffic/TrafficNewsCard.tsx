import React from 'react';
import { AlertTriangle, MapPin, Clock, Info } from 'lucide-react';
import { TrafficNews } from '../../stores/trafficStore';

interface TrafficNewsCardProps {
  news: TrafficNews;
}

const TrafficNewsCard: React.FC<TrafficNewsCardProps> = ({ news }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-500 bg-red-500/10';
      case 'medium':
        return 'text-yellow-500 bg-yellow-500/10';
      default:
        return 'text-green-500 bg-green-500/10';
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <AlertTriangle className={`h-6 w-6 ${getSeverityColor(news.severity)}`} />
          <h3 className="text-xl font-semibold text-white">{news.title}</h3>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(news.severity)}`}>
          {news.severity === 'high' ? 'Crítico' : news.severity === 'medium' ? 'Moderado' : 'Leve'}
        </span>
      </div>

      <p className="text-gray-300 mb-4">{news.description}</p>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <span>{news.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>{new Date(news.timestamp).toLocaleTimeString()}</span>
        </div>
        <div className="flex items-center gap-2 col-span-2">
          <Info className="h-4 w-4" />
          <span>Fonte: {news.source}</span>
        </div>
      </div>
    </div>
  );
}

export default TrafficNewsCard;