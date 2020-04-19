let key = '?key=AIzaSyCrg4I0wSZMMQ9_uWbW6pXQLFoTerawhGM';
let spreadsheetUrl = 'https://sheets.googleapis.com/v4/spreadsheets/1SKcwrXRwEcgj9s6mrj1K26xj_lWFXP0oSvdu4Zmojiw/values/';

function getPangData() {
  let sheetNameRange = "Report!A1:B13";

  $.ajax({
    url: spreadsheetUrl + sheetNameRange + key,
    type: "GET",
    success: function (data) {
      parseJSON = data.values;

      //console.log(parseJSON);

      asOfDate = parseJSON[0][1];
      totalCasesNum = parseJSON[1][1];
      totalDeathNum = parseJSON[2][1];
      totalConfinedNum = parseJSON[3][1];
      totalRecoveredNum = parseJSON[4][1];
      totalPUINum = parseJSON[5][1];
      totalPUIDeathNum = parseJSON[6][1];
      totalPUIConfinedNum = parseJSON[7][1];
      totalPUIRecoveredNum = parseJSON[8][1];
      totalPUMNum = parseJSON[9][1];
      totalPUMQuarantinedNum = parseJSON[10][1];
      totalPUMCompletedQuarantineNum = parseJSON[11][1];
      totalPUMIncompleteQuarantineNum = parseJSON[12][1];
    },
    error: function (data) {
      console.log(data);
    },
    complete: function (data) {
      PangObjData = {
        "asOfDate": asOfDate,
        "totalCasesNum": totalCasesNum,
        "totalDeathNum": totalDeathNum,
        "totalConfinedNum": totalConfinedNum,
        "totalRecoveredNum": totalRecoveredNum,
        "totalPUINum": totalPUINum,
        "totalPUIDeathNum": totalPUIDeathNum,
        "totalPUIConfinedNum": totalPUIConfinedNum,
        "totalPUIRecoveredNum": totalPUIRecoveredNum,
        "totalPUMNum": totalPUMNum,
        "totalPUMQuarantinedNum": totalPUMQuarantinedNum,
        "totalPUMCompletedQuarantineNum": totalPUMCompletedQuarantineNum,
        "totalPUMIncompleteQuarantineNum": totalPUMIncompleteQuarantineNum
      }
      renderData(PangObjData);
    }
  });
}
function populateTownTable(townCasesCount) {
  $.ajax({
    url: "https://raw.githubusercontent.com/ajdeguzman/pangasinan-covid19-tracker/master/json/calasiao-barangays-code.json",
    type: "GET",
    success: function (data) {
      var town = $.parseJSON(data);
      var table = $('#townListTable'); 

      town.forEach((v, i) => {
        jsonTown = town[i].cityName;
        jsonCaseCount = townCasesCount[i];
        table.append("<tr><td>" + jsonTown + "</td><td>"+ jsonCaseCount +"</td></tr>");
      })
    }
  });
}

var getCasesPerTown = function() {
  let sheetNameRange = "'By Municipality'!K2:K49";
  $.ajax({
    url: spreadsheetUrl + sheetNameRange + key,
    type: "GET",
    success: function (data) {
      parseJSON = data.values;
      populateTownTable(parseJSON);
    },
    error: function (data) {
      console.log(data);
    },
    complete: function (data) {
      console.log(data);
    }
  });
}
function renderData(PangObjData) {

  $("#asOfDate").append('<br>(As of ' + PangObjData.asOfDate + ')');

  $("#totalCasesNum").html(PangObjData.totalCasesNum);

  $("#totalConfinedNum").html(PangObjData.totalConfinedNum);

  $("#totalRecoveredNum").html(PangObjData.totalRecoveredNum);

  $("#totalDeathNum").html(PangObjData.totalDeathNum);

  $("#totalPUINum").html(PangObjData.totalPUINum);

  $("#totalPUIDeathNum").html(PangObjData.totalPUIDeathNum);

  $("#totalPUIConfinedNum").html(PangObjData.totalPUIConfinedNum);

  $("#totalPUIRecoveredNum").html(PangObjData.totalPUIRecoveredNum);

  $("#totalPUMNum").html(PangObjData.totalPUMNum);

  $("#totalPUMQuarantinedNum").html(PangObjData.totalPUMQuarantinedNum);

  $("#totalPUMCompletedQuarantineNum").html(PangObjData.totalPUMCompletedQuarantineNum);

  $("#totalPUMIncompleteQuarantineNum").html(PangObjData.totalPUMIncompleteQuarantineNum);
}


function render() {
  getCasesPerTown();
  getPangData();
  //.then(nConVList);
}

render();