import { fetchWrapper } from '../utils/fetchWrapper'
import Cookies from 'js-cookie'
const baseUrl = process.env.NEXT_PUBLIC_API_URI;

export const authService = {
    login,
    logout,
    register,
    verifyEmail,
    forgotPassword,
    validatePasswordResetToken,
    resetPassword,
    resendToken,
    getToken
};

function login({email, password}) {
    return fetchWrapper.post(`${baseUrl}auth/login`, { email, password })
    .then(user => {
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    });
}

function logout() {
    Cookies.remove('user');
}

function resendToken(params) {
    return fetchWrapper.post(`${baseUrl}auth/resend`, params)
}

function register(params) {
    return fetchWrapper.post(`${baseUrl}auth/register`, params);
}

function verifyEmail(token) {
    return fetchWrapper.post(`${baseUrl}auth/verify/${token}`);
}

function forgotPassword(email) {
    return fetchWrapper.post(`${baseUrl}passwords/forgot`, email );
}

function validatePasswordResetToken(token) {
    return fetchWrapper.post(`${baseUrl}auth/validate-password-reset-token${token}`);
}

function resetPassword(body) {
    return fetchWrapper.post(`${baseUrl}passwords/reset`, body);
}

function getToken() {
  const accessToken = localStorage.getItem('accessToken')
  if(accessToken){
      return accessToken
  } else {
      return ''
  }
}