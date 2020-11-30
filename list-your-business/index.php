<?php
$rootfolder = $_SERVER['DOCUMENT_ROOT'];
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <title>List your Business | Searchinger.co.uk</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" href="/assets/images/icons/favicon.png" type="image/x-icon" sizes="16x16" />
  <link rel="stylesheet" href="../assets/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>

  <link href="../assets/css/style.css" rel="stylesheet">
  <!--
    <script src="../assets/js/jquery.min.js" type="text/javascript"></script>
    <script src="../assets/js/bootstrap.min.js" type="text/javascript"></script>
-->
  <script src="../assets/js/custom.js" type="text/javascript"></script>

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <meta name="description" content="" />
  <meta name="abstract" content=" ">
  <meta name="subject" content="">
  <meta itemscope itemtype="http://schema.org/WebSite" itemref="sitename sitelink facebook twitter">
  <meta itemprop="name" content="Searchinger" id="sitename">
  <link href="https://searchinger.co.uk" itemprop="url" id="sitelink">
  <meta name="og:site_name" content="searchinger.co.uk">
  <meta property="og:type" content="website" />
  <meta property="og:title" content="" />
  <meta property="og:description" content="" />
  <meta property="og:image" content="" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:site" content="@Searchinger" />
  <meta name="twitter:title" content="Searchinger | UK's Largest Business Directory Engine" />
  <meta name="twitter:description" content="Searchinger | UK's Largest Business Directory Engine" />
  <meta name="twitter:image" content="" />
  <link rel="canonical" href="https://searchinger.co.uk" />

</head>

<body style="background:#f2f3f7;">
 <?php

include($rootfolder.'/navBar.php');

 ?>
  <section class="sng-list-your-business">
    <div class="container">
      <h3>You are one step away from listing you business</h3>


      <div class="stepwizard col-md-offset-3">
        <div class="stepwizard-row setup-panel">
          <div class="stepwizard-step">
            <a href="#step-1" type="button" class="btn btn-primary btn-circle">1</a>
            <p>Basic Information</p>
          </div>
          <div class="stepwizard-step">
            <a href="#step-2" type="button" class="btn btn-default btn-circle" disabled="disabled">2</a>
            <p>Working Hours</p>
          </div>
          <div class="stepwizard-step">
            <a href="#step-3" type="button" class="btn btn-default btn-circle" disabled="disabled">3</a>
            <p>Social Links</p>
          </div>
        </div>
      </div>

      <div id="spinnermodal" class="modal11 modal right loader fade in"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel2" style="    
  display: none;
  background-color: rgb(255, 255, 255);
  min-width: 1500px;
  top: 0px;
  left: 0px;
  border: none;">
    <div class="modal11-content">
      <div class="loader" style="max-width:100px;position:absolute;top:300px;left:650px;">
        <centre> <img width="80px;" src="../assets/images/loader.svg"></centre>    
      </div>
    </div>
  </div>
  
