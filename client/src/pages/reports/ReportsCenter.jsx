import React, { useState } from 'react';
import { reportsAPI } from '../../api/reports';

const ReportsCenter = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0],
  });
  const [generatingReport, setGeneratingReport] = useState(null);

  const reportTypes = [
    {
      id: 'summary',
      name: 'Summary Report',
      description: 'Overall pantry metrics and statistics',
      icon: 'assessment',
      data: null,
    },
    {
      id: 'inventory',
      name: 'Inventory Report',
      description: 'Current inventory levels and movements',
      icon: 'inventory',
      data: null,
    },
    {
      id: 'donations',
      name: 'Donations Report',
      description: 'Donation trends and donor analytics',
      icon: 'volunteer_activism',
      data: null,
    },
    {
      id: 'volunteers',
      name: 'Volunteers Report',
      description: 'Volunteer hours and engagement metrics',
      icon: 'people',
      data: null,
    },
    {
      id: 'clients',
      name: 'Clients Report',
      description: 'Client demographics and service utilization',
      icon: 'family_restroom',
      data: null,
    },
  ];

  const [pageError, setPageError] = useState('');

  const fetchReportData = async (reportId) => {
    const params = { startDate: dateRange.start, endDate: dateRange.end };
    switch (reportId) {
      case 'summary':
        return reportsAPI.getSummary(params);
      case 'inventory':
        return reportsAPI.getInventory(params);
      case 'donations':
        return reportsAPI.getDonations(params);
      case 'volunteers':
        return reportsAPI.getVolunteers(params);
      case 'clients':
        return reportsAPI.getClients(params);
      default:
        throw new Error('Unknown report type');
    }
  };

  const handleGenerateReport = async (reportId) => {
    setGeneratingReport(reportId);
    setPageError('');
    
    try {
      const reportResponse = await fetchReportData(reportId);
      const report = reportTypes.find((r) => r.id === reportId);
      setSelectedReport({
        ...report,
        data: reportResponse.data?.data || {},
      });
      
      setGeneratingReport(null);
    } catch (error) {
      setPageError(error.response?.data?.message || 'Unable to generate report.');
      setGeneratingReport(null);
    }
  };

  const handleDownloadPDF = () => {
    alert('PDF report download would be triggered here');
  };

  const handleDownloadExcel = () => {
    alert('Excel report download would be triggered here');
  };

  const handleEmailReport = () => {
    alert('Report would be emailed to your address');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Reports Center</h1>
        <p className="text-gray-600 mt-2">Generate and download comprehensive reports for pantry operations.</p>
        {pageError && (
          <div className="mt-3 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-red-700">
            {pageError}
          </div>
        )}
      </div>

      {/* Date Range Selector */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Report Period</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="flex items-end">
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Apply Date Range
            </button>
          </div>
        </div>
      </div>

      {/* Report Types Grid */}
      {!selectedReport ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportTypes.map(report => (
            <div key={report.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="text-3xl text-blue-600 mr-3">
                  {report.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{report.name}</h3>
              </div>
              
              <p className="text-gray-600 mb-4">{report.description}</p>
              
              <button
                onClick={() => handleGenerateReport(report.id)}
                disabled={generatingReport === report.id}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {generatingReport === report.id ? 'Generating...' : 'Generate Report'}
              </button>
            </div>
          ))}
        </div>
      ) : (
        /* Report Display */
        <div className="space-y-6">
          {/* Report Header */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedReport.name}</h2>
                <p className="text-gray-600">
                  {new Date(dateRange.start).toLocaleDateString()} - {new Date(dateRange.end).toLocaleDateString()}
                </p>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedReport(null)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Back to Reports
                </button>
                <button
                  onClick={handleDownloadPDF}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Download PDF
                </button>
                <button
                  onClick={handleDownloadExcel}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Download Excel
                </button>
                <button
                  onClick={handleEmailReport}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Email Report
                </button>
              </div>
            </div>
          </div>

          {/* Report Content */}
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* Summary Report */}
            {selectedReport.id === 'summary' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded">
                    <div className="text-2xl font-bold text-blue-600">{selectedReport.data.totalClients}</div>
                    <div className="text-sm text-gray-600">Total Clients</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded">
                    <div className="text-2xl font-bold text-green-600">{selectedReport.data.totalDonations}</div>
                    <div className="text-sm text-gray-600">Total Donations</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded">
                    <div className="text-2xl font-bold text-purple-600">{selectedReport.data.totalVolunteers}</div>
                    <div className="text-sm text-gray-600">Volunteers</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded">
                    <div className="text-2xl font-bold text-yellow-600">{selectedReport.data.lowStockItems}</div>
                    <div className="text-sm text-gray-600">Low Stock Items</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Monthly Trends</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Month</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Clients</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Donations</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Volunteers</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {selectedReport.data.monthlyTrend.map((month, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 text-sm text-gray-900">{month.month}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{month.clients}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{month.donations}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{month.volunteers}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Inventory Report */}
            {selectedReport.id === 'inventory' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded">
                    <div className="text-2xl font-bold text-blue-600">{selectedReport.data.totalItems}</div>
                    <div className="text-sm text-gray-600">Total Items</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded">
                    <div className="text-2xl font-bold text-red-600">{selectedReport.data.lowStockItems}</div>
                    <div className="text-sm text-gray-600">Low Stock</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded">
                    <div className="text-2xl font-bold text-orange-600">{selectedReport.data.expiringItems}</div>
                    <div className="text-sm text-gray-600">Expiring Soon</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded">
                    <div className="text-2xl font-bold text-green-600">${selectedReport.data.totalValue}</div>
                    <div className="text-sm text-gray-600">Total Value</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Category Breakdown</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Low Stock</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {selectedReport.data.categories.map((category, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 text-sm text-gray-900">{category.name}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{category.count}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">${category.value}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{category.lowStock}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Other reports would follow similar patterns... */}
            {selectedReport.id !== 'summary' && selectedReport.id !== 'inventory' && (
              <div className="text-center py-12">
                <div className="text-6xl text-gray-300 mb-4">assessment</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{selectedReport.name}</h3>
                <p className="text-gray-600 mb-4">Detailed report data would be displayed here</p>
                <div className="bg-gray-50 rounded-lg p-6 text-left">
                  <pre className="text-sm text-gray-700">
                    {JSON.stringify(selectedReport.data, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsCenter;
