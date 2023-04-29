import { fetchWrapper } from '../utils/fetchWrapper'
const baseUrl = process.env.NEXT_PUBLIC_API_URI;

export const itemService = {
    get,
    find,
    create,
    update,
    delete: _delete,
};


function get(query = '') {
    return fetchWrapper.get(`${baseUrl}items${query}`);
}

function find(_id, token) {
    return fetchWrapper.get(`${baseUrl}items/${_id}`, token);
}

function create(params) {
    return fetchWrapper.post(`${baseUrl}items`, params);
}

function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}items/${id}`);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}items/${id}`, params);
}
