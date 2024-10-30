import React, { useState } from 'react';
import { generatePdf } from 'react-to-pdf';
import { FileDown } from 'lucide-react';
import InvoiceForm from './components/InvoiceForm';
import InvoicePreview from './components/InvoicePreview';
import type { InvoiceData } from './types';

function App() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);

  const handleGenerateInvoice = (data: InvoiceData) => {
    setInvoiceData(data);
  };

  const handleDownloadPDF = () => {
    if (!invoiceData) return;
    
    generatePdf({
      element: document.getElementById('invoice-preview'),
      filename: `invoice-${invoiceData.invoiceNumber}.pdf`,
      options: {
        format: [297, 420]
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {!invoiceData ? (
            <>
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Create Invoice</h1>
              <InvoiceForm onSubmit={handleGenerateInvoice} />
            </>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setInvoiceData(null)}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  ← Back to Form
                </button>
                <button
                  onClick={handleDownloadPDF}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <FileDown className="h-4 w-4 mr-2" />
                  Download PDF
                </button>
              </div>
              <InvoicePreview data={invoiceData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;