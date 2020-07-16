const mockServerClientInstance = process["mockServerClientInstance"];

mockServerClientInstance.mockAnyResponse({
  httpRequest: {
    "method": "GET",
    "path": "/invoiceApi/sjky/passengerList",
    "queryStringParameters": {
      "IDCard": [".*"],
      "state": [".*"]
    }
  },
  "httpResponse": {
    "headers": {
      "Content-Type": ["application/json", "charset=utf-8"],
      "Last-Modified": ["Fri, 23 Oct 2019 07:28:00 GMT"],
    },
    "body": { 
        "code": 0, 
        "data": [
            { 
                "IDNum": "330921198606202031", 
                "date": "2018-12-06", 
                "endPort": "gaoting", 
                "id": 1, 
                "invoiceAmount": 102, 
                "invoiceType": 1, 
                "isInvoice": false, 
                "name": "tom", 
                "phoneNum": "13216800218", 
                "price": "102", 
                "refundState": 0, 
                "seatNum": "0", 
                "seatType": "5座客车", 
                "serialNum": "20181206000002", 
                "shipName": "岱渡", 
                "takeState": 0, 
                "ticketType": "车运", 
                "time": "10:10", 
                "invoiceUrl": ""
            }, 
            { 
                "IDNum": "210905197807210546", 
                "date": "2018-12-06", 
                "endPort": "gaoting", 
                "id": 2, 
                "invoiceAmount": 17, 
                "invoiceType": 1, 
                "isInvoice": true, 
                "name": "jack", 
                "phoneNum": "13216800218", 
                "price": "17.0", 
                "refundState": 2, 
                "seatNum": "1", 
                "seatType": "普舱", 
                "serialNum": "20181206000003", 
                "shipName": "岱渡", 
                "takeState": 0, 
                "ticketType": "全票", 
                "time": "10:10", 
                "invoiceUrl": "https://sjgroup.ziubao.com/pdf/20200505001998-029.pdf"
            }
        ],
        "msg":"查询成功"
    },
  }
}).then(() => {
  console.log("/invoice/passengerList expectation created");
}).catch(e => {
  console.log(e);
});

mockServerClientInstance.mockAnyResponse({
  httpRequest: {
    "method": "POST",
    "path": "/invoice/check",
    "body": {
      "type": "JSON",
      "json": {
        
      }
    }
  },
  "httpResponse": {
    "headers": {
      "Content-Type": ["application/json", "charset=utf-8"],
      "Last-Modified": ["Fri, 23 Oct 2019 07:28:00 GMT"],
    },
    "body": {"code":0, "msg":"成功"},
  }
}).then(() => {
  console.log("/invoice/check expectation created");
}).catch(e => {
  console.log(e);
});

mockServerClientInstance.mockAnyResponse({
    httpRequest: {
      "method": "GET",
      "path": "/invoiceApi/wx/wxLogin",
      "queryStringParameters": {
            
      }
    },
    "httpResponse": {
      "headers": {
        "Content-Type": ["application/json", "charset=utf-8"],
        "Last-Modified": ["Fri, 23 Oct 2019 07:28:00 GMT"],
        "Access-Control-Expose-Headers" : ['Authorization'],
        "Authorization": ["auth"],
      },
      "body": {"code": 0, "data": { 
          "openid": "123456789",
          "subscribe": 1,
        }},
    }
  }).then(() => {
    console.log("/invoice/check expectation created");
  }).catch(e => {
    console.log(e);
  });

