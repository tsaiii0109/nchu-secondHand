var sheet = SpreadsheetApp.getActive().getSheetByName('reserve');
var system= SpreadsheetApp.openById('1XCOi7LaE0z4Qm8qromSBa_NS_atyErqxqy_o2-txLhg').getSheetByName('main');
var product=SpreadsheetApp.openById('1_wamUoxajfCscy369v4Q2iCpTvIg41QrGZYKkPHo8is');
var keyArr = product.getRange('G2:G'+product.getLastRow()).getValues();
function doPost(e) {
  var param =e.parameter;
  var buyer= param.buyer;
  var seller = param.seller;
  var title=param.title;
  var img =param.img;
  var price=param.price;
  var intro=param.intro;
  var key =param.key;
  if(keyArr.find(el=>el[0]==key)){
    try{
        var html = '預約者：'+buyer+'<br>商品名稱：'+title+'<br>商品價格：'+price+'<br>商品介紹：'+intro+'<br>賣家聯絡：'+seller+'<br><img src="'+img+'">';
        MailApp.sendEmail(seller,'預約通知函',{},{
          noReply:true,
          htmlBody:html,
          cc:buyer,
          attachments:createBlob(img)
        })
        sheet.appendRow([key,seller,title,price,buyer,new Date()]);
        system.appendRow([seller,buyer+' 於 '+new Date().toLocaleDateString()+' 預約了您的商品: '+title,new Date().getTime()]);
    }catch(e){
      return ContentService.createTextOutput('failed').setMimeType(ContentService.MimeType.TEXT);
    }
  }
  else return ContentService.createTextOutput('product not found').setMimeType(ContentService.MimeType.TEXT);
  return ContentService.createTextOutput('預約成功').setMimeType(ContentService.MimeType.TEXT);
}
function createBlob(base64){
  try{
    var mimeType = base64.split(";")[0].split(":")[1];
    var data= Utilities.base64Decode(base64.split(";")[1].split(",")[1]); 
    return [Utilities.newBlob(data,mimeType,'商品快照')];
  }catch(e){
    return [];
  }
}