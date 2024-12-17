import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Occurrence } from './occurrenceStore';

export interface Report {
  id: string;
  occurrenceId: number;
  title: string;
  generatedAt: string;
  content: {
    occurrence: Occurrence;
    analysis: string;
    recommendations: string[];
  };
}

interface ReportState {
  reports: Report[];
  addReport: (occurrence: Occurrence) => void;
  deleteReport: (id: string) => void;
}

export const useReportStore = create<ReportState>()(
  persist(
    (set) => ({
      reports: [],
      addReport: (occurrence) => {
        const newReport: Report = {
          id: `REP-${Date.now()}`,
          occurrenceId: occurrence.id,
          title: `Relatório: ${occurrence.title}`,
          generatedAt: new Date().toISOString(),
          content: {
            occurrence,
            analysis: generateAnalysis(occurrence),
            recommendations: generateRecommendations(occurrence),
          },
        };

        set((state) => ({
          reports: [...state.reports, newReport],
        }));
      },
      deleteReport: (id) =>
        set((state) => ({
          reports: state.reports.filter((report) => report.id !== id),
        })),
    }),
    {
      name: 'reports-storage',
    }
  )
);

function generateAnalysis(occurrence: Occurrence): string {
  const priorityAnalysis = {
    Alta: 'Requer atenção imediata e ação corretiva urgente.',
    Média: 'Necessita de acompanhamento regular e medidas preventivas.',
    Baixa: 'Situação sob controle, manter monitoramento padrão.',
  }[occurrence.priority] || 'Análise pendente';

  return `Ocorrência registrada em ${occurrence.location} com prioridade ${occurrence.priority}. ${priorityAnalysis}`;
}

function generateRecommendations(occurrence: Occurrence): string[] {
  const baseRecommendations = [
    'Documentar todas as ações tomadas',
    'Realizar follow-up periódico',
  ];

  const priorityRecommendations = {
    Alta: [
      'Mobilizar equipe de resposta imediata',
      'Notificar gestores responsáveis',
      'Estabelecer plano de contingência',
    ],
    Média: [
      'Agendar inspeção detalhada',
      'Preparar medidas preventivas',
      'Revisar procedimentos de segurança',
    ],
    Baixa: [
      'Manter rotina de monitoramento',
      'Atualizar registros de ocorrência',
      'Avaliar necessidade de medidas adicionais',
    ],
  }[occurrence.priority] || [];

  return [...priorityRecommendations, ...baseRecommendations];
}