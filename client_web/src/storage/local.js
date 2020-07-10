const authTokenKey = "invoicePlatform_key_authToken";

export const updateAuthToken = (token) => {
    localStorage.setItem(authTokenKey, token);
}

export const fetchAuthToken = () => {
    return localStorage.getItem(authTokenKey);
}

export const clearAuthToken = () => {
    return localStorage.removeItem(authTokenKey);
}

//
const wxUserInfoKey = 'zyb_wx_userinfo';

export const setWxUserInfo = (userInfo) => {
    localStorage.setItem(wxUserInfoKey, JSON.stringify(userInfo));
}

export const getWxUserInfo = () => {
    return JSON.parse(localStorage.getItem(wxUserInfoKey));
}

export const clearWxUserInfo = () => {
    localStorage.removeItem(wxUserInfoKey);
}
   