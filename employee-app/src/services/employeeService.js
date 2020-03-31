import {authHeader} from '../helpers/auth-header'
import axios from 'axios';

export const employeeService = {
    getAll,
    get,
    del,
    post,
    put
};

const instance = axios.create({
    baseURL: 'https://localhost:5001/api'
  });
 instance.defaults.headers = authHeader();

function getAll() {
    return instance.get('employee/').then(handleResponse);
}

function get(id){
    return instance.get('employee/' + id).then(handleResponse);
}

function del(id){
    return instance.delete('employee/' + id).then(handleResponse);
}

function post(name,department,mail,doj){
    const emp = {
        name: name,
        department: department,
        mail: mail,
        doj: doj
    }
    
    return instance.post('/employee',emp);
      
}

function put(id,name,department,mail,doj){

    const emp = {
        id: id,
        name: name,
        department: department,
        mail: mail,
        doj: doj
    }

    return instance.put('/employee',emp);

}

const handleError = function(error) {
     if (error.response) {
  
    } else {
    console.error('Error Message:', error.message);
    }
   return Promise.reject(error.response || error.message);
   }

function handleResponse(response) {
    if (!response.ok){
        if (response.status === 401){
            localStorage.removeItem('token');
        }
        
    }

    return response.data;
}
