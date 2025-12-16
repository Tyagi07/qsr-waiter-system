# QSR Waiter Order Management System

A production-ready REST API for Quick Service Restaurants (QSR) that enables waiters to manage tables, browse dynamic menus, and place/track orders efficiently.

---

## Overview

QSR Waiter Order Management System is a comprehensive backend solution for Quick Service Restaurants. It provides a secure REST API that allows waiters to:

- Login with secure JWT authentication
- Generate and validate QR-based access tokens
- Browse restaurant floors and manage table assignments
- View dynamic menu with categories and items
- Create, track, and update customer orders
- Manage order status through different stages

The system is built with modern architecture patterns, proper validation, comprehensive error handling, and production-ready code quality.

---

##  Features

### Authentication & Security
- **JWT-based Authentication**: Secure token-based access for all protected endpoints
- **QR Token System**: Time-limited QR tokens (15 minutes) for additional access control
- **Password Hashing**: Bcryptjs hashing for secure password storage
- **Role-based Access**: Waiters can only access their assigned data

### Restaurant Management
- **Multi-floor Support**: Manage multiple floors within the restaurant
- **Table Management**: Track table capacity, status, and waiter assignments
- **One Waiter per Table**: Business rule enforcement for better service
- **Table Status Tracking**: Automatic status updates (vacant/occupied)

### Menu System
- **Dynamic Menu Structure**: Organize items by categories
- **Item Availability**: Control which items are available for ordering
- **Price Management**: Detailed pricing for each menu item
- **Item Details**: Description and metadata for each menu item

### Order Management
- **Complete Order Lifecycle**: pending → confirmed → preparing → ready → served
- **Order Tracking**: Automatic order number generation and timestamping
- **Order Items**: Support for multiple items per order with quantities
- **Special Instructions**: Add special requests and notes to orders
- **Automatic Calculations**: Total amount auto-calculated from items

### Code Quality
- **TypeScript**: Full type safety throughout the application
- **Clean Architecture**: Services, Repositories, Controllers pattern
- **Input Validation**: Zod schema validation on all endpoints
- **Error Handling**: Comprehensive error handling with meaningful messages
- **Scalable Design**: Modular code structure for easy maintenance

---

##  Tech Stack

| Category | Technology |
|----------|-----------|
| **Runtime** | Node.js 18+ |
| **Language** | TypeScript 5.3+ |
| **Framework** | Express.js 4.18+ |
| **Database** | PostgreSQL 12+ |
| **ORM** | Prisma 5.8.0 |
| **Authentication** | JWT (jsonwebtoken) |
| **Password Security** | Bcryptjs |
| **Validation** | Zod |
| **Development** | ts-node, Nodemon |

---

## Prerequisites

Before you begin, ensure you have installed:

1. **Node.js** (v18 or higher)
   - Download from: https://nodejs.org
   - Verify: `node --version`

2. **PostgreSQL** (v12 or higher)
   - Download from: https://www.postgresql.org/download
   - Verify: `psql --version`

3. **npm** (comes with Node.js)
   - Verify: `npm --version`

4. **Git** (for version control)
   - Download from: https://git-scm.com
   - Verify: `git --version`

---

## Installation

### Step 1: Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/qsr-waiter-system.git
cd qsr-waiter-system
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:
- Express.js and related packages
- Prisma ORM and client
- JWT and authentication packages
- Zod validation library
- TypeScript and development tools

### Step 3: Create PostgreSQL Database

```bash
# Create database
createdb qsr_db

# Verify (optional)
psql -l | grep qsr_db
```

### Step 4: Setup Environment Variables

```bash
# Copy example file
cp .env.example .env

# Edit .env with your database credentials
# Edit .env file and update if needed:
DATABASE_URL="postgresql://postgres@localhost:5432/qsr_db"
NODE_ENV="development"
JWT_SECRET="super_secret_jwt_key_change_in_production"
JWT_EXPIRY="24h"
QR_TOKEN_EXPIRY=900
PORT=3000
```

