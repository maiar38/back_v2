# ECOBAZAR Backend

A robust Node.js and Express.js REST API for an e-commerce platform specializing in fresh vegetables, fruits, and grocery products. This backend handles authentication, product management, shopping carts, order processing, and database operations.

## Project Overview

ECOBAZAR Backend serves as the core API for an online grocery marketplace. It provides secure endpoints for user authentication, product browsing, cart management, and order placement. The API is designed with scalability and security in mind, using JWT-based authentication and bcrypt password hashing.

## Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **dotenv** - Environment variable management
- **CORS** - Cross-Origin Resource Sharing

## Features

- ✅ User authentication (register, login, logout)
- ✅ JWT-based authorization
- ✅ Product management (browse, search, filter)
- ✅ Shopping cart operations (add, remove, update)
- ✅ Order management (create, track, history)
- ✅ Secure password handling with bcrypt
- ✅ MongoDB integration with Mongoose
- ✅ CORS support for frontend integration
- ✅ Error handling and validation
- ✅ Environment-based configuration

## Project Structure

```
back_v2/
├── config/
│   └── database.js
├── controllers/
│   ├── authController.js
│   ├── productController.js
│   ├── cartController.js
│   └── orderController.js
├── middleware/
│   ├── auth.js
│   └── errorHandler.js
├── models/
│   ├── User.js
│   ├── Product.js
│   ├── Cart.js
│   └── Order.js
├── routes/
│   ├── auth.js
│   ├── products.js
│   ├── cart.js
│   └── orders.js
├── utils/
│   ├── validators.js
│   └── helpers.js
├── .env.example
├── .gitignore
├── server.js
├── package.json
└── README.md
```

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Steps

1. **Clone the repository**

```bash
git clone https://github.com/maiar38/back_v2.git
cd back_v2
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
cp .env.example .env
```

4. **Configure your `.env` file** (see Environment Variables section)

5. **Start the server**

```bash
npm start
```

The server will run on `http://localhost:5000` (or your specified PORT)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecobazar

# JWT
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# CORS
CORS_ORIGIN=http://localhost:3000

# Email (optional, for notifications)
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# File Upload (optional)
MAX_FILE_SIZE=5242880
```

**Important:** Never commit your `.env` file. Add it to `.gitignore`.

## Running the Server

### Development Mode

```bash
npm run dev
```

Uses nodemon for automatic server restart on file changes.

### Production Mode

```bash
npm start
```

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |
| GET | `/api/auth/profile` | Get current user profile |

**Example:**

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"securepass","name":"John Doe"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"securepass"}'
```

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get product by ID |
| GET | `/api/products/category/:category` | Get products by category |
| POST | `/api/products` | Create product (admin) |
| PUT | `/api/products/:id` | Update product (admin) |
| DELETE | `/api/products/:id` | Delete product (admin) |

**Example:**

```bash
# Get all products
curl http://localhost:5000/api/products

# Get products by category
curl http://localhost:5000/api/products/category/vegetables

# Get single product
curl http://localhost:5000/api/products/507f1f77bcf86cd799439011
```

### Cart

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart` | Get user's cart |
| POST | `/api/cart/add` | Add item to cart |
| PUT | `/api/cart/update/:itemId` | Update cart item quantity |
| DELETE | `/api/cart/remove/:itemId` | Remove item from cart |
| DELETE | `/api/cart/clear` | Clear entire cart |

**Example:**

```bash
# Add item to cart (requires authentication)
curl -X POST http://localhost:5000/api/cart/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"productId":"507f1f77bcf86cd799439011","quantity":2}'

# Update cart item
curl -X PUT http://localhost:5000/api/cart/update/507f1f77bcf86cd799439012 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"quantity":5}'
```

### Orders

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/orders` | Get user's order history |
| GET | `/api/orders/:id` | Get order details |
| POST | `/api/orders/create` | Create new order |
| PUT | `/api/orders/:id/status` | Update order status (admin) |
| DELETE | `/api/orders/:id` | Cancel order |

**Example:**

```bash
# Create order
curl -X POST http://localhost:5000/api/orders/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"shippingAddress":"123 Main St","paymentMethod":"credit_card"}'

# Get order details
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  http://localhost:5000/api/orders/507f1f77bcf86cd799439013
```

## API Authentication

Protected routes require a JWT token in the Authorization header:

```bash
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  http://localhost:5000/api/cart
```

Token is returned after successful login.

## Future Improvements

- [ ] Add payment gateway integration (Stripe, PayPal)
- [ ] Implement email notifications for orders
- [ ] Add product reviews and ratings system
- [ ] Implement wishlist functionality
- [ ] Add inventory management
- [ ] Create admin dashboard endpoints
- [ ] Implement search and advanced filtering
- [ ] Add order tracking with real-time updates
- [ ] Implement user profile customization
- [ ] Add promotional codes and discounts
- [ ] Set up automated testing (Jest, Mocha)
- [ ] Deploy to production environment
- [ ] Implement caching with Redis
- [ ] Add API documentation with Swagger/OpenAPI

## Contributing

Contributions are welcome! Please follow these steps:

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues or questions, please open an issue on the repository or contact the development team.

---

**Last Updated:** May 2026  
**Maintained by:** ECOBAZAR Development Team
