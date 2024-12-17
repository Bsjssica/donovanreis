import React from 'react';
import { FileText, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const Occurrences = () => {
  const occurrences = [
    {
      id: 1,
      title: 'Manutenção Preventiva',
      status: 'Em andamento',
      priority: 'Média',
      location: 'Unidade Guaxindiba',
      timestamp: '2024-03-19 10:30',
    },
    {
      id: 2,
      title: 'Inspeção de Segurança',
      status: 'Concluído',
      priority: 'Alta',
      location: 'Unidade Arsenal',
      timestamp: '2024-03-19 09:15',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-green-500 mb-8">
        Registro de Ocorrências
      </h2>

      <div className="space-y-6">
        {occurrences.map((occurrence) => (
          <div
            key={occurrence.id}
            className="bg-gray-800 rounded-lg p-6 border border-green-600/20"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-green-500" />
                <h3 className="text-xl font-semibold text-white">
                  {occurrence.title}
                </h3>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium
                ${occurrence.status === 'Em andamento' 
                  ? 'bg-yellow-500/20 text-yellow-500'
                  : 'bg-green-500/20 text-green-500'
                }`}
              >
                {occurrence.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-gray-300">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-green-500" />
                <span>Prioridade: {occurrence.priority}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Local: {occurrence.location}</span>
              </div>
              <div className="flex items-center gap-2 col-span-2">
                <Clock className="h-5 w-5 text-green-500" />
                <span>Data: {occurrence.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Occurrences;