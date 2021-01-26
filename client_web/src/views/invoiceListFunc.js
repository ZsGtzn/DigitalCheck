import { saveTicketList } from "../storage/ticketList";

/**
 * 辅助功能
 */
function loadTop()
{
    this.fetchData();

    //
    this.$refs.loadmore.onTopLoaded();
}

function selectInvoice(item) {
    if (item.isInvoice) {
        return;
    }

    //
    item.ifSelected = !item.ifSelected;
}

function selectALl()
{
    this.ifAllSelected = !this.ifAllSelected;
}

function checkInvoice() {
    //
    if (this.multipleSelection.length == 0) {
        return this.Toast("请至少选择一笔订单");
    }

    //
    alert("如要公司报销 ，抬头请填写公司名称、税号。");

    //
    this.$router.push({
        path: `/checkInvoice/${this.type}`,
        query: {
            type: this.type,
            altogether: this.altogether ? 1 : 0,
        }
    });

    // store selection 
    saveTicketList(JSON.stringify(this.multipleSelection));
}

/**
 * 冲红
 */
function getRollbackFunc(self) {
    return async function (invoiceDetail)
    {
        //
        if (invoiceDetail.isRed == true) {
            return this.MessageBox({
                title: "提示",
                message: '已作废过一次，无法再次进行作废！',
                confirmButtonText: "确认",
            });
        }

        //
        const action = await this.MessageBox({
            title: "提示",
            message: '作废只能进行一次，是否进行作废？',
            showCancelButton: true,
            confirmButtonText: "是",
            cancelButtonText: "否",
        });

        //
        if (action == 'confirm') {
            if (!self.currentInvoiceConfig) {
                return this.Toast("无效的冲红类型, " + self.type);
            }

            //
            let postData = {
                serialNum: invoiceDetail.serialNum
            };

            //
            if (self.type == 'changzhikeyun') {
                postData.IDCard = self.identifier;
            }

            //
            this.axios.invoice.post(self.currentInvoiceConfig.rollBackUrl, postData).then(response => {
                if (response.code === 0) {
                    return this.Toast("作废成功");
                }

                this.Toast(response.msg);
            }).catch(e => {
                this.Toast(`作废请求失败, ${e.toString()}`);
            });
        }
    }
}

export {
    loadTop,
    selectInvoice,
    selectALl,
    checkInvoice,
    getRollbackFunc,
}

