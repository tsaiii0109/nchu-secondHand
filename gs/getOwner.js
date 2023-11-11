var sheet =SpreadsheetApp.openById('1_wamUoxajfCscy369v4Q2iCpTvIg41QrGZYKkPHo8is').getSheetByName('product');
var datas =sheet.getDataRange().getValues();
function doPost(e) {
  var param=e.parameter;
  var mail=param.mail;
  var output=[];
  for(var i=0;i<datas.length;i++){
    if(datas[i][5]==mail){
      output.push({
        title:datas[i][0],
        price:datas[i][1],
        key:datas[i][6],
      })
    }
  }
  return ContentService.createTextOutput(JSON.stringify(output)).setMimeType(ContentService.MimeType.JSON);
}
