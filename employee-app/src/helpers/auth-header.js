export function authHeader() {
    // return authorization header with basic auth credentials
    let token = localStorage.getItem('token');
    if (token) {
        return ({  
            'Accept': 'application/json',
            'Content-Type':'application/json',
            'Authorization': 'Bearer ' +  token });
    } else {
        return {};
    }
}