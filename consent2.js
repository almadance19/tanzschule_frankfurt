const storageItem = 'mapsConsent' 
let consent = localStorage.getItem(storageItem)

//Different Policies
let consent_type = localStorage.getItem("CookiesPolicy")


if (consent == 'true') { 

  if (consent_type=="ALL") {
    var script_2 = document.createElement('script');
    script_2.type = 'text/javascript';
    script_2.src ='FacebookPixel.js'
  
    var script_3 = document.createElement('script');
    script_3.type = 'text/javascript';
    script_3.src ='googleTag.js'
  
    document.head.appendChild(script_3);
    document.head.appendChild(script_2);
  
    console.log("ALL CONSENT GIVEN");
  } else if (consent_type=="ONLY") {
    console.log("CONSENT GIVEN");
  } else if (consent_type=="NOT") {
    console.log("NO CONSENT GIVEN");
    $(".popup-youtube").removeAttr( "data-target" ).removeAttr( "data-url" ).removeAttr( "data-toggle" );
  }

} else {


   var displayTable = "<div class=\"modal modal-cookies\" tabindex=\"-1\" role=\"dialog\" id=\"myModal2\">";
    displayTable += "<div class=\"modal-dialog modal-xl modal-dialog-scrollable\" role=\"document\">";
    displayTable += "<div class=\"modal-content\" >";

    displayTable += "<div class=\"modal-header\ style=\"background-color:#48005f;color:White\">";
    displayTable += "<h5 class=\"modal-title\" id=\"exampleModalLongTitle\" > "+ "Wichtige Informationen" + "</h5>";
    displayTable += "<button id=\"close_button\" type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">";
    displayTable += "<span aria-hidden=\"true\"><i class=\"icofont-close-squared-alt\"></i></span>";
    displayTable += "</button>";
    displayTable += "</div>";

    displayTable += "<div class=\"modal-body\">";
    displayTable += "<div class=\"container-fluid\">";

    displayTable += "<div class=\"row\">";
    displayTable += "<h3> "+ "Wir verwenden Cookies auf unserer Website" + "</h3>";
    //displayTable += "<p> "+ "We use cookies to provide and secure our websites, as well as to analyze the usage of our websites, in order to offer you a great user experience. To learn more about our use of cookies see our Privacy Policy." + "</p>";
    displayTable += "<p> "+ "Einige von ihnen sind essenziell, während andere uns helfen, diese Website und Ihre Erfahrung zu verbessern. Für mehr Infos " ;
    displayTable += "<Strong><a href=\"https://alma-dance.de/privacy-policy\">unsere Datenschutzerklärung</a></Strong>"+ "prüfen. </p>";
    displayTable += "</div>";

    displayTable += '<form style="background-color:white;color:black">';
  
    displayTable += "<div class=\"row\">";
    displayTable += '<div class="form-group col-md">';
    displayTable += "<input type=\"button\" value=\"Alle Cookies akzeptieren\" id=\"allCookies\" class=\"btn btn-dark\" style=\"background-color: rgb(0, 3, 192);\" ";
    displayTable += " onclick=\"acceptAllCookies()\" />";
    displayTable += "<p> "+ "Optimales Nutzererlebnis garantiert." + "</p>";
    displayTable += '</div>';


    displayTable += '<div class="form-group col-md">';
    displayTable += "<input type=\"button\" value=\"Nur essentielle Cookies\" id=\"onlyEsential\" class=\"btn btn-dark\" style=\"background-color: rgb(0, 3, 192);\" ";
    displayTable += " onclick=\"acceptEsentialCookies()\" />";
    displayTable += "<p> "+ "Alle wichtigen Funktionen sind enthalten." + "</p>";
    displayTable += '</div>';
    
    displayTable += '<div class="form-group col-md">';
    displayTable += "<input type=\"button\" value=\"Alle Cookies ablehnen\" id=\"denyCookies\" class=\"btn btn-dark\" style=\"background-color: rgb(0, 3, 192);\" ";
    displayTable += " onclick=\"denyAllCookies()\" />";
    displayTable += "<p style=\";\"> "+ "**Keine Anzeige von Inhalten aus Youtube, Facebook, Instagram und Google möglich." + "</p>";
    displayTable += '</div>';
   
    displayTable += "</div>";
    displayTable += "</form>";
    displayTable += "<p> "+ "Die Daten werden, z. B. für personalisierte Anzeigen, Qualitätssicherung oder Inhaltsmessung verarbeitet."+ "</p>";
    displayTable += "<p> "+ "Wenn du unter 16 Jahre alt bist und deine Zustimmung zu einem Freiwilligendienst geben möchtest, musst du deine Eltern um Erlaubnis fragen." + "</p>";
    displayTable += "</div>";
    displayTable += "</div>";

    displayTable += "</div>";
    displayTable += "</div>";
    displayTable += "</div>";


    $("#statesModal").html(displayTable);
    $("#myModal2").modal();

}

function acceptAllCookies(){
  console.log("ALL CONSENT GIVEN");
  localStorage.setItem(storageItem, true)
  localStorage.setItem("CookiesPolicy", "ALL");
  localStorage.setItem("FAGSkripted", true);
  

  var script_2 = document.createElement('script');
  script_2.type = 'text/javascript';
  script_2.src ='FacebookPixel.js'
  var script_3 = document.createElement('script');
  script_3.type = 'text/javascript';
  script_3.src ='googleTag.js'

  document.head.appendChild(script_3);
  document.head.appendChild(script_2);

  $("#close_button").click ();
}

function acceptEsentialCookies(){
  console.log("CONSENT GIVEN");

  localStorage.setItem(storageItem, true)
  localStorage.setItem("CookiesPolicy", "ONLY");


  $("#close_button").click ();
}

function denyAllCookies(){
  console.log("NO CONSENT GIVEN");

  $(".popup-youtube").removeAttr( "data-target" ).removeAttr( "data-url" ).removeAttr( "data-toggle" );

  localStorage.setItem(storageItem, true)
  localStorage.setItem("CookiesPolicy", "NOT");

  $("#close_button").click ();
}