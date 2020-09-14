import { rootPath, } from "../globals";

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


export const downloadUtil = {
    showOpenBrowserHint(event) {
        if (window.gtzn.ifNeedToJumpOutBrowser) {
            event.stopPropagation();

            //
            return this.Toast("请点击右上角，选择从浏览器中打开");
        }
    },

    download(routeInfo) {
        // 创建隐藏的可下载链接
        var eleLink = document.createElement("a");
        eleLink.download = `${routeInfo.serialNum}.pdf`;
        eleLink.style.display = "none";

        //
        if (window.gtzn.platform == "android") {
            eleLink.href = routeInfo.invoiceUrl;
        } else {
            var blob = new Blob([routeInfo.invoiceUrl]);
            eleLink.href = URL.createObjectURL(blob);
        }

        // 触发点击
        document.body.appendChild(eleLink);
        eleLink.click();

        // 然后移除
        document.body.removeChild(eleLink);
    },

    preview(routeInfo) {
        // 创建隐藏的可下载链接
        var eleLink = document.createElement("a");
        
        //
        if (window.gtzn.platform == "android") {
            eleLink.href = `${rootPath}/static/pdf/web/viewer.html?file=${encodeURI(routeInfo.invoiceUrl.replace("https", "http"))}`;
        } else {
            eleLink.href = `${rootPath}/static/pdf/web/viewer.html?file=${encodeURI(routeInfo.invoiceUrl.replace("https", "http"))}`;
        }

        // 触发点击
        document.body.appendChild(eleLink);
        eleLink.click();

        // 然后移除
        document.body.removeChild(eleLink);
    }
}