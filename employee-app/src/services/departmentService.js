import {authHeader} from '../helpers/auth-header'

export const departmentService = {
    getAll,
    get,
    del,
    post,
    put
};

function getAll() {

    const requestOptions = {
        method:'GET',
        headers: authHeader()
      }

    return fetch('https://localhost:5001/api/department/', requestOptions).then(handleResponse);
  
}

function get(depId)
{
    const requestOptions = {
        method:'GET',
        headers: authHeader()
      }

    return fetch('https://localhost:5001/api/department/' + depId , requestOptions).then(handleResponse);
  
}

function del(depId)
{
    const requestOptions = {
        method:'DELETE',
        headers: authHeader()
      }

      return fetch("https://localhost:5001/api/department/" + depId,requestOptions);
       
}


function post(nameDep)
{
    const requestOptions = {
        method: 'POST',
        headers: authHeader(), 
        body:JSON.stringify({
          name: nameDep
        })
      }
      
      return fetch("https://localhost:5001/api/department",requestOptions);
}

function put(depId, depName)
{
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(), 
        body:JSON.stringify({
          id:  depId,  
          name: depName
        })
      }
      
      return fetch("https://localhost:5001/api/department",requestOptions);
}


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                localStorage.removeItem('token');
                //location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}