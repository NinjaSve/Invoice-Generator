import React from 'react';
import type { InvoiceData } from '../types';

interface Props {
  data: InvoiceData;
}

export default function InvoicePreview({ data }: Props) {
  const calculateSubtotal = () => {
    return data.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = subtotal * 0.1; // 10% tax
    return subtotal + tax;
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg" id="invoice-preview">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">INVOICE</h1>
          <p className="text-gray-600">#{data.invoiceNumber}</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-xl text-gray-800">{data.companyName}</p>
          <p className="text-gray-600 whitespace-pre-line">{data.companyAddress}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-gray-600 font-semibold mb-2">Bill To:</h2>
          <p className="font-bold text-gray-800">{data.clientName}</p>
          <p className="text-gray-600 whitespace-pre-line">{data.clientAddress}</p>
        </div>
        <div className="text-right">
          <div className="mb-2">
            <span className="text-gray-600">Date: </span>
            <span className="font-semibold">{data.date}</span>
          </div>
          <div>
            <span className="text-gray-600">Due Date: </span>
            <span className="font-semibold">{data.dueDate}</span>
          </div>
        </div>
      </div>

      <table className="w-full mb-8">
        <thead>
          <tr className="border-b-2 border-gray-300">
            <th className="text-left py-3">Description</th>
            <th className="text-right py-3">Quantity</th>
            <th className="text-right py-3">Price</th>
            <th className="text-right py-3">Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="py-3">{item.description}</td>
              <td className="text-right py-3">{item.quantity}</td>
              <td className="text-right py-3">${item.price.toFixed(2)}</td>
              <td className="text-right py-3">${(item.quantity * item.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end mb-8">
        <div className="w-64">
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Subtotal:</span>
            <span>${calculateSubtotal().toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Tax (10%):</span>
            <span>${(calculateSubtotal() * 0.1).toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t-2 border-gray-300 pt-2">
            <span className="font-bold">Total:</span>
            <span className="font-bold">${calculateTotal().toFixed(2)}</span>
          </div>
        </div>
      </div>

      {data.notes && (
        <div className="border-t-2 border-gray-300 pt-4">
          <h3 className="font-semibold mb-2">Notes:</h3>
          <p className="text-gray-600 whitespace-pre-line">{data.notes}</p>
        </div>
      )}
    </div>
  );
}