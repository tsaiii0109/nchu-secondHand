var sheet = SpreadsheetApp.getActive().getSheetByName('forum');
var datas = sheet.getDataRange().getValues();
function doGet() {
  var output=[];
  for(var i=0;i<datas.length;i++){
    output.push({
      user:datas[i][0],
      content:datas[i][1],
      date:datas[i][2].toLocaleDateString(),
      key:datas[i][3]
    })
  }
  return ContentService.createTextOutput(JSON.stringify(output)).setMimeType(ContentService.MimeType.JSON);
}
function doPost(e){
  var param =e.parameter;
  var user =param.user;
  var content=param.content;
  var date =new Date().toLocaleDateString();
  var key = new Date().getTime();
  if(user=='' || content=='') return ContentService.createTextOutput('failed').setMimeType(ContentService.MimeType.TEXT);
  else{
    sheet.appendRow([user,content,date,key]);
    return ContentService.createTextOutput('success').setMimeType(ContentService.MimeType.TEXT);
  }
}
function test(){
  console.log(new Date(sheet.getRange("C7").getValue()).toLocaleDateString())
}

