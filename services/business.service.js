import { fetchWrapper } from '../utils/fetchWrapper'
const baseUrl = process.env.NEXT_PUBLIC_API_URI;

export const businessService = {
    get,
    find,
    create,
    update,
    delete: _delete,
};


function get(query = '') {
    return fetchWrapper.get(`${baseUrl}businesses${query}`);
}

function find(id, token) {
    return fetchWrapper.get(`${baseUrl}businesses/${id}`, token);
}

function create(params) {
    return fetchWrapper.post(`${baseUrl}businesses`, params);
}

function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}businesses/${id}`);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}businesses/${id}`, params);
}
