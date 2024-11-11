import { jsPDF } from 'jspdf';
import { ScavengerHunt } from '../types';

export const generatePDF = (hunt: ScavengerHunt) => {
  const doc = new jsPDF();
  let yPosition = 20;
  const lineHeight = 10;
  const margin = 20;
  const pageWidth = doc.internal.pageSize.getWidth();

  // Title
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text(hunt.title, pageWidth / 2, yPosition, { align: 'center' });
  yPosition += lineHeight * 2;

  // Introduction
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  const introLines = doc.splitTextToSize(hunt.introduction, pageWidth - 2 * margin);
  doc.text(introLines, margin, yPosition);
  yPosition += lineHeight * (introLines.length + 1);

  // Materials
  doc.setFont('helvetica', 'bold');
  doc.text('Materials Needed:', margin, yPosition);
  yPosition += lineHeight;
  doc.setFont('helvetica', 'normal');
  hunt.materials.forEach(material => {
    doc.text(`• ${material}`, margin + 5, yPosition);
    yPosition += lineHeight;
  });
  yPosition += lineHeight;

  // Setup Instructions
  doc.setFont('helvetica', 'bold');
  doc.text('Setup Instructions:', margin, yPosition);
  yPosition += lineHeight;
  doc.setFont('helvetica', 'normal');
  hunt.setupInstructions.forEach(instruction => {
    doc.text(`• ${instruction}`, margin + 5, yPosition);
    yPosition += lineHeight;
  });
  yPosition += lineHeight;

  // Clues
  doc.setFont('helvetica', 'bold');
  doc.text('Clues:', margin, yPosition);
  yPosition += lineHeight;
  doc.setFont('helvetica', 'normal');
  hunt.clues.forEach((clue, index) => {
    // Check if we need a new page
    if (yPosition > doc.internal.pageSize.getHeight() - 40) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFont('helvetica', 'bold');
    doc.text(`Clue ${index + 1}:`, margin, yPosition);
    yPosition += lineHeight;
    doc.setFont('helvetica', 'normal');
    const hintLines = doc.splitTextToSize(clue.hint, pageWidth - 2 * margin - 10);
    doc.text(hintLines, margin + 5, yPosition);
    yPosition += lineHeight * (hintLines.length);
    doc.text(`Hide at: ${clue.location}`, margin + 5, yPosition);
    yPosition += lineHeight * 1.5;
  });

  // Estimated Duration
  if (yPosition > doc.internal.pageSize.getHeight() - 30) {
    doc.addPage();
    yPosition = 20;
  }
  doc.setFont('helvetica', 'bold');
  doc.text(`Estimated Duration: ${hunt.estimatedDuration} minutes`, margin, yPosition);

  // Save the PDF
  doc.save('scavenger-hunt.pdf');
};