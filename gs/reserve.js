var sheet = SpreadsheetApp.getActive().getSheetByName('reserve');
function doPost(e) {
  var param =e.parameter;
  var buyer= param.buyer;
  var seller = param.seller;
  var title=param.title;
  var img =param.img;
  var price=param.price;
  var intro=param.intro;
  var key =param.key;
  try{
    var html = '預約者：'+buyer+'<br>商品名稱：'+title+'<br>商品價格：'+price+'<br>商品介紹：'+intro+'<br>商品快照：'+img+'<br>賣家聯絡：'+seller;
    MailApp.sendEmail(seller,'預約通知函',{},{
      noReply:true,
      htmlBody:html,
      cc:buyer
    })
    sheet.appendRow([key,seller,title,price,buyer]);
  }catch(e){
    return ContentService.createTextOutput('failed').setMimeType(ContentService.MimeType.TEXT);
  }
  return ContentService.createTextOutput('預約成功').setMimeType(ContentService.MimeType.TEXT);
}
