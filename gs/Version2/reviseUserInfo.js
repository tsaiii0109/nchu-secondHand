var register =SpreadsheetApp.openById('1LLalJ3grfSsHKWKAro8tLxZZ-9eO5LY0GIVMobhhLTg').getSheetByName('user');
var datas =register.getDataRange().getValues();
function doPost(e) {
  var param = e.parameter;
  var user=param.user;
  var password = param.password;
  var key = param.key;
  if(user=='' || password=='' || key=='') return ContentService.createTextOutput('failed').setMimeType(ContentService.MimeType.TEXT);
  else{
    for(var i=0;i<datas.length;i++){
      if(datas[i][0]==user){
        register.getRange('A'+(i+1)+':C'+(i+1)).setValues([[user,password,key]]);
        break;
      }
      else continue;
    }
  }
  return ContentService.createTextOutput('success').setMimeType(ContentService.MimeType.TEXT);
}
