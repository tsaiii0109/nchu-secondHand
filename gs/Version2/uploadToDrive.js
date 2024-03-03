const sheet =SpreadsheetApp.openById('1_wamUoxajfCscy369v4Q2iCpTvIg41QrGZYKkPHo8is').getSheetByName('product');
const test =SpreadsheetApp.getActive();
const dataRanForSin="C2:C"+sheet.getLastRow();
const datasForSin =sheet.getRange(dataRanForSin).getValues();
const dataRanForMul ="D2:D"+sheet.getLastRow();
const datasForMul =sheet.getRange(dataRanForMul).getValues();

function main(){
  startSin();
  startMul();
}
function startSin(){
  try{
    for(var i=0;i<datasForSin.length;i++) {
      if(!datasForSin[i][0].includes('https://drive.google.com/uc')) work(datasForSin[i][0],i+2);
    }
  }catch(e){}
}
function startMul(){
  try{
    for(var i=0;i<datasForMul.length;i++){
      var json = JSON.parse(datasForMul[i][0]);
      if(!json[0].includes('https://drive.google.com/uc')) works(json,i+2);
    } 
  }catch(e){}
}
function work(str,index){
  var base64Str=str;
  var fileName=new Date().getTime();
  id = create(fileName,base64Str);
  src= getSrc(getFileUrl(id));
  sheet.getRange("C"+index).setValue(src);
}
function works(arr,index) {
  var base64Str;
  var fileName;
  var id;
  var src;
  var newArr=[];
  for(var obj in arr){
    try{
        base64Str=arr[obj];
        fileName=new Date().getTime();
        id = create(fileName,base64Str);
        src= getSrc(getFileUrl(id));
        newArr.push(src);
    }catch(e){
        rollback(id);
    } 
  }
  sheet.getRange("D"+index).setValue(JSON.stringify(newArr));
}
function getFolder(){
  var folders=DriveApp.getFoldersByName("upload");
  while(folders.hasNext()){
    var folder=folders.next();
    return folder;
  }
}
function create(fileName,base64Str){
  var mimeType=base64Str.split(";")[0].split(":")[1];
  var base64=base64Str.split(",")[1];
  var blob = Utilities.newBlob(Utilities.base64Decode(base64),mimeType, fileName);
  var file = getFolder().createFile(blob);
  return file.getId();
}
function getFileUrl(id){
  var file = DriveApp.getFileById(id);
  file.setSharing(DriveApp.Access.ANYONE,DriveApp.Permission.VIEW);
  return file.getUrl();
}
function getSrc(url){
  if(url.split("/")[5]!=undefined) url="https://drive.google.com/uc?id="+url.split("/")[5]
  return url;
}
function rollback(id){
  var file =DriveApp.getFileById(id);
  file.setTrashed(true);
}