import axios from 'axios';

export const userService = {
    login,
    logout
};

function login(username, password) {
 
    let data = {
        userid: username,
        accesskey: password
    };

    return axios.post('https://localhost:5001/api/login',  data )
        .then(response => {return response.data})
        .then(token => {
            if (token) {
                localStorage.setItem('token', JSON.stringify(token));
            }

            return token;
        });
}

function logout() {
    localStorage.removeItem('token');
}
