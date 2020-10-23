process.env.ziubao_invoice_platform = "ziubao";

//
let rootPath = ""
if(process.env.ziubao_invoice_platform == "zlkc") {
    rootPath = "/zlkc";
}
else if (process.env.ziubao_invoice_platform == "ziubao")
{
    rootPath = "/main";
}
else {
    rootPath = "/yingqiyu-test";
}

//
module.exports = {
    rootPath,
}