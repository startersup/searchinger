
<?php
$rootfolder = $_SERVER['DOCUMENT_ROOT'];
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <title>Searchinger | UK's Largest Business Directory Engine</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" href="/assets/images/icons/favicon.png" type="image/x-icon" sizes="16x16" />
  <link rel="stylesheet" href="./assets/css/bootstrap.min.css">
  <link href="./assets/css/style.css" rel="stylesheet">
  <script src="./assets/js/jquery.min.js" type="javascript"></script>
  <script src="./assets/js/bootstrap.min.js" type="javascript"></script>
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

<body>
<?php

include($rootfolder.'/navBar.php');

 ?>
  <section class="sng-banner-section">
    <div class="container">
      <div class="sng-banner-wrapper">
        <h1>UK's Largest Business Directory Engine</h1>

        <div class="sng-search-engine">
          <div class="row sng-highligher">
            <div class="col-md-5 col-sm-4 pad-null">
              <div class="sng-search-wrapper">
                <i class="fa fa-search sng-float-icon"></i>
                <input class="sng-controls" name="searchKeywords" value="" type="text"
                  placeholder="What are you looking for ?" autocomplete="off" required="" aria-required="true">
              </div>
            </div>
            <div class="col-md-5 col-sm-4 pad-null">
              <div class="sng-search-wrapper">
                <i class="fa fa-map-marker sng-float-icon"></i>
                <input class="sng-controls" name="searchArea" value="" type="text"
                  placeholder="Location, Postcode, Name" autocomplete="off" required="" aria-required="true">
              </div>
            </div>
            <div class="col-md-2 col-sm-4 pad-null">
              <button class="sng-find-business">Find Business</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>

  <section class="sng-category">
    <div class="container">
<div class="sng-category-wrapper">
  <ul>
   <li>
    <div class="sn-category-card">
     <img src="./assets/images/icons/travel.svg">
     <p>Travel </p> 
    </div> 
   </li> 
   <li>
    <div class="sn-category-card">
     <img src="./assets/images/icons/healthcare.svg">
     <p>Healthcare </p> 
    </div> 
   </li> 
   <li>
    <div class="sn-category-card">
     <img src="./assets/images/icons/lifestyle.svg">
     <p>Lifestyle </p> 
    </div> 
   </li> 
   <li>
    <div class="sn-category-card">
     <img src="./assets/images/icons/food.svg">
     <p>Food </p> 
    </div> 
   </li> 
   <li>
    <div class="sn-category-card">
     <img src="./assets/images/icons/industry.svg">
     <p>Industry </p> 
    </div> 
   </li> 
   <li>
    <div class="sn-category-card">
     <img src="./assets/images/icons/education.svg">
     <p>Education </p> 
    </div> 
   </li> 
  </ul>
</div>
       
    </div>
  </section>

<section class="sng-features bg-gray">
 <div class="container">
<div class="row">
 <div class="col-md-6">
 <h3>Promote your business with Searchinger
</h3>  
<p> Get your business added or claimed, keep your listing pages updated, make your customers interact with you on this powerful search engine directory.
</p>
<button class="promote-btn"><a href="/list-your-business/">Add Business</a></button>

 </div> 
 <div class="col-md-6">
  <img class="sng-feature-images" src="/assets/images/promote-business.png"> 
 </div>
</div>
 </div>
</section>


<section class="sng-features bg-gray">
  <div class="container">
 <div class="row">
  <div class="col-md-6">
    <img class="sng-feature-images" src="/assets/images/increase-visiblilty.png"> 
   </div>
  <div class="col-md-6">
  <h3>Gain More Visibility and Customers
 </h3>  
 <p> Increase your presence digitally to gain more visibility over internet and among customer searches where 50% of their time is spent.
 </p>
 <button class="promote-btn"><a href="/list-your-business/">Add Business</a></button>
 
  </div> 

 </div>
  </div>
 </section>

 <section class="sng-features bg-gray">
  <div class="container">
 <div class="row">

  <div class="col-md-6">
  <h3>Invest on Valuable Leads
 </h3>  
 <p> Spending Money on useless ads and getting junk leads is usual, here are we to create unusual money spent, curious what is it ? pay only for valid leads, no problem whether its 1 lead or 1000 leads
 </p>
 <button class="promote-btn"><a href="">Post Free Ad</a></button>

  </div> 
  <div class="col-md-6">
    <img class="sng-feature-images" style="max-width:400px;margin:0 auto;" src="/assets/images/valuable-leads.png"> 
   </div>
 </div>
  </div>
 </section>
<footer class="sng-footer">
  <div class="container">
<div class="d-flex">
 <p>Copyrights 2020 &copy Searchinger.co.uk</p> 

</div>
</div>
</footer>
</body>



</html>