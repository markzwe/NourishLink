import api from './auth';

export const inventoryAPI = {
  // Categories
  createCategory: (categoryData) => api.post('/api/inventory/categories', categoryData),
  getCategories: () => api.get('/api/inventory/categories'),
  
  // Items
  createItem: (itemData) => api.post('/api/inventory/items', itemData),
  getItems: () => api.get('/api/inventory/items'),
  updateItem: (id, itemData) => api.patch(`/api/inventory/items/${id}`, itemData),
  
  // Audits
  createAudit: (auditData) => api.post('/api/inventory/audits', auditData),
  
  // Disposals
  createDisposal: (disposalData) => api.post('/api/inventory/disposals', disposalData),
  
  // Alerts
  getLowStock: () => api.get('/api/inventory/low-stock'),
  getExpiring: () => api.get('/api/inventory/expiring'),
};
