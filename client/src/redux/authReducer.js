// Redux reducers for authentication
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_LOGIN_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'AUTH_LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'AUTH_LOGIN_FAILURE':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case 'AUTH_LOGOUT':
      return initialState;
    case 'AUTH_REGISTER_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
      };
    default:
      return state;
  }
};

export default authReducer;
