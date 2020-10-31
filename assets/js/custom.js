
var myProtocol = window.location.protocol;
var mySite = window.location.host;
var myUrl = myProtocol + "//" + mySite + "/";
var dropDownList = {
  "businessCategory": [
    { "id": 1, "name": "All Categories" },
    { "id": 2, "name": "Arts" },
    { "id": 3, "name": "Business" },
    { "id": 4, "name": "Computer" },
    { "id": 5, "name": "Digital Marketing" },
    { "id": 6, "name": "Education" },
    { "id": 7, "name": "Finance" },
    { "id": 8, "name": "Food" },
    { "id": 9, "name": "Games" },
    { "id": 10, "name": "Health" },
    { "id": 11, "name": "Home" },
    { "id": 12, "name": "HR" },
    { "id": 13, "name": "Jewellers" },
    { "id": 14, "name": "Junk Removal" },
    { "id": 15, "name": "Kids and Teens" },
    { "id": 16, "name": "Lifestyle" },
    { "id": 17, "name": "Money and Finance" },
    { "id": 18, "name": "News" },
    { "id": 19, "name": "Pest Control" },
    { "id": 20, "name": "Photo Studio" },
    { "id": 21, "name": "Photography" },
    { "id": 22, "name": "Recreation" },
    { "id": 23, "name": "Reference" },
    { "id": 24, "name": "Regional" },
    { "id": 25, "name": "SAAS" },
    { "id": 26, "name": "Science" },
    { "id": 27, "name": "SEO Services" },
    { "id": 28, "name": "Shopping" },
    { "id": 29, "name": "Society" },
    { "id": 30, "name": "Sports" },
    { "id": 31, "name": "Transport" },
    { "id": 32, "name": "Travel" },
    { "id": 33, "name": "Waste Clearance" },
    { "id": 34, "name": "Web Directory" }

  ]
};

$( document ).ready(function() {
  loadTimingTable();
});

var weekDaysList=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]

function digitShow(n){
  return n > 9 ? "" + n: "0" + n;
}


function loadTimingTable()
{
  var tableId="timingTable";
  var tempData='';
  var loop = weekDaysList.length;
  var selectFromHrs=selectTimeHrs('selectFromHrs');
  var selectToHrs=selectTimeHrs('selectToHrs');
  var selectFromMins=selectTimeMins('selectFromMins')
  var selectToMins=selectTimeMins('selectToMins')
  for(var i=0;i<loop;i++)
  {
    tempData += '<tr><td>'+weekDaysList[i]+'</td>';
    tempData += '<td><input type="time" min=""  class="'+weekDaysList[i]+'_from"></td>';

    dropDown = selectToHrs.replace('selectToHrs',weekDaysList[i]+'_hrs_to');
    tempData += '<td><input type="time" min="" class="'+weekDaysList[i]+'_to"></td></tr>';
  }

  $('#timingTable').html(tempData);
}

function loadTimingTableDropDown()
{
  var tableId="timingTable";
  var tempData='';
  var loop = weekDaysList.length;
  var selectFromHrs=selectTimeHrs('selectFromHrs');
  var selectToHrs=selectTimeHrs('selectToHrs');
  var selectFromMins=selectTimeMins('selectFromMins')
  var selectToMins=selectTimeMins('selectToMins')
  for(var i=0;i<loop;i++)
  {
    tempData += '<tr><td>'+weekDaysList[i]+'</td>';
    var dropDown = selectFromHrs.replace('selectFromHrs',weekDaysList[i]+'_hrs_from');
    tempData += '<td>'+dropDown;
    dropDown = selectFromMins.replace('selectFromMins',weekDaysList[i]+'_mins_from');
    tempData += dropDown+'</td>';

    dropDown = selectToHrs.replace('selectToHrs',weekDaysList[i]+'_hrs_to');
    tempData += '<td>'+dropDown;
    dropDown = selectToMins.replace('selectToMins',weekDaysList[i]+'_mins_to');
    tempData += dropDown+'</td></tr>';
  }

  $('#timingTable').html(tempData);
}

function selectTimeHrs(className)
{
  var retTemp='<select class=" selectTimeHrs '+className+'" >';
  for(var i=0;i<24;i++)
  {
    var digit =digitShow(i);
    retTemp +='<option value="'+digit+'">'+digit+'</option>';
  }
  retTemp +='</select>';

  return retTemp;
}

