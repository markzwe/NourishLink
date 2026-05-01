import React, { useEffect, useState } from 'react';
import { clientsAPI } from '../../api/clients';

const UploadDocuments = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedDocumentType, setSelectedDocumentType] = useState('proof_of_income');
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [pageError, setPageError] = useState('');

  const documentTypes = [
    { value: 'proof_of_income', label: 'Proof of Income' },
    { value: 'id_document', label: 'ID Document' },
    { value: 'address_proof', label: 'Address Proof' },
    { value: 'other', label: 'Other' },
  ];

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  useEffect(() => {
    const loadDocuments = async () => {
      try {
        const response = await clientsAPI.getMyDocuments();
        const documents = response.data?.data || [];
        setUploadedDocuments(documents.map((doc) => ({
          id: doc._id,
          fileName: doc.fileName,
          documentType: doc.documentType,
          uploadDate: doc.uploadedAt || doc.createdAt,
          status: doc.verificationStatus,
          fileUrl: doc.fileUrl,
          verificationNotes: doc.notes || doc.rejectionReason || '',
          rejectionReason: doc.rejectionReason || '',
          verifiedAt: doc.verifiedAt,
        })));
      } catch (error) {
        setPageError(error.response?.data?.message || 'Unable to load uploaded documents.');
      }
    };

    loadDocuments();
  }, []);

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      alert('Please select files to upload');
      return;
    }

    setPageError('');
    setIsUploading(true);

    try {
      for (const file of selectedFiles) {
        const formData = new FormData();
        formData.append('document', file);
        formData.append('documentType', selectedDocumentType);

        setUploadProgress((prev) => ({ ...prev, [file.name]: 0 }));

        const response = await clientsAPI.uploadDocument('me', formData, (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress((prev) => ({ ...prev, [file.name]: percentCompleted }));
        });

        const doc = response.data?.data;
        if (doc) {
          setUploadedDocuments((prev) => [
            {
              id: doc._id,
              fileName: doc.fileName,
              documentType: doc.documentType,
              uploadDate: doc.uploadedAt || doc.createdAt,
              status: doc.verificationStatus,
              fileUrl: doc.fileUrl,
              verificationNotes: doc.notes || doc.rejectionReason || '',
              rejectionReason: doc.rejectionReason || '',
              verifiedAt: doc.verifiedAt,
            },
            ...prev,
          ]);
        }

        setUploadProgress((prev) => {
          const next = { ...prev };
          delete next[file.name];
          return next;
        });
      }
    } catch (error) {
      setPageError(error.response?.data?.message || 'Unable to upload document.');
    } finally {
      setSelectedFiles([]);
      setIsUploading(false);
    }
  };

  const [previewDocument, setPreviewDocument] = useState(null);

  const handleViewDocument = (doc) => {
    const fileUrl = `${import.meta.env.VITE_API_URL || ''}${doc.fileUrl}`;
    setPreviewDocument({ ...doc, fileUrl });
  };

  const closePreview = () => {
    setPreviewDocument(null);
  };

  const handleDeleteDocument = async (documentId) => {
    try {
      await clientsAPI.deleteDocument(documentId);
      setUploadedDocuments((prev) => prev.filter((doc) => doc.id !== documentId));
    } catch (error) {
      setPageError(error.response?.data?.message || 'Unable to delete document.');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDocumentTypeLabel = (type) => {
    const found = documentTypes.find((item) => item.value === type);
    return found ? found.label : type.replace(/_/g, ' ');
  };

  const formatVerificationLine = (doc) => {
    if (doc.status === 'approved' && doc.verifiedAt) {
      return `Verified on ${new Date(doc.verifiedAt).toLocaleDateString()}`;
    }
    if (doc.status === 'rejected' && doc.rejectionReason) {
      return `Rejected: ${doc.rejectionReason}`;
    }
    return doc.verificationNotes || '';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Upload Documents</h1>
        <p className="text-gray-600 mt-2">Upload required documents for eligibility verification.</p>
        {pageError && (
          <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-red-700">
            {pageError}
          </div>
        )}
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload New Documents</h2>

        <div className="space-y-4">
          {/* File Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Documents
            </label>
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={handleFileSelect}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-sm text-gray-500 mt-1">
              Accepted formats: PDF, DOC, DOCX, JPG, JPEG, PNG (Max 5MB per file)
            </p>
          </div>

          {/* Document Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Document Type
            </label>
            <select
              value={selectedDocumentType}
              onChange={(e) => setSelectedDocumentType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {documentTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Selected Files */}
          {selectedFiles.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Files:</h3>
              <div className="space-y-2">
                {selectedFiles.map(file => (
                  <div key={file.name} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm text-gray-700">{file.name}</span>
                    <span className="text-xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload Progress */}
          {Object.keys(uploadProgress).length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Upload Progress:</h3>
              <div className="space-y-2">
                {Object.entries(uploadProgress).map(([fileName, progress]) => (
                  <div key={fileName} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">{fileName}</span>
                      <span className="text-gray-500">{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            disabled={selectedFiles.length === 0 || isUploading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isUploading ? 'Uploading...' : 'Upload Documents'}
          </button>
        </div>
      </div>

      {/* Uploaded Documents */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Uploaded Documents</h2>

        {uploadedDocuments.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No documents uploaded yet. Upload your first document above.
          </p>
        ) : (
          <div className="space-y-4">
            {uploadedDocuments.map(doc => (
              <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="text-gray-400">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{doc.fileName}</p>
                    <div className="flex flex-wrap gap-2 items-center text-sm text-gray-500">
                      <span>{getDocumentTypeLabel(doc.documentType)}</span>
                      <span>•</span>
                      <span>Uploaded {new Date(doc.uploadDate).toLocaleDateString()}</span>
                    </div>
                    {formatVerificationLine(doc) && (
                      <p className="text-sm text-gray-500 mt-1">{formatVerificationLine(doc)}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(doc.status)}`}>
                    {doc.status}
                  </span>
                  <button
                    onClick={() => handleViewDocument(doc)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDeleteDocument(doc.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {previewDocument && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{previewDocument.fileName}</h3>
                <p className="text-sm text-gray-500">{getDocumentTypeLabel(previewDocument.documentType)}</p>
              </div>
              <button
                onClick={closePreview}
                className="rounded-full bg-gray-100 px-3 py-2 text-gray-600 hover:bg-gray-200"
              >
                Close
              </button>
            </div>

            <div className="min-h-[500px] bg-gray-50 p-6">
              {/(\.pdf|\.jpg|\.jpeg|\.png)$/i.test(previewDocument.fileName) ? (
                previewDocument.fileName.match(/\.(jpg|jpeg|png)$/i) ? (
                  <img
                    src={previewDocument.fileUrl}
                    alt={previewDocument.fileName}
                    className="mx-auto h-full max-h-[620px] w-full max-w-full object-contain rounded-xl"
                  />
                ) : (
                  <iframe
                    src={previewDocument.fileUrl}
                    title={previewDocument.fileName}
                    className="h-[620px] w-full rounded-xl border"
                  />
                )
              ) : (
                <div className="flex h-full flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
                  <p className="text-lg font-semibold text-gray-900">Preview not available</p>
                  <p className="mt-2 text-sm text-gray-500">
                    This file type cannot be previewed in the browser. You can download it instead.
                  </p>
                  <a
                    href={previewDocument.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    Download File
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadDocuments;
