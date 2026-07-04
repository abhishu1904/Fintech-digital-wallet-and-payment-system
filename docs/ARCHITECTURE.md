# System Architecture

High-level overview of the FinTech Digital Wallet & Payment System architecture.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client Layer                              │
│                    React.js Frontend App                         │
│   (Dashboard, Wallet, Transactions, Analytics, Settings)        │
└────────────────────────┬──────────────────────────────────────┘
                         │ HTTP/REST API
                         │ JWT Authentication
                         │
┌────────────────────────▼──────────────────────────────────────┐
│                     API Gateway Layer                           │
│                  Express.js Server (Node.js)                    │
│  (Rate Limiting, CORS, Request Validation, Error Handling)     │
└────────────────────────┬──────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│   Auth       │ │  Wallet      │ │ Transaction  │
│ Controller   │ │ Controller   │ │ Controller   │
└──────────────┘ └──────────────┘ └──────────────┘
        │                │                │
        ▼                ▼                ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│   Auth       │ │  Wallet      │ │ Transaction  │
│ Service      │ │ Service      │ │ Service      │
└──────────────┘ └──────────────┘ └──────────────┘
        │                │                │
        └────────────────┼────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
┌──────────────────────────────────────────────┐
│         Data Access Layer (DAL)              │
│    Database Queries & ORM (if applicable)    │
└──────────────────────────────────────────────┘
        │
        ▼
┌──────────────────────────────────────────────┐
│         PostgreSQL Database                   │
│  (Users, Wallets, Transactions, Fraud)       │
└──────────────────────────────────────────────┘
```

## Key Components

### Frontend (React.js)

**Directory Structure:**
```
client/
├── public/
├── src/
│   ├── components/          # Reusable React components
│   ├── pages/              # Page components (Dashboard, Wallet, etc)
│   ├── redux/              # Redux store, actions, reducers
│   ├── services/           # API services
│   ├── utils/              # Helper functions
│   ├── styles/             # CSS/Tailwind styles
│   ├── App.js              # Root component
│   └── index.js            # Entry point
└── package.json
```

**Key Features:**
- Redux state management
- Responsive UI with Tailwind CSS
- Real-time notifications with React Hot Toast
- Chart visualization with Recharts
- Secure authentication with JWT

### Backend (Node.js/Express.js)

**Directory Structure:**
```
server/
├── config/                 # Database & service configurations
├── controllers/            # Request handlers
├── models/                 # Data models
├── routes/                 # API route definitions
├── middleware/             # Custom middleware (Auth, Validation)
├── services/               # Business logic
├── utils/                  # Helper functions
├── server.js               # Entry point
└── package.json
```

**Key Middleware:**
- Authentication (JWT verification)
- Input validation
- Error handling
- Rate limiting
- CORS

### Database (PostgreSQL)

**Core Tables:**
- `users` - User accounts and profiles
- `wallets` - User wallets with balance tracking
- `transactions` - Transaction records
- `fraud_alerts` - Fraud detection records
- `payment_gateway_configs` - Payment method storage
- `two_fa_sessions` - 2FA verification records
- `beneficiaries` - Saved beneficiary information
- `audit_logs` - System audit trail

## Data Flow

### User Registration Flow
```
1. User submits registration form
2. Frontend validates input
3. API receives request
4. Password hashed with bcryptjs
5. User record created in database
6. Wallet automatically created
7. JWT token generated
8. Token sent to frontend
9. User redirected to dashboard
```

### Transaction Flow
```
1. User initiates transfer
2. Frontend validates transaction details
3. API receives transfer request
4. Sender & receiver wallets verified
5. Fraud detection algorithm runs
6. If fraud detected, alert created
7. Transaction marked as pending
8. Balances updated (atomic operation)
9. Transaction marked as completed
10. Notifications sent to both parties
11. Response sent to frontend
```

### Payment Gateway Flow
```
1. User requests deposit/withdrawal
2. Frontend redirects to Stripe/Razorpay
3. Payment gateway processes payment
4. Webhook received from payment gateway
5. Transaction verified
6. Wallet balance updated
7. User notified
```

## Security Architecture

### Authentication & Authorization
- JWT-based stateless authentication
- Refresh tokens for session management
- Role-based access control (if applicable)

### Data Security
- Passwords hashed with bcryptjs
- Sensitive data encrypted at rest
- HTTPS/TLS for data in transit
- SQL injection prevention via parameterized queries

### Fraud Detection
- Transaction amount anomaly detection
- Geographic location analysis
- Velocity checking (multiple transactions)
- Machine learning model integration (future)

### Compliance
- KYC (Know Your Customer) verification
- AML (Anti-Money Laundering) checks
- Audit logging for all transactions
- GDPR compliance features

## Scalability Considerations

### Horizontal Scaling
- Stateless API servers (can be replicated)
- Database connection pooling
- Load balancing

### Caching
- Redis for session management
- API response caching
- Database query caching

### Performance Optimization
- Database indexing on frequently queried fields
- Pagination for large datasets
- Async processing for heavy operations
- CDN for static assets

## External Integrations

### Payment Gateways
- **Stripe**: Credit/debit card payments
- **Razorpay**: Alternative payment processor

### Communication Services
- **Twilio**: SMS for 2FA
- **Mailgun**: Email notifications

### Monitoring & Logging
- Winston for structured logging
- Error tracking (Sentry - optional)
- Performance monitoring

## Deployment Architecture

```
┌─────────────────────┐
│   GitHub Repository │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   CI/CD Pipeline    │
│   (GitHub Actions)  │
└──────────┬──────────┘
           │
    ┌──────┴──────┐
    ▼             ▼
┌────────┐   ┌──────────┐
│Frontend│   │ Backend  │
│(Docker)│   │ (Docker) │
└────┬───┘   └────┬─────┘
     │            │
     └──────┬─────┘
            ▼
     ┌─────────────┐
     │Docker Compose
     │    or K8s   │
     └─────────────┘
```

## Environment Configurations

### Development
- Local PostgreSQL
- Mock payment gateways
- Debug logging
- Hot reloading

### Staging
- Staging database
- Sandbox payment gateways
- Comprehensive logging
- Performance testing

### Production
- Production database with backups
- Live payment gateways
- Error tracking
- Monitoring & alerting

## Future Enhancements

1. **Microservices Architecture**: Split into independent services
2. **Machine Learning**: Advanced fraud detection
3. **Blockchain Integration**: Cryptocurrency support
4. **Mobile Apps**: Native iOS/Android applications
5. **Real-time Updates**: WebSocket integration for live updates
6. **API Versioning**: V2, V3 endpoints for backward compatibility
