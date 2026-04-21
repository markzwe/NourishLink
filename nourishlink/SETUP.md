# NourishLink Setup Instructions

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB Atlas account** (for database)
- **Git** (for version control)

## Quick Start

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd nourishlink
```

### 2. Install Dependencies

Install both client and server dependencies:

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. Environment Configuration

Create environment files for both client and server:

#### Server Environment (.env)
```bash
cd ../server
cp .env.example .env
```

Edit `.env` with your configuration:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
UPLOAD_PATH=./uploads
```

#### Client Environment (.env)
```bash
cd ../client
cp .env.example .env
```

Edit `.env` with your configuration:
```env
VITE_API_URL=http://localhost:5000
```

### 4. Database Setup

1. **Create a MongoDB Atlas account** if you don't have one
2. **Create a new cluster** (free tier is sufficient for development)
3. **Get your connection string** from the Atlas dashboard
4. **Add your connection string** to the server `.env` file
5. **Create the database** (it will be created automatically when you start the server)

### 5. Start the Application

Start both the server and client:

```bash
# Terminal 1 - Start server
cd server
npm run dev

# Terminal 2 - Start client
cd client
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## Project Structure

```
nourishlink/
  client/                 # React frontend
    src/
      api/                # API service files
      components/         # Reusable components
      pages/              # Page components
        auth/             # Authentication pages
        dashboard/        # Role-based dashboards
        clients/          # Client-specific pages
        donors/           # Donor-specific pages
        volunteers/       # Volunteer-specific pages
        staff/            # Staff-specific pages
        inventory/        # Inventory management
        reports/          # Reports center
      context/           # React context
      hooks/             # Custom hooks
      layouts/           # Layout components
      utils/             # Utility functions
  server/                 # Node.js backend
    src/
      config/            # Configuration files
      controllers/       # Route controllers
      middleware/        # Express middleware
      models/            # Mongoose models
      routes/            # API routes
      services/          # Business logic services
      utils/             # Utility functions
```

## Available Scripts

### Client Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint      # Run ESLint
```

### Server Scripts
```bash
npm run dev      # Start development server with nodemon
npm start        # Start production server
npm test         # Run tests
npm run test:watch # Run tests in watch mode
```

## Default User Accounts

For testing purposes, you can create accounts with the following roles:

- **Client**: Can register food assistance, upload documents, schedule appointments
- **Donor**: Can log donations, schedule drop-offs, view donation history
- **Volunteer**: Can sign up for shifts, track hours, view assignments
- **Staff**: Can manage all aspects of the pantry system

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Clients
- `POST /api/clients` - Create client profile
- `GET /api/clients/:id` - Get client profile
- `PATCH /api/clients/:id` - Update client profile
- `POST /api/clients/:id/documents` - Upload documents
- `GET /api/clients/pending` - Get pending applications
- `PATCH /api/clients/:id/eligibility` - Update eligibility status

### Appointments
- `POST /api/appointments` - Create appointment
- `GET /api/appointments/my` - Get user's appointments
- `PATCH /api/appointments/:id/cancel` - Cancel appointment
- `PATCH /api/appointments/capacity/:date` - Update capacity

### Inventory
- `POST /api/inventory/categories` - Create category
- `GET /api/inventory/categories` - Get categories
- `POST /api/inventory/items` - Create item
- `GET /api/inventory/items` - Get items
- `PATCH /api/inventory/items/:id` - Update item
- `POST /api/inventory/audits` - Create audit
- `POST /api/inventory/disposals` - Create disposal
- `GET /api/inventory/low-stock` - Get low stock items
- `GET /api/inventory/expiring` - Get expiring items

### Donations
- `POST /api/donors` - Create donor profile
- `GET /api/donors/:id` - Get donor profile
- `PATCH /api/donors/:id` - Update donor profile
- `POST /api/donations` - Log donation
- `GET /api/donations/my` - Get my donations
- `PATCH /api/donations/:id/process` - Process donation
- `GET /api/donations/:id/receipt` - Get receipt

### Volunteers
- `POST /api/volunteers` - Create volunteer profile
- `GET /api/volunteers/:id` - Get volunteer profile
- `PATCH /api/volunteers/:id` - Update volunteer profile
- `GET /api/shifts` - Get available shifts
- `POST /api/shifts/:id/signup` - Sign up for shift
- `PATCH /api/shifts/:id/cancel` - Cancel shift
- `PATCH /api/shifts/:id/checkin` - Check in
- `PATCH /api/shifts/:id/checkout` - Check out
- `GET /api/volunteers/history/me` - Get volunteer history

### Reports
- `GET /api/reports/summary` - Get summary report
- `GET /api/reports/inventory` - Get inventory report
- `GET /api/reports/donations` - Get donations report
- `GET /api/reports/volunteers` - Get volunteers report
- `GET /api/reports/clients` - Get clients report

## Development Tips

### Code Structure
- Follow the existing folder structure
- Use descriptive component and file names
- Keep components small and focused
- Use React hooks for state management
- Follow RESTful API conventions

### Database
- Use Mongoose for MongoDB interactions
- Define proper schemas with validation
- Use indexes for frequently queried fields
- Handle database errors gracefully

### Authentication
- Use JWT for authentication
- Implement proper role-based access control
- Hash passwords using bcrypt
- Validate all input data

### Styling
- Use Tailwind CSS for styling
- Follow consistent design patterns
- Use responsive design principles
- Test on different screen sizes

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check your connection string in `.env`
   - Ensure your IP is whitelisted in MongoDB Atlas
   - Verify your database user has proper permissions

2. **Port Already in Use**
   - Change the port in `.env` file
   - Kill processes using the port: `lsof -ti:5000 | xargs kill`

3. **CORS Issues**
   - Ensure the frontend is running on port 3000
   - Check CORS configuration in server

4. **Environment Variables Not Loading**
   - Verify `.env` file exists in correct directory
   - Check that variable names match exactly

### Getting Help

1. Check the console for error messages
2. Verify environment variables are set correctly
3. Ensure all dependencies are installed
4. Check MongoDB connection status

## Deployment

### Production Build

1. **Build the client:**
   ```bash
   cd client
   npm run build
   ```

2. **Set production environment variables:**
   ```env
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=production_connection_string
   JWT_SECRET=production_secret
   ```

3. **Start the server:**
   ```bash
   cd server
   npm start
   ```

### Environment Considerations

- Use environment-specific configuration
- Enable HTTPS in production
- Set up proper logging
- Configure backup strategies
- Monitor application performance

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request


