
---

# 🛒 My eCommerce Platform

This is a full-stack eCommerce application built with a **Node.js** backend (using **Express** and **MongoDB**) and a **React** frontend (using **Redux** for state management, **ViteJS** for a faster development experience, and **TailwindCSS** for styling). This platform allows users to register as **admins**, **sellers**, or **shoppers**, each with different permissions.

## 🌟 Key Features
- **User Registration & Authentication**: Secure registration and login system with JWT-based authentication.
- **User Roles**: Admin, Seller, and Shopper roles with distinct permissions.
  - **Admin**: Can add and delete users, and modify user roles.
  - **Seller**: Can add, edit, and delete their products.
  - **Shopper**: Can browse and purchase products from sellers.
- **Product Management**: Sellers can list products with price and quantity, and shoppers can buy products.
- **Protected Routes**: Role-based access control to protect routes and functionalities.
- **Global State Management**: State management via **Redux** with persistence using **Redux Persist**.
- **Responsive UI**: Built using **TailwindCSS** to ensure a responsive and modern user interface.

---

## 📁 Project Structure

### **Backend**
```
/backend
├── config
│   └── db.js           # MongoDB connection setup
├── controllers
│   ├── authController.js     # Handles user registration, login, and admin user creation
│   ├── productController.js  # Handles product creation, retrieval, and purchasing
│   └── userController.js     # Manages user CRUD operations and role modifications
├── middleware
│   ├── authMiddleware.js     # Protects routes and verifies user roles
│   ├── roleMiddleware.js     # Verifies admin, seller, and shopper roles
├── models
│   ├── Product.js            # Defines Product schema for MongoDB
│   └── User.js               # Defines User schema and password encryption
├── routes
│   ├── authRoutes.js         # Authentication routes (register, login)
│   ├── productRoutes.js      # Product management routes (CRUD operations)
│   └── userRoutes.js         # User management routes (role modification, delete user)
├── utils
│   └── generateToken.js      # Utility to generate JWT tokens
├── .env                      # Environment variables (DB connection, JWT secret)
├── server.js                 # Main server entry point
└── package.json              # Backend dependencies
```

### **Frontend**
```
/frontend
├── index.html            # Entry point for the React application
├── src
│   ├── components
│   │   ├── ProductCard.jsx   # Component for displaying individual product details
│   │   ├── Header.jsx        # Header component with navigation  
│   │   └── Footer.jsx        # Footer component
│   ├── screens
│   │   ├── HomeScreen.jsx    # Main screen displaying products
│   │   ├── LoginScreen.jsx   # Login screen
│   │   ├── RegisterScreen.jsx # Registration screen
│   │   ├── ProductScreen.jsx # Product details and purchase screen
│   │   ├── AdminScreen.jsx   # Admin dashboard for user management
│   │   └── SellerScreen.jsx  # Seller dashboard for product management
│   ├── store
│   │   ├── productSlice.js   # Redux slice for product state management
│   │   ├── index.js          # Configures the Redux store
│   │   └── authSlice.js      # Redux slice for authentication state
│   ├── App.jsx               # Main App component with route setup
│   ├── main.jsx              # React entry point
│   ├── index.css             # TailwindCSS styles
├── .env                      # Frontend environment variables (API URL)
├── postcss.config.js         # Configuration for PostCSS
├── tailwind.config.js        # Configuration for TailwindCSS
├── vite.config.js            # Configuration for ViteJS
├── eslint.config.js          # Configuration for ESLint
└── package.json              # Frontend dependencies
```

---

## 📽️ Demo Video

<a href="">
   <img src="https://github.com/SinghShubhamkumarkrishnadev/Bounty---Simple-File-Server/blob/main/preview.jpg" alt="video demo" width="400" height="300">
</a>

---

## 🚀 Installation & Setup

### 1. **Clone the repository**
```bash
git clone https://github.com/SinghShubhamkumarkrishnadev/Bounty---Build-an-eCommerce-Site.git
cd Bounty---Build-an-eCommerce-Site
```

### 2. **Backend Setup**
Navigate to the backend directory, install dependencies, and start the server.
```bash
cd backend
npm install
```

- Create a `.env` file in the `/backend` directory with the following variables:
  ```
  MONGO_URI=<your_mongodb_uri>  
  JWT_SECRET=<your_jwt_secret>
  PORT=5000
  ```
- Replace the `mongo_uri` and `jwt_secret` with your own uri and secret


- Run the server:
```bash
npm run dev
```

The backend API will run on `http://localhost:5000`.

