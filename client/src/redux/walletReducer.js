// Redux reducer for wallet
const initialState = {
  balance: 0,
  currency: 'USD',
  transactions: [],
  transaction_count: 0,
  isLoading: false,
  error: null,
};

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'WALLET_FETCH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'WALLET_FETCH_SUCCESS':
      return {
        ...state,
        balance: action.payload.balance,
        currency: action.payload.currency,
        isLoading: false,
      };
    case 'WALLET_FETCH_FAILURE':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case 'WALLET_TRANSACTIONS_FETCH_SUCCESS':
      return {
        ...state,
        transactions: action.payload.transactions,
        transaction_count: action.payload.total,
      };
    case 'WALLET_UPDATE_BALANCE':
      return {
        ...state,
        balance: action.payload,
      };
    default:
      return state;
  }
};

export default walletReducer;
