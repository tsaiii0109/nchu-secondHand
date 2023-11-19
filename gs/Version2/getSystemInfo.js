var sheet =SpreadsheetApp.getActive().getSheetByName('main');
var datas =sheet.getDataRange().getValues();
function doPost(e) {
  var param =e.parameter;
  var user = param.user;
  var output=[];
  try{
      for(var i=0;i<datas.length;i++){
        if(datas[i][0]==user){
          output.push({
            content:datas[i][1],
            date:datas[i][2]
          })
        }
        else continue;
      }
  }catch(e){
    return ContentService.createTextOutput('failed with error in backend').setMimeType(ContentService.MimeType.JSON);
  }
  return ContentService.createTextOutput(JSON.stringify(output)).setMimeType(ContentService.MimeType.JSON);
}
