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

  console.log("PREP CONSENT");
  var displayTable = '<div id="cookies">';
        displayTable += '<div class="consent_container">';
            displayTable += '<div class="subcontainer">';
                displayTable += '<div class="cookies">';
                    displayTable += '<p>Wir verwenden Cookies auf unserer Website</p>';
                    displayTable += "<p> "+ "Einige von ihnen sind essenziell, während andere uns helfen, diese Website und Ihre Erfahrung zu verbessern. Für mehr Infos " ;
                   displayTable += "<Strong><a href=\"https://alma-dance.de/privacy-policy\">unsere Datenschutzerklärung</a></Strong>"+ " prüfen. </p>";
                    displayTable += '<form >';
                    displayTable += "<div class=\"row\">";
                    displayTable += '<div class="form-group col-md col-consent">';
                    displayTable += "<input type=\"button\" value=\"Alle Cookies akzeptieren\" id=\"allCookies\" class=\"btn btn-dark\" style=\"background-color: rgb(0, 3, 192);\" ";
                    displayTable += " onclick=\"acceptAllCookies()\" />";
                    displayTable += "<p class=\"info\"> "+ "Optimales Nutzererlebnis garantiert." + "</p>";
                    displayTable += '</div>';
                    displayTable += '<div class="form-group col-md col-consent">';
                    displayTable += "<input type=\"button\" value=\"Nur essentielle Cookies\" id=\"onlyEsential\" class=\"btn btn-dark\" style=\"background-color: rgb(0, 3, 192);\" ";
                    displayTable += " onclick=\"acceptEsentialCookies()\" />";
                    displayTable += "<p class=\"info\"> "+ "Alle wichtigen Funktionen sind enthalten." + "</p>";
                    displayTable += '</div>';
                    
                    displayTable += '<div class="form-group col-md col-consent">';
                    displayTable += "<input type=\"button\" value=\"Alle Cookies ablehnen\" id=\"denyCookies\" class=\"btn btn-dark\" style=\"background-color: rgb(0, 3, 192);\" ";
                    displayTable += " onclick=\"denyAllCookies()\" />";
                    displayTable += "<p class=\"info\" > "+ "**Keine Anzeige von Inhalten aus Youtube, Facebook, Instagram und Google möglich." + "</p>";
                    displayTable += '</div>';
                  
                    displayTable += "</div>";
                    displayTable += "</form>";
                displayTable += '</div>';
            displayTable += '</div>';
        displayTable += '</div>';
    displayTable += '</div>';


    document.getElementById("consent_data").innerHTML = displayTable;
    console.log(displayTable);

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

  document.getElementById("cookies").innerHTML = "";
}

function acceptEsentialCookies(){
  console.log("CONSENT GIVEN");

  localStorage.setItem(storageItem, true)
  localStorage.setItem("CookiesPolicy", "ONLY");


  document.getElementById("cookies").innerHTML = "";
}

function denyAllCookies(){
  console.log("NO CONSENT GIVEN");

  $(".popup-youtube").removeAttr( "data-target" ).removeAttr( "data-url" ).removeAttr( "data-toggle" );

  localStorage.setItem(storageItem, true)
  localStorage.setItem("CookiesPolicy", "NOT");

  document.getElementById("cookies").innerHTML = "";
}