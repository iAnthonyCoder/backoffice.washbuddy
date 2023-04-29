import { DATA_GRID_PROPS_DEFAULT_VALUES } from '@mui/x-data-grid';
import { authService } from '../services/auth.service';

export const fetchWrapper = {
    get,
    post,
    put,
    delete: _delete,
}

function get(url, token) {
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',  
            ...(token ? { Authorization: `Bearer ${token}` } : {...authHeader()})
        }
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function post(url, body) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function put(url, body) {

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function _delete(url) {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function authHeader() {
    const accessToken = authService.getToken();
    const isLoggedIn = accessToken ? true : false;
    if (isLoggedIn) {
        return { Authorization: `Bearer ${accessToken}` };
    } else {
        return {};
    }
}


function handleResponse(response) {

    if (!response.ok){
        if ([401, 403,].includes(response.status)) {
            authService.logout();
        }
        if ([429].includes(response.status)) {
            authService.logout();
        }
    }
    return response.text().then(text => {
        let data = text && JSON.parse(text);
      
        if (!response.ok) {
          
            if(data.errors){
                return Promise.reject({errors:data.errors, code: response.status});
            } else if(data.message){
                return Promise.reject({errors:[{message: data.message}], code: response.status});
            } else if(data.data && data.data.message ){
                return Promise.reject({errors:[{message: data.data.message}], code: response.status});
            } else {
                return Promise.reject({errors:[{message:'Something Went Wrong.'}], code: response.status});
            }
        }
        return data;
    });
}
