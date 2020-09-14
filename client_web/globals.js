process.env.ziubao_invoice_platform = "/yingqiyu-test";

//
let rootPath = ""
if(process.env.ziubao_invoice_platform == "zlkc") {
    rootPath = "/zlkc";
}
else if (process.env.ziubao_invoice_platform == "ziubao")
{
    rootPath = "/invoice/main";
}
else if(process.env.ziubao_invoice_platform == "/invoice-test/main")
{
    rootPath = "/invoice-test/main";
}
else {
    rootPath = "/yingqiyu-test";
}

//
module.exports = {
    rootPath,
}