### Step 5: Run Prisma Migrations

```bash
npx prisma migrate dev --name init
```

This will:
- Create all database tables
- Create migrations folder
- Generate Prisma Client

### Step 6: Seed Test Data

```bash
npm run seed
```

This will populate the database with:
- 3 Floors (Ground, First, Second)
- 10 Tables across all floors
- 3 Test Waiters
- 5 Menu Categories
- 17 Menu Items

### Step 7: Start Development Server

```bash
npm run dev
```

You should see:
```
 Database connected successfully
 Server running on http://localhost:3000
```

---

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database Configuration
DATABASE_URL="postgresql://postgres@localhost:5432/qsr_db"

# Application Environment
NODE_ENV="development"

# JWT Configuration
JWT_SECRET="your_super_secret_key_change_in_production"
JWT_EXPIRY="24h"

# QR Token Configuration (in seconds)
QR_TOKEN_EXPIRY=900

# Server Port
PORT=3000
```

### Important Notes

- **JWT_SECRET**: Change this in production! Generate a strong random string
- **DATABASE_URL**: Update if your PostgreSQL credentials are different
- **QR_TOKEN_EXPIRY**: 900 seconds = 15 minutes

---

##  Running the Application

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
# Build
npm run build

# Start
npm run start
```

### Other Useful Commands

```bash
# Open Prisma Studio (Database GUI)
npm run studio

# Run migrations
npm run migrate

# Seed database again
npm run seed
```

---

## API Documentation

### Base URL

```
http://localhost:3000
```

### Authentication

All endpoints (except login, register, validate-qr) require JWT token in header:

```
Authorization: Bearer <YOUR_JWT_TOKEN>
```

### Response Format

All responses follow a consistent format:

**Success Response:**
```json
{
  "success": true,
  "message": "Operation successful",
  "statusCode": 200,
  "data": { /* actual data */ }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description",
  "statusCode": 400
}
```

---

## Authentication Endpoints

### 1. Register Waiter

**POST** `/api/auth/register`

Register a new waiter account.

**Request Body:**
```json
{
  "username": "john_waiter",
  "email": "john@restaurant.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Smith",
  "phoneNumber": "+91-9876543210"
}
```

**Response:** 201 Created
```json
{
  "success": true,
  "message": "Waiter registered successfully",
  "statusCode": 201,
  "data": {
    "id": "clyfq2eqs0000lf08ylk9a0p0",
    "username": "john_waiter",
    "email": "john@restaurant.com",
    "firstName": "John",
    "lastName": "Smith"
  }
}
```

---

### 2. Login

**POST** `/api/auth/login`

Login with username and password to get JWT token.

**Request Body:**
```json
{
  "username": "john_waiter",
  "password": "password123"
}
```

**Response:** 200 OK
```json
{
  "success": true,
  "message": "Login successful",
  "statusCode": 200,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "waiter": {
      "id": "clyfq2eqs0000lf08ylk9a0p0",
      "username": "john_waiter",
      "email": "john@restaurant.com",
      "firstName": "John",
      "lastName": "Smith"
    }
  }
}
```

---

### 3. Generate QR Token

**POST** `/api/auth/generate-qr`

Generate a QR token for alternative access (15 minutes validity).

**Headers:**
```
Authorization: Bearer <TOKEN>
```

**Response:** 200 OK
```json
{
  "success": true,
  "message": "QR token generated",
  "statusCode": 200,
  "data": {
    "qrToken": "550e8400-e29b-41d4-a716-446655440000",
    "expiresAt": "2025-12-15T23:00:00.000Z"
  }
}
```

---

### 4. Validate QR Token

**POST** `/api/auth/validate-qr`

Validate a QR token for access.

