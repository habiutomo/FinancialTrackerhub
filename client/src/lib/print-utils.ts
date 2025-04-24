import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { formatRupiah, formatDate } from './formatters';

/**
 * Initialize jsPDF with appropriate settings
 */
function initPDF(): any {
  // Using any type since jspdf-autotable extends jsPDF with autotable method
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });
  
  // Set default font
  doc.setFont('helvetica');
  return doc;
}

/**
 * Add header for documents
 */
function addDocumentHeader(doc: any, title: string, data: any): void {
  // Add logo/header (placeholder)
  doc.setFillColor(30, 118, 210); // Primary color
  doc.rect(10, 10, 190, 14, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(title, 15, 19);
  
  // Add company information
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.text('PT GUNUNG BARA UTAMA', 190, 13, { align: 'right' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('Jl. Merdeka Barat 29, Tower Graha, Darat, Jawa Timur', 190, 17, { align: 'right' });
  
  // Add date
  doc.setFontSize(10);
  doc.text(`Date: ${formatDate(new Date())}`, 190, 30, { align: 'right' });
}

/**
 * Generate Purchase Requisition PDF
 */
function generatePRPDF(data: any): any {
  const doc = initPDF();
  const { pr, items, approvals } = data;
  
  addDocumentHeader(doc, 'PURCHASE REQUISITION', pr);
  
  // Add PR details
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('PR Details', 15, 35);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  
  // PR information table
  const prInfoData = [
    ['PR Number', pr.prNumber],
    ['Date', formatDate(pr.date)],
    ['Department', pr.department],
    ['Requester', pr.requester],
    ['Subject', pr.subject],
    ['Type', pr.typePr],
    ['Status', pr.status],
  ];
  
  (doc as any).autoTable({
    startY: 40,
    head: [],
    body: prInfoData,
    theme: 'plain',
    styles: { fontSize: 9 },
    columnStyles: {
      0: { cellWidth: 40, fontStyle: 'bold' },
      1: { cellWidth: 90 }
    }
  });
  
  // PR Items
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('PR Items', 15, (doc as any).lastAutoTable.finalY + 10);
  
  const itemsTableHead = [
    'No', 'Description', 'Type', 'QTY', 'UOM', 'Price', 'Total'
  ];
  
  const itemsTableData = items.map((item: any, index: number) => [
    index + 1,
    item.description,
    item.type,
    item.quantity,
    item.uom,
    formatRupiah(item.price),
    formatRupiah(item.total)
  ]);
  
  (doc as any).autoTable({
    startY: (doc as any).lastAutoTable.finalY + 15,
    head: [itemsTableHead],
    body: itemsTableData,
    theme: 'grid',
    styles: { fontSize: 8 },
    headStyles: { fillColor: [30, 118, 210], textColor: [255, 255, 255] },
    columnStyles: {
      0: { cellWidth: 10 },
      5: { halign: 'right' },
      6: { halign: 'right' }
    }
  });
  
  // Total
  const total = items.reduce((sum: number, item: any) => sum + Number(item.total), 0);
  
  (doc as any).autoTable({
    startY: (doc as any).lastAutoTable.finalY + 5,
    head: [],
    body: [
      ['', '', '', '', '', 'Grand Total:', formatRupiah(total)]
    ],
    theme: 'grid',
    styles: { fontSize: 9 },
    columnStyles: {
      5: { fontStyle: 'bold', halign: 'right' },
      6: { fontStyle: 'bold', halign: 'right' }
    }
  });
  
  // Approvals
  if (approvals && approvals.length > 0) {
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Approval History', 15, (doc as any).lastAutoTable.finalY + 15);
    
    const approvalsTableHead = [
      'Role', 'Name', 'Status', 'Date', 'Comments'
    ];
    
    const approvalsTableData = approvals.map((approval: any) => [
      approval.role,
      approval.userName || '',
      approval.status,
      formatDate(approval.approvedAt || approval.createdAt),
      approval.comments || ''
    ]);
    
    (doc as any).autoTable({
      startY: (doc as any).lastAutoTable.finalY + 20,
      head: [approvalsTableHead],
      body: approvalsTableData,
      theme: 'grid',
      styles: { fontSize: 8 },
      headStyles: { fillColor: [30, 118, 210], textColor: [255, 255, 255] }
    });
  }
  
  // Footer
  const pageCount = (doc as any).internal.getNumberOfPages();
  doc.setFontSize(8);
  for(let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text(`Page ${i} of ${pageCount}`, 190, 285, { align: 'right' });
    doc.text('© PT Gunung Bara Utama - Procurement System', 105, 285, { align: 'center' });
  }
  
  return doc;
}

/**
 * Generate Purchase Order PDF
 */
function generatePOPDF(data: any): any {
  const doc = initPDF();
  const { po, items, approvals } = data;
  
  addDocumentHeader(doc, 'PURCHASE ORDER', po);
  
  // Add PO details
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('PO Details', 15, 35);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  
  // PO information table (left side)
  const poInfoData = [
    ['PO Number', po.poNumber],
    ['Date', formatDate(po.date)],
    ['Vendor', po.vendor],
    ['Company', po.company],
    ['Attention', po.attention || '-'],
  ];
  
  (doc as any).autoTable({
    startY: 40,
    head: [],
    body: poInfoData,
    theme: 'plain',
    styles: { fontSize: 9 },
    columnStyles: {
      0: { cellWidth: 40, fontStyle: 'bold' },
      1: { cellWidth: 70 }
    }
  });
  
  // PO additional information (right side)
  const poAddInfoData = [
    ['Subject', po.subject],
    ['Delivery Point', po.deliveryPoint || '-'],
    ['Phone', po.phone || '-'],
    ['Email', po.email || '-'],
    ['Status', po.status],
  ];
  
  (doc as any).autoTable({
    startY: 40,
    margin: { left: 120 },
    head: [],
    body: poAddInfoData,
    theme: 'plain',
    styles: { fontSize: 9 },
    columnStyles: {
      0: { cellWidth: 30, fontStyle: 'bold' },
      1: { cellWidth: 70 }
    }
  });
  
  // PO Items
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('PO Items', 15, Math.max((doc as any).lastAutoTable.finalY, 85) + 10);
  
  const itemsTableHead = [
    'No', 'Description', 'Brand', 'QTY', 'UOM', 'Unit Price', 'Total'
  ];
  
  const itemsTableData = items.map((item: any, index: number) => [
    index + 1,
    item.description,
    item.brand || '-',
    item.quantity,
    item.uom,
    formatRupiah(item.unitPrice),
    formatRupiah(Number(item.unitPrice) * item.quantity)
  ]);
  
  (doc as any).autoTable({
    startY: Math.max((doc as any).lastAutoTable.finalY, 85) + 15,
    head: [itemsTableHead],
    body: itemsTableData,
    theme: 'grid',
    styles: { fontSize: 8 },
    headStyles: { fillColor: [30, 118, 210], textColor: [255, 255, 255] },
    columnStyles: {
      0: { cellWidth: 10 },
      5: { halign: 'right' },
      6: { halign: 'right' }
    }
  });
  
  // Calculations
  const subtotal = items.reduce((sum: number, item: any) => sum + (Number(item.unitPrice) * item.quantity), 0);
  const ppnTotal = items.reduce((sum: number, item: any) => sum + Number(item.ppn || 0), 0);
  const grandTotal = subtotal + ppnTotal;
  
  (doc as any).autoTable({
    startY: (doc as any).lastAutoTable.finalY + 5,
    head: [],
    body: [
      ['', '', '', '', '', 'Sub Total:', formatRupiah(subtotal)],
      ['', '', '', '', '', 'PPN 11%:', formatRupiah(ppnTotal)],
      ['', '', '', '', '', 'Grand Total:', formatRupiah(grandTotal)]
    ],
    theme: 'grid',
    styles: { fontSize: 9 },
    columnStyles: {
      5: { fontStyle: 'bold', halign: 'right' },
      6: { fontStyle: 'bold', halign: 'right' }
    }
  });
  
  // Terms and conditions
  if (po.terms) {
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Terms & Conditions', 15, (doc as any).lastAutoTable.finalY + 15);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    
    const terms = po.terms.split('\n');
    let y = (doc as any).lastAutoTable.finalY + 20;
    
    terms.forEach((term: string, index: number) => {
      doc.text(`${index + 1}. ${term}`, 15, y);
      y += 5;
    });
  }
  
  // Approval signature boxes
  if (approvals && approvals.length > 0) {
    const signatureY = po.terms ? (doc as any).lastAutoTable.finalY + 30 + (po.terms.split('\n').length * 5) : (doc as any).lastAutoTable.finalY + 30;
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('Approval Signatures', 15, signatureY);
    
    const boxWidth = 60;
    const boxSpacing = 5;
    const boxCount = Math.min(approvals.length, 3);
    const totalWidth = (boxWidth * boxCount) + (boxSpacing * (boxCount - 1));
    let startX = (210 - totalWidth) / 2;
    
    for (let i = 0; i < boxCount; i++) {
      const approval = approvals[i];
      
      // Signature box
      doc.rect(startX, signatureY + 5, boxWidth, 30);
      
      // Role title
      doc.setFontSize(8);
      doc.text(approval.role, startX + (boxWidth / 2), signatureY + 10, { align: 'center' });
      
      // If approved, add name and date
      if (approval.status === 'approved' && approval.userName) {
        doc.setFont('helvetica', 'normal');
        doc.text(approval.userName, startX + (boxWidth / 2), signatureY + 25, { align: 'center' });
        doc.setFontSize(7);
        doc.text(formatDate(approval.approvedAt || approval.createdAt), startX + (boxWidth / 2), signatureY + 30, { align: 'center' });
      }
      
      startX += boxWidth + boxSpacing;
    }
  }
  
  // Footer
  const pageCount = (doc as any).internal.getNumberOfPages();
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  for(let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text(`Page ${i} of ${pageCount}`, 190, 285, { align: 'right' });
    doc.text('© PT Gunung Bara Utama - Procurement System', 105, 285, { align: 'center' });
  }
  
  return doc;
}

/**
 * Generate Good Receipt PDF
 */
function generateGRPDF(data: any): any {
  const doc = initPDF();
  const { gr, po, poItems, approvals } = data;
  
  addDocumentHeader(doc, 'GOOD RECEIPT', gr);
  
  // Add GR details
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('GR Details', 15, 35);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  
  // GR information table
  const grInfoData = [
    ['GR Number', gr.grNumber],
    ['Date', formatDate(gr.date)],
    ['Status', gr.status],
    ['Description', gr.description],
    ['Next Approval', gr.nextApproval],
  ];
  
  (doc as any).autoTable({
    startY: 40,
    head: [],
    body: grInfoData,
    theme: 'plain',
    styles: { fontSize: 9 },
    columnStyles: {
      0: { cellWidth: 40, fontStyle: 'bold' },
      1: { cellWidth: 90 }
    }
  });
  
  // Related PO information
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Related Purchase Order', 15, (doc as any).lastAutoTable.finalY + 10);
  
  if (po) {
    const poInfoData = [
      ['PO Number', po.poNumber],
      ['Date', formatDate(po.date)],
      ['Vendor', po.vendor],
      ['Subject', po.subject],
    ];
    
    (doc as any).autoTable({
      startY: (doc as any).lastAutoTable.finalY + 15,
      head: [],
      body: poInfoData,
      theme: 'plain',
      styles: { fontSize: 9 },
      columnStyles: {
        0: { cellWidth: 40, fontStyle: 'bold' },
        1: { cellWidth: 90 }
      }
    });
  } else {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('No related purchase order information available.', 15, (doc as any).lastAutoTable.finalY + 15);
  }
  
  // Received Items
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Received Items', 15, (doc as any).lastAutoTable.finalY + 15);
  
  if (poItems && poItems.length > 0) {
    const itemsTableHead = [
      'No', 'Description', 'Brand', 'QTY', 'UOM', 'Status'
    ];
    
    const itemsTableData = poItems.map((item: any, index: number) => [
      index + 1,
      item.description,
      item.brand || '-',
      item.quantity,
      item.uom,
      'Received'
    ]);
    
    (doc as any).autoTable({
      startY: (doc as any).lastAutoTable.finalY + 20,
      head: [itemsTableHead],
      body: itemsTableData,
      theme: 'grid',
      styles: { fontSize: 8 },
      headStyles: { fillColor: [30, 118, 210], textColor: [255, 255, 255] },
      columnStyles: {
        0: { cellWidth: 10 }
      }
    });
  } else {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('No items information available.', 15, (doc as any).lastAutoTable.finalY + 20);
  }
  
  // Approvals
  if (approvals && approvals.length > 0) {
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Approval History', 15, (doc as any).lastAutoTable.finalY + 15);
    
    const approvalsTableHead = [
      'Role', 'Name', 'Status', 'Date', 'Comments'
    ];
    
    const approvalsTableData = approvals.map((approval: any) => [
      approval.role,
      approval.userName || '',
      approval.status,
      formatDate(approval.approvedAt || approval.createdAt),
      approval.comments || ''
    ]);
    
    (doc as any).autoTable({
      startY: (doc as any).lastAutoTable.finalY + 20,
      head: [approvalsTableHead],
      body: approvalsTableData,
      theme: 'grid',
      styles: { fontSize: 8 },
      headStyles: { fillColor: [30, 118, 210], textColor: [255, 255, 255] }
    });
  }
  
  // Footer
  const pageCount = (doc as any).internal.getNumberOfPages();
  doc.setFontSize(8);
  for(let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text(`Page ${i} of ${pageCount}`, 190, 285, { align: 'right' });
    doc.text('© PT Gunung Bara Utama - Procurement System', 105, 285, { align: 'center' });
  }
  
  return doc;
}

/**
 * Print a document based on type
 */
export function printDocument(type: string, data: any): void {
  let doc;
  
  switch(type.toLowerCase()) {
    case 'pr':
      doc = generatePRPDF(data);
      break;
    case 'po':
      doc = generatePOPDF(data);
      break;
    case 'gr':
      doc = generateGRPDF(data);
      break;
    default:
      console.error('Unknown document type');
      return;
  }
  
  // Generate filename
  let filename = '';
  if (type.toLowerCase() === 'pr' && data.pr) {
    filename = `PR_${data.pr.prNumber}_${formatDate(new Date())}.pdf`;
  } else if (type.toLowerCase() === 'po' && data.po) {
    filename = `PO_${data.po.poNumber}_${formatDate(new Date())}.pdf`;
  } else if (type.toLowerCase() === 'gr' && data.gr) {
    filename = `GR_${data.gr.grNumber}_${formatDate(new Date())}.pdf`;
  } else {
    filename = `${type.toUpperCase()}_${formatDate(new Date())}.pdf`;
  }
  
  // Open in new window for preview
  doc.output('dataurlnewwindow', { filename });
}

/**
 * Download a document
 */
export function downloadDocument(type: string, data: any): void {
  let doc;
  
  switch(type.toLowerCase()) {
    case 'pr':
      doc = generatePRPDF(data);
      break;
    case 'po':
      doc = generatePOPDF(data);
      break;
    case 'gr':
      doc = generateGRPDF(data);
      break;
    default:
      console.error('Unknown document type');
      return;
  }
  
  // Generate filename
  let filename = '';
  if (type.toLowerCase() === 'pr' && data.pr) {
    filename = `PR_${data.pr.prNumber}_${formatDate(new Date())}.pdf`;
  } else if (type.toLowerCase() === 'po' && data.po) {
    filename = `PO_${data.po.poNumber}_${formatDate(new Date())}.pdf`;
  } else if (type.toLowerCase() === 'gr' && data.gr) {
    filename = `GR_${data.gr.grNumber}_${formatDate(new Date())}.pdf`;
  } else {
    filename = `${type.toUpperCase()}_${formatDate(new Date())}.pdf`;
  }
  
  // Save file
  doc.save(filename);
}
