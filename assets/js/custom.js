

$(document).on('click', '.formSubmit', function () {
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


  $("form#files").submit(function(){

    var formData = new FormData($(this)[0]);

    $.ajax({
        url: window.location.pathname,
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