**Request Body:**
```json
{
  "qrToken": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Response:** 200 OK
```json
{
  "success": true,
  "message": "QR token validated",
  "statusCode": 200,
  "data": {
    "waiterId": "clyfq2eqs0000lf08ylk9a0p0"
  }
}
```

---

## Waiter Endpoints

### 5. Get Waiter Profile

**GET** `/api/waiters/profile`

Get the current waiter's profile information.

**Headers:**
```
Authorization: Bearer <TOKEN>
```

**Response:** 200 OK
```json
{
  "success": true,
  "message": "Profile fetched",
  "statusCode": 200,
  "data": {
    "id": "clyfq2eqs0000lf08ylk9a0p0",
    "username": "john_waiter",
    "email": "john@restaurant.com",
    "firstName": "John",
    "lastName": "Smith",
    "phoneNumber": "+91-9876543210",
    "isActive": true,
    "assignedTable": null,
    "orders": []
  }
}
```

---

### 6. Get All Active Waiters

**GET** `/api/waiters/active`

Get list of all active waiters in the system.

**Headers:**
```
Authorization: Bearer <TOKEN>
```

**Response:** 200 OK
```json
{
  "success": true,
  "message": "Waiters fetched",
  "statusCode": 200,
  "data": [
    {
      "id": "clyfq2eqs0000lf08ylk9a0p0",
      "username": "john_waiter",
      "firstName": "John",
      "lastName": "Smith",
      "email": "john@restaurant.com",
      "assignedTable": null,
      "createdAt": "2025-12-15T..."
    }
  ]
}
```

---

## Floor Endpoints

### 7. Get All Floors

**GET** `/api/floors`

Get all floors with their tables.

**Headers:**
```
Authorization: Bearer <TOKEN>
```

**Response:** 200 OK
```json
{
  "success": true,
  "message": "Floors fetched",
  "statusCode": 200,
  "data": [
    {
      "id": "clyfq2eqs0001lf08ylk9a0p0",
      "floorName": "Ground Floor",
      "floorNumber": 1,
      "isActive": true,
      "tables": [
        {
          "id": "clyfq2eqs0002lf08ylk9a0p0",
          "tableNumber": "G-01",
          "capacity": 2,
          "status": "vacant",
          "floorId": "clyfq2eqs0001lf08ylk9a0p0"
        }
      ]
    }
  ]
}
```

---

### 8. Get Floor by ID

**GET** `/api/floors/:id`

Get a specific floor with all its tables.

**Headers:**
```
Authorization: Bearer <TOKEN>
```

**Response:** 200 OK
```json
{
  "success": true,
  "message": "Floor fetched",
  "statusCode": 200,
  "data": {
    "id": "clyfq2eqs0001lf08ylk9a0p0",
    "floorName": "Ground Floor",
    "floorNumber": 1,
    "tables": [
      {
        "id": "clyfq2eqs0002lf08ylk9a0p0",
        "tableNumber": "G-01",
        "capacity": 2,
        "status": "vacant"
      }
    ]
  }
}
```

---

##  Table Endpoints

### 9. Get Tables by Floor

**GET** `/api/tables/floor/:floorId`

Get all tables in a specific floor.

**Headers:**
```
Authorization: Bearer <TOKEN>
```

**Response:** 200 OK
```json
{
  "success": true,
  "message": "Tables fetched",
  "statusCode": 200,
  "data": [
    {
      "id": "clyfq2eqs0002lf08ylk9a0p0",
      "tableNumber": "G-01",
      "capacity": 2,
      "status": "vacant",
      "floorId": "clyfq2eqs0001lf08ylk9a0p0",
      "assignedWaiterId": null,
      "floor": {
        "id": "clyfq2eqs0001lf08ylk9a0p0",
        "floorName": "Ground Floor",
        "floorNumber": 1
      }
    }
  ]
}
```

---

### 10. Assign Table to Waiter

**POST** `/api/tables/:tableId/assign`

Assign a table to the current waiter.

**Headers:**
```
Authorization: Bearer <TOKEN>
```

**Response:** 200 OK
```json
{
  "success": true,
  "message": "Table assigned",
  "statusCode": 200,
  "data": {
    "id": "clyfq2eqs0002lf08ylk9a0p0",
    "tableNumber": "G-01",
    "capacity": 2,
    "status": "occupied",
    "assignedWaiterId": "clyfq2eqs0000lf08ylk9a0p0",
    "assignedWaiter": {
      "id": "clyfq2eqs0000lf08ylk9a0p0",
      "username": "john_waiter",
      "firstName": "John",
      "lastName": "Smith"
    }
  }
}
```

---

## 🍽️ Menu Endpoints

### 11. Get All Menu Categories

**GET** `/api/menu/categories`

Get all menu categories with their items.

**Headers:**
```
Authorization: Bearer <TOKEN>
```

**Response:** 200 OK
```json
{
  "success": true,
  "message": "Categories fetched",
  "statusCode": 200,
  "data": [
    {
      "id": "clyfq2eqs0010lf08ylk9a0p0",
      "name": "Appetizers",
      "description": "Starters and small bites",
      "isActive": true,
      "items": [
        {
          "id": "clyfq2eqs0011lf08ylk9a0p0",
          "name": "Paneer Tikka",
          "description": "Grilled paneer cubes with spices",
          "price": 250,
          "isAvailable": true
        }
      ]
    }
  ]
}
```

---

### 12. Get Items by Category

**GET** `/api/menu/categories/:categoryId/items`

Get all items in a specific category.

**Headers:**
```
Authorization: Bearer <TOKEN>
```

**Response:** 200 OK
```json
{
  "success": true,
  "message": "Items fetched",
  "statusCode": 200,
  "data": [
    {
      "id": "clyfq2eqs0011lf08ylk9a0p0",
      "name": "Paneer Tikka",
      "description": "Grilled paneer cubes with spices",
      "price": 250,
      "isAvailable": true,
      "categoryId": "clyfq2eqs0010lf08ylk9a0p0"
    }
  ]
}
```

---

### 13. Get Menu Item Details

**GET** `/api/menu/items/:itemId`

Get detailed information about a specific menu item.

**Headers:**
```
Authorization: Bearer <TOKEN>
```

**Response:** 200 OK
```json
{
  "success": true,
  "message": "Item fetched",
  "statusCode": 200,
  "data": {
    "id": "clyfq2eqs0011lf08ylk9a0p0",
    "name": "Paneer Tikka",
    "description": "Grilled paneer cubes with spices",
    "price": 250,
    "isAvailable": true,
    "imageUrl": null,
    "categoryId": "clyfq2eqs0010lf08ylk9a0p0",
    "category": {
      "id": "clyfq2eqs0010lf08ylk9a0p0",
      "name": "Appetizers"
    }
  }
}
```

---

## 📦 Order Endpoints

### 14. Create Order

**POST** `/api/orders`

Create a new order for an assigned table.

**Headers:**
```
Authorization: Bearer <TOKEN>
Content-Type: application/json
```

**Request Body:**
```json
{
  "tableId": "clyfq2eqs0002lf08ylk9a0p0",
  "items": [
    {
      "menuItemId": "clyfq2eqs0011lf08ylk9a0p0",
      "quantity": 2,
      "instructions": "Less spicy"
    },
    {
      "menuItemId": "clyfq2eqs0012lf08ylk9a0p0",
      "quantity": 1,
      "instructions": "Extra salt"
    }
  ],
  "specialInstructions": "No onions on items"
}
```

**Response:** 201 Created
```json
{
  "success": true,
  "message": "Order created",
  "statusCode": 201,
  "data": {
    "id": "clyfq2eqs0020lf08ylk9a0p0",
    "orderNumber": "ORD-1734290000",
    "status": "pending",
    "totalAmount": 600,
    "specialInstructions": "No onions on items",
    "tableId": "clyfq2eqs0002lf08ylk9a0p0",
    "waiterId": "clyfq2eqs0000lf08ylk9a0p0",
    "items": [
      {
        "id": "clyfq2eqs0021lf08ylk9a0p0",
        "quantity": 2,
        "unitPrice": 250,
        "totalPrice": 500,
        "instructions": "Less spicy",
        "menuItem": {
          "id": "clyfq2eqs0011lf08ylk9a0p0",
          "name": "Paneer Tikka",
          "price": 250
        }
      }
    ],
    "createdAt": "2025-12-15T22:30:00.000Z"
  }
}
```

---

### 15. Get Order Details

**GET** `/api/orders/:id`

Get detailed information about a specific order.

**Headers:**
```
Authorization: Bearer <TOKEN>
```

**Response:** 200 OK
```json
{
  "success": true,
  "message": "Order fetched",
  "statusCode": 200,
  "data": {
    "id": "clyfq2eqs0020lf08ylk9a0p0",
    "orderNumber": "ORD-1734290000",
    "status": "pending",
    "totalAmount": 600,
    "items": [
      {
        "id": "clyfq2eqs0021lf08ylk9a0p0",
        "quantity": 2,
        "unitPrice": 250,
        "totalPrice": 500,
        "menuItem": {
          "id": "clyfq2eqs0011lf08ylk9a0p0",
          "name": "Paneer Tikka"
        }
      }
    ]
  }
}
```

---

### 16. Get Table Order History

**GET** `/api/orders/table/:tableId`

Get all orders for a specific table.

**Headers:**
```
Authorization: Bearer <TOKEN>
```

**Response:** 200 OK
```json
{
  "success": true,
  "message": "Orders fetched",
  "statusCode": 200,
  "data": [
    {
      "id": "clyfq2eqs0020lf08ylk9a0p0",
      "orderNumber": "ORD-1734290000",
      "status": "pending",
      "totalAmount": 600,
      "createdAt": "2025-12-15T22:30:00.000Z"
    }
  ]
}
```

---

### 17. Update Order Status

**PATCH** `/api/orders/:id/status`

Update the status of an order. Valid statuses: pending, confirmed, preparing, ready, served.

**Headers:**
```
Authorization: Bearer <TOKEN>
Content-Type: application/json
```

**Request Body:**
```json
{
  "status": "confirmed"
}
```

**Response:** 200 OK
```json
{
  "success": true,
  "message": "Order status updated",
  "statusCode": 200,
  "data": {
    "id": "clyfq2eqs0020lf08ylk9a0p0",
    "orderNumber": "ORD-1734290000",
    "status": "confirmed",
    "totalAmount": 600,
    "updatedAt": "2025-12-15T22:35:00.000Z"
  }
}
```

---

## Postman Testing Guide

### Setup

1. **Open Postman**
2. **Click "Import"** button (top-left)
3. **Paste JSON** from `QSR - Postman API Collection`
4. **Click Import** to add all endpoints

### Test Flow (Sequential)

Follow this order for testing:

#### Test 1: Health Check
```
GET http://localhost:3000/health
```
Expected: 200 OK with status "OK"

#### Test 2: Login
```
POST http://localhost:3000/api/auth/login
Body: {"username": "john_waiter", "password": "password123"}
```
Expected: 200 OK with JWT token
**ACTION:** Copy token and save it

#### Test 3: Get Floors
```
GET http://localhost:3000/api/floors
Header: Authorization: Bearer <TOKEN>
```
Expected: 200 OK with 3 floors
**ACTION:** Copy a table ID from response

#### Test 4: Get Menu Categories
```
GET http://localhost:3000/api/menu/categories
Header: Authorization: Bearer <TOKEN>
```
Expected: 200 OK with 5 categories
**ACTION:** Copy a menu item ID from response

#### Test 5: Get Waiter Profile
```
GET http://localhost:3000/api/waiters/profile
Header: Authorization: Bearer <TOKEN>
```
Expected: 200 OK with waiter details

#### Test 6: Assign Table
```
POST http://localhost:3000/api/tables/<TABLE_ID>/assign
Header: Authorization: Bearer <TOKEN>
Body: {}
```
Expected: 200 OK with assigned table

#### Test 7: Create Order
```
POST http://localhost:3000/api/orders
Header: Authorization: Bearer <TOKEN>
Body: {
  "tableId": "<TABLE_ID>",
  "items": [{"menuItemId": "<ITEM_ID>", "quantity": 2}]
}
```
Expected: 201 Created with order details
**ACTION:** Copy order ID from response

#### Test 8: Update Order Status
```
PATCH http://localhost:3000/api/orders/<ORDER_ID>/status
Header: Authorization: Bearer <TOKEN>
Body: {"status": "confirmed"}
```
Expected: 200 OK with updated status

---

## Database Schema

### Tables

**Waiter**
- id, username, email, password, firstName, lastName, phoneNumber, isActive, createdAt, updatedAt

**Floor**
- id, floorName, floorNumber, isActive, createdAt, updatedAt

**Table**
- id, tableNumber, capacity, status, floorId, assignedWaiterId, createdAt, updatedAt

**MenuCategory**
- id, name, description, isActive, createdAt, updatedAt

**MenuItem**
- id, name, description, price, isAvailable, imageUrl, categoryId, createdAt, updatedAt

**Order**
- id, orderNumber, status, totalAmount, specialInstructions, tableId, waiterId, createdAt, updatedAt

**OrderItem**
- id, quantity, unitPrice, totalPrice, instructions, orderId, menuItemId, createdAt, updatedAt

**QRToken**
- id, token, waiterId, expiresAt, isUsed, usedAt, createdAt

---

## Project Structure

```
qsr-waiter-system/
├── src/
│   ├── controllers/          # HTTP request handlers
│   │   ├── authController.ts
│   │   ├── waiterController.ts
│   │   ├── floorController.ts
│   │   ├── tableController.ts
│   │   ├── menuController.ts
│   │   └── orderController.ts
│   │
│   ├── services/             # Business logic layer
│   │   ├── authService.ts
│   │   ├── waiterService.ts
│   │   ├── floorService.ts
│   │   ├── tableService.ts
│   │   ├── menuService.ts
│   │   └── orderService.ts
│   │
│   ├── repositories/         # Data access layer
│   │   ├── waiterRepository.ts
│   │   ├── floorRepository.ts
│   │   ├── tableRepository.ts
│   │   ├── menuRepository.ts
│   │   ├── orderRepository.ts
│   │   └── qrTokenRepository.ts
│   │
│   ├── middleware/           # Custom middleware
│   │   ├── authMiddleware.ts
│   │   └── errorHandler.ts
│   │
│   ├── routes/               # API route definitions
│   │   ├── authRoutes.ts
│   │   ├── waiterRoutes.ts
│   │   ├── floorRoutes.ts
│   │   ├── tableRoutes.ts
│   │   ├── menuRoutes.ts
│   │   ├── orderRoutes.ts
│   │   └── index.ts
│   │
│   ├── schemas/              # Validation schemas
│   │   └── validationSchemas.ts
│   │
│   ├── types/                # TypeScript interfaces
│   │   └── index.ts
│   │
│   ├── utils/                # Utility functions
│   │   └── errorHandler.ts
│   │
│   ├── app.ts               # Express app setup
│   └── server.ts            # Server entry point
│
├── prisma/
│   ├── schema.prisma        # Database schema
│   ├── seed.ts              # Test data seeding
│   └── migrations/          # Database migrations
│
├── .env                     # Environment variables
├── .env.example             # Environment template
├── .gitignore               # Git ignore rules
├── tsconfig.json            # TypeScript config
├── package.json             # Dependencies
├── README.md                # This file
└── .git/                    # Git repository
```

---

## Test Credentials

Use these credentials to test the API:

| Username | Password | Email |
|----------|----------|-------|
| john_waiter | password123 | john@restaurant.com |
| priya_waiter | password123 | priya@restaurant.com |
| raj_waiter | password123 | raj@restaurant.com |

---

## Seed Data

After running `npm run seed`, the database contains:

- **3 Floors**: Ground Floor, First Floor, Second Floor
- **10 Tables**: Tables G-01 to G-05, F1-01 to F1-03, F2-01 to F2-02
- **3 Waiters**: john_waiter, priya_waiter, raj_waiter
- **5 Menu Categories**: Appetizers, Main Course, Desserts, Beverages, Breads
- **17 Menu Items**: Various food items with prices ranging from ₹30 to ₹450

---

## Troubleshooting

### Issue: "Database connection error"

**Solution:**
```bash
# Check PostgreSQL is running
psql --version

