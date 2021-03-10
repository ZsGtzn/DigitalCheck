
let resultStr = 'http://fapiao.jolimark.com/customer/device.html?PrinterCode=20340007ABD&v=1.3.5.0'
let markUrl = 'http://fapiao.jolimark.com/customer/device.html';
let resultStrUrlParam = resultStr.substring(markUrl.length + 1)
resultStrUrlParam.match(/PrinterCode=(.+)&.+/g);
const result = resultStrUrlParam.match(/PrinterCode=(.+)&.+/);
console.log(result)