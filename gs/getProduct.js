var sheet =SpreadsheetApp.getActive().getSheetByName('product');
var datas =sheet.getDataRange().getValues();
function doGet() {
  var output=[];
  for(var i=1;i<datas.length;i++){
    output.push({
      id:i,
      title:datas[i][0],
      price:datas[i][1],
      img1:datas[i][2],
      img2:datas[i][3],
      intro:datas[i][4],
      mail:datas[i][5],
      key:datas[i][6],
      tag:datas[i][7],
      per:datas[i][8]
    })
  }
  return ContentService.createTextOutput(JSON.stringify(output)).setMimeType(ContentService.MimeType.JSON);
}