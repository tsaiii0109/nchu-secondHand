var reserve =SpreadsheetApp.openById('1QUihl3Fvsrh9oqxY9yqlPTxO-nAM1XgCEZoyNeYLTzI').getSheetByName('reserve');
var system= SpreadsheetApp.openById('1XCOi7LaE0z4Qm8qromSBa_NS_atyErqxqy_o2-txLhg').getSheetByName('main');
var datas= reserve.getDataRange().getValues();
function doPost(e) {
  var param=e.parameter;
  var user = param.user;
  var key = param.key;
  if(user=='' || key=='') return ContentService.createTextOutput('failed').setMimeType(ContentService.MimeType.TEXT);
  else{
    for(var i=0;i<datas.length;i++){
      if(datas[i][0]==key && datas[i][1]==user){
        reserve.getRange('A'+(i+1)+':F'+(i+1)).clear();
        system.appendRow([datas[i][4],datas[i][1]+' 於 '+ new Date().toLocaleDateString()+' 完成對您的預約：「'+datas[i][2]+'」的訂單',new Date().getTime()]);
        break;
      }
      else continue;
    }
  }
  return ContentService.createTextOutput('success').setMimeType(ContentService.MimeType.TEXT);
}
