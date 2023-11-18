var reserve =SpreadsheetApp.openById('1QUihl3Fvsrh9oqxY9yqlPTxO-nAM1XgCEZoyNeYLTzI').getSheetByName('reserve');
var datas= reserve.getDataRange().getValues();
function doPost(e) {
  var param=e.parameter;
  var user = param.user;
  var key = param.key;
  if(user=='' || key=='') return ContentService.createTextOutput('failed').setMimeType(ContentService.MimeType.TEXT);
  else{
    for(var i=0;i<datas.length;i++){
      if(datas[i][0]==key && datas[i][4]){
        reserve.getRange('A'+(i+1)+':F'+(i+1)).clear();
        break;
      }
      else continue;
    }
  }
  return ContentService.createTextOutput('success').setMimeType(ContentService.MimeType.TEXT);
}
