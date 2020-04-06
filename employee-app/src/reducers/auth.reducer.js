let token = localStorage.getItem('token');
let auth = localStorage.getItem('auth');

const initialState = token ? { loggedIn: true, token } : {};
export function authentication(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                loggingIn: true,
                token: action.token,
            };
      
        case 'LOGOUT_SUCCESS':
            return {
                loggingIn: false,
                token: ''
            };
        default:
            return state
    }
}