import { fetchWrapper } from '../utils/fetchWrapper'
const baseUrl = process.env.NEXT_PUBLIC_API_URI;

export const orderService = {
    get,
    find,
    create,
    update,
    delete: _delete,
};


function get(query = '') {
    return fetchWrapper.get(`${baseUrl}orders${query}`);
}

function find(id, token) {
    return fetchWrapper.get(`${baseUrl}orders/${id}`, token);
}

function create(params) {
    return fetchWrapper.post(`${baseUrl}orders`, params);
}

function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}orders/${id}`);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}orders/${id}`, params);
}
