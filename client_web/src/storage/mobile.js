/**
 * mobile state
 */
const authMobileStateKey = "invoice_mobile_state";

export const fetchAuthMobileState = () => {
    return localStorage.getItem(authMobileStateKey) || "no";
}

export const inactiveAuthMobileState = () => {
    localStorage.setItem(authMobileStateKey, "no");
}

export const activeAuthMobileState = () => {
    localStorage.setItem(authMobileStateKey, "yes");
}


/**
 * mobile
 */

const mobileKey = "invoice_mobile_key";

export const saveMobile = mobile => {
    localStorage.setItem(mobileKey, mobile);
}

export const getMobile = () => {
    localStorage.getItem(mobileKey) || "";
}
