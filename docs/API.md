# API Documentation

Complete API reference for FinTech Digital Wallet & Payment System.

## Base URL

```
http://localhost:5000/api
```

## Authentication

All authenticated endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## API Endpoints

### Authentication

#### Register
```
POST /auth/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "phone": "+1234567890",
  "password": "SecurePassword123!",
  "first_name": "John",
  "last_name": "Doe"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful",
  "user_id": "uuid",
  "token": "jwt_token"
}
```

#### Login
```
POST /auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token",
  "refresh_token": "refresh_token",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "first_name": "John"
  }
}
```

#### Setup 2FA
```
POST /auth/2fa/setup
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "method": "sms",
  "phone": "+1234567890"
}
```

#### Verify 2FA
```
POST /auth/2fa/verify
```

**Request Body:**
```json
{
  "user_id": "uuid",
  "code": "123456"
}
```

### Wallet

#### Get Balance
```
GET /wallet/balance
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "balance": 5000.00,
  "currency": "USD"
}
```

#### Get Transactions
```
GET /wallet/transactions?limit=10&offset=0
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "transactions": [
    {
      "id": "uuid",
      "type": "transfer",
      "amount": 100.00,
      "status": "completed",
      "created_at": "2026-07-04T10:00:00Z"
    }
  ],
  "total": 50
}
```

#### Deposit
```
POST /wallet/deposit
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "amount": 1000.00,
  "currency": "USD",
  "payment_method": "card"
}
```

### Transactions

#### Transfer Money (P2P)
```
POST /transactions/transfer
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "receiver_wallet_id": "uuid",
  "amount": 500.00,
  "description": "Payment for services",
  "reference": "REF123"
}
```

**Response:**
```json
{
  "success": true,
  "transaction_id": "uuid",
  "status": "completed"
}
```

#### Get Transaction History
```
GET /transactions/history?start_date=2026-07-01&end_date=2026-07-31
Authorization: Bearer <token>
```

#### Get Transaction Details
```
GET /transactions/:id
Authorization: Bearer <token>
```

### Payments

#### Stripe Checkout
```
POST /payments/stripe/checkout
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "amount": 1000.00,
  "currency": "usd",
  "success_url": "http://localhost:3000/success",
  "cancel_url": "http://localhost:3000/cancel"
}
```

#### Razorpay Checkout
```
POST /payments/razorpay/checkout
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "amount": 1000,
  "currency": "INR",
  "description": "Wallet Top-up"
}
```

### Fraud Detection

#### Get Fraud Alerts
```
GET /fraud/alerts?status=open
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "alerts": [
    {
      "id": "uuid",
      "type": "unusual_amount",
      "risk_score": 0.85,
      "description": "Large transaction detected",
      "status": "open"
    }
  ]
}
```

#### Report Fraud
```
POST /fraud/report
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "transaction_id": "uuid",
  "reason": "Unauthorized transaction",
  "description": "I did not make this payment"
}
```

### Analytics

#### Get Overview
```
GET /analytics/overview
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "total_transactions": 150,
  "total_spent": 50000.00,
  "average_transaction": 333.33,
  "month_over_month_change": 15.5
}
```

#### Get Spending Analytics
```
GET /analytics/spending?period=monthly
Authorization: Bearer <token>
```

#### Get Transaction Trends
```
GET /analytics/trends?days=30
Authorization: Bearer <token>
```

### Users

#### Get Profile
```
GET /users/profile
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "phone": "+1234567890",
    "first_name": "John",
    "last_name": "Doe",
    "kyc_status": "verified"
  }
}
```

#### Update Profile
```
PUT /users/profile
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "phone": "+1234567890"
}
```

#### Change Password
```
POST /users/change-password
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "current_password": "OldPassword123!",
  "new_password": "NewPassword123!"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": "Invalid request parameters",
  "details": {
    "email": "Invalid email format"
  }
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": "Unauthorized access",
  "message": "Invalid or expired token"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "error": "Access denied"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Internal server error",
  "request_id": "uuid"
}
```

## Rate Limiting

- 100 requests per 15 minutes per IP address
- Exceeding the limit returns 429 status code

## Status Codes

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Internal Server Error

## Pagination

For endpoints that return lists, use:
- `limit` - Number of items per page (default: 10, max: 100)
- `offset` - Number of items to skip (default: 0)

Example:
```
GET /transactions/history?limit=20&offset=40
```
