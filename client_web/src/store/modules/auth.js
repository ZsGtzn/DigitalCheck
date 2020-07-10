import axios from '../../net/axios';
import { getUrlQuery, isWeChat } from "../../utils.js";
import { setWxUserInfo, getWxUserInfo, clearWxUserInfo, } from "../../storage/local";


/**
 * local storage
 */
const fromOrginUrlKey = "from_orgin_url";

//
export const setFromOrginUrl = (fromOriginUrl) => {
    localStorage.setItem(fromOrginUrlKey, fromOriginUrl);
}

export const getFromOrginUrl = () => {
    localStorage.getItem(fromOrginUrlKey);
}

/**
 * vuex
 */
const state = {
    wxUserInfo: getWxUserInfo(),
    fromOrginUrl: getFromOrginUrl(),
}

const getters = {
    
}

const mutations = {
    setWxUserInfo(state, data) {
        state.wxUserInfo = data;

        //
        setWxUserInfo(data);
    },
    setFromOriginUrl(state, data) {
        state.fromOrginUrl = data;

        //
        setFromOrginUrl(data);
    },
    clearWxUserInfo(state) {
        state.wxUserInfo = null;

        //
        clearWxUserInfo();
    }
}

const actions = {
    wxAccessLogin: async ({ commit }) => {
        /**
         * check if need wechat auth
         */
        if (!isWeChat()) {
            return false;
        }

        //
        if (state.wxUserInfo && state.wxUserInfo.openid) {
            return false;
        }

        /**
         * fetch wechat info
         */
        const code = getUrlQuery('code');
        const weChatAuthState = getUrlQuery('state');

        if (code) {
            // record from url
            if (weChatAuthState && weChatAuthState.length > 0) {
                commit('setFromOriginUrl', decodeURIComponent(weChatAuthState));
            }

            //
            const { code:returnCode, data, msg } = await axios.invoice.get(`/invoiceApi/wx/wxLogin?code=${code}`);
            if(returnCode !== 0)
            {
                return await Promise.reject(msg);
            }

            //
            commit('setWxUserInfo', data);

            //
            return false;
        }

        // need wechat auth
        return true;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
