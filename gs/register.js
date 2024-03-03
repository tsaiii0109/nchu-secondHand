var sheet =SpreadsheetApp.getActive().getSheetByName('user');
function doPost(e) {
    var param =e.parameter;
    var user = param.user;
    var password = param.password;
    if(user=='' || password=='') return ContentService.createTextOutput('failed').setMimeType(ContentService.MimeType.TEXT);
    if(!user.includes('gmail') && !user.includes('yahoo') && !user.includes('outlook')){
      if(checkRepeat(user)) return ContentService.createTextOutput('使用者已存在').setMimeType(ContentService.MimeType.TEXT);
      else{
        var code = (new Date().getTime());
        var html ='登入帳號:'+user+'<br>密碼：'+password+'<br>您的登入驗證識別碼為：'+code
        try{
          MailApp.sendEmail(user,'校園二手拍賣APP註冊驗證碼',{},{
            noReply:true,
            htmlBody:html
          })
          sheet.appendRow([user,password,code]);
          return ContentService.createTextOutput('註冊成功').setMimeType(ContentService.MimeType.TEXT);
        }catch(e){
          return ContentService.createTextOutput('無效電子信箱').setMimeType(ContentService.MimeType.TEXT);
        }
      }
    }
    else return ContentService.createTextOutput('請使用有效電子信箱註冊').setMimeType(ContentService.MimeType.TEXT);
}
function checkRepeat(user){
  var data = sheet.getRange("A1:A"+sheet.getLastRow()).getValues();
  for(var i=0;i<data.length;i++){
    if(data[i][0]==user) return true;
    else continue;
  }
  return false;
}
