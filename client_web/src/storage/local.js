/**
 * auto token
 */
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

/**
 * wechat userinfo
 */
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

/**
 * invliceInfo
 */

const InvoiceInfoTypeKey = "InvoiceInfoTypeKey";
const InvoiceInfoUsernameKey = "InvoiceInfoUsernameKey";
const InvoiceInfoCompanyHeadKey = "InvoiceInfoCompanyHeadKey";
const InvoiceInfoEmailKey = "InvoiceInfoEmailKey";
const InvoiceInfoTaxNoKey = "InvoiceInfoTaxNoKey";
const InvoiceInfoCompanyAddressKey = "InvoiceInfoCompanyAddressKey";
const InvoiceInfoCompanyTelephoneKey = "InvoiceInfoCompanyTelephoneKey";
const InvoiceInfoCompanyBankKey = "InvoiceInfoCompanyBankKey";
const InvoiceInfoCompanyBankAccountKey = "InvoiceInfoCompanyBankAccountKey";
const InvoiceInfoRemarkKey = "InvoiceInfoRemarkKey";
const InvoiceInfoMobileKey = "InvoiceInfoMobileKey";
const InvoiceInfoPersonIdentifierKey = "InvoiceInfoPersonIdentifierKey";

export const setInvoiceInfoType = (type) => {
    localStorage.setItem(InvoiceInfoTypeKey, type);
}

export const setInvoiceInfoUsername = (username) => {
    localStorage.setItem(InvoiceInfoUsernameKey, username);
}

export const setInvoiceInfoCompanyHead = (companyHead) => {
    localStorage.setItem(InvoiceInfoCompanyHeadKey, companyHead);
}

export const setInvoiceInfoEmail = (email) => {
    localStorage.setItem(InvoiceInfoEmailKey, email);
}

export const setInvoiceInfoTaxNo = (taxNo) => {
    localStorage.setItem(InvoiceInfoTaxNoKey, taxNo);
}

export const setInvoiceInfoCompanyAddress = (companyAddress) => {
    localStorage.setItem(InvoiceInfoCompanyAddressKey, companyAddress);
}

export const setInvoiceInfoCompanyTelephone = (companyTelephone) => {
    localStorage.setItem(InvoiceInfoCompanyTelephoneKey, companyTelephone);
}

export const setInvoiceInfoCompanyBank = (companyBank) => {
    localStorage.setItem(InvoiceInfoCompanyBankKey, companyBank);
}

export const setInvoiceInfoCompanyBankAccount = (companyBankAccount) => {
    localStorage.setItem(InvoiceInfoCompanyBankAccountKey, companyBankAccount);
}

export const setInvoiceInfoRemark = (remark) => {
    localStorage.setItem(InvoiceInfoRemarkKey, remark);
}

export const setInvoiceInfoMobile = (mobile) => {
    localStorage.setItem(InvoiceInfoMobileKey, mobile);
}

export const setInvoiceInfoPersonIdentifier = (personIdentifier) => {
    localStorage.setItem(InvoiceInfoPersonIdentifierKey, personIdentifier);
}

//
export const getInvoiceInfoType = () => {
    return localStorage.getItem(InvoiceInfoTypeKey) || "2";
}

export const getInvoiceInfoUsername = () => {
    return localStorage.getItem(InvoiceInfoUsernameKey) || "";
}

export const getInvoiceInfoCompanyHead = () => {
    return localStorage.getItem(InvoiceInfoCompanyHeadKey) || "";
}

export const getInvoiceInfoEmail = () => {
    return localStorage.getItem(InvoiceInfoEmailKey) || "";
}

export const getInvoiceInfoTaxNo = () => {
    return localStorage.getItem(InvoiceInfoTaxNoKey) || "";
}

export const getInvoiceInfoCompanyAddress = () => {
    return localStorage.getItem(InvoiceInfoCompanyAddressKey) || "";
}

export const getInvoiceInfoCompanyTelephone = () => {
    return localStorage.getItem(InvoiceInfoCompanyTelephoneKey) || "";
}

export const getInvoiceInfoCompanyBank = () => {
    return localStorage.getItem(InvoiceInfoCompanyBankKey) || "";
}

export const getInvoiceInfoCompanyBankAccount = () => {
    return localStorage.getItem(InvoiceInfoCompanyBankAccountKey) || "";
}

export const getInvoiceInfoRemark = () => {
    return localStorage.getItem(InvoiceInfoRemarkKey) || "";
}

export const getInvoiceInfoMobile = () => {
    return localStorage.getItem(InvoiceInfoMobileKey) || "";
}

export const getInvoiceInfoPersonIdentifier = () => {
    return localStorage.getItem(InvoiceInfoPersonIdentifierKey) || "";
}
