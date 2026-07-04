# Setup Guide

Complete setup instructions for the FinTech Digital Wallet & Payment System.

## Prerequisites

- Node.js v16 or higher
- PostgreSQL 12 or higher
- Git
- npm or yarn

## Environment Setup

### 1. Clone the Repository

```bash
git clone https://github.com/abhishu1904/Fintech-digital-wallet-and-payment-system.git
cd Fintech-digital-wallet-and-payment-system
```

### 2. Database Setup

#### Create PostgreSQL Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE fintech_wallet;

# Exit psql
\q
```

#### Run Database Schema

```bash
# Connect to the database and run schema
psql -U postgres -d fintech_wallet -f database/schema.sql
```

### 3. Backend Setup

```bash
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your configuration
# Edit .env and add:
# - Database credentials
# - JWT secrets
# - Payment gateway keys (Stripe, Razorpay)
# - 2FA service credentials (Twilio)
# - Email service credentials (Mailgun)

# Start development server
npm run dev
```

The backend API will be available at `http://localhost:5000`

### 4. Frontend Setup

```bash
cd client

# Install dependencies
npm install

# Create .env file (if needed)
# Update API endpoint if different from default

# Start development server
npm start
```

The frontend will be available at `http://localhost:3000`

## Configuration

### Environment Variables

#### Backend (.env)

```
# Server
PORT=5000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=fintech_wallet
DB_USER=postgres
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d

# Payment Gateways
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

RAZORPAY_KEY_ID=...
RAZORPAY_KEY_SECRET=...

# 2FA
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...

# Email
MAILGUN_DOMAIN=...
MAILGUN_API_KEY=...
```

#### Frontend (.env.local)

```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_...
```

## Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

### Production Mode

**Backend:**
```bash
cd server
npm start
```

**Frontend:**
```bash
cd client
npm run build
npm start
```

## Testing

### Run Backend Tests

```bash
cd server
npm test
```

### Run Frontend Tests

```bash
cd client
npm test
```

## API Documentation

See [API.md](./API.md) for complete API documentation.

## Troubleshooting

### Database Connection Issues

- Ensure PostgreSQL is running
- Verify database credentials in .env
- Check if database `fintech_wallet` exists

### Port Already in Use

```bash
# For port 5000 (backend)
lsof -ti:5000 | xargs kill -9

# For port 3000 (frontend)
lsof -ti:3000 | xargs kill -9
```

### Dependencies Installation Issues

```bash
# Clear npm cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

1. Review [API documentation](./API.md)
2. Check [architecture documentation](./ARCHITECTURE.md)
3. Read the main [README.md](../README.md)

## Support

For issues or questions, please open a GitHub issue.
