// 三江码头船票
async function fetchSanJiangData(identifier, noWaitHttpRequest, ifScan = false) {
    //
    let path = "/invoiceApi/sjky/passengerList";

    //
    if (ifScan) {
        path = "";
    }

    //
    try {
        const response = await this.axios.invoice.get(`${path}?IDCard=${identifier}&state&noWaitHttpRequest=${noWaitHttpRequest ? 'yes' : 'no'}`);

        if (response.code === 0) {
            return response.data.map(ele => Object.assign(ele, {
                ifSelected: false,
            }));
        }

        this.Toast(response.msg);
    }
    catch (e) {
        this.Toast(`获取开票列表失败, ${e.toString()}`);
    }
}

// 长峙岛停车场
async function changzhiVehicleParkData(identifier, noWaitHttpRequest, ifScan = false) {
    try {
        const response = await this.axios.invoice.get(`/invoiceApi/czpark/recordList?plateNo=${identifier}&noWaitHttpRequest=${noWaitHttpRequest ? 'yes' : 'no'}`);

        if (response.code === 0) {
            return response.data.map(ele => Object.assign(ele, {
                ifSelected: false,
                serialNum: ele.uniqueNo,
            }));
        }

        this.Toast(response.msg);
    }
    catch (e) {
        this.Toast(`获取开票列表失败, ${e.toString()}`);
    }
}

// 三江停车场
async function sanjiangVehicleParkData(identifier, noWaitHttpRequest, ifScan = false) {
    try {
        const response = await this.axios.invoice.get(`/invoiceApi/sjpark/recordList?plateNo=${identifier}&noWaitHttpRequest=${noWaitHttpRequest ? 'yes' : 'no'}`);

        if (response.code === 0) {
            return response.data.map(ele => Object.assign(ele, {
                ifSelected: false,
                serialNum: ele.uniqueNo,
            }));
        }

        this.Toast(response.msg);
    }
    catch (e) {
        this.Toast(`获取开票列表失败, ${e.toString()}`);
    };
}

// 普陀导游
async function putuoNavigatorData(identifier, noWaitHttpRequest, ifScan = false) {
    try {
        const response = await this.axios.invoice.get(`/invoiceApi/zlkcMesh/getOrderList?mobile=${identifier}&noWaitHttpRequest=${noWaitHttpRequest ? 'yes' : 'no'}`);

        if (response.code === 0) {
            return response.data.map(ele => Object.assign(ele, {
                ifSelected: false,
                serialNum: ele.out_Trade_No,
            }));
        }

        this.Toast(response.msg);
    }
    catch (e) {
        this.Toast(`获取开票列表失败, ${e.toString()}`);
    }
}

// 普陀山索道
async function putuoRopewayData(identifier, noWaitHttpRequest, ifScan = false) {
    let seperatorPosition = identifier.indexOf('_');
    if (seperatorPosition < 0) {
        return this.Toast("无效的查询标记, " + identifier);
    }

    //
    let idType = identifier.substring(0, seperatorPosition);
    let realidentifier = identifier.substring(seperatorPosition + 1);
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
            return this.Toast("错误的查询类型: " + idType);
        }
    }

    try {
        const response = await this.axios.invoice.get(`/invoiceApi/ptssd/orderInfo?${queryPath}&noWaitHttpRequest=${noWaitHttpRequest ? 'yes' : 'no'}`);

        if (response.code === 0) {
            return response.data.map(ele => Object.assign(ele, {
                ifSelected: false,
                serialNum: ele.orderCode,
            }));
        }

        this.Toast(response.msg);
    }
    catch (e) {
        this.Toast(`获取开票列表失败, ${e.toString()}`);
    }
}

// 海峡轮渡小卖部
async function hxFerryShopData(identifier, noWaitHttpRequest, ifScan = false) {
    try {
        const response = await this.axios.invoice.get(`/invoiceApi/hxldxmb/getOrderList?mobile=${identifier}&noWaitHttpRequest=${noWaitHttpRequest ? 'yes' : 'no'}`);

        if (response.code === 0) {
            return response.data.map(ele => Object.assign(ele, {
                ifSelected: false,
                serialNum: ele.ddh,
            }));
        }

        this.Toast(response.msg);
    }
    catch (e) {
        this.Toast(`获取开票列表失败, ${e.toString()}`);
    }
}

// 墩头
async function dunTouWharfData(identifier, noWaitHttpRequest, ifScan = false) {
    try {
        const response = await this.axios.invoice.get(`/invoiceApi/dtky/passengerList?IDCard=${identifier}&noWaitHttpRequest=${noWaitHttpRequest ? 'yes' : 'no'}`);

        if (response.code === 0) {
            return response.data.map(ele => Object.assign(ele, {
                ifSelected: false,
            }));
        }

        this.Toast(response.msg);
    }
    catch (e) {
        this.Toast(`获取开票列表失败, ${e.toString()}`);
    }
}

// 港务
async function gangWuWharfData(identifier, noWaitHttpRequest, ifScan = false) {
    try {
        const response = await this.axios.invoice.get(`/invoiceApi/dhky/passengerList?IDCard=${identifier}&noWaitHttpRequest=${noWaitHttpRequest ? 'yes' : 'no'}`);

        if (response.code === 0) {
            return response.data.map(ele => Object.assign(ele, {
                ifSelected: false,
            }));
        }

        this.Toast(response.msg);
    }
    catch (e) {
        this.Toast(`获取开票列表失败, ${e.toString()}`);
    };
}

// 海峰
async function haiFenWharfData(identifier, noWaitHttpRequest, ifScan = false) {
    try {
        const response = await this.axios.invoice.get(`/invoiceApi/hfky/passengerList?IDCard=${identifier}&noWaitHttpRequest=${noWaitHttpRequest ? 'yes' : 'no'}`);

        if (response.code === 0) {
            return response.data.map(ele => Object.assign(ele, {
                ifSelected: false,
            }));
        }

        this.Toast(response.msg);
    }
    catch {
        this.Toast(`获取开票列表失败, ${e.toString()}`);
    }
}

async function sanjiangCargoData(identifier, noWaitHttpRequest, ifScan = false) {
    try {
        const response = await this.axios.invoice.get(`/invoiceApi/sjhy/getOrderList?mobile=${identifier}&noWaitHttpRequest=${noWaitHttpRequest ? 'yes' : 'no'}`);

        if (response.code === 0) {
            return response.data.map(ele => Object.assign(ele, {
                ifSelected: false,
                serialNum: ele.ddh,
            }));
        }

        this.Toast(response.msg);
    }
    catch (e) {
        this.Toast(`获取开票列表失败, ${e.toString()}`);
    }
}

// 舟旅客运
async function zlkyData(identifier, noWaitHttpRequest, ifScan = false) {
    let seperatorPosition = identifier.indexOf('_');
    if (seperatorPosition < 0) {
        return this.Toast("无效的查询标记, " + identifier);
    }

    //
    let idType = identifier.substring(0, seperatorPosition);
    let realidentifier = identifier.substring(seperatorPosition + 1);
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
            return this.Toast("错误的查询类型: " + idType);
        }
    }

    //
    try {
        const response = await this.axios.invoice.get(`/invoiceApi/ljsky/orderInfo?${queryPath}&noWaitHttpRequest=${noWaitHttpRequest ? 'yes' : 'no'}`);

        if (response.code === 0) {
            return response.data.map(ele => Object.assign(ele, {
                ifSelected: false,
                serialNum: ele.orderCode,
            }));
        }

        this.Toast(response.msg);
    } catch (e) {
        this.Toast(`获取开票列表失败, ${e.toString()}`);
    }
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