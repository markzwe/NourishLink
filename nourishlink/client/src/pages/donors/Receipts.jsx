import React, { useState } from 'react';

const Receipts = () => {
  const [receipts] = useState([
    {
      id: 1,
      donationId: 1,
      donationDate: '2023-12-10',
      generatedAt: '2023-12-10',
      totalWeight: 25,
      totalValue: 125.00,
      fileName: 'receipt_20231210_001.pdf',
      status: 'available',
    },
    {
      id: 2,
      donationId: 2,
      donationDate: '2023-12-05',
      generatedAt: '2023-12-05',
      totalWeight: 50,
      totalValue: 250.00,
      fileName: 'receipt_20231205_002.pdf',
      status: 'available',
    },
    {
      id: 3,
      donationId: 3,
      donationDate: '2023-11-28',
      generatedAt: '2023-11-28',
      totalWeight: 30,
      totalValue: 150.00,
      fileName: 'receipt_20231128_003.pdf',
      status: 'available',
    },
  ]);

  const [selectedYear, setSelectedYear] = useState('2023');
  const [downloadStatus, setDownloadStatus] = useState({});

  const years = ['2023', '2022', '2021'];
  
  const filteredReceipts = receipts.filter(receipt => 
    new Date(receipt.donationDate).getFullYear().toString() === selectedYear
  );

  const totalValue = filteredReceipts.reduce((sum, receipt) => sum + receipt.totalValue, 0);
  const totalWeight = filteredReceipts.reduce((sum, receipt) => sum + receipt.totalWeight, 0);

  const handleDownload = async (receiptId, fileName) => {
    setDownloadStatus(prev => ({ ...prev, [receiptId]: 'downloading' }));
    
    try {
      // Simulate download
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, this would trigger a file download
      console.log('Downloading receipt:', fileName);
      
      setDownloadStatus(prev => ({ ...prev, [receiptId]: 'completed' }));
      setTimeout(() => {
        setDownloadStatus(prev => ({ ...prev, [receiptId]: null }));
      }, 2000);
    } catch (error) {
      console.error('Download error:', error);
      setDownloadStatus(prev => ({ ...prev, [receiptId]: 'error' }));
    }
  };

  const handleEmailReceipt = async (receiptId) => {
    try {
      // Simulate email sending
      console.log('Emailing receipt:', receiptId);
      
      // Show success message
      alert('Receipt has been emailed to your registered email address.');
    } catch (error) {
      console.error('Email error:', error);
      alert('Failed to email receipt. Please try again.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Donation Receipts</h1>
        <p className="text-gray-600 mt-2">Download and manage your donation receipts for tax purposes.</p>
      </div>

      {/* Year Filter and Summary */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Year
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Download All ({selectedYear})
          </button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Receipts</h3>
            <div className="text-3xl font-bold text-blue-600">{filteredReceipts.length}</div>
            <p className="text-sm text-gray-600 mt-1">For {selectedYear}</p>
          </div>
          
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Weight</h3>
            <div className="text-3xl font-bold text-green-600">{totalWeight} lbs</div>
            <p className="text-sm text-gray-600 mt-1">Donated</p>
          </div>
          
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Estimated Value</h3>
            <div className="text-3xl font-bold text-purple-600">${totalValue.toFixed(2)}</div>
            <p className="text-sm text-gray-600 mt-1">Tax deductible</p>
          </div>
        </div>
      </div>

      {/* Receipts List */}
      <div className="space-y-4">
        {filteredReceipts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500">No receipts found for {selectedYear}.</p>
          </div>
        ) : (
          filteredReceipts.map(receipt => (
            <div key={receipt.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-medium text-gray-900">
                      Receipt #{receipt.id.toString().padStart(4, '0')}
                    </h3>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      Available
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div>
                      <p className="font-medium text-gray-900">Donation Date</p>
                      <p>{new Date(receipt.donationDate).toLocaleDateString()}</p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-gray-900">Generated</p>
                      <p>{new Date(receipt.generatedAt).toLocaleDateString()}</p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-gray-900">File Name</p>
                      <p className="text-blue-600">{receipt.fileName}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-sm font-medium text-gray-900">Total Weight</p>
                      <p className="text-lg font-bold text-gray-900">{receipt.totalWeight} lbs</p>
                    </div>
                    
                    <div className="bg-green-50 p-3 rounded">
                      <p className="text-sm font-medium text-green-900">Estimated Value</p>
                      <p className="text-lg font-bold text-green-900">${receipt.totalValue.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2 ml-6">
                  <button
                    onClick={() => handleDownload(receipt.id, receipt.fileName)}
                    disabled={downloadStatus[receipt.id] === 'downloading'}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm"
                  >
                    {downloadStatus[receipt.id] === 'downloading' ? 'Downloading...' : 
                     downloadStatus[receipt.id] === 'completed' ? 'Downloaded!' :
                     downloadStatus[receipt.id] === 'error' ? 'Error' :
                     'Download'}
                  </button>
                  
                  <button
                    onClick={() => handleEmailReceipt(receipt.id)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                  >
                    Email Receipt
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Tax Information */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Tax Information</h3>
        <div className="text-blue-800 space-y-2">
          <p>
            <strong>Important:</strong> These receipts can be used for tax deduction purposes. The estimated values are based on fair market value guidelines.
          </p>
          <p>
            Please consult with your tax advisor for specific guidance on charitable donation deductions. Keep these receipts with your tax records.
          </p>
          <p>
            Our organization's tax ID number: <strong>12-3456789</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Receipts;