<div class="alert alert-success alert-dismissible" style="display:none;">
    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
    <strong>Success!</strong> <p class="alert-success-msg"></p>
  </div>

  <div class="alert alert-danger alert-dismissible" style="display:none;">
    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
    <strong>Danger!</strong><p class="alert-danger-msg"></p>
  </div>

      <form class="formSubmit" id="businessList" method="post" enctype="multipart/form-data">
        <div class="sng-listing-form">
          <div class="row setup-content" id="step-1">
            <h3> Step 1</h3>
            <label for="BusinessName">Company Logo</label>
            <div class="form-group d-flex">
              <img id="businessLogo" class="sng-logo-wrapper"
                onerror="this.onerror=null; this.src='../assets/images/sng-alt-img.png'" src="#" alt="" />
              <div class="sn-logo-inp-wrapper">
                <input type='file' name="fileToUpload" id="fileToUpload" class="sng-logo-input" />
                <p class="file-upload-rule">* Maximum file size should be 300kb</p>
                <p class="file-upload-rule">* File format should be jpg, png</p>
                <p class="file-upload-rule">* Logo is not a mandatory</p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="BusinessName">Business Name<sup>*</sup></label>
                  <input type="name" name="businessName" class="form-control sng-form-inputs" autocomplete="off"
                    required="required" placeholder="Eg: UK Travel company" id="bsname">
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="BusinessName">Business Email Address<sup>*</sup></label>
                  <input type="name" name="businessMail" class="form-control sng-form-inputs" autocomplete="off"
                    required="required" placeholder="Eg: abc@travelcompany.com" id="bsname">
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="BusinessName">Business Contact Number<sup>*</sup></label>
                  <input type="name" name="contactNumber" class="form-control sng-form-inputs" autocomplete="off"
                    required="required" placeholder="Eg: +44 1234567890" id="bsname">
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="BusinessName">Business website<sup>*</sup></label>
                  <input type="name" name="businessWebsite" class="form-control sng-form-inputs" autocomplete="off"
                    required="required" placeholder="Eg: www.xyzcompany.com" id="bsname">
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="BusinessName">Business Category<sup>*</sup></label>
                  <!-- <input type="name" name="businessCategory" class="form-control sng-form-inputs" autocomplete="off" required="required" placeholder="Eg: Travel, Architecture" id="businessCategory"> -->
                  <select class="loadDropdown form-control sng-form-inputs "  name="businessCategory" drop-type="businessCategory"></select>

                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="BusinessName">Business SubCategory<sup>*</sup></label>
                  <input type="name" name="businessSubCategory" class="form-control sng-form-inputs" autocomplete="off"
                    required="required" placeholder="Eg: Taxi service, Builder" id="businessCategory">
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <label for="BusinessName">Business Address<sup>*</sup></label>
                  <textarea type="name" name="businessAddress" class="form-control sng-form-textarea" autocomplete="off"
                    required="required" style="height:40px;" rows="3" id="bsaddress"></textarea>
                </div>
              </div>
              <div class="col-md-6">
                <label for="BusinessName">City<sup>*</sup></label>
                <input type="name" name="businessCity" class="form-control sng-form-inputs" autocomplete="off"
                  required="required" placeholder="Eg: London, Manchester, Oxford " id="businessCategory">
              </div>
              <div class="col-md-6">
                <label for="BusinessName">Postal Code<sup>*</sup></label>
                <input type="name" name="businessPostalCode" class="form-control sng-form-inputs loadInput" drop-type="abc" autocomplete="off"
                  required="required" placeholder="Eg: N4 1AL " id="businessCategory">
              </div>
            </div>
            <button class="btn sng-next-btn nextBtn btn-lg pull-right" type="button">Next</button>
          </div>
          <div class="row setup-content" id="step-2">

            <div class="col-md-12">

              <h3> Working Hours</h3>
              <div class="form-group">
                <label class="control-label">Business description</label>
                <textarea type="name" name="businessDescription" class="form-control sng-form-textarea"
                  autocomplete="off" style="height:300px;" rows="8" value="Eg: London" id="bsaddress"></textarea>
              </div>
              <div class="form-group">
                <label class="control-label">Your Availability</label>
                <div class="col-md-offset-3"><input type="checkBox" class=" workTimingCheck"
                    value="247">24/7</div>
                <div class="col-md-offset-3"><input type="checkBox" class=" workTimingCheck"
                    value="5">WeekDays</div>
                <!-- <div class="col-md-offset-3"><input type="checkBox" class="form-control workTimingCheck"
                    value="5">WeekDays - Specific Hrs</div>
              </div> -->
<div class="form-group">

  <input type="hidden" name="MondayStart" id="MondayStart" >
  <input type="hidden" name="MondayEnd" id="MondayEnd" >
  <input type="hidden" name="TuesdayStart" id="TuesdayStart" >
  <input type="hidden" name="TuesdayEnd" id="TuesdayEnd" >
  <input type="hidden" name="WednesdayStart" id="WednesdayStart" >
  <input type="hidden" name="WednesdayEnd" id="WednesdayEnd" >
  <input type="hidden" name="ThursdayStart" id="ThursdayStart" >
  <input type="hidden" name="ThursdayEnd" id="ThursdayEnd" >
  <input type="hidden" name="FridayStart" id="FridayStart" >
  <input type="hidden" name="FridayEnd" id="FridayEnd" >
  <input type="hidden" name="SaturdayStart" id="SaturdayStart" >
  <input type="hidden" name="SaturdayEnd" id="SaturdayEnd" >
  <input type="hidden" name="SundayStart" id="SundayStart" >
  <input type="hidden" name="SundayEnd" id="SundayEnd" >
  <input type="hidden" name="workingFullHours" id="workingFullHours" >
  