# Verify database exists
psql -l | grep qsr_db

# Check .env DATABASE_URL
cat .env | grep DATABASE_URL
```

### Issue: "Port 3000 already in use"

**Solution:**
```powershell
# Find process on port 3000
netstat -ano | findstr :3000

# Kill it
taskkill /PID <PID_NUMBER> /F

# Or change port in .env
PORT=3001
```

### Issue: "JWT token expired"

**Solution:**
- Run TEST 2 (Login) again to get a fresh token
- Tokens expire after 24 hours (configurable in .env)

### Issue: "Table not found" when creating order

**Solution:**
- Ensure you assigned a table first (TEST 6)
- Use the correct table ID in order creation

### Issue: "Cannot find Prisma Client"

**Solution:**
```bash
# Regenerate Prisma Client
npx prisma generate

# Reinstall dependencies
rm -rf node_modules
npm install
```

---

## 🔗 Useful Commands

```bash
# Development
npm run dev              # Start development server
npm run build           # Build TypeScript to JavaScript
npm run start           # Run production build
npm run migrate         # Run database migrations
npm run seed            # Seed database with test data
npm run studio          # Open Prisma Studio (database UI)
```

---

## API Statistics

- **Total Endpoints**: 17
- **Authentication Endpoints**: 4
- **Waiter Endpoints**: 2
- **Floor Endpoints**: 2
- **Table Endpoints**: 2
- **Menu Endpoints**: 3
- **Order Endpoints**: 4
- **Response Format**: Consistent JSON
- **Error Handling**: Comprehensive with meaningful messages

---

## Key Achievements

✅ **Production-Ready Code**: Enterprise-level architecture
✅ **Complete API**: All business requirements implemented
✅ **Secure Authentication**: JWT tokens with QR validation
✅ **Type Safety**: Full TypeScript implementation
✅ **Input Validation**: Zod schema validation
✅ **Error Handling**: Comprehensive error responses
✅ **Clean Architecture**: Services, Repositories, Controllers
✅ **Database**: Normalized schema with Prisma ORM
✅ **Documentation**: Complete API documentation
✅ **Test Data**: Ready-to-use seed data

---

## Business Rules Implemented

1. **One Waiter per Table**: Enforced at database level
2. **Waiter Data Isolation**: Can only access own assignments
3. **Table Status Management**: Automatic vacant/occupied tracking
4. **Menu Availability**: Control over item availability
5. **Order Lifecycle**: Proper status progression (pending → confirmed → preparing → ready → served)
6. **QR Token Expiry**: 15-minute time limit on QR tokens
7. **Password Security**: Bcryptjs hashing for all passwords
8. **Referential Integrity**: Proper foreign key constraints

---






---

**Built with ❤️ for Quick Service Restaurants**
