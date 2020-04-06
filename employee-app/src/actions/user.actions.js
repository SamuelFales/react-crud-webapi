import { userService } from '../services/userService';
 import { history } from '../helpers/history'
 
export const userActions = {
    login,
    logout
};

function login(username, password){
    return dispatch => {
       userService.login(username, password)
       .then((response)=>{
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            history.push('/home');
            dispatch(setUserDetails(response.data));
        }
    })
    };
}
function logout(){
    return dispatch => {
        localStorage.removeItem('token');
        dispatch(logoutUser());
        history.push('/login');
    }
}
export function setUserDetails(user){
      return{
          type: "LOGIN_SUCCESS",
          token: user.token
      }
}
export function logoutUser(){
      return{
          type: "LOGOUT_SUCCESS",
          token: ''
      }
}