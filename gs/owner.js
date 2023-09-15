var sheet =SpreadsheetApp.openById('1i03SvdrmkbKigXnAipdOKj8wdEz91rkeq9iA9KtkBxI').getSheetByName('product');
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