### 3. **Frontend Setup**
Navigate to the frontend directory, install dependencies, and start the React app.
```bash
cd frontend
npm install
```

- Create a `.env` file in the `/frontend` directory with the following variable:
  ```
  VITE_API_URL=http://localhost:5000/api
  ```

- Run the frontend:
```bash
npm run dev
```

The React app will run on `http://localhost:5173`.

---

## 🔄 API Endpoints

### **Authentication**
- **POST /api/auth/register** - Register a new user.
- **POST /api/auth/login** - Log in an existing user.

### **User Management (Admin only)**
- **POST /api/users/create** - Add a new user (Admin).
- **DELETE /api/users/:id** - Delete a user (Admin).
- **PUT /api/users/:id/role** - Modify a user’s role (Admin).

### **Product Management**
- **POST /api/products** - Create a new product (Seller only).
- **GET /api/products** - Get all products.
- **GET /api/products/:id** - Get a product by ID.
- **POST /api/products/:id/buy** - Buy a product (Shopper only).

---

## 🗂️ Detailed File and Code Explanation

### **Backend**

#### `config/db.js`
Manages the connection to MongoDB using Mongoose. This file ensures the app connects to the database.

#### `controllers/authController.js`
Contains functions to handle user registration, login, and creating users with different roles.

#### `controllers/userController.js`
Handles admin-specific operations, like modifying user roles and deleting users.

#### `controllers/productController.js`
Manages seller and shopper functionalities, such as creating products, fetching product data, and purchasing.

#### `models/User.js`
Defines the `User` schema, including fields for email, password, role, etc. It uses bcrypt to hash passwords.

#### `models/Product.js`
Defines the `Product` schema, which includes the product name, price, quantity, seller details, and more.

#### `middleware/authMiddleware.js`
A middleware that protects routes. It ensures that users are authenticated via JWT tokens and verifies roles like admin, seller, and shopper.

#### `middleware/roleMiddleware.js`
Verifies user roles, allowing access to specific routes based on roles (admin, seller, shopper).

#### `routes/authRoutes.js`
Defines routes for user registration and login.

#### `routes/userRoutes.js`
Defines routes for admin actions like adding, deleting, and modifying users.

#### `routes/productRoutes.js`
Defines routes for sellers to create products and shoppers to purchase them.

#### `utils/generateToken.js`
Utility function for generating JWT tokens for user sessions.

#### `.env`
Contains environment variables such as MongoDB URI and JWT secret to keep sensitive data secure.

#### `server.js`
The main entry point of the application, setting up the server, connecting to the database, and defining routes.

---

### **Frontend**

#### `index.html`
The main HTML file that serves as the entry point for the React application.

#### `src/components/ProductCard.jsx`
A component for displaying individual product details, used on the main product listing page.

#### `src/components/Header.jsx`
This is the navigation bar, showing different links based on user roles.

#### `src/components/Footer.jsx`
A simple footer component displayed on all pages.

#### `src/screens/HomeScreen.jsx`
Displays all products available in the marketplace.

#### `src/screens/LoginScreen.jsx`
A form for users to log in.

#### `src/screens/RegisterScreen.jsx`
A form for new users to sign up.

#### `src/screens/ProductScreen.jsx`
Displays details for a single product, including an option for shoppers to purchase it.

#### `src/screens/AdminScreen.jsx`
Admin dashboard for managing users, including adding, deleting, and modifying user roles.

#### `src/screens/SellerScreen.jsx`
Seller dashboard for managing products, including adding, editing, and deleting products.

#### `src/store/index.js`
Configures the Redux store with slices for user, product, and auth management.

#### `src/store/productSlice.js`
Manages product-related state such as fetching products and managing inventory.

#### `src/store/authSlice.js`
Handles authentication (login and logout) state management.

#### `src/App.jsx`
Main App component where routes are set up for navigation between screens.

#### `src/main.jsx`
The entry point for the React application, rendering the App component.

#### `src/index.css`
Global styles for the application, using TailwindCSS for styling.

---

## ⚙️ Dependencies

### **Backend**
- `express`: Web framework for Node.js.
- `mongoose`: ODM for MongoDB.
- `jsonwebtoken`: For JWT authentication.
- `bcryptjs`: For hashing passwords.
- `dotenv`: To manage environment variables.

### **Frontend**
- `react`: Frontend library for building user interfaces.
- `redux`: State management.
- `redux-persist`: For persisting Redux state.
- `react-router-dom`: Client-side routing.
- `tailwindcss`: Utility-first CSS framework.

---
