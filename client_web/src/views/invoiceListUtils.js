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

function ifNeedShowInvoiceTogetherButton(type)
{
    return type === 'sanjiang' || type == 'ybky' || type == 'foDuKeYun' || type == 'haiFenWharf';
}

export {
    loadTop,
    selectInvoice,
    selectALl,
    checkInvoice,
    ifNeedShowInvoiceTogetherButton,
}

