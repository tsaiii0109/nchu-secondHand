var sheet =SpreadsheetApp.openById('1i03SvdrmkbKigXnAipdOKj8wdEz91rkeq9iA9KtkBxI');
var one = sheet.getSheetByName('宿舍用品').getDataRange().getValues();
var two = sheet.getSheetByName('電子用品').getDataRange().getValues();
var three = sheet.getSheetByName('書籍').getDataRange().getValues();
var four = sheet.getSheetByName('零食').getDataRange().getValues();
var five = sheet.getSheetByName('衣物').getDataRange().getValues();
var six = sheet.getSheetByName('其他').getDataRange().getValues();
function doGet() {
  var a=[],b=[],c=[],d=[],e=[],f=[]
  for(var i=0;i<one.length;i++){
    a.push({
      id:i+1,
      title:one[i][0],
      price:one[i][1],
      img1:one[i][2],
      img2:one[i][3],
      intro:one[i][4],
      mail:one[i][5],
      key:one[i][6],
      tag:one[i][7],
      per:one[i][8]
    })
  }
  for(var i=0;i<two.length;i++){
    b.push({
      id:i+1,
      title:two[i][0],
      price:two[i][1],
      img1:two[i][2],
      img2:two[i][3],
      intro:two[i][4],
      mail:two[i][5],
      key:two[i][6],
      tag:two[i][7],
      per:two[i][8]
    })
  }
  for(var i=0;i<three.length;i++){
    c.push({
      id:i+1,
      title:three[i][0],
      price:three[i][1],
      img1:three[i][2],
      img2:three[i][3],
      intro:three[i][4],
      mail:three[i][5],
      key:three[i][6],
      tag:three[i][7],
      per:three[i][8]
    })
  }
  for(var i=0;i<four.length;i++){
    d.push({
      id:i+1,
      title:four[i][0],
      price:four[i][1],
      img1:four[i][2],
      img2:four[i][3],
      intro:four[i][4],
      mail:four[i][5],
      key:four[i][6],
      tag:four[i][7],
      per:four[i][8]
    })
  }
  for(var i=0;i<five.length;i++){
    e.push({
      id:i+1,
      title:five[i][0],
      price:five[i][1],
      img1:five[i][2],
      img2:five[i][3],
      intro:five[i][4],
      mail:five[i][5],
      key:five[i][6],
      tag:five[i][7],
      per:five[i][8]
    })
  }
  for(var i=0;i<six.length;i++){
    f.push({
      id:i+1,
      title:six[i][0],
      price:six[i][1],
      img1:six[i][2],
      img2:six[i][3],
      intro:six[i][4],
      mail:six[i][5],
      key:six[i][6],
      tag:six[i][7],
      per:six[i][8]
    })
  }
  var output={
    '宿舍用品':a,
    '電子用品':b,
    '書籍':c,
    '零食':d,
    '衣物':e,
    '其他':f,
  };
  return ContentService.createTextOutput(JSON.stringify(output)).setMimeType(ContentService.MimeType.JSON);
}
