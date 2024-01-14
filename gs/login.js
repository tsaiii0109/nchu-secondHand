var sheet =SpreadsheetApp.openById('1LLalJ3grfSsHKWKAro8tLxZZ-9eO5LY0GIVMobhhLTg').getSheetByName('user');
var datas = sheet.getDataRange().getValues();
function doPost(e) {
  var param =e.parameter;
  var user = param.user;
  var password= param.password;
  var code =param.code;
  for(var i=0;i<datas.length;i++){
    if(datas[i][0]==user){
      if(datas[i][1]==password && datas[i][2]==code) 
        return ContentService.createTextOutput('登入成功').setMimeType(ContentService.MimeType.TEXT);
      else
        return ContentService.createTextOutput('帳號/密碼/驗證碼錯誤').setMimeType(ContentService.MimeType.TEXT);
    }
    else continue;
  }
  return ContentService.createTextOutput('使用者不存在').setMimeType(ContentService.MimeType.TEXT);
}

