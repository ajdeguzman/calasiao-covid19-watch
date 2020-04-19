let key = '?key=AIzaSyCrg4I0wSZMMQ9_uWbW6pXQLFoTerawhGM';
let spreadsheetUrl = 'https://sheets.googleapis.com/v4/spreadsheets/1SKcwrXRwEcgj9s6mrj1K26xj_lWFXP0oSvdu4Zmojiw/values/';

function getPangData() {
  let sheetNameRange = "Report!A1:B7";

  $.ajax({
    url: spreadsheetUrl + sheetNameRange + key,
    type: "GET",
    success: function (data) {
      parseJSON = data.values;

      //console.log(parseJSON);

      asOfDate = parseJSON[0][1];
      totalCasesNum = parseJSON[1][1];
      probableNum = parseJSON[2][1];
      suspectNum = parseJSON[3][1];
      totalPUMNum = parseJSON[4][1];
      totalPUMCompletedQuarantineNum  = parseJSON[5][1];
      totalPUMUnderQuarantineNum = parseJSON[6][1];
    },
    error: function (data) {
      console.log(data);
    },
    complete: function (data) {
      PangObjData = {
        "asOfDate": asOfDate,
        "totalCasesNum": totalCasesNum,
        "probableNum": probableNum,
        "suspectNum": suspectNum,
        "totalPUMNum": totalPUMNum,
        "totalPUMCompletedQuarantineNum": totalPUMCompletedQuarantineNum,
        "totalPUMUnderQuarantineNum": totalPUMUnderQuarantineNum
      }
      renderData(PangObjData);
    }
  });
}
function populateTownTable(townCasesCount) {
  $.ajax({
    url: "https://raw.githubusercontent.com/ajdeguzman/calasiao-covid19-watch/master/json/calasiao-barangays-code.json",
    type: "GET",
    success: function (data) {
      var town = $.parseJSON(data);
      var table = $('#townListTable'); 
      console.log(town);
      town.forEach((v, i) => {
        jsonTown = town[i].cityName;
        jsonCaseCount = townCasesCount[i];
       table.append("<tr><td>" + jsonTown + "</td><td>"+ jsonCaseCount +"</td></tr>");
      })
    }
  });
}

var getCasesPerTown = function() {
  let sheetNameRange = "'By Barangay'!G2:G25";
  $.ajax({
    url: spreadsheetUrl + sheetNameRange + key,
    type: "GET",
    success: function (data) {
      parseJSON = data.values;
      console.log(parseJSON);
      populateTownTable(parseJSON);
    },
    error: function (data) {
    //  console.log(data);
    },
    complete: function (data) {
    //  console.log(data);
    }
  });
}
function renderData(PangObjData) {

  $("#asOfDate").append('<br>(As of ' + PangObjData.asOfDate + ')');

  $("#totalCasesNum").html(PangObjData.totalCasesNum);

  $("#probableNum").html(PangObjData.probableNum);

  $("#suspectNum").html(PangObjData.suspectNum);

  $("#totalPUMNum").html(PangObjData.totalPUMNum);

  $("#totalPUMUnderQuarantineNum").html(PangObjData.totalPUMUnderQuarantineNum);

  $("#totalPUMCompletedQuarantineNum").html(PangObjData.totalPUMCompletedQuarantineNum);
}


function render() {
  getCasesPerTown();
  getPangData();
  //.then(nConVList);
}

render();