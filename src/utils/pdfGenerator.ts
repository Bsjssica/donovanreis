import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Report } from '../stores/reportStore';

export async function generatePDF(report: Report) {
  try {
    const reportElement = document.getElementById(`report-${report.id}`);
    if (!reportElement) {
      throw new Error('Elemento do relatório não encontrado');
    }

    // Configurar opções do html2canvas
    const canvas = await html2canvas(reportElement, {
      scale: 2,
      logging: false,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#1F2937', // Mantém o fundo escuro do tema
    });

    // Configurar dimensões do PDF (A4)
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Criar novo documento PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgData = canvas.toDataURL('image/png');

    // Adicionar imagem ao PDF
    let heightLeft = imgHeight;
    let position = 0;
    
    // Primeira página
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Adicionar páginas adicionais se necessário
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Adicionar metadados ao PDF
    pdf.setProperties({
      title: report.title,
      subject: 'Relatório de Ocorrência',
      author: 'Sistema BBraun',
      keywords: 'ocorrência, relatório, BBraun',
      creator: 'Sistema de Monitoramento BBraun'
    });

    // Salvar o PDF
    const filename = `${report.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`;
    pdf.save(filename);

  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    throw new Error('Não foi possível gerar o PDF. Por favor, tente novamente.');
  }
}