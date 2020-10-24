
var myProtocol = window.location.protocol;
var mySite = window.location.host;
var myUrl = myProtocol + "//" + mySite + "/";
var dropDownList = {
  "businessCategory": [
    { "id": 1, "name": "All Categories" },
    { "id": 1, "name": "Arts" },
    { "id": 1, "name": "Business" },
    { "id": 1, "name": "Computer" },
    { "id": 1, "name": "Digital Marketing" },
    { "id": 1, "name": "Education" },
    { "id": 1, "name": "Finance" },
    { "id": 1, "name": "Food" },
    { "id": 1, "name": "Games" },
    { "id": 1, "name": "Health" },
    { "id": 1, "name": "Home" },
    { "id": 1, "name": "HR" },
    { "id": 1, "name": "Jewellers" },
    { "id": 1, "name": "Junk Removal" },
    { "id": 1, "name": "Kids and Teens" },
    { "id": 1, "name": "Lifestyle" },
    { "id": 1, "name": "Money and Finance" },
    { "id": 1, "name": "News" },
    { "id": 1, "name": "Pest Control" },
    { "id": 1, "name": "Photo Studio" },
    { "id": 1, "name": "Photography" },
    { "id": 1, "name": "Recreation" },
    { "id": 1, "name": "Reference" },
    { "id": 1, "name": "Regional" },
    { "id": 1, "name": "SAAS" },
    { "id": 1, "name": "Science" },
    { "id": 1, "name": "SEO Services" },
    { "id": 1, "name": "Shopping" },
    { "id": 1, "name": "Society" },
    { "id": 1, "name": "Sports" },
    { "id": 1, "name": "Transport" },
    { "id": 1, "name": "Travel" },
    { "id": 1, "name": "Waste Clearance" },
    { "id": 1, "name": "Web Directory" }

  ]
};
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

  var dropDownType = $(this).attr("drop-type");

  var temp = '<div class="loadDropdown_div" ><input type="text" value="" drop-type="' + dropDownType + '" class="loadDropdown_input" ><br>';
  var temp2 = loadDropDownDiv(dropDownType, 'a');
  temp = temp + temp2 + '</div>';
  $('.loadDropdown_div').remove();
  $(this).parent().append(temp);
});

function loadDropDownDiv(dropDownType, strSearch) {
  strSearch = strSearch.toLowerCase();
  var dropDownVal = dropDownList[dropDownType];
  var loop = dropDownVal.length;
  var temp = '<ul class="loadDropdown_ul">';
  var j = 0;
  for (var i = 0; i < loop; i++) {
    if ((dropDownVal[i].name.toLowerCase()).includes(str) && j < 5) {
      temp = temp + '<li class="loadDropdown_class_li" select-val="' + dropDownVal[i].id + '" >' + dropDownVal[i].name + '</li>'
      j = j + 1;
    }
  }
  temp = temp + '</ul>';
  return temp;
}

$(document).on('keyup', '.loadDropdown_input', function () {

  var dropDownType = $(this).attr("drop-type");
  var strSearch = $(this).val().toLowerCase();
  var temp = loadDropDownDiv(dropDownType, strSearch);

  $('.loadDropdown_div_ul').html(temp);

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