process.env.ziubao_invoice_platform = "ziubao";

//
const rootPath = process.env.ziubao_invoice_platform == "zlkc" ? "/zlkc" : "/invoice/main";

//
module.exports = {
    rootPath,
}