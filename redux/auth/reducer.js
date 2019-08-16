import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_ERROR,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_ERROR,
  LOGOUT_USER,
  CHECK_AUTH,
  STORE_USER,
} from "../../constants/actionTypes";

const INIT_STATE = {
  user: null,
};


const merge = (state, newState) => {
  return Object.assign({}, state, newState)
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loading: true };
    case LOGIN_USER_SUCCESS:
      //notify.success('Login Success');
      return { ...state, authenticated: true, loading: false, user: action.payload };
    case REGISTER_USER:
      return { ...state, loading: true };
    case REGISTER_USER_SUCCESS:
      //notify.success('Register User Success');
      return { ...state, authenticated: true, loading: false, user: action.payload };
    case LOGOUT_USER:
      return { ...state, user: null, authenticated: false, access_token: null };
    case CHECK_AUTH:
      return state;
    case STORE_USER:
		  return merge(state, { user: action.payload, authenticated: true} );
    case LOGIN_ERROR:
      return merge(state, { errors, loading: false } );
    case REGISTER_ERROR:
      return merge(state, { errors, loading: false } );
    default:
      return { ...state };
  }
};
