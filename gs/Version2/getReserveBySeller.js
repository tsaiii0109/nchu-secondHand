var reserve = SpreadsheetApp.openById('1QUihl3Fvsrh9oqxY9yqlPTxO-nAM1XgCEZoyNeYLTzI').getSheetByName('reserve');
var datas =reserve.getDataRange().getValues();
var arr=[];
function doPost(e){
  var param =e.parameter;
  var user = param.user;
  for(var i=0;i<datas.length;i++){
    if(datas[i][1]==user){
      arr.push({
        'key':datas[i][0],
        'seller':datas[i][1],
        'content':datas[i][2],
        'price':datas[i][3],
        'buyer':datas[i][4],
        'date':datas[i][5]
      })
    }
    else continue;
  }
  return ContentService.createTextOutput(JSON.stringify(arr)).setMimeType(ContentService.MimeType.JSON);
}
