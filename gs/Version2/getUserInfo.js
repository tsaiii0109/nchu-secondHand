var register =SpreadsheetApp.openById('1LLalJ3grfSsHKWKAro8tLxZZ-9eO5LY0GIVMobhhLTg').getSheetByName('user');
var datas =register.getDataRange().getValues();
var output={};
function doPost(e) {
  var param = e.parameter;
  var user=param.user;
  var password = param.password;
  var key = param.key;
  if(user=='' || password=='' || key=='') return ContentService.createTextOutput('failed').setMimeType(ContentService.MimeType.TEXT);
  else{
    for(var i=0;i<datas.length;i++){
      if(datas[i][0]==user && datas[i][1]==password && datas[i][2]==key){
        output={
          'user':datas[i][0],
          'password':datas[i][1],
          'key':datas[i][2],
          'img':datas[i][3],
        };
        break;
      }
      else continue;
    }
  }
  return ContentService.createTextOutput(JSON.stringify(output)).setMimeType(ContentService.MimeType.JSON);
}
