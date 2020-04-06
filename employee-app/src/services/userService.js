import axios from 'axios';

export const userService = {
    login,
    logout
};


const instance = axios.create({
    baseURL: 'https://localhost:5001/api'
  });
 //instance.defaults.headers = authHeader();

function login(username, password) {
 
    let data = {
        userid: username,
        accesskey: password
    };

    return instance.post('/login',data).then((response)=>{
        return response;
    });
     
}

function logout() {
    localStorage.removeItem('token');
}