function selectTimeMins(className)
{
  var retTemp='<select class=" selectTimeMins '+className+'" >';
  for(var i=0;i<60;i++)
  {
    var digit =digitShow(i);
    retTemp +='<option value="'+digit+'">'+digit+'</option>';
  }
  retTemp +='</select>';
  
  return retTemp;
}

$(document).on('click', '.formSubmit123', function () {
  var data = {};
  var apidata = {};

  $($('#' + formId).prop('elements')).each(function () {

    $(this).removeClass("sm-border-alert");
    if ($(this).hasClass("form-feild")) {
      data[$(this).attr("name")] = $(this).val();
    }

  });

  if (boolFlag) {
    var url = myUrl + myApiCalls["current_api"] + myApiCalls[formId];
    apidata["data"] = data;
    get_url_response(callType, url, apidata, "formHandler");
  }

});
$(document).on('keyup', '.number', function () {

  var ele = $(this).val();
  var wnum = $(this).attr("whole");
  var dnum = $(this).attr("decimal");
  if (dnum == "0") {
    var regex = new RegExp("^\\d{0," + wnum + "}?$");
    if (!regex.test($(this).val())) {
      $(this).val($(this).val().substring(0, $(this).val().length - 1));
    }
  } else {
    var regex = new RegExp("^\\d{0," + wnum + "}(\\.\\d{0," + dnum + "})?$");
    if (!regex.test($(this).val())) {
      $(this).val($(this).val().substring(0, $(this).val().length - 1));
    }
  }
});
function get_url_response(callType, url, data, func) {
  $.ajax({
    type: callType,
    url: url,
    data: data,
    async: false,
    success: function (data) {
      var objData = JSON.parse(data);
      if (func != '') {
        window[func](objData);
      }
    },
    error: function (xhr) { }
  });

}


// $("form#").submit(function(){
$(document).on("submit", "#businessList", function () {
  var formData = new FormData($(this)[0]);
  var Url = myUrl + 'apis/v1/business/';
  $.ajax({
    url: Url,
    type: 'POST',
    data: formData,
    async: false,
    success: function (data) {
      alert(data)
    },
    enctype: 'multipart/form-data',
    cache: false,
    contentType: false,
    processData: false
  });

  return false;
});


$(document).on('focus', '.loadDropdown', function () {

  $(this).blur();
  var dropDownType = $(this).attr("drop-type");

  var temp = '<div class="loadDropdown_div" style=" box-shadow: 0 3px 20px rgba(0,0,0,.2);border-radius: .25rem;padding: 15px;position: absolute;top:0;width: 350px;z-index: 100;background-color: #ffffff;height:300px;" ><input type="text" value="" drop-type="' + dropDownType + '" class="loadDropdown_input" style="border: 1px solid rgba(252,68,18,.3) !important;width:100%;margin-bottom:10px;" ><br>';
  var temp2 = loadDropDownDiv(dropDownType, 'a');
  temp = temp + '<ul class="loadDropdown_ul" style="list-style-type: none;margin:0;padding:0;height:250px;overflow-y:scroll;">' + temp2 + '</ul></div>';
  $('.loadDropdown_div').remove();
  $(this).parent().append(temp);
  
});

function loadDropDownDiv(dropDownType, strSearch) {
  strSearch = strSearch.toLowerCase();
  var dropDownVal = dropDownList[dropDownType];
  var loop = dropDownVal.length;
  var temp = '';
  var j = 0;
  for (var i = 0; i < loop; i++) {
    if ((dropDownVal[i].name.toLowerCase()).includes(strSearch) && j < 20) {
      temp = temp + '<li class="loadDropdown_class_li" style="padding:10px 0px;cursor: pointer;font-size:14px;" select-val="' + dropDownVal[i].id + '" >' + dropDownVal[i].name + '</li>'
      j = j + 1;
    }
  }

  return temp;
}

$(document).on('keyup', '.loadDropdown_input', function () {

  var dropDownType = $(this).attr("drop-type");
  var strSearch = $(this).val().toLowerCase();
  var temp = loadDropDownDiv(dropDownType, strSearch);

  $('.loadDropdown_ul').html(temp);

});

$(document).on('click', '.loadDropdown_class_li', function () {
  var dropDownType = $('.loadDropdown_input').attr("drop-type");
  var temp = '';
  temp = temp + '<option value="' + $(this).attr("select-val") + '" >' + $(this).html() + '</option>';
  $('.loadDropdown').each(function () {

    if ($(this).attr("drop-type") == dropDownType) {
      $(this).html(temp);
    }

  });

  $('.loadDropdown_div').remove();
});