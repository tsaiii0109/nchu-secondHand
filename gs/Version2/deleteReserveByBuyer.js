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
      if(datas[i][0]==key && datas[i][4]==user){
        reserve.getRange('A'+(i+1)+':F'+(i+1)).clear();
        system.appendRow([datas[i][1],datas[i][4]+' 於 '+ new Date().toLocaleDateString()+' 取消對您的商品：「'+datas[i][2]+'」的預約',new Date().getTime()]);
        break;
      }
      else continue;
    }
  }
  return ContentService.createTextOutput('success').setMimeType(ContentService.MimeType.TEXT);
}
