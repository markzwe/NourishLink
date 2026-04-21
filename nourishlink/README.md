# NourishLink

A MERN stack web application for community food pantry management.

## Features

- Multi-role authentication (Staff, Client, Donor, Volunteer)
- Client intake and eligibility management
- Food pickup appointments
- Inventory tracking and audits
- Donation logging and donor history
- Volunteer scheduling and attendance
- Reporting dashboard

## Tech Stack

### Frontend
- React + Vite
- React Router
- Axios
- Tailwind CSS
- React Hook Form
- TanStack Query

### Backend
- Node.js
- Express.js
- Mongoose
- JWT authentication
- bcrypt
- multer (for document uploads)

### Database
- MongoDB Atlas

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account

### Installation

1. Clone the repository
2. Install dependencies for both client and server
3. Set up environment variables
4. Start the development servers

### Environment Variables

Create `.env` files in both client and server directories:

#### Server `.env`
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

#### Client `.env`
```
VITE_API_URL=http://localhost:5000
```

## Project Structure

```
nourishlink/
  client/
    src/
      api/
      components/
      pages/
        auth/
        dashboard/
        clients/
        donors/
        volunteers/
        inventory/
        appointments/
        reports/
      context/
      hooks/
      layouts/
      utils/
      App.jsx
      main.jsx
  server/
    src/
      config/
      controllers/
      middleware/
      models/
      routes/
      services/
      utils/
      app.js
      server.js
```
