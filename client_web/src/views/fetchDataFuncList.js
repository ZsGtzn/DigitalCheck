// 三江码头船票
function fetchSanJiangData(noWaitHttpRequest)
{
    this.axios.invoice.get(`/invoiceApi/sjky/passengerList?IDCard=${this.identifier}&state&noWaitHttpRequest=${noWaitHttpRequest ? 'yes' : 'no'}`).then(response => {
        if (response.code === 0) {
            return this.checkedPassenger = response.data.map(ele => Object.assign(ele, {
                ifSelected: false,
            }));
        }

        this.Toast(response.msg);
    }).catch(e => {
        this.Toast(`获取开票列表失败, ${e.toString()}`);
    });
}

// 长峙岛停车场
function changzhiVehicleParkData(noWaitHttpRequest)
{
    this.axios.invoice.get(`/invoiceApi/czpark/recordList?plateNo=${this.identifier}&noWaitHttpRequest=${noWaitHttpRequest ? 'yes' : 'no'}`).then(response => {
        if (response.code === 0) {
            return this.checkedPassenger = response.data.map(ele => Object.assign(ele, {
                ifSelected: false,
                serialNum: ele.uniqueNo,
            }));
        }

        this.Toast(response.msg);
    }).catch(e => {
        this.Toast(`获取开票列表失败, ${e.toString()}`);
    });
}

// 三江停车场
function sanjiangVehicleParkData(noWaitHttpRequest)
{
    this.axios.invoice.get(`/invoiceApi/sjpark/recordList?plateNo=${this.identifier}&noWaitHttpRequest=${noWaitHttpRequest ? 'yes' : 'no'}`).then(response => {
        if (response.code === 0) {
            return this.checkedPassenger = response.data.map(ele => Object.assign(ele, {
                ifSelected: false,
                serialNum: ele.uniqueNo,
            }));
        }

        this.Toast(response.msg);
    }).catch(e => {
        this.Toast(`获取开票列表失败, ${e.toString()}`);
    });
}

// 普陀导游
function putuoNavigatorData(noWaitHttpRequest)
{
    this.axios.invoice.get(`/invoiceApi/zlkcMesh/getOrderList?mobile=${this.identifier}&noWaitHttpRequest=${noWaitHttpRequest ? 'yes' : 'no'}`).then(response => {
        if (response.code === 0) {
            return this.checkedPassenger = response.data.map(ele => Object.assign(ele, {
                ifSelected: false,
                serialNum: ele.out_Trade_No,
            }));
        }

        this.Toast(response.msg);
    }).catch(e => {
        this.Toast(`获取开票列表失败, ${e.toString()}`);
    });
}

// 普陀山索道
function putuoRopewayData(noWaitHttpRequest)
{
    let seperatorPosition = this.identifier.indexOf('_');
    if (seperatorPosition < 0) {
        return this.Toast("无效的查询标记, " + this.identifier);
    }

    //
    let idType = this.identifier.substring(0, seperatorPosition);
    let realidentifier = this.identifier.substring(seperatorPosition + 1);
    let queryPath = "";

    //
    switch (idType) {
        case "orderNum":
            {
                queryPath = `orderCode=${realidentifier}&certNo=&mobile=`;
            }
            break;
        case "identity":
            {
                queryPath = `orderCode=&certNo=${realidentifier}&mobile=`;
            }
            break;
        case "mobile":
            {
                queryPath = `orderCode=&certNo=&mobile=${realidentifier}`;
            }
            break;
        default: {
            return this.Toast("错误的查询类型: " + this.idType);
        }
    }

    this.axios.invoice.get(`/invoiceApi/ptssd/orderInfo?${queryPath}&noWaitHttpRequest=${noWaitHttpRequest ? 'yes' : 'no'}`).then(response => {
        if (response.code === 0) {
            return this.checkedPassenger = response.data.map(ele => Object.assign(ele, {
                ifSelected: false,
                serialNum: ele.orderCode,
            }));
        }

        this.Toast(response.msg);
    }).catch(e => {
        this.Toast(`获取开票列表失败, ${e.toString()}`);
    });
}

// 海峡轮渡小卖部
function hxFerryShopData(noWaitHttpRequest)
{
    this.axios.invoice.get(`/invoiceApi/hxldxmb/getOrderList?mobile=${this.identifier}&noWaitHttpRequest=${noWaitHttpRequest ? 'yes' : 'no'}`).then(response => {
        if (response.code === 0) {
            return this.checkedPassenger = response.data.map(ele => Object.assign(ele, {
                ifSelected: false,
                serialNum: ele.ddh,
            }));
        }

        this.Toast(response.msg);
    }).catch(e => {
        this.Toast(`获取开票列表失败, ${e.toString()}`);
    });
}

