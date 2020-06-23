// 判断是否是微信
export const isWeChat = function () { 
    var ua = navigator.userAgent.toLowerCase();
    return ua.match(/MicroMessenger/i) == "micromessenger";
};