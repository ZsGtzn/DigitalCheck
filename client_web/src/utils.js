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
        if (window.gtzn.ifWeixinBrowser) {
            event.stopPropagation();

            //
            return this.Toast("请点击右上角，选择从浏览器中打开");
        }
    },

    download(routeInfo, urlField) {
        // 创建隐藏的可下载链接
        var eleLink = document.createElement("a");
        eleLink.download = `${routeInfo.serialNum}_${urlField}.pdf`;
        eleLink.style.display = "none";

        //
        if (window.gtzn.platform == "android" || window.gtzn.platform == "windows") {
            //
            eleLink.href = routeInfo[urlField];
        } else if (window.gtzn.platform == "ios" || window.gtzn.platform == "mac") {
            //
            var blob = new Blob([routeInfo[urlField]]);
            eleLink.href = URL.createObjectURL(blob);
        }

        // 触发点击
        document.body.appendChild(eleLink);
        eleLink.click();

        // 然后移除
        document.body.removeChild(eleLink);
    },

    preview(routeInfo, urlField) {
        // 创建隐藏的可下载链接
        var eleLink = document.createElement("a");
        
        //
        if (window.gtzn.platform == "android") {
            eleLink.href = `static/pdf/web/viewer.html?file=${encodeURIComponent(routeInfo[urlField].replace("http://", "https://"))}`;
        } else {
            eleLink.href = `static/pdf/web/viewer.html?file=${encodeURIComponent(routeInfo[urlField].replace("http://", "https://"))}`;
        }
        
        // 触发点击
        document.body.appendChild(eleLink);
        eleLink.click();

        // 然后移除
        document.body.removeChild(eleLink);
    }
}

export const addPlatformSuffix = () => {
    return `_${process.env.ziubao_invoice_platform}`;
}