</div>
              <div class="form-group">
                <label class="control-label">Working Hours</label>
                <table class="sng-working-hrs">
                  <thead>
                    <tr>
                      <th>Days</th>
                      <th>From</th>
                      <th>To</th>
                    </tr>
                  </thead>
                  <tbody id="timingTable"></tbody>
                </table>
              </div>

              <button class="btn sng-next-btn nextBtn btn-lg pull-right" type="button">Next</button>
            </div>
          </div>
        </div>
          <div class="row setup-content" id="step-3">
            <h3> Step 3</h3>
            <div class="col-md-12">

              <div class="form-group">
                <label for="BusinessName">Google Reviews</label>
                <input type="name" name="googleReviews" class="form-control sng-form-inputs number" autocomplete="off"
                  whole="1" decimal="1" placeholder="Eg: 1 to 5" id="bsname">
              </div><br>
              <hr>
              <div class="form-group sng-social-links">
                <label for="BusinessName">Social Links of Business</label><br><br>

                <label for="BusinessName">Facebook :&nbsp; </label>
                <input type="name" name="facebookLink" class="form-control sng-form-inputs" autocomplete="off"
                  placeholder="" id="bsname"> <br>
                <label for="BusinessName">Twitter :&nbsp; </label>
                <input type="name" name="twitterLink" class="form-control sng-form-inputs" autocomplete="off"
                  placeholder="" id="bsname"><br>
                <label for="BusinessName">Google My Business :&nbsp; </label>
                <input type="name" name="googleBusinessLink" class="form-control sng-form-inputs" autocomplete="off"
                  placeholder="" id="bsname">
              </div>
              <button class="sng-submit-btn">Submit Business</button>
            </div>
         
      </form>
    </div>
    </div>
    </div>

  </section>

</body>
<script>
  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $('#businessLogo').attr('src', e.target.result);
      }

      reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
  }

  $("#fileToUpload").change(function () {
    readURL(this);
  });
</script>



<script>
  $(document).ready(function () {
    var navListItems = $('div.setup-panel div a'),
      allWells = $('.setup-content'),
      allNextBtn = $('.nextBtn');

    allWells.hide();

    navListItems.click(function (e) {
      e.preventDefault();
      var $target = $($(this).attr('href')),
        $item = $(this);

      if (!$item.hasClass('disabled')) {
        navListItems.removeClass('btn-primary').addClass('btn-default');
        $item.addClass('btn-primary');
        allWells.hide();
        $target.show();
        $target.find('input:eq(0)').focus();
      }
    });

    allNextBtn.click(function () {
      var curStep = $(this).closest(".setup-content"),
        curStepBtn = curStep.attr("id"),
        nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
        curInputs = curStep.find("input[type='text'],input[type='name'],textarea[type='name'],input[type='url']"),
        isValid = true;

      $(".form-group").removeClass("has-error");
      for (var i = 0; i < curInputs.length; i++) {
        if (!curInputs[i].validity.valid) {
          isValid = false;
          $(curInputs[i]).closest(".form-group").addClass("has-error");
        }
      }

      if (isValid)
        nextStepWizard.removeAttr('disabled').trigger('click');
    });

    $('div.setup-panel div a.btn-primary').trigger('click');
  });
</script>



<style>
  .stepwizard-step p {
    margin-top: 10px;
  }

  .stepwizard-row {
    display: table-row;
  }

  .stepwizard {
    display: table;
    width: 50%;
    position: relative;
  }

  .stepwizard-step button[disabled] {
    opacity: 1 !important;
    filter: alpha(opacity=100) !important;
  }

  .stepwizard-row:before {
    top: 14px;
    bottom: 0;
    position: absolute;
    content: " ";
    width: 100%;
    height: 1px;
    background-color: #ccc;
    z-order: 0;
  }

  .stepwizard-step {
    display: table-cell;
    text-align: center;
    position: relative;
  }

  .btn-circle {
    width: 30px;
    height: 30px;
    text-align: center;
    padding: 6px 0;
    font-size: 12px;
    line-height: 1.428571429;
    border-radius: 15px;
  }
</style>

</html>