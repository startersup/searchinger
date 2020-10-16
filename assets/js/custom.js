
var myProtocol = window.location.protocol;
var mySite = window.location.host;
var myUrl = myProtocol + "//" + mySite + "/";
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
      $(this).val( $(this).val().substring(0, $(this).val().length - 1) );
    }
  } else {
    var regex = new RegExp("^\\d{0," + wnum + "}(\\.\\d{0," + dnum + "})?$");
    if (!regex.test($(this).val())) {
      $(this).val( $(this).val().substring(0, $(this).val().length - 1) );
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


  $("form#businessList").submit(function(){

    var formData = new FormData($(this)[0]);
    var Url = myUrl+'apis/v1/business/';
    $.ajax({
        url: Url,
        type: 'POST',
        data: formData,
        async: false,
        success: function (data) {
            alert(data)
        },
        cache: false,
        contentType: false,
        processData: false
    });

    return false;
});




