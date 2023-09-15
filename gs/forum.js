var sheet = SpreadsheetApp.getActive().getSheetByName('forum');
var datas = sheet.getDataRange().getValues();
function doGet() {
  var output=[];
  for(var i=0;i<datas.length;i++){
    output.push({
      user:datas[i][0],
      content:datas[i][1],
      date:datas[i][2].toLocaleDateString()
    })
  }
  return ContentService.createTextOutput(JSON.stringify(output)).setMimeType(ContentService.MimeType.JSON);
}
function doPost(e){
  var param =e.parameter;
  var user =param.user;
  var content=param.content;
  var date =new Date().toLocaleDateString();
  if(user=='' || content=='') return ContentService.createTextOutput('failed').setMimeType(ContentService.MimeType.TEXT);
  else{
    var html='您於 '+date+' 在興大二手拍發布了一則留言：<br>'+content;
    try{
      MailApp.sendEmail(user,'興大二手拍發布留言通知',{},{
        noReply:true,
        htmlBody:html
      })
    }catch(e){
      return ContentService.createTextOutput('無效電子信箱').setMimeType(ContentService.MimeType.TEXT);
    }
    sheet.appendRow([user,content,date]);
    return ContentService.createTextOutput('success').setMimeType(ContentService.MimeType.TEXT);
  }
}
function test(){
  console.log(new Date(sheet.getRange("C7").getValue()).toLocaleDateString())
}
