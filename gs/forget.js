const sheet = SpreadsheetApp.openById('1LLalJ3grfSsHKWKAro8tLxZZ-9eO5LY0GIVMobhhLTg').getSheetByName('user');
const datas = sheet.getDataRange().getValues();
function doPost(e) {
  var param =e.parameter;
  var user = param.user;
  if(user=='') return ContentService.createTextOutput('failed').setMimeType(ContentService.MimeType.TEXT);
  else{
    var target={
      user:'',
      password:'',
      verification:''
    }
    for(var i=0;i<datas.length;i++){
      if(datas[i][0]==user){
        target.user=datas[i][0];
        target.password=datas[i][1];
        target.verification=datas[i][2];
        break;
      }
      else continue;
    }
    var html = '帳號：'+target.user+'<br>密碼：'+target.password+'<br>驗證碼：'+target.verification;
    try{
      MailApp.sendEmail(target.user,'興大二手拍賣APP - 找回密碼','',{
        noReply:true,
        htmlBody:html
      })
    }catch(e){
      return ContentService.createTextOutput('failed').setMimeType(ContentService.MimeType.TEXT);
    }
    return ContentService.createTextOutput('success').setMimeType(ContentService.MimeType.TEXT);
  }
}
