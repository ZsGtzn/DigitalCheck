// 判断是否是微信
export const isWeChat = function () { 
    var ua = navigator.userAgent.toLowerCase();
    return ua.match(/MicroMessenger/i) == "micromessenger";
};


//
export const getUrlQuery = (key) => {
    const pattern = new RegExp(`[\\?&#]${key}=([^&#]+)`)
    const ma = location.search.match(pattern)

    return ma ? ma[1] : ma
}