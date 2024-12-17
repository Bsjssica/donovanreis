import React, { useState } from 'react';
import { FileText, AlertTriangle, CheckCircle, Clock, Camera, FileSpreadsheet, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import OccurrenceForm from './OccurrenceForm';
import { useOccurrenceStore } from '../../stores/occurrenceStore';
import { useReportStore } from '../../stores/reportStore';
import DeleteConfirmationModal from '../shared/DeleteConfirmationModal';

const Occurrences = () => {
  const [showForm, setShowForm] = useState(false);
  const [occurrenceToDelete, setOccurrenceToDelete] = useState<number | null>(null);
  const { occurrences, deleteOccurrence } = useOccurrenceStore();
  const addReport = useReportStore((state) => state.addReport);
  const navigate = useNavigate();

  const handleGenerateReport = (occurrence: any) => {
    addReport(occurrence);
    navigate('/reports');
  };

  const handleDelete = () => {
    if (occurrenceToDelete !== null) {
      deleteOccurrence(occurrenceToDelete);
      setOccurrenceToDelete(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Concluído':
        return 'bg-green-500/20 text-green-500';
      case 'Pendente':
        return 'bg-yellow-500/20 text-yellow-500';
      default:
        return 'bg-blue-500/20 text-blue-500';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-green-500">
          Registro de Ocorrências
        </h2>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
        >
          <FileText className="h-5 w-5" />
          Nova Ocorrência
        </button>
      </div>

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
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(occurrence.status)}`}>
                {occurrence.status}
              </span>
            </div>

            <p className="text-gray-300 mb-4">{occurrence.description}</p>

            <div className="grid grid-cols-2 gap-4 text-gray-300 mb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-green-500" />
                <span>Prioridade: {occurrence.priority}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Local: {occurrence.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-500" />
                <span>Data: {new Date(occurrence.timestamp).toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-green-500" />
                <span>Fotos: {occurrence.photos?.length || 0}</span>
              </div>
            </div>

            {occurrence.photos && occurrence.photos.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mb-4">
                {occurrence.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Foto ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOccurrenceToDelete(occurrence.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
                Excluir
              </button>
              <button 
                onClick={() => handleGenerateReport(occurrence)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
              >
                <FileSpreadsheet className="h-4 w-4" />
                Gerar Relatório
              </button>
            </div>
          </div>
        ))}

        {occurrences.length === 0 && (
          <div className="text-center text-gray-400 py-8">
            Nenhuma ocorrência registrada
          </div>
        )}
      </div>

      {showForm && (
        <OccurrenceForm onClose={() => setShowForm(false)} />
      )}

      {occurrenceToDelete !== null && (
        <DeleteConfirmationModal
          title="Excluir Ocorrência"
          message="Tem certeza que deseja excluir esta ocorrência? Esta ação não pode ser desfeita."
          onConfirm={handleDelete}
          onCancel={() => setOccurrenceToDelete(null)}
        />
      )}
    </div>
  );
};

export default Occurrences;