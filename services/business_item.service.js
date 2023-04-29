import { fetchWrapper } from '../utils/fetchWrapper'
const baseUrl = process.env.NEXT_PUBLIC_API_URI;

export const business_itemService = {
    get,
    find,
    create,
    update,
    delete: _delete,
};


function get(query = '') {
    return fetchWrapper.get(`${baseUrl}business_items${query}`);
}

function find(id, token) {
    return fetchWrapper.get(`${baseUrl}business_items/${id}`, token);
}

function create(params) {
    return fetchWrapper.post(`${baseUrl}business_items`, params);
}

function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}business_items/${id}`);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}business_items/${id}`, params);
}