mockServerClientInstance.mockAnyResponse({
    httpRequest: {
      "method": "GET",
      "path": "/invoiceApi/czpark/recordList",
      "queryStringParameters": {
        "plateNo": [".*"]
      }
    },
    "httpResponse": {
      "headers": {
        "Content-Type": ["application/json", "charset=utf-8"],
        "Last-Modified": ["Fri, 23 Oct 2019 07:28:00 GMT"],
        "Access-Control-Expose-Headers" : ['Authorization'],
        "Authorization": ["auth"],
      },
      "body": {"code": 0, "data": [{ 
        "uniqueNo":"415FB743316D1BEA75CE62CB",
        "terminalNo":"",
        "inUniqueNo":"415FB743316D1BEA75CE6297",
        "plateFilePath": "415FB743316D1BE97B52/StorepicFile/PassVehid",
        "isInvoice":false,
        "plateNo":"浙L9669H",
        "1laneCode": "4TSFB7433I6DIBE97B522T",
        "shnldPay": 1500,
        "passTime":"2020-02-20 14:22:20",
        "vehType":0,
        "invoiceAmount":15.0,
        "cardNo":"",
        "operatorName":"谢佩飞",
        "gateName":"入口1",
        "picFilePath":"415FB743316D1BE97B52/StorePicFile/PassVehicle",
        "passType":"手动放行",
        "laneName":"出口1",
        "sehcolor": 0,
        "invoiceUrl": "",
        "inPassTime":"2020-02-20 09:09:00",
        "direction":1,
        "actualPay":15.0,
       }, { 
        "uniqueNo":"415FB743316D1BEA75CE62CB",
        "terminalNo":"",
        "inUniqueNo":"415FB743316D1BEA75CE6297",
        "plateFilePath": "415FB743316D1BE97B52/StorepicFile/PassVehid",
        "isInvoice":true,
        "plateNo":"浙L9669H",
        "1laneCode": "4TSFB7433I6DIBE97B522T",
        "shnldPay": 1500,
        "passTime":"2020-02-20 14:22:20",
        "vehType":0,
        "invoiceAmount":15.0,
        "cardNo":"",
        "operatorName":"谢佩飞",
        "gateName":"入口1",
        "picFilePath":"415FB743316D1BE97B52/StorePicFile/PassVehicle",
        "passType":"手动放行",
        "laneName":"出口1",
        "sehcolor": 0,
        "invoiceUrl": "https://sjgroup.ziubao.com/pdf/20200505001998-029.pdf",
        "inPassTime":"2020-02-20 09:09:00",
        "direction":1,
        "actualPay":15.0,
       }]},
    }
  }).then(() => {
    console.log("/invoiceApi/czpark/recordList expectation created");
  }).catch(e => {
    console.log(e);
  });

mockServerClientInstance.mockAnyResponse({
    httpRequest: {
      "method": "POST",
      "path": "/invoiceApi/sjky/doInvoice",
      "queryStringParameters": {
        
      }
    },
    "httpResponse": {
      "headers": {
        "Content-Type": ["application/json", "charset=utf-8"],
        "Last-Modified": ["Fri, 23 Oct 2019 07:28:00 GMT"],
        "Access-Control-Expose-Headers" : ['Authorization'],
        "Authorization": ["auth"],
      },
      "body": {"code": 0, "msg": "开票成功"},
    }
  }).then(() => {
    console.log("/invoiceApi/sjky/doInvoice expectation created");
  }).catch(e => {
    console.log(e);
  });

mockServerClientInstance.mockAnyResponse({
    httpRequest: {
      "method": "POST",
      "path": "/invoiceApi/zlkc/doInvoice",
      "queryStringParameters": {
        
      }
    },
    "httpResponse": {
      "headers": {
        "Content-Type": ["application/json", "charset=utf-8"],
        "Last-Modified": ["Fri, 23 Oct 2019 07:28:00 GMT"],
        "Access-Control-Expose-Headers" : ['Authorization'],
        "Authorization": ["auth"],
      },
      "body": {"code": 0, "msg": "开票成功"},
    }
  }).then(() => {
    console.log("/invoiceApi/zlkc/doInvoice expectation created");
  }).catch(e => {
    console.log(e);
  });

  mockServerClientInstance.mockAnyResponse({
    httpRequest: {
      "method": "POST",
      "path": "/invoiceApi/czpark/doInvoice",
      "queryStringParameters": {
        
      }
    },
    "httpResponse": {
      "headers": {
        "Content-Type": ["application/json", "charset=utf-8"],
        "Last-Modified": ["Fri, 23 Oct 2019 07:28:00 GMT"],
        "Access-Control-Expose-Headers" : ['Authorization'],
        "Authorization": ["auth"],
      },
      "body": {"code": 0, "msg": "开票成功"},
    }
  }).then(() => {
    console.log("/invoiceApi/czpark/doInvoice expectation created");
  }).catch(e => {
    console.log(e);
  });