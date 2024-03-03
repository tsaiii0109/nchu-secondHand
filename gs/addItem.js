var sheet =SpreadsheetApp.openById('1_wamUoxajfCscy369v4Q2iCpTvIg41QrGZYKkPHo8is').getSheetByName('product');
function doPost(e) {
  var param = e.parameter;
  var key = new Date().getTime();
  var obj = [
    param.title,
    param.price,
    param.img1,
    param.img2,
    param.intro,
    param.mail,
    key,
    param.tag
  ]
  if(param.title=='' || param.price=='' || param.img1=='' || param.img2=='' || param.intro=='' || param.mail=='' || param.tag==''){
     return ContentService.createTextOutput('空白').setMimeType(ContentService.MimeType.TEXT);
  }
  else if(!new RegExp('^[0-9]*$').test(param.price)){
    return ContentService.createTextOutput('不可輸入數字').setMimeType(ContentService.MimeType.TEXT);
  }
  else{
    var html ='上架商品:'+param.title+'<br>上架價格：'+param.price+'<br>商品介紹：'+param.intro+'<br>商品標籤：'+param.tag+'<br>您的上架商品識別碼為：'+key;
    try{
      MailApp.sendEmail(param.mail,'二手商品上架通知',{},{
        noReply:true,
        htmlBody:html
      })
      sheet.appendRow(obj);
      sheet.getRange("I"+sheet.getLastRow()).setFormula('=COUNTIF(reserve!A1:A,G'+sheet.getLastRow()+')');
    }
    catch(e){
      return ContentService.createTextOutput('上架失敗').setMimeType(ContentService.MimeType.TEXT);
    }
  }
  return ContentService.createTextOutput('上架成功').setMimeType(ContentService.MimeType.TEXT);
}

