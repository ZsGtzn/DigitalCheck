async function fetchPutuoBusData(identifier, noWaitHttpRequest)
{
    try {
        const response = await this.axios.invoice.get(`invoiceApi/zlkc/getOrderInfo?serialNum=${identifier}&state&noWaitHttpRequest=${noWaitHttpRequest ? 'yes' : 'no'}`);

        if (response.code === 0) {
            return Object.assign(response.data, {
                serialNum: response.data.out_Trade_No,
            });
        }

        this.Toast(response.msg);
    } catch (error) {
        this.Toast(`获取开票信息失败, ${e.toString()}`);
    }
}

export default {
    fetchPutuoBusData,
}