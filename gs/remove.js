var sheet =SpreadsheetApp.openById('1i03SvdrmkbKigXnAipdOKj8wdEz91rkeq9iA9KtkBxI').getSheetByName('product');
var reserve =SpreadsheetApp.openById('10yUicjKgTzBtOCsLuUB6Jl581yQd4d9hnKBhfLPpA1A').getSheetByName('reserve');
var datas=sheet.getRange('G1:G'+sheet.getLastRow()).getValues();
var redatas =reserve.getDataRange().getValues();
function doPost(e) {
  var param = e.parameter;
  var key = param.key;
  var title = param.title;
  var price = param.price;
  var seller =param.seller;
  for(var i=1;i<datas.length;i++){
    if(datas[i][0]==key){
      sheet.deleteRow(i+1);
      remind(key,title,price,seller);
      return ContentService.createTextOutput('下架成功').setMimeType(ContentService.MimeType.TEXT);
    }
  }
  return ContentService.createTextOutput('下架失敗').setMimeType(ContentService.MimeType.TEXT);
}
function remind(key,title,price,seller){
  var html='商品名稱：'+title+'<br>商品價格：'+price;
  var arr=[];
  for(var i=0;i<redatas.length;i++){
    if(redatas[i][0]==key) {
      arr.push(redatas[i][4]);
    }
    else continue;
  }
  arr.join(',');
  MailApp.sendEmail(seller,'興大二手商品下架通知',{},{
    noReply:true,
    htmlBody:html,
    cc:arr.toString()
  })
}
