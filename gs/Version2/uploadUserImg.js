const register =SpreadsheetApp.openById('1LLalJ3grfSsHKWKAro8tLxZZ-9eO5LY0GIVMobhhLTg').getSheetByName('user');
const datas =register.getDataRange().getValues();
function doPost(e) {
  var param =e.parameter;
  var user =param.user;
  var img =param.img;
  for(var i=0;i<datas.length;i++){
    if(datas[i][0]==user){
      register.getRange("D"+(i+1)).setValue(img);
      return ContentService.createTextOutput('success').setMimeType(ContentService.MimeType.TEXT);
    }
    else continue;
  }
  return ContentService.createTextOutput('failed').setMimeType(ContentService.MimeType.TEXT);
}
