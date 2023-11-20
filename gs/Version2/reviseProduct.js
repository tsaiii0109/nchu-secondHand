const product=SpreadsheetApp.openById('1_wamUoxajfCscy369v4Q2iCpTvIg41QrGZYKkPHo8is').getSheetByName('product');
const datas =product.getDataRange().getValues();
function doPost(e) {
  var param = e.parameter;
  var key = param.key;
  var title =param.title;
  var price =param.price;
  var intro =param.intro;
  var tag =param.tag;
  for(var i=0;i<datas.length;i++){
    if(datas[i][6]==key){
      var index =i+1;
      product.getRange('A'+index).setValue(title);
      product.getRange('B'+index).setValue(price);
      product.getRange('E'+index).setValue(intro);
      product.getRange('H'+index).setValue(tag);
      break;
    }
    else continue;
  }
  return ContentService.createTextOutput('success').setMimeType(ContentService.MimeType.TEXT);
}
