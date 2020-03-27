import {authHeader} from '../helpers/auth-header'

export const employeeService = {
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

    return fetch('https://localhost:5001/api/employee/', requestOptions).then(handleResponse);
  
}

function get(id)
{
    const requestOptions = {
        method:'GET',
        headers: authHeader()
      }

    return fetch('https://localhost:5001/api/employee/' + id , requestOptions).then(handleResponse);
  
}

function del(id)
{
    const requestOptions = {
        method:'DELETE',
        headers: authHeader()
      }

      return fetch("https://localhost:5001/api/employee/" + id,requestOptions);
       
}

function post(name,department,mail,doj)
{
    const requestOptions = {
        method: 'POST',
        headers: authHeader(), 
        body:JSON.stringify({
            name: name,
            department: department,
            mail: mail,
            doj: doj
        })
      }
      
      return fetch("https://localhost:5001/api/employee",requestOptions);
}

function put(id,name,department,mail,doj)
{
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(), 
        body:JSON.stringify({
          id:  id,  
          name: name,
          department: department,
          mail: mail,
          doj: doj
        })
      }
      
      return fetch("https://localhost:5001/api/employee",requestOptions);
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