const authTokenKey = "invoicePlatform_key_authToken";

export const updateAuthToken = (token) => {
    localStorage.setItem(authTokenKey, token);
}

export const fetchAuthToken = () => {
    return localStorage.getItem(authTokenKey);
}