// 墩头
function dunTouWharfData(noWaitHttpRequest)
{
    this.axios.invoice.get(`/invoiceApi/dtky/passengerList?IDCard=${this.identifier}&noWaitHttpRequest=${noWaitHttpRequest ? 'yes' : 'no'}`).then(response => {
        if (response.code === 0) {
            return this.checkedPassenger = response.data.map(ele => Object.assign(ele, {
                ifSelected: false,
            }));
        }

        this.Toast(response.msg);
    }).catch(e => {
        this.Toast(`获取开票列表失败, ${e.toString()}`);
    });
}

// 港务
function gangWuWharfData(noWaitHttpRequest)
{
    this.axios.invoice.get(`/invoiceApi/dhky/passengerList?IDCard=${this.identifier}&noWaitHttpRequest=${noWaitHttpRequest ? 'yes' : 'no'}`).then(response => {
        if (response.code === 0) {
            return this.checkedPassenger = response.data.map(ele => Object.assign(ele, {
                ifSelected: false,
            }));
        }

        this.Toast(response.msg);
    }).catch(e => {
        this.Toast(`获取开票列表失败, ${e.toString()}`);
    });
}

// 海峰
function haiFenWharfData(noWaitHttpRequest)
{
    this.axios.invoice.get(`/invoiceApi/hfky/passengerList?IDCard=${this.identifier}&noWaitHttpRequest=${noWaitHttpRequest ? 'yes' : 'no'}`).then(response => {
        if (response.code === 0) {
            return this.checkedPassenger = response.data.map(ele => Object.assign(ele, {
                ifSelected: false,
            }));
        }

        this.Toast(response.msg);
    }).catch(e => {
        this.Toast(`获取开票列表失败, ${e.toString()}`);
    });
}

function sanjiangCargoData(noWaitHttpRequest) {
    this.axios.invoice.get(`/invoiceApi/sjhy/getOrderList?mobile=${this.identifier}&noWaitHttpRequest=${noWaitHttpRequest ? 'yes' : 'no'}`).then(response => {
        if (response.code === 0) {
            return this.checkedPassenger = response.data.map(ele => Object.assign(ele, {
                ifSelected: false,
                serialNum: ele.ddh,
            }));
        }

        this.Toast(response.msg);
    }).catch(e => {
        this.Toast(`获取开票列表失败, ${e.toString()}`);
    });
}

//
function zlkyData(noWaitHttpRequest) {
    let seperatorPosition = this.identifier.indexOf('_');
    if (seperatorPosition < 0) {
        return this.Toast("无效的查询标记, " + this.identifier);
    }

    //
    let idType = this.identifier.substring(0, seperatorPosition);
    let realidentifier = this.identifier.substring(seperatorPosition + 1);
    let queryPath = "";

    //
    switch (idType) {
        case "orderNum":
            {
                queryPath = `orderCode=${realidentifier}&certNo=&mobile=`;
            }
            break;
        case "identity":
            {
                queryPath = `orderCode=&certNo=${realidentifier}&mobile=`;
            }
            break;
        case "mobile":
            {
                queryPath = `orderCode=&certNo=&mobile=${realidentifier}`;
            }
            break;
        default: {
            return this.Toast("错误的查询类型: " + this.idType);
        }
    }

    this.axios.invoice.get(`/invoiceApi/ptssd/orderInfo?${queryPath}&noWaitHttpRequest=${noWaitHttpRequest ? 'yes' : 'no'}`).then(response => {
        if (response.code === 0) {
            return this.checkedPassenger = response.data.map(ele => Object.assign(ele, {
                ifSelected: false,
                serialNum: ele.orderCode,
            }));
        }

        this.Toast(response.msg);
    }).catch(e => {
        this.Toast(`获取开票列表失败, ${e.toString()}`);
    });
}

export default {
    fetchSanJiangData,
    changzhiVehicleParkData,
    sanjiangVehicleParkData,
    putuoNavigatorData,
    putuoRopewayData,
    hxFerryShopData,
    dunTouWharfData,
    gangWuWharfData,
    haiFenWharfData,
    sanjiangCargoData,
    zlkyData,
}