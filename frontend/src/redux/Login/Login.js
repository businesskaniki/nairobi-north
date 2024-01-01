import Cookies from 'js-cookie';


const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';


export const login = (userData) => ({
    type: LOGIN,
    payload: userData,
  });
  
  export const logout = () => ({
    type: LOGOUT,
  });

  const initialState = {
    loggedIn: Cookies.get('ac-tok-en'),
    userData: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN:
        return {
          ...state,
          loggedIn: true,
          userData: action.payload,
        };
      case LOGOUT:
        return {
          ...state,
          loggedIn: false,
          userData: null,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;