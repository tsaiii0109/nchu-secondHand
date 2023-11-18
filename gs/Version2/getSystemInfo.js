var sheet =SpreadsheetApp.getActive();
var datas =sheet.getDataRange().getValues();
function doGet() {
  var output=[];
  for(var i=0;i<datas.length;i++){
    output.push({
      content:datas[i][0],
      date:datas[i][1].toLocaleDateString(),
      key:datas[i][2]
    })
  }
  console.log(output)
  return ContentService.createTextOutput(JSON.stringify(output)).setMimeType(ContentService.MimeType.JSON);
}
