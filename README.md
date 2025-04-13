# E-commerce Admin Panel

A full-stack e-commerce admin panel with category management functionality.

## Features

- User Authentication (Login/Register)
- Category Management
  - Create, Read, Update, Delete categories
  - Upload category images
  - Pagination and search
- Responsive Design
- Modern UI with Material-UI

## Tech Stack

### Frontend
- React.js
- Material-UI
- React Router
- Axios
- React Context API

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer for file uploads

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Initialize npm:
   ```bash
   npm init -y
   ```

3. Install required dependencies:
   ```bash
   npm install express mongoose cors dotenv jsonwebtoken bcryptjs multer nodemailer nodemon
   ```

4. Create necessary directories:
   ```bash
   mkdir controllers models routes middleware utils uploads
   ```

5. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/ecommerce-admin
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```

6. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Create React app:
   ```bash
   npx create-react-app .
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Project Structure

```
ecommerce-admin/
├── frontend/           # React frontend
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── pages/     # Page components
│   │   ├── context/   # React context
│   │   ├── services/  # API services
│   │   └── utils/     # Utility functions
├── backend/           # Node.js/Express backend
│   ├── controllers/   # Route controllers
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   ├── middleware/    # Custom middleware
│   └── utils/         # Utility functions
└── README.md         # Project documentation
```

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user
- POST /api/auth/request-password-reset - Request password reset
- POST /api/auth/reset-password - Reset password

### Categories
- GET /api/categories - Get all categories
- GET /api/categories/:id - Get a single category
- POST /api/categories - Create a new category
- PUT /api/categories/:id - Update a category
- DELETE /api/categories/:id - Delete a category

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 

# If you're using Windows, make sure MongoDB service is running
net start MongoDB 

# Create the main project directory
mkdir ecommerce-admin
cd ecommerce-admin

# Create backend and frontend directories
mkdir backend frontend 

# Open a new terminal and run:
net start MongoDB 

cd backend
mkdir uploads 

# Open a new terminal and run:
mongosh 

# Make sure MongoDB is installed and running
# For Windows:
net start MongoDB

# For Linux/Mac:
sudo service mongod start 