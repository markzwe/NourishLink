// In-memory data store for all entities
// This replaces MongoDB for demo/testing purposes

const { v4: uuidv4 } = require('uuid');

// Hardcoded Users
const users = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Client',
    email: 'client@example.com',
    password: 'password123',
    role: 'client',
    isActive: true,
    phone: '(555) 123-4567',
    address: '123 Main St, Anytown, CA 12345'
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Donor',
    email: 'donor@example.com',
    password: 'password123',
    role: 'donor',
    isActive: true,
    phone: '(555) 234-5678',
    address: '456 Oak Ave, Anytown, CA 12345'
  },
  {
    id: '3',
    firstName: 'Mike',
    lastName: 'Volunteer',
    email: 'volunteer@example.com',
    password: 'password123',
    role: 'volunteer',
    isActive: true,
    phone: '(555) 345-6789',
    address: '789 Pine Rd, Anytown, CA 12345'
  },
  {
    id: '4',
    firstName: 'Sarah',
    lastName: 'Staff',
    email: 'staff@example.com',
    password: 'password123',
    role: 'staff',
    isActive: true,
    phone: '(555) 456-7890',
    address: '321 Elm St, Anytown, CA 12345'
  }
];

// Client Profiles
const clientProfiles = [
  {
    id: '1',
    userId: '1',
    dateOfBirth: '1985-06-15',
    householdSize: 3,
    monthlyIncome: 2500,
    employmentStatus: 'employed',
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zipCode: '12345'
    },
    eligibilityStatus: 'approved',
    documents: []
  }
];

// Donor Profiles
const donorProfiles = [
  {
    id: '1',
    userId: '2',
    organization: 'Local Community Donor',
    donationType: ['food', 'funds'],
    totalDonations: 15,
    totalWeight: 450,
    isRecurring: true
  }
];

// Volunteer Profiles
const volunteerProfiles = [
  {
    id: '1',
    userId: '3',
    skills: ['food_distribution', 'inventory_management', 'bilingual'],
    availability: ['monday', 'wednesday', 'friday'],
    totalHours: 120,
    completedShifts: 30
  }
];

// Appointments
const appointments = [
  {
    id: '1',
    clientId: '1',
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    timeSlot: '10:00 AM',
    status: 'confirmed',
    notes: 'First visit'
  }
];

// Inventory Categories
const inventoryCategories = [
  {
    id: '1',
    name: 'Canned Goods',
    description: 'Canned vegetables, fruits, and soups',
    minStockAlertLevel: 50,
    isActive: true
  },
  {
    id: '2',
    name: 'Fresh Produce',
    description: 'Fresh fruits and vegetables',
    minStockAlertLevel: 30,
    isActive: true
  },
  {
    id: '3',
    name: 'Dry Goods',
    description: 'Rice, pasta, flour, and other dry items',
    minStockAlertLevel: 40,
    isActive: true
  },
  {
    id: '4',
    name: 'Dairy',
    description: 'Milk, cheese, yogurt',
    minStockAlertLevel: 20,
    isActive: true
  }
];

// Inventory Items
const inventoryItems = [
  {
    id: '1',
    categoryId: '1',
    name: 'Canned Tomatoes',
    quantity: 45,
    unit: 'cans',
    expiryDate: '2024-12-01',
    donorId: '2',
    status: 'available'
  },
  {
    id: '2',
    categoryId: '1',
    name: 'Canned Beans',
    quantity: 60,
    unit: 'cans',
    expiryDate: '2024-11-15',
    donorId: '2',
    status: 'available'
  },
  {
    id: '3',
    categoryId: '2',
    name: 'Apples',
    quantity: 25,
    unit: 'lbs',
    expiryDate: '2024-02-15',
    donorId: '2',
    status: 'available'
  },
  {
    id: '4',
    categoryId: '3',
    name: 'Rice',
    quantity: 100,
    unit: 'lbs',
    expiryDate: '2025-01-01',
    donorId: '2',
    status: 'available'
  }
];

// Donations
const donations = [
  {
    id: '1',
    donorId: '2',
    items: [
      { name: 'Canned Tomatoes', quantity: 20, unit: 'cans' },
      { name: 'Rice', quantity: 50, unit: 'lbs' }
    ],
    totalWeight: 75,
    status: 'received',
    dropOffDate: '2024-01-15',
    notes: 'Regular donation'
  }
];

// Volunteer Shifts
const shifts = [
  {
    id: '1',
    volunteerId: '3',
    date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    timeSlot: '9:00 AM - 1:00 PM',
    location: 'Main Distribution Center',
    taskRole: 'Food Distribution',
    status: 'signed_up'
  },
  {
    id: '2',
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    timeSlot: '2:00 PM - 6:00 PM',
    location: 'Warehouse',
    taskRole: 'Inventory Management',
    status: 'open'
  }
];

// Helper functions
const generateId = () => uuidv4();

const findById = (array, id) => array.find(item => item.id === id);

const findByField = (array, field, value) => array.find(item => item[field] === value);

const filterByField = (array, field, value) => array.filter(item => item[field] === value);

const create = (array, data) => {
  const newItem = { ...data, id: generateId() };
  array.push(newItem);
  return newItem;
};

const update = (array, id, data) => {
  const index = array.findIndex(item => item.id === id);
  if (index !== -1) {
    array[index] = { ...array[index], ...data };
    return array[index];
  }
  return null;
};

const remove = (array, id) => {
  const index = array.findIndex(item => item.id === id);
  if (index !== -1) {
    return array.splice(index, 1)[0];
  }
  return null;
};

module.exports = {
  // Data arrays
  users,
  clientProfiles,
  donorProfiles,
  volunteerProfiles,
  appointments,
  inventoryCategories,
  inventoryItems,
  donations,
  shifts,
  
  // Helper functions
  generateId,
  findById,
  findByField,
  filterByField,
  create,
  update,
  remove
};
