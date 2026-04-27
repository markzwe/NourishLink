import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const ContactStaff = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      // This would make an API call to send the message
      console.log('Contact form data:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Contact form error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div style={{ padding: "20px", background: "white" }}>
        <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-green-800 mb-4">Message Sent Successfully!</h2>
          <p className="text-green-700 mb-6">
            Your message has been sent to our staff. We'll get back to you within 24-48 hours.
          </p>
          <button
            onClick={() => setSubmitSuccess(false)}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Contact Staff</h1>
        <p className="text-gray-600 mt-2">Get in touch with our team for questions, concerns, or special arrangements.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Send us a Message</h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <select
                {...register('subject', { required: 'Subject is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a subject</option>
                <option value="general_question">General Question</option>
                <option value="donation_inquiry">Donation Inquiry</option>
                <option value="special_arrangement">Special Drop-off Arrangement</option>
                <option value="receipt_request">Receipt Request</option>
                <option value="technical_issue">Technical Issue</option>
                <option value="other">Other</option>
              </select>
              {errors.subject && (
                <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                {...register('message', { 
                  required: 'Message is required',
                  minLength: { value: 10, message: 'Message must be at least 10 characters' }
                })}
                rows="6"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Please describe your question or concern in detail..."
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Contact Method
              </label>
              <select
                {...register('contactMethod', { required: 'Contact method is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select preferred method</option>
                <option value="email">Email</option>
                <option value="phone">Phone</option>
              </select>
              {errors.contactMethod && (
                <p className="mt-1 text-sm text-red-600">{errors.contactMethod.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Urgency
              </label>
              <select
                {...register('urgency', { required: 'Urgency level is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select urgency level</option>
                <option value="low">Low - General inquiry</option>
                <option value="medium">Medium - Need response within 48 hours</option>
                <option value="high">High - Need response within 24 hours</option>
                <option value="urgent">Urgent - Time-sensitive matter</option>
              </select>
              {errors.urgency && (
                <p className="mt-1 text-sm text-red-600">{errors.urgency.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          {/* Direct Contact */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Direct Contact Information</h2>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="text-blue-600 mt-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Phone</p>
                  <p className="text-gray-600">(555) 987-6543</p>
                  <p className="text-sm text-gray-500">Mon-Fri: 9:00 AM - 5:00 PM</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="text-blue-600 mt-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <p className="text-gray-600">donors@nourishlink.org</p>
                  <p className="text-sm text-gray-500">Response within 24-48 hours</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="text-blue-600 mt-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Address</p>
                  <p className="text-gray-600">123 Community Drive</p>
                  <p className="text-gray-600">Anytown, CA 12345</p>
                </div>
              </div>
            </div>
          </div>

          {/* Office Hours */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Office Hours</h2>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">Monday - Friday</span>
                <span className="font-medium text-gray-900">9:00 AM - 5:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Saturday</span>
                <span className="font-medium text-gray-900">10:00 AM - 2:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Sunday</span>
                <span className="font-medium text-gray-900">Closed</span>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-yellow-50 rounded">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Drop-off hours may differ from office hours. Please check the Schedule Drop-off page for current availability.
              </p>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-red-900 mb-4">Emergency Contact</h2>
            <p className="text-red-800 mb-3">
              For urgent matters that require immediate attention (such as large donations needing same-day pickup):
            </p>
            <p className="font-medium text-red-900">Emergency Hotline: (555) 911-HELP</p>
            <p className="text-sm text-red-700 mt-2">Available 24/7 for urgent donor needs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactStaff;
