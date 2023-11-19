var sheet =SpreadsheetApp.openById('1_wamUoxajfCscy369v4Q2iCpTvIg41QrGZYKkPHo8is').getSheetByName('product');
var reserve =SpreadsheetApp.openById('1QUihl3Fvsrh9oqxY9yqlPTxO-nAM1XgCEZoyNeYLTzI').getSheetByName('reserve');
var system= SpreadsheetApp.openById('1XCOi7LaE0z4Qm8qromSBa_NS_atyErqxqy_o2-txLhg').getSheetByName('main');
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
  var html='商品名稱：'+title+'<br>商品價格：'+price+'<br>賣家名稱：'+seller;
  var arr=[];
  for(var i=0;i<redatas.length;i++){
    if(redatas[i][0]==key) {
      arr.push(redatas[i][4]);
      system.appendRow([redatas[i][4],seller+' 於 '+ new Date().toLocaleDateString()+' 下架了您預約的商品： '+title,new Date().getTime()]);
      reserve.getRange("A"+(i+1)+":F"+(i+1)).clear();
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
