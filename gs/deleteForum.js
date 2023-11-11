var sheet =SpreadsheetApp.openById('1Nu71JAfG_zc_32TTc_b8bsoHfWxDXUvh_JTGVJN9H5U').getSheetByName('forum');
var datas = sheet.getRange("D1:D"+sheet.getLastRow()).getValues();
function doPost(e) {
  var param =e.parameter;
  var key =param.key;
  for(var i=0;i<datas.length;i++){
    if(key==datas[i][0]){
      sheet.deleteRow(i+1);
      return ContentService.createTextOutput('success').setMimeType(ContentService.MimeType.TEXT);
    }
    else continue;
  }
  return ContentService.createTextOutput('failed').setMimeType(ContentService.MimeType.TEXT);
}

