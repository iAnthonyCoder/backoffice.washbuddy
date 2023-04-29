import { fetchWrapper } from '../utils/fetchWrapper'
const baseUrl = process.env.NEXT_PUBLIC_API_URI;

export const userService = {
    get,
    find,
    create,
    update,
    update_me,
    get_me,
    delete: _delete,
};


function get(query = '') {
    return fetchWrapper.get(`${baseUrl}users${query}`);
}

function find(_id, token) {
    return fetchWrapper.get(`${baseUrl}users/${_id}`, token);
}

function create(params) {
    return fetchWrapper.post(`${baseUrl}users`, params);
}

function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}users/${id}`);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}users/${id}`, params);
}

function update_me(params) {
    return fetchWrapper.put(`${baseUrl}users/me`, params);
}

function get_me(params) {
  return fetchWrapper.get(`${baseUrl}users/me`, params);
}