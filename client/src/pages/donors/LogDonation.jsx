import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { donationsAPI } from '../../api/donations';

const LogDonation = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [donationItems, setDonationItems] = useState([{ itemType: '', description: '', quantity: '', condition: '' }]);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addItem = () => {
    setDonationItems([...donationItems, { itemType: '', description: '', quantity: '', condition: '' }]);
  };

  const removeItem = (index) => {
    const newItems = donationItems.filter((_, i) => i !== index);
    setDonationItems(newItems);
  };

  const updateItem = (index, field, value) => {
    const newItems = [...donationItems];
    newItems[index][field] = value;
    setDonationItems(newItems);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const donationData = {
        ...data,
        items: donationItems,
      };
      await donationsAPI.createDonation(donationData);
      
      setSubmitSuccess(true);
      setDonationItems([{ itemType: '', description: '', quantity: '', condition: '' }]);
    } catch (error) {
      setSubmitError(error.response?.data?.message || 'Unable to log donation.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
     <div style={{ padding: "20px", background: "white" }}>
        <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-green-800 mb-4">Donation Logged Successfully!</h2>
          <p className="text-green-700 mb-6">
            Thank you for your generous donation. Our staff will review and process it soon.
          </p>
          <button
            onClick={() => setSubmitSuccess(false)}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            Log Another Donation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Log Donation</h1>
        <p className="text-gray-600 mt-2">Record your donation details for processing.</p>
        {submitError && (
          <div className="mt-3 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-red-700">
            {submitError}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Donation Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Donation Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Drop-off Date
              </label>
              <input
                {...register('dropoffDate', { required: 'Drop-off date is required' })}
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.dropoffDate && (
                <p className="mt-1 text-sm text-red-600">{errors.dropoffDate.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Drop-off Time
              </label>
              <select
                {...register('dropoffTime', { required: 'Drop-off time is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select time</option>
                <option value="9:00 AM">9:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="2:00 PM">2:00 PM</option>
                <option value="3:00 PM">3:00 PM</option>
                <option value="4:00 PM">4:00 PM</option>
              </select>
              {errors.dropoffTime && (
                <p className="mt-1 text-sm text-red-600">{errors.dropoffTime.message}</p>
              )}
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes (Optional)
            </label>
            <textarea
              {...register('notes')}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Any special instructions or notes about this donation..."
            />
          </div>
        </div>

        {/* Donation Items */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Donation Items</h2>
            <button
              type="button"
              onClick={addItem}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
            >
              Add Item
            </button>
          </div>
          
          <div className="space-y-4">
            {donationItems.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Item Type
                    </label>
                    <select
                      value={item.itemType}
                      onChange={(e) => updateItem(index, 'itemType', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select type</option>
                      <option value="canned_goods">Canned Goods</option>
                      <option value="fresh_produce">Fresh Produce</option>
                      <option value="dry_goods">Dry Goods</option>
                      <option value="dairy">Dairy</option>
                      <option value="meat">Meat</option>
                      <option value="bakery">Bakery</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => updateItem(index, 'description', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Canned tomatoes, bread, etc."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity
                    </label>
                    <input
                      type="text"
                      value={item.quantity}
                      onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., 10 lbs, 5 boxes"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Condition
                    </label>
                    <select
                      value={item.condition}
                      onChange={(e) => updateItem(index, 'condition', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select condition</option>
                      <option value="excellent">Excellent</option>
                      <option value="good">Good</option>
                      <option value="fair">Fair</option>
                    </select>
                  </div>
                </div>
                
                {donationItems.length > 1 && (
                  <div className="mt-3 flex justify-end">
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove Item
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Estimated Weight */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Estimated Information</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Estimated Weight (lbs)
            </label>
            <input
              {...register('totalWeight', { 
                required: 'Estimated weight is required',
                min: { value: 0, message: 'Weight cannot be negative' }
              })}
              type="number"
              step="0.1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="0.0"
            />
            {errors.totalWeight && (
              <p className="mt-1 text-sm text-red-600">{errors.totalWeight.message}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || donationItems.some(item => !item.itemType || !item.description || !item.quantity || !item.condition)}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Logging Donation...' : 'Log Donation'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LogDonation;
