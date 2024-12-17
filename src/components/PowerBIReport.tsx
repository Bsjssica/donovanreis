import React, { useState } from 'react';
import { FileSpreadsheet, ExternalLink, Download, Clock, AlertTriangle, Trash2 } from 'lucide-react';
import { useReportStore } from '../stores/reportStore';
import { generatePDF } from '../utils/pdfGenerator';
import DeleteConfirmationModal from './shared/DeleteConfirmationModal';

const PowerBIReport = () => {
  const { reports, deleteReport } = useReportStore();
  const [reportToDelete, setReportToDelete] = useState<string | null>(null);

  const handleExportPDF = async (report: any) => {
    try {
      await generatePDF(report);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Erro ao gerar PDF');
    }
  };

  const handleDelete = () => {
    if (reportToDelete) {
      deleteReport(reportToDelete);
      setReportToDelete(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-green-500">
          Relatórios
        </h2>
        <a
          href="https://app.powerbi.com"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <ExternalLink className="h-5 w-5" />
          Abrir no Power BI
        </a>
      </div>

      {reports.length > 0 ? (
        <div className="space-y-6">
          {reports.map((report) => (
            <div key={report.id} id={`report-${report.id}`} className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{report.title}</h3>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock className="h-4 w-4" />
                    <span>Gerado em: {new Date(report.generatedAt).toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setReportToDelete(report.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Excluir
                  </button>
                  <button 
                    onClick={() => handleExportPDF(report)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Exportar PDF
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-900 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-white mb-3">Detalhes da Ocorrência</h4>
                  <div className="grid gap-3 text-gray-300">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      <span>Prioridade: {report.content.occurrence.priority}</span>
                    </div>
                    <div>Local: {report.content.occurrence.location}</div>
                    <div>Status: {report.content.occurrence.status}</div>
                  </div>
                </div>

                <div className="bg-gray-900 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-white mb-3">Análise</h4>
                  <p className="text-gray-300">{report.content.analysis}</p>
                </div>

                <div className="bg-gray-900 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-white mb-3">Recomendações</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    {report.content.recommendations.map((recommendation, index) => (
                      <li key={index}>{recommendation}</li>
                    ))}
                  </ul>
                </div>

                {report.content.occurrence.photos && report.content.occurrence.photos.length > 0 && (
                  <div className="bg-gray-900 rounded-lg p-4">
                    <h4 className="text-lg font-medium text-white mb-3">Evidências Fotográficas</h4>
                    <div className="grid grid-cols-3 gap-4">
                      {report.content.occurrence.photos.map((photo, index) => (
                        <img
                          key={index}
                          src={photo}
                          alt={`Evidência ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg p-6 text-center">
          <FileSpreadsheet className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <p className="text-gray-300">
            Nenhum relatório gerado ainda. Gere relatórios a partir das ocorrências registradas.
          </p>
        </div>
      )}

      {reportToDelete && (
        <DeleteConfirmationModal
          title="Excluir Relatório"
          message="Tem certeza que deseja excluir este relatório? Esta ação não pode ser desfeita."
          onConfirm={handleDelete}
          onCancel={() => setReportToDelete(null)}
        />
      )}
    </div>
  );
};

export default PowerBIReport;