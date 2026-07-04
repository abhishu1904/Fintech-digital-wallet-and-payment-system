import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default headers
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to request headers
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: (data) => apiClient.post('/auth/register', data),
  login: (data) => apiClient.post('/auth/login', data),
  logout: () => apiClient.post('/auth/logout'),
  setup2FA: (data) => apiClient.post('/auth/2fa/setup', data),
  verify2FA: (data) => apiClient.post('/auth/2fa/verify', data),
};

// Wallet API calls
export const walletAPI = {
  getBalance: () => apiClient.get('/wallet/balance'),
  getTransactions: (params) => apiClient.get('/wallet/transactions', { params }),
  deposit: (data) => apiClient.post('/wallet/deposit', data),
  withdraw: (data) => apiClient.post('/wallet/withdraw', data),
  getDetails: () => apiClient.get('/wallet/details'),
};

// Transaction API calls
export const transactionAPI = {
  transfer: (data) => apiClient.post('/transactions/transfer', data),
  getHistory: (params) => apiClient.get('/transactions/history', { params }),
  getDetails: (id) => apiClient.get(`/transactions/${id}`),
  billPay: (data) => apiClient.post('/transactions/bill-pay', data),
};

// Payment API calls
export const paymentAPI = {
  stripeCheckout: (data) => apiClient.post('/payments/stripe/checkout', data),
  razorpayCheckout: (data) => apiClient.post('/payments/razorpay/checkout', data),
  getPaymentStatus: (id) => apiClient.get(`/payments/status/${id}`),
};

// Fraud API calls
export const fraudAPI = {
  getAlerts: (params) => apiClient.get('/fraud/alerts', { params }),
  getAlertDetails: (id) => apiClient.get(`/fraud/alerts/${id}`),
  reportFraud: (data) => apiClient.post('/fraud/report', data),
  getRiskScore: (transactionId) => 
    apiClient.get(`/fraud/risk-score/${transactionId}`),
};

// Analytics API calls
export const analyticsAPI = {
  getOverview: () => apiClient.get('/analytics/overview'),
  getTransactionAnalytics: (params) => 
    apiClient.get('/analytics/transactions', { params }),
  getSpendingAnalytics: (params) => 
    apiClient.get('/analytics/spending', { params }),
  getTrends: (params) => apiClient.get('/analytics/trends', { params }),
  exportData: (params) => apiClient.get('/analytics/export', { params }),
};

// User API calls
export const userAPI = {
  getProfile: () => apiClient.get('/users/profile'),
  updateProfile: (data) => apiClient.put('/users/profile', data),
  changePassword: (data) => apiClient.post('/users/change-password', data),
  getBeneficiaries: () => apiClient.get('/users/beneficiaries'),
  addBeneficiary: (data) => apiClient.post('/users/beneficiaries', data),
};

export default apiClient;
