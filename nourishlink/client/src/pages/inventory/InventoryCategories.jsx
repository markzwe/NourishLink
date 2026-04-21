import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const InventoryCategories = () => {
  const [categories] = useState([
    {
      id: 1,
      name: 'Canned Goods',
      minStockAlertLevel: 50,
      description: 'Canned vegetables, fruits, and other shelf-stable items',
      isActive: true,
      currentItemCount: 15,
      totalItems: 85,
    },
    {
      id: 2,
      name: 'Fresh Produce',
      minStockAlertLevel: 30,
      description: 'Fresh fruits and vegetables',
      isActive: true,
      currentItemCount: 8,
      totalItems: 42,
    },
    {
      id: 3,
      name: 'Dry Goods',
      minStockAlertLevel: 40,
      description: 'Pasta, rice, flour, and other dry items',
      isActive: true,
      currentItemCount: 12,
      totalItems: 35,
    },
    {
      id: 4,
      name: 'Dairy',
      minStockAlertLevel: 25,
      description: 'Milk, cheese, yogurt, and other dairy products',
      isActive: true,
      currentItemCount: 5,
      totalItems: 28,
    },
    {
      id: 5,
      name: 'Meat',
      minStockAlertLevel: 20,
      description: 'Fresh and frozen meat products',
      isActive: true,
      currentItemCount: 3,
      totalItems: 22,
    },
    {
      id: 6,
      name: 'Bakery',
      minStockAlertLevel: 15,
      description: 'Bread, pastries, and other baked goods',
      isActive: true,
      currentItemCount: 7,
      totalItems: 18,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [actionStatus, setActionStatus] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setActionStatus(prev => ({ ...prev, submitting: true }));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (editingCategory) {
        setActionStatus(prev => ({ ...prev, submitting: false, updated: true }));
        alert('Category updated successfully!');
        setEditingCategory(null);
      } else {
        setActionStatus(prev => ({ ...prev, submitting: false, created: true }));
        alert('Category created successfully!');
        setShowAddForm(false);
      }
      
      reset();
      
      setTimeout(() => setActionStatus(prev => ({ ...prev, updated: null, created: null })), 2000);
    } catch (error) {
      console.error('Submit error:', error);
      setActionStatus(prev => ({ ...prev, submitting: false, error: true }));
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    reset(category);
    setShowAddForm(true);
  };

  const handleDelete = async (categoryId) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Category deleted successfully!');
    } catch (error) {
      console.error('Delete error:', error);
      alert('Error deleting category. Please try again.');
    }
  };

  const getStockStatus = (current, min) => {
    if (current === 0) return { color: 'text-red-600 bg-red-100', text: 'Out of Stock' };
    if (current <= min) return { color: 'text-yellow-600 bg-yellow-100', text: 'Low Stock' };
    return { color: 'text-green-600 bg-green-100', text: 'In Stock' };
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory Categories</h1>
          <p className="text-gray-600 mt-2">Manage food categories and stock levels.</p>
        </div>
        <button
          onClick={() => {
            setEditingCategory(null);
            reset();
            setShowAddForm(true);
          }}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Category
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Categories</h3>
          <div className="text-3xl font-bold text-blue-600">{categories.length}</div>
          <p className="text-sm text-gray-600 mt-2">Active</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Low Stock Alerts</h3>
          <div className="text-3xl font-bold text-yellow-600">
            {categories.filter(c => c.currentItemCount <= c.minStockAlertLevel).length}
          </div>
          <p className="text-sm text-gray-600 mt-2">Need attention</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Items</h3>
          <div className="text-3xl font-bold text-green-600">
            {categories.reduce((sum, c) => sum + c.totalItems, 0)}
          </div>
          <p className="text-sm text-gray-600 mt-2">In inventory</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Out of Stock</h3>
          <div className="text-3xl font-bold text-red-600">
            {categories.filter(c => c.currentItemCount === 0).length}
          </div>
          <p className="text-sm text-gray-600 mt-2">Categories</p>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {editingCategory ? 'Edit Category' : 'Add New Category'}
          </h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category Name
                </label>
                <input
                  {...register('name', { required: 'Category name is required' })}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Canned Goods"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Stock Alert Level
                </label>
                <input
                  {...register('minStockAlertLevel', { 
                    required: 'Minimum stock level is required',
                    min: { value: 0, message: 'Cannot be negative' }
                  })}
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 50"
                />
                {errors.minStockAlertLevel && (
                  <p className="mt-1 text-sm text-red-600">{errors.minStockAlertLevel.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                {...register('description', { required: 'Description is required' })}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe this category..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            <div className="flex items-center">
              <input
                {...register('isActive')}
                type="checkbox"
                id="isActive"
                className="mr-2"
              />
              <label htmlFor="isActive" className="text-sm text-gray-700">
                Active Category
              </label>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={actionStatus.submitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {actionStatus.submitting ? 'Saving...' : 
                 actionStatus.updated ? 'Updated!' :
                 actionStatus.created ? 'Created!' :
                 actionStatus.error ? 'Error' :
                 editingCategory ? 'Update Category' : 'Create Category'}
              </button>
              
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingCategory(null);
                  reset();
                }}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Categories List */}
      <div className="space-y-4">
        {categories.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500">No categories found. Add your first category above.</p>
          </div>
        ) : (
          categories.map(category => {
            const stockStatus = getStockStatus(category.currentItemCount, category.minStockAlertLevel);
            
            return (
              <div key={category.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${stockStatus.color}`}>
                        {stockStatus.text}
                      </span>
                      {!category.isActive && (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                          Inactive
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-900">Current Items</p>
                        <p className="text-gray-600">{category.currentItemCount} of {category.totalItems}</p>
                      </div>
                      
                      <div>
                        <p className="font-medium text-gray-900">Min Alert Level</p>
                        <p className="text-gray-600">{category.minStockAlertLevel} items</p>
                      </div>
                      
                      <div>
                        <p className="font-medium text-gray-900">Stock Status</p>
                        <div className="mt-1">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${Math.min((category.currentItemCount / category.totalItems) * 100, 100)}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 ml-6">
                    <button
                      onClick={() => handleEdit(category)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Low Stock Alert */}
      {categories.some(c => c.currentItemCount <= c.minStockAlertLevel) && (
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-900 mb-3">Low Stock Alert</h3>
          <div className="space-y-2">
            {categories
              .filter(c => c.currentItemCount <= c.minStockAlertLevel)
              .map(category => (
                <div key={category.id} className="flex justify-between items-center">
                  <span className="text-yellow-800">{category.name}</span>
                  <span className="text-yellow-700 font-medium">
                    {category.currentItemCount} / {category.minStockAlertLevel} min
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryCategories;
