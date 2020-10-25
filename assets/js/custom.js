
var myProtocol = window.location.protocol;
var mySite = window.location.host;
var myUrl = myProtocol + "//" + mySite + "/";
var dropDownList = {
  "businessCategory": [
    {"id":1,"name":"All Categories"},
     {"id":2,"name":"Arts"},
     {"id":3,"name":"Business"},
     {"id":4,"name":"Computer"},
     {"id":5,"name":"Digital Marketing"},
     {"id":6,"name":"Education"},
     {"id":7,"name":"Finance"},
     {"id":8,"name":"Food"},
     {"id":9,"name":"Games"},
     {"id":10,"name":"Health"},
     {"id":11,"name":"Home"},
     {"id":12,"name":"HR"},
     {"id":13,"name":"Jewellers"},
     {"id":14,"name":"Junk Removal"},
     {"id":15,"name":"Kids and Teens"},
     {"id":16,"name":"Lifestyle"},
     {"id":17,"name":"Money and Finance"},
     {"id":18,"name":"News"},
     {"id":19,"name":"Pest Control"},
     {"id":20,"name":"Photo Studio"},
     {"id":21,"name":"Photography"},
     {"id":22,"name":"Recreation"},
     {"id":23,"name":"Reference"},
     {"id":24,"name":"Regional"},
     {"id":25,"name":"SAAS"},
     {"id":26,"name":"Science"},
     {"id":27,"name":"SEO Services"},
     {"id":28,"name":"Shopping"},
     {"id":29,"name":"Society"},
     {"id":30,"name":"Sports"},
     {"id":31,"name":"Transport"},
     {"id":32,"name":"Travel"},
     {"id":33,"name":"Waste Clearance"},
     {"id":34,"name":"Web Directory"}

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

  var temp = '<div class="loadDropdown_div" style=" box-shadow: 0 3px 20px rgba(0,0,0,.2);border-radius: .25rem;padding: 15px;position: absolute;width: 300px;z-index: 100;background-color: #ffffff;" ><input type="text" value="" drop-type="' + dropDownType + '" class="loadDropdown_input" ><br>';
  var temp2 = loadDropDownDiv(dropDownType, 'a');
  temp = temp +'<ul class="loadDropdown_ul">'+ temp2 + '</ul></div>';
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
    if ((dropDownVal[i].name.toLowerCase()).includes(strSearch) && j < 5) {
      temp = temp + '<li class="loadDropdown_class_li" select-val="' + dropDownVal[i].id + '" >' + dropDownVal[i].name + '</li>'
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