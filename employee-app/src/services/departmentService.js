import {authHeader} from '../helpers/auth-header'
import axios from 'axios';

export const departmentService = {
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
  return instance.get('department/').then(handleResponse);
}

function get(id) {
  return instance.get('department/' + id).then(handleResponse);
}

function del(id){
  return instance.delete('department/' + id).then(handleResponse);
}


function post(nameDep){
    const dep = {
      name: nameDep,
    }

  return instance.post('/department',dep);

}

function put(depId, depName)
{
      const dep = {
        id:  depId,  
          name: depName
      }
      
  return instance.put('/department',dep);
}


function handleResponse(response) {
  if (!response.ok){
      if (response.status === 401){
          localStorage.removeItem('token');
      }
      
  }

  return response.data;
}