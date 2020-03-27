export const userService = {
    login,
    logout
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userid: username, accesskey: password })
    };

    return fetch('https://localhost:5001/api/login', requestOptions)
        .then(handleResponse)
        .then(token => {
            if (token) {
                localStorage.setItem('token', JSON.stringify(token));
            }

            return token;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
}


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                //location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}