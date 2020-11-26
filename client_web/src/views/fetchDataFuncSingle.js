function fetchPutuoBusData(noWaitHttpRequest)
{
    this.axios.invoice.get(`invoiceApi/zlkc/getOrderInfo?serialNum=${this.identifier}&state&noWaitHttpRequest=${noWaitHttpRequest ? 'yes' : 'no'}`).then(response => {
        if (response.code === 0) {
            this.invoiceDetail = Object.assign(response.data, {
                serialNum: response.data.out_Trade_No,
            });

            //
            return;
        }

        this.Toast(response.msg);
    }).catch(e => {
        this.Toast(`获取开票信息失败, ${e.toString()}`);
    });;
}

export default {
    fetchPutuoBusData,
}