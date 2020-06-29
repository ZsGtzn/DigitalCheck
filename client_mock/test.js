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
                "isInvoice": false, 
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
        "code": [".*"]
      }
    },
    "httpResponse": {
      "headers": {
        "Content-Type": ["application/json", "charset=utf-8"],
        "Last-Modified": ["Fri, 23 Oct 2019 07:28:00 GMT"],
        "Authorization": ["auth"],
        "Access-Control-Expose-Headers" : ['Authorization'],
      },
      "body": {"subscribe": 1},
    }
  }).then(() => {
    console.log("/invoice/check expectation created");
  }).catch(e => {
    console.log(e);
  });
