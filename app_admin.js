//GIT GUIDE
// git init
//git remote add origin "https://github.com/almadance19/tanzschule_frankfurt.git"
//git add --all
//git commit -m "commit message"
//git commit -m "commit message"git push --force origin
//git push --force origin master
//

//ADD LOGIC TO CONTROL and MARK AKTIV PAYMENTS
// DONE add option to pay monthly or all at once
//send a contract for monthly subscription longer than 1 month
//send people a reminder to paid
//send a weekly list to us of deadlines or unactive users to pay

//create a user registration mask 
//they will get a QR Code at the school and register themselves, then pay online or bar

// after loading 
window.addEventListener('DOMContentLoaded', getInit);

function getInit() {
  //initPayPalButton();
  getData();
  getPrices();
  getUserLocalData();
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// call API COURSES
const url = 'https://script.google.com/macros/s/AKfycby11BJT6bxuoo5nc65Gk1aMyHV4dMdrm8MYayi9lbKCZKVuqf89LxHfbz6NZ8km6zX6/exec';

const urluser =  'https://script.google.com/macros/s/AKfycbzWu6k32M7XjlK51cEYH-5qqO0Az5cHKI1zypbU_nHwFxzGGP2DmOa4U0u6FbY9AO-r/exec';

const url_prices = 'https://script.google.com/macros/s/AKfycbxQJP0x0GEQQ7ZbdYxed1_EQfr5aRNonJWH82iEzg8wUn-M5cNy2l7yGZ2FPpx0Vz4D/exec';

const url_payment = 'https://script.google.com/macros/s/AKfycbz8OUKWTGVbpTpcUXoiEob22J9wd1_xOtZ8G7XRXx3r5bkLO0zAw3vAWMd6f3fKveg/exec';

const url_future_payments = 'https://script.google.com/macros/s/AKfycbyfsIY3x4hcen6sKh9UHKfTqjMPrnr1X-qTPOHx--HXTrIpobjv1p5TqSiQblGzlI4E/exec'

var allPaymentsString =  "";
var activePaymentString =  "";


//get buttons 
const output = document.querySelector('.output');
const outputMembership = document.querySelector('.output-membership');
const outputMember = document.querySelector('.output-member');
const btnPayment = document.querySelector('.payment');
const btnPayments = document.querySelector('.allpayments');
const btnEmail = document.querySelector('.emailer');
const btnPaypal = document.querySelector('.paypal');
const btnBookaclass = document.querySelector('.bookaclass');

//get fields
//const iName = document.querySelector('input[name=name]');
//const iMes = document.querySelector('input[name=message]');
const repMessage = document.querySelector('.rep');

//event listener buttons 
btnPayment.addEventListener('click', showPaymentModal);
btnPayments.addEventListener('click', showPaymentsModal);
btnPaypal.addEventListener('click', showMemberships);
btnEmail.addEventListener('click', getPayments);
btnBookaclass.addEventListener('click', bookClasses);


 
//get user fields

const emailinput = document.getElementById("User_email");
const nameinput = document.getElementById("User_name");  
const coursesinput = document.getElementById("User_courses");  
const idinput = document.getElementById("User_id");  
const activeinput = document.getElementById("User_active"); 
const lastpaymentinput = document.getElementById("User_lastpayment");  
const saldoinput = document.getElementById("User_saldo");  
const anmerkungeninput = document.getElementById("User_anmerkungen");  
const nextpaymentinput = document.getElementById("User_nextpayment");

// Directory to save prices from the Prices API
var dict_prices = {}
var dict_prices_monthly = {}
//Array For Payment
var payment_array = [];
var future_payments_array = [];

// gets classes data
 
function getData() {
    	  var today = new Date();
        var d = new Date();
        var day = d.getDay();
        var displayTable = '';
        displayTable += '<div class=\"container float-left\" id=\"tableContainer\" >';
        displayTable += '<table class=\"table table-striped\" id=\"mainTable\" >';
        displayTable += '<thead  class=\"thead-dark\" >';
        displayTable += "<tr>";
        displayTable += "<th></th>";
        displayTable += "<th>Kurs</th>";
        displayTable += "<th>Tag/Uhrzeit</th>";
        displayTable += "<th>Tag/Datum</th>";
        displayTable += "</tr>";
        displayTable += '</thead>';
        var coma = ",";


  fetch(url).then(function (rep) {
    return rep.json()
  }).then(function (data) {
    console.log(data);
    output.innerHTML = "";
    data.posts.forEach(function (val) {
      if (val[10]==true && val[12]=="NEIN" ) {
        displayTable += "<tr class=\""+val[2]+"\" >";
        displayTable += "<td><input type=\"button\" value=\"Anmelden\" class=\"btn btn-colour-1\" ";
        displayTable += " onclick=\"showStates('"+val[0]+"',"+"'"+val[1]+"',"+"'"+val[2]+"',"+"'"+val[3]+"',"+"'"+val[4]+"',"+"'"+val[5]+"',"+"'"+val[6]+"',"+"'"+val[7]+"',"+"'"+val[8]+"',"+"'"+val[11]+"')\" /></td>";
        displayTable += "<td>"+val[1]+"</td>";
        displayTable += "<td>"+val[5]+" "+val[7]+"</td>";
        displayTable += "<td>"+val[8]+"</td>";
        displayTable += "</tr>";

      console.log(val);
      }
       
    } 
    )
        displayTable += '</table>';
        displayTable += '</div>';     
        document.getElementById("rowdata").innerHTML = displayTable;

  })

};

function getUserLocalData() { 


  const extractedUser = JSON.parse(localStorage.getItem('profile_local'));
  console.log(extractedUser);

  if (extractedUser) {

    document.querySelector('input[name=email-class]').value = extractedUser.email;
    document.querySelector('input[name=email-membership]').value = extractedUser.email;
    document.querySelector('input[name=email-member]').value = extractedUser.email;
    

  } else {
    console.log('Could not find id.');
  }

}

function getPrices() { 


  fetch(url_prices).then(function (rep) {
    return rep.json()
  }).then(function (data) {
    console.log(data);
    
    data.posts.forEach(function (val) {

      const promocode = val[0];
      const promocode_value = val[2];
      dict_prices[promocode] = promocode_value;

      const promocode_value_monthly = val[1];
      dict_prices_monthly[promocode] = promocode_value_monthly;

      var list = document.getElementsByClassName("price-container");
      for (var i = 0; i < list.length; i++) {
      //console.log(list[i].id); 
      if (list[i].id==val[0] ) {
        document.getElementById(list[i].id).getElementsByTagName('span')[0].innerHTML=" "+val[1]+" EUR";

        var inputEl = document.createElement('input'); 
        inputEl.type = 'button';
        inputEl.className = "btn btn-colour-1"; 
        inputEl.value = "Einmalige Zahlung";
        inputEl.style = "margin: 0px 4px 8px 3px;";

        inputEl.addEventListener('click', function() { 
            Create_Payment_Form(val[0],val[2],val[5],val[6],val[4]); 
        });
        document.getElementById(list[i].id).appendChild(inputEl); 

      }

      if (list[i].id==val[0] & val[7]!="NO" ) {
        document.getElementById(list[i].id).getElementsByTagName('span')[0].innerHTML=" "+val[1]+" EUR EUR (Monthly)";
        
        var inputEl = document.createElement('input'); 
        inputEl.type = 'button';
        inputEl.className = "btn btn-colour-1"; 
        inputEl.value = "Monatliche Zahlung";
        inputEl.style = "margin: 0px 4px 8px 3px;";

        inputEl.addEventListener('click', function() { 
          Create_Payment_Form_Abo(val[0],val[1],val[5],val[7],val[4]); 
        });
        document.getElementById(list[i].id).appendChild(inputEl); 

      }
}

    } 
    )
        console.log("current prices");    
        console.log(dict_prices);
        console.log(dict_prices_monthly);
        return dict_prices,dict_prices_monthly    
  })
};



function getPrices2() { 

  fetch(url_prices).then(function (rep) {
    return rep.json()
  }).then(function (data) {
    console.log(data);
    
    data.posts.forEach(function (val) {

      const promocode = val[0];
      const promocode_value = val[2];
      dict_prices[promocode] = promocode_value;

      const promocode_value_monthly = val[1];
      dict_prices_monthly[promocode] = promocode_value_monthly;

      var list = document.getElementsByClassName("price-container");
      for (var i = 0; i < list.length; i++) {
      //console.log(list[i].id); 
      if (list[i].id==val[0] ) {
        document.getElementById(list[i].id).getElementsByTagName('span')[0].innerHTML=" "+val[1]+" EUR";

        var inputEl = document.createElement('input'); 
        inputEl.type = 'button';
        inputEl.className = "btn btn-colour-1"; 
        inputEl.value = "Einmalige Zahlung";
        inputEl.style = "margin: 0px 4px 8px 3px;";

        inputEl.addEventListener('click', function() { 
            Create_Payment_Form(val[0],val[2],val[5],val[6],val[4]); 
        });
        document.getElementById(list[i].id).appendChild(inputEl); 

      }

      if (list[i].id==val[0] & val[7]!="NO" ) {
        document.getElementById(list[i].id).getElementsByTagName('span')[0].innerHTML=" "+val[1]+" EUR EUR (monatlich)";
        var inputEl = document.createElement('input'); 
        inputEl.type = 'button';
        inputEl.className = "btn btn-colour-1"; 
        inputEl.value = "Monatliche Zahlung";
        inputEl.style = "margin: 0px 4px 8px 3px;";

        inputEl.addEventListener('click', function() { 
          Create_Payment_Form_Abo(val[0],val[1],val[5],val[7],val[4]); 
        });
        document.getElementById(list[i].id).appendChild(inputEl); 

      }
}

    } 
    )
        console.log("current prices");    
        console.log(dict_prices);
        console.log(dict_prices_monthly);
        return dict_prices,dict_prices_monthly    
  })
};



async function Create_Payment_Form(membership, price_total,nr_months,stripe_link,nr_courses) { 
  
  await sleep(2500);
  
  paymentForm(membership, price_total,nr_months,stripe_link,"Einmalige Zahlung",nr_courses,"Total"); 
  document.getElementById("stripe-container").style.display = 'none';
  document.getElementById("payment-block").style.display = 'block';
  document.getElementById('sect1').scrollIntoView();
} 

async function Create_Payment_Form_Abo(membership, price_total,nr_months,stripe_link,nr_courses) { 

  await sleep(2500);
  paymentForm(membership, price_total,nr_months,stripe_link,"Monatsabonnement",nr_courses,"Monthly");
  document.getElementById("stripe-container").style.display = 'none';
  document.getElementById("payment-block").style.display = 'block';

  document.getElementById('sect1').scrollIntoView();
} 

/// CREATE THE SCHEDULER SECTION
function bookClasses() {
  var email_value = document.querySelector('input[name=email-class]').value;
  if (email_value != '') { 
    document.querySelector(".section-2").style.display = 'block';
    document.querySelector(".section-1").style.display = 'none';
    const element = document.getElementById('paypal-button-container');
    element.innerHTML = '';
    const bank = document.getElementById('bank-button-container');
    bank.innerHTML = '';
    document.getElementById("price_shield").style.display = "none";
    document.querySelector(".section-2").scrollIntoView();

      if (idinput.value=="Not Registered yet" || idinput.value=="No Active User" ) {
        getUser(email_value);
      } 
  
    } else {
      output.innerHTML = "Enter a valid email";
    }
}

/// CREATE THE NEW MEMBERSHIP SECTION

function showMemberships() {
  var email_value = document.querySelector('input[name=email-membership]').value;
  if (email_value != '') { 
    document.querySelector(".section-1").style.display = 'block';
    document.querySelector(".section-2").style.display = 'none';
    document.getElementById("stripe-container").style.display = 'block';
    document.getElementById("stripe-container").className = "row";
    document.getElementById("payment-block").style.display = 'none';
    btnBookaclass.style.display = "block";
    document.querySelector(".section-1").scrollIntoView();
      if (idinput.value=="Not Registered yet" || idinput.value=="No Active User") {
        getUser(email_value);
      } 
    } else {
      outputMembership.innerHTML = "Enter a valid email";
    }
}

//
function getPayments() { 
  var email_value = document.querySelector('input[name=email-member]').value;
  if (email_value != '') { 
      outputMember.innerHTML = "..loading";
      getUser(email_value);
      
    } else {
      outputMember.innerHTML = "Enter a valid email";
    }

}


// create book class modal

function showStates(id,name,genre,lebel,adress,dia,day_nr,hora,fecha,details)
{
    var name_user = document.getElementById("User_name").value;
    var last_payment = document.getElementById("User_lastpayment").value;
    var last_due_payment = document.getElementById("User_nextpayment").value;
    var active = document.getElementById("User_active").value;
    var user_email = document.getElementById("User_email").value;

    let name_user2; 

    if (name_user=="No Active User") {
      name_user2=""
    } else {name_user2=name_user}


    var displayTable = "<div class=\"modal\" tabindex=\"-1\" role=\"dialog\" id=\"myModal\">";
    displayTable += "<div class=\"modal-dialog\" role=\"document\">";
    displayTable += "<div class=\"modal-content\" >";
    displayTable += "<div class=\"modal-header\ style=\"background-color:#48005f;color:White\">";
    displayTable += "<h5 class=\"modal-title\" id=\"exampleModalLongTitle\" > "+ name + "</h5>";
    displayTable += "<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">";
    displayTable += "<span aria-hidden=\"true\">×</span>";
    displayTable += "</button>";
    displayTable += "</div>";
    displayTable += "<div class=\"modal-body\">";
    displayTable += "<div class=\"container-fluid\">";
    displayTable += "<div class=\"row\">";
    displayTable += "<div class=\"col\" style=\"font-weight: bold\" ></div>";

    displayTable += "</div>";

    var espace = ": ";
    displayTable += "<div class=\"row\">"+"<strong>Adresse/Address</strong> "+adress+"</div>";
    displayTable += "<div class=\"row\">"+"<strong>Day/Tag </strong> "+espace+dia+"</div>";
    displayTable += "<div class=\"row\">"+"<strong>Time/Uhrzeit </strong> "+espace+hora+"</div>";
    displayTable += "<div class=\"row\">"+"<strong>Date/Datum </strong> "+espace+fecha+"</div>";
    displayTable += "<div class=\"row\">"+"<strong>Details/Mehr Infos </strong> "+espace+details+"</div>";
    displayTable += "<div class=\"row\">"+" "+"</div>";

    displayTable += "<div class=\"row\"> </div>";
    displayTable += "<div class=\"row\"> </div>";
    displayTable += '<form autocomplete="on" style="background-color:white;color:black">';
    displayTable += '<div class="form-row">';
    displayTable += "<label for=\"disabledTextInput\" style=\"font-weight: bold\" >"+" "+"</label>";
    displayTable += '</div>';
    displayTable += '<div class="form-row">';
    displayTable += '<label for="firstname" style="font-weight: bold">Name</label>';
    displayTable += "<input type=\"text\" id=\"firstname\" class=\"form-control\" Value=\""+name_user2+"\" >";
    displayTable += '<small id="nameHelp" class="form-text text-muted" style="color:yellow" >** Check your name is correct.</small>';
    displayTable += '</div>';
    displayTable += '<div class="form-row">';
    displayTable += '<label for="exampleFormControlSelect2" style="font-weight: bold">Gender (Leader/Follower)</label>';
    displayTable += '<select class="custom-select" id="gender">';
    displayTable += '<option>Female /Follower </option>';
    displayTable += '<option>Male / Leader</option>';
    displayTable += '</select>';
    displayTable += '</div>';
    displayTable += '<div class="form-row">';
    displayTable += '<label for="exampleFormControlSelect2" style="font-weight: bold">Mitgliedschaft</label>';
    displayTable += '<select class="custom-select" id="leader_jn">';
    displayTable += '<option>Active Member /Mitglied </option>';
    displayTable += '<option>Trial Class / Probestunde</option>';
    displayTable += '<option>Workshops / Workshops</option>';
    displayTable += '</select>';
    displayTable += '</div>';
    displayTable += '<div class="form-row">';
    displayTable += '<label for="exampleFormControlSelect3" style="font-weight: bold">Anmeldungstyp</label>';
    displayTable += '<select class="custom-select" id="promocode">';
    displayTable += '<option>Regular Course</option>';
    displayTable += '<option>4-10er Karte</option>';
    displayTable += '<option>Individual Class & Trial Class</option>';
    displayTable += '</select>';
    displayTable += '</div>';
    displayTable += '<div class="form-row">';
    displayTable += '<label for="email" style="font-weight: bold" >Email (mandatory/erforderlich) </label>';
    displayTable += "<input type=\"email\" id=\"email_registration\" class=\"form-control\" aria-describedby=\"emailHelp\" Value=\""+user_email+"\" >";
    displayTable += '<small id="emailHelp" class="form-text text-muted" style="color:yellow" >** Check your email is correct.</small>';
    displayTable += '<div id="display_error" style="color: red" ></div>';
    displayTable += '<div id="display_success" style="color: black" ></div>';
    displayTable += '</div>';
    displayTable += '<div class="form-row">';
    displayTable += '<div id="display_error" style="color: red" ></div>';
    displayTable += '<div id="display_success" style="color: black" ></div>';
    displayTable += '</div>';
    displayTable += '<div class="form-group col-md-3">';
    displayTable += "<input type=\"button\" value=\"Anmelden\" id=\"addRegis\" class=\"btn btn-colour-1\" ";
    displayTable += " onclick=\"AddRow('"+id+"',"+"'"+name+"',"+"'"+adress+"',"+"'"+dia+"',"+"'"+hora+"',"+"'"+fecha+"',"+"'"+details+"',"+"'"+genre+"',"+"'"+last_payment+"',"+"'"+last_due_payment+"',"+"'"+active+"')\" />";
   
    displayTable += '</div>';
    displayTable += "</div>";
    displayTable += "</div>";
    displayTable += "</div>";
    displayTable += "</div>";
    displayTable += "</div>";

    $("#statesModal").html(displayTable);
    $("#myModal").modal();
};



// get users data 
function getUser(email_value) {
    if (email_value != '') {
      urlapi = urluser+"/exec?mail="+email_value
      console.log(urlapi);
      // output.innerHTML = "laden...";
      console.log("fetching user data");
      fetch(urlapi).then(function (rep) {
        return rep.json()
      }).then(function (data) {
        console.log(data);
        output.innerHTML = "";
        data.user.forEach(function (val) {
          console.log(val);

          var name_user = val[3] 

          if (name_user == 'No Active User') {
          document.getElementById("name_display").style.display="none";
          document.getElementById("name_display").innerHTML = val[3];
          document.getElementById("email_display").innerHTML = email_value;
          document.getElementById("user_message").innerHTML = "Noch nicht registriert! Sie können einen Schnupperkurs im Kursplan buchen oder eine Mitgliedschaft registrieren";
          emailinput.value = email_value;
          nameinput.value = val[3];
          coursesinput.value = val[1];
          idinput.value = val[0];
          activeinput.value = val[2];
          lastpaymentinput.value = val[7];
          saldoinput.value = val[5];
          anmerkungeninput.value = val[6];
          nextpaymentinput.value = val[4];
          outputMember.innerHTML = "";

          } 
          else {

            document.querySelector('input[name=email-class]').value = email_value;
            document.querySelector('input[name=email-membership]').value = email_value;
            document.querySelector('input[name=email-member]').value = email_value;
            
          document.getElementById("name_display").style.display="block";
          document.getElementById("name_display").innerHTML = val[3];
          document.getElementById("email_display").innerHTML = email_value;
          document.getElementById("user_message").innerHTML = "Eine Zahlung vornehmen, Ihr Zahlungsverlauf oder Ihren Mitgliedsstatus überprüfen";
          emailinput.value = email_value;
          nameinput.value = val[3];
          coursesinput.value = val[1];
          idinput.value = val[0];
          activeinput.value = val[2];
          lastpaymentinput.value = val[7];
          saldoinput.value = val[5];
          anmerkungeninput.value = val[6];
          nextpaymentinput.value = val[4];
          btnPayments.style.display="block";
          btnPayment.style.display="block";

          outputMember.innerHTML = "";

          const user_profile = {
            id: val[0],
            name: val[3],
            email: email_value,
            active: val[2],
            membership: val[1],
            last_payment: val[7],
            next_payment: val[4],
            saldo: val[5],
            note: val[6]
         };

         const profile_local = {
           id: val[0],
           name: val[3],
           email: email_value,
        };

           sessionStorage.setItem('profile', JSON.stringify(user_profile));
           localStorage.setItem('profile_local', JSON.stringify(profile_local));
          
        }
        });
        showPayment(data.activepayment);
        showAllePayments(data.historypayments);

      });
      } else {
        output.innerHTML = "Enter a valid email";
      }
}


// get payments 
function showPayment(payment)
    {

        var espace = ": ";
        console.log(payment); 
        console.log("payment"); 
        var displayTable = "<div class=\"modal\" data-bs-backdrop=\"static\" tabindex=\"-1\" role=\"dialog\" id=\"mypaymodal\">";
        displayTable += "<div class=\"modal-dialog\" role=\"document\">";
        displayTable += "<div class=\"modal-content\" >";
        displayTable += "<div class=\"modal-header\ style=\"background-color:#48005f;color:White\">";
        displayTable += "<h5 class=\"modal-title\" id=\"exampleModalLongTitle\" > "+ "Check Membership Status "+nameinput.innerText+" "+emailinput.innerText+"</h5>";
        displayTable += "<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">";
        displayTable += "<span aria-hidden=\"true\">×</span>";
        displayTable += "</button>";
        displayTable += "</div>";
        displayTable += "<div class=\"modal-body\">";
        displayTable += "<div class=\"container-fluid\">";
        displayTable += "<div class=\"row\">";
        displayTable += "<div class=\"col\" style=\"font-weight: bold\" ></div>";
        displayTable += "</div>";
        displayTable += "<div class=\"row\">"+"<strong>Wenn es aktive Zahlungen deiner Mitgliedschaft gibt, werden diese hier angezeigt, wenn nicht, schreib uns bitte. </strong> "+"</div>";
        displayTable += "<div class=\"row\">"+"<strong>________Active Zahlungen___________</strong> "+"</div>";

        // Gets data from array created in getStates() function
                //TO PRINT 
        var displayTable2 =  "<div class=\"container\">";
        displayTable2 += "<div class=\"row\">"+"<strong>Wenn es aktive Zahlungen deiner Mitgliedschaft gibt, werden diese hier angezeigt, wenn nicht, schreib uns bitte. </strong> "+"</div>";
        displayTable2 += "<div class=\"row\">"+"<strong>________Active Zahlungen___________</strong> "+"</div>";
       

        payment.forEach(function(val,index) 
        {
            var num = index +1;
            displayTable += "<div class=\"row\">"+"<strong>___________________</strong> "+"</div>";
            displayTable += "<div class=\"row\">"+"<strong>Name </strong> "+espace+val[0]+"</div>";
            displayTable += "<div class=\"row\">"+"<strong>Membership </strong> "+espace+val[1]+"</div>";
            displayTable += "<div class=\"row\">"+"<strong>Payment Date </strong> "+espace+val[2]+"</div>";
            displayTable += "<div class=\"row\">"+"<strong>Payment Amount </strong> "+espace+val[3]+" EUR</div>";
            displayTable += "<div class=\"row\">"+"<strong>Payment Method </strong> "+espace+val[4]+"</div>";
            displayTable += "<div class=\"row\">"+"<strong>Payment Courses </strong> "+espace+val[5]+"</div>";
            displayTable += "<div class=\"row\">"+"<strong>Start Date </strong> "+espace+val[7]+"</div>";
            displayTable += "<div class=\"row\">"+"<strong>End Date </strong> "+espace+val[8]+"</div>";
            displayTable += "<div class=\"row\">"+"<strong>___________________</strong> "+"</div>";
            displayTable += "<div class=\"row\">"+" "+"</div>";

              // TO PRINT
              displayTable2 += "<div class=\"row\">"+"<strong>___________________</strong> "+"</div>";
              displayTable2 += "<div class=\"row\">"+"<strong>Name </strong> "+espace+val[0]+"</div>";
              displayTable2 += "<div class=\"row\">"+"<strong>Membership </strong> "+espace+val[1]+"</div>";
              displayTable2 += "<div class=\"row\">"+"<strong>Payment Date </strong> "+espace+val[2]+"</div>";
              displayTable2 += "<div class=\"row\">"+"<strong>Payment Amount </strong> "+espace+val[3]+" EUR</div>";
              displayTable2 += "<div class=\"row\">"+"<strong>Payment Method </strong> "+espace+val[4]+"</div>";
              displayTable2 += "<div class=\"row\">"+"<strong>Payment Courses </strong> "+espace+val[5]+"</div>";
              displayTable2 += "<div class=\"row\">"+"<strong>Start Date </strong> "+espace+val[7]+"</div>";
              displayTable2 += "<div class=\"row\">"+"<strong>End Date </strong> "+espace+val[8]+"</div>";
              displayTable2 += "<div class=\"row\">"+"<strong>___________________</strong> "+"</div>";
              displayTable2 += "<div class=\"row\">"+" "+"</div>";
    
            });
            displayTable2 += '</div>';

        displayTable += "<div class=\"row\"> </div>";
        displayTable += "<div class=\"row\"> </div>";
        displayTable += '<form style="background-color:white;color:black">';
        displayTable += '<div class="form-row">';
        displayTable += "<label for=\"disabledTextInput\" style=\"font-weight: bold\" >"+" "+"</label>";
        displayTable += '</div>';
        displayTable += '<div class="form-row">';
        displayTable += '</div>';
        displayTable += '<div class="form-group col-md-3">';
        displayTable += "<button type=\"button\" data-dismiss=\"modal\" value=\"Close\" class=\"btn btn-secondary\" ";
        displayTable += " >Close</button>";
       
        displayTable += '</div>';

  
        displayTable += "</div>";
        displayTable += "</div>";
        displayTable += "</div>";
        displayTable += "</div>";
        displayTable += "</div>";

        activePaymentString = displayTable2;

        $("#payModal").html(displayTable);
        
        return activePaymentString
    };   

    function showPaymentModal() {
      $("#mypaymodal").appendTo("body").modal('show');

      var paymentsString= inv1+activePaymentString+inv2;

      downloadPdfFromHtml(paymentsString, "membership_card.pdf");
      
    };


    function showAllePayments(payments)
    {
        console.log(payments); 
        var displayTable = "<div class=\"modal\" data-bs-backdrop=\"static\" tabindex=\"-1\" role=\"dialog\" id=\"mypaymentsModal\">";
        displayTable += "<div class=\"modal-dialog\" role=\"document\">";
        displayTable += "<div class=\"modal-content\" >";
        displayTable += "<div class=\"modal-header\ style=\"background-color:#48005f;color:White\">";
        displayTable += "<h5 class=\"modal-title\" id=\"exampleModalLongTitle\" > "+ "Check Payments History "+nameinput.innerText+" "+emailinput.innerText+"</h5>";
        displayTable += "<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">";
        displayTable += "<span aria-hidden=\"true\">×</span>";
        displayTable += "</button>";
        displayTable += "</div>";
        displayTable += "<div class=\"modal-body\">";
        displayTable += "<div class=\"container-fluid\">";
        displayTable += "<div class=\"row\">";
        displayTable += "<div class=\"col\" style=\"font-weight: bold\" ></div>";
        displayTable += "</div>";
        displayTable += "<div class=\"row\">"+"<strong>If there is a payments history it will get show, if not please write us. </strong> "+"</div>";
        displayTable += "<div class=\"row\">"+"<strong>Wenn es eine Zahlungshistorie gibt, wird diese hier angezeigt, wenn nicht, schreib uns bitte. </strong> "+"</div>";
        
        //TO PRINT 
        var displayTable2 =  "<div class=\"container\" >";
        displayTable2 += "<div class=\"row\">"+"<strong>If there is a payments history it will get show, if not please write us. </strong> "+"</div>";
        displayTable2 += "<div class=\"row\">"+"<strong>Wenn es eine Zahlungshistorie gibt, wird diese hier angezeigt, wenn nicht, schreib uns bitte. </strong> "+"</div>";
        

        // Gets data from array created in getStates() function

        payments.forEach(function(item, index) 
        {
          var num = index +1;
          var espace = ": ";
          displayTable += "<div class=\"row\">"+"<strong>___________________</strong> "+"</div>";
          displayTable += "<div class=\"row\">"+"<strong>Name </strong> "+espace+item[1]+"</div>";
          displayTable += "<div class=\"row\">"+"<strong>Membership </strong> "+espace+item[6]+"</div>";
          displayTable += "<div class=\"row\">"+"<strong>Payment Date </strong> "+espace+item[2]+"</div>";
          displayTable += "<div class=\"row\">"+"<strong>Payment Amount </strong> "+espace+item[3]+" EUR</div>";
          displayTable += "<div class=\"row\">"+"<strong>Payment Method </strong> "+espace+item[4]+"</div>";
          displayTable += "<div class=\"row\">"+"<strong>Payment Courses </strong> "+espace+item[5]+"</div>";
          displayTable += "<div class=\"row\">"+"<strong>Start Date </strong> "+espace+item[7]+"</div>";
          displayTable += "<div class=\"row\">"+"<strong>End Date </strong> "+espace+item[8]+"</div>";
          displayTable += "<div class=\"row\">"+"<strong>Payment Status </strong> "+espace+item[9]+"</div>";
          displayTable += "<div class=\"row\">"+"<strong>___________________</strong> "+"</div>";
          displayTable += "<div class=\"row\">"+" "+"</div>";

          // TO PRINT
          displayTable2 += "<div class=\"row\">"+"<strong>___________________</strong> "+"</div>";
          displayTable2 += "<div class=\"row\">"+"<strong>Name </strong> "+espace+item[1]+"</div>";
          displayTable2 += "<div class=\"row\">"+"<strong>Membership </strong> "+espace+item[6]+"</div>";
          displayTable2 += "<div class=\"row\">"+"<strong>Payment Date </strong> "+espace+item[2]+"</div>";
          displayTable2 += "<div class=\"row\">"+"<strong>Payment Amount </strong> "+espace+item[3]+" EUR</div>";
          displayTable2 += "<div class=\"row\">"+"<strong>Payment Method </strong> "+espace+item[4]+"</div>";
          displayTable2 += "<div class=\"row\">"+"<strong>Payment Courses </strong> "+espace+item[5]+"</div>";
          displayTable2 += "<div class=\"row\">"+"<strong>Start Date </strong> "+espace+item[7]+"</div>";
          displayTable2 += "<div class=\"row\">"+"<strong>End Date </strong> "+espace+item[8]+"</div>";
          displayTable2 += "<div class=\"row\">"+"<strong>Payment Status </strong> "+espace+item[9]+"</div>";
          displayTable2 += "<div class=\"row\">"+"<strong>___________________</strong> "+"</div>";
          displayTable2 += "<div class=\"row\">"+" "+"</div>";

        });
        displayTable2 += '</div>';

        displayTable += "<div class=\"row\"> </div>";
        displayTable += "<div class=\"row\"> </div>";
        displayTable += '<form style="background-color:white;color:black">';
        displayTable += '<div class="form-row">';
        displayTable += "<label for=\"disabledTextInput\" style=\"font-weight: bold\" >"+" "+"</label>";
        displayTable += '</div>';
        displayTable += '<div class="form-row">';
        displayTable += '</div>';
        displayTable += '<div class="form-group col-md-3">';
        displayTable += "<button type=\"button\" data-dismiss=\"modal\" value=\"Close\" class=\"btn btn-secondary\" ";
        displayTable += " >Close</button>";
       
        displayTable += '</div>';

        displayTable += "</div>";
        displayTable += "</div>";
        displayTable += "</div>";
        displayTable += "</div>";
        displayTable += "</div>";

        allPaymentsString = displayTable2;

        $("#paymentsModal").html(displayTable);

        return allPaymentsString;
    };

    function showPaymentsModal() {
      $("#mypaymentsModal").appendTo("body").modal('show');

      var paymentsString= inv1+allPaymentsString+inv2;

      downloadPdfFromHtml(paymentsString, "all_payments.pdf");

    };
    

  /// Save Class Registration and Post in Classes Api
    function AddRow(id,name,adress,dia,hora,fecha,details,genre,last_payment,last_due_payment,active)
    {
      var firstname = document.getElementById("firstname").value;
      var lastname = "";
      var phone = document.getElementById("gender").value;
      var leader_jn = document.getElementById("leader_jn").value;
      var promocode = document.getElementById("promocode").value;
      var promocode = document.getElementById("promocode").value;
      var email = document.getElementById("email_registration").value;
      let arr = [firstname, lastname, phone, leader_jn, promocode, email,id,name,adress,dia,hora,fecha,details,genre,last_payment,last_due_payment,active];
      if(firstname != ''   && leader_jn != ''  && email != '' && last_payment != 'Not Registered yet')
      {
      console.log(arr);
      sData(arr);
      document.getElementById("display_success").innerHTML = "Danke "+firstname+" "+lastname+" (email: "+email+"). Eine Email von info@alma-dance.com mit der Kursinformationen wurde geschickt. Bitte prüft auch deinen Spamordner.";
      document.getElementById("display_error").innerHTML = "";
      document.getElementById("addRegis").disabled = true; 
      }
      else if(firstname != ''   && leader_jn != ''  && email != '' && last_payment == 'Not Registered yet')
      {
      console.log(arr);
      sData(arr);
      document.getElementById("display_success").innerHTML = "Danke "+firstname+" "+lastname+" (email: "+email+"). Eine Email von info@alma-dance.com mit der Kursinformationen wurde geschickt. Bitte prüft auch deinen Spamordner.";
      document.getElementById("display_error").innerHTML = "";
      document.getElementById("addRegis").disabled = true; 
      }
      else {
        document.getElementById("display_error").innerHTML = "Bitte Name und Email eingeben!";
        document.getElementById("display_success").innerHTML = "";
      }
    }

    // Save Booking hl
function sData(arr) {

  let formData = new FormData();
  formData.append('data', JSON.stringify(arr));
  console.log("posting registration in API")
  fetch(url, {
    method: 'POST'
    , body: formData
  }).then(function (rep) {
    return rep.json()
  }).then(function (data) {
     console.log("Subscribed");

  })
};





function paymentForm(membership, price_total,nr_months,stripe_link,payment_type,nr_courses,type_payment)
{
    document.querySelector(".section-1").style.display = 'block';
    var name_user = document.getElementById("User_name").value;
    var last_payment = document.getElementById("User_lastpayment").value;
    var last_due_payment = document.getElementById("User_nextpayment").value;
    var active = document.getElementById("User_active").value;
    var user_email = document.getElementById("User_email").value;
    document.querySelector(".section-2").style.display = 'none';
    btnBookaclass.style.display = 'block';

    let name_user2; 

    if (name_user=="No Active User") {
      name_user2=""
    } else {name_user2=name_user}



    var displayTable = ""
    displayTable += "<div class=\"container-fluid\">";
    displayTable += "<div class=\"col\" style=\"font-weight: bold\" >";

    var espace = ": ";
    
    displayTable += "<div class=\"row\"> </div>";
    displayTable += "<div class=\"row\"> </div>";
    displayTable += '<form autocomplete="on" style="background-color:white;color:black">';
    displayTable += '<div class="form-row">';
    displayTable += "<label for=\"disabledTextInput\" style=\"font-weight: bold\" >"+membership+" / "+payment_type+"</label>";
    displayTable += '</div>';
    displayTable += '<div class="form-row">';
    displayTable += '<label for="firstname" style="font-weight: bold">Name</label>';
    displayTable += "<input type=\"text\" id=\"firstname_pay\" class=\"form-control\" Value=\""+name_user2+"\" >";
    displayTable += '<small id="nameHelp" class="form-text text-muted" style="color:yellow" >** Check your name is correct.</small>';
    displayTable += '</div>';
    displayTable += '<div class="form-row">';
    displayTable += '<label for="course_pay" style="font-weight: bold">Kurs(e)</label>';
    displayTable += '<select class="custom-select" multiple data-live-search="true" id="course_pay"  >';
    displayTable += '<option >Bachata Fundamentals</option>';
    displayTable += '<option >Bachata Improvers</option>';
    displayTable += '<option >Bachata Intermediate</option>';
    displayTable += '<option >Bachata Advanced</option>';
    displayTable += '<option >Lady Styling Bachata</option>';
    displayTable += '<option >Salsa Fundamentals</option>';
    displayTable += '<option >Salsa Improvers</option>';
    displayTable += '<option >Salsa Intermediate</option>';
    displayTable += '<option >Zouk Open Level</option>';
    displayTable += '<option >Flatrate</option>';
    displayTable += '</select>';
    displayTable += '</div>'; 
    displayTable += '<div class="form-row">';
    displayTable += "<input type=\"text\" id=\"nr_courses\" class=\"form-control\" style=\"display:none\"  Value=\""+nr_courses+"\" disabled>";
    displayTable += '</div>';
    displayTable += '<div class="form-row">';
    displayTable += "<input type=\"text\" id=\"nr_months\" class=\"form-control\"  style=\"display:none\" Value=\""+nr_months+"\" disabled>";
    displayTable += '</div>';
    displayTable += '<div class="form-row">';
    displayTable += "<input type=\"text\" id=\"membership\" class=\"form-control\" style=\"display:none\" Value=\""+membership+"\" disabled>";
    displayTable += '</div>';
    displayTable += '<div class="form-row">';
    displayTable += '<label for="newmember" style="font-weight: bold" >Telefonnummer (optional) </label>';
    displayTable += "<input type=\"phone\" id=\"newmember\" class=\"form-control\"   placeholder=\"Example +49 123 04235673\" Value=\""+""+"\" >";
    displayTable += '</div>';
    displayTable += '<div class="form-row">';
    displayTable += '<label for="emaiemail_paymentl" style="font-weight: bold" >Email (erforderlich) </label>';
    displayTable += "<input type=\"email\" id=\"email_payment\" class=\"form-control\" aria-describedby=\"emailHelp\" Value=\""+user_email+"\" >";
    displayTable += '<small id="emailHelp" class="form-text text-muted" style="color:yellow" >** Prüfen Sie, ob Ihre E-Mail korrekt ist.</small>';
    displayTable += '</div>';
    displayTable += '<div class="form-row">';
    displayTable += "<input type=\"text\" id=\"pricemonthly\" class=\"form-control\" style=\"display:none\" aria-describedby=\"pricemonthlyHelp\" Value=\""+type_payment+"\" disabled>";
    displayTable += '</div>';
    displayTable += '<div class="form-row">';
    displayTable += '<label for="payment_status" style="font-weight: bold">Payment Status</label>';
    displayTable += '<select class="custom-select" multiple data-live-search="true" id="payment_status"  >';
    displayTable += '<option >Paid</option>';
    displayTable += '<option >Not Paid Yet</option>';
    displayTable += '</select>';
    displayTable += '</div>'; 
    displayTable += '<div class="form-row">';
    displayTable += '<label for="payment_method" style="font-weight: bold">Payment Method</label>';
    displayTable += '<select class="custom-select" multiple data-live-search="true" id="payment_method"  >';
    displayTable += '<option >Bank Überweisung</option>';
    displayTable += '<option >Bar</option>';
    displayTable += '<option >Paypal</option>';
    displayTable += '</select>';
    displayTable += '</div>'; 
    displayTable += '<div class="form-row">';
    displayTable += '<label for="price" style="font-weight: bold" >Preis EUR</label>';
    displayTable += "<input type=\"text\" id=\"price_course\" class=\"form-control\" aria-describedby=\"priceHelp\" Value=\""+price_total+"\" >";
    displayTable += '<small id="priceHelp" class="form-text text-muted" style="color:yellow" >**Sie können nur monatlich oder auf einmal (3/6/12 Monate) mit einer regelmäßigen Bankanweisung zahlen.</small>';
    displayTable += '</div>';
    displayTable += '<div class="form-group col-md-3">';
    displayTable += "<input type=\"button\" value=\"Zahlungsmethode erneut auswählen\" style=\"display:none\"  id=\"selectPriceAgain\" class=\"btn btn-dark\" ";
    displayTable += " onclick=\"enablePriceCalculation()\"/disabled>";
    displayTable += '</div>';
    displayTable += '<div class="form-group col-md-3">';
    displayTable += "<input type=\"button\" value=\"Bezahlen\"  style=\"display:block\"  id=\"blockPrice\" class=\"btn btn-dark\" ";
    displayTable += " onclick=\"blockPriceF()\" />";
    displayTable += '</div>';
    displayTable += '<div id="display_error_pay" style="color: red" ></div>';
    displayTable += '<div class="form-group col-md-3">';
    displayTable += "<a class=\"btn btn-dark\" href=\""+stripe_link+"\" id=\"addStripe\" style=\"display:none;text-align:left\">Pay with Stripe</a>";
    displayTable += '</div>';
    displayTable += '<div class="form-group col-md-3">';
    displayTable += "<input type=\"button\" value=\"Mit Paypal bezahlen (+2 EUR Gebühr)\" style=\"display:none\"  id=\"addPaypal\" class=\"btn btn-dark\" ";
    displayTable += " onclick=\"paypalProcess()\" / disabled>";
    displayTable += '</div>';
    displayTable += '<div class="form-group col-md-3">';
    displayTable += "<input type=\"button\" value=\"Zahlung eintragen\" style=\"display:none\"  id=\"addBank\" class=\"btn btn-dark\" ";
    displayTable += " onclick=\"bankProcess()\" / disabled>";
    displayTable += '</div>';
    displayTable += '<div class="form-group col-md-3">';
    displayTable += "<input type=\"button\" value=\"Bankzahlung bestätigen\" style=\"display:none;background-color: rgb(172, 22, 22);\" id=\"sendPaymentEmail\" class=\"btn btn-dark\" ";
    displayTable += " onclick=\"bankProcess_sendEmail()\" / disabled>";
    displayTable += '</div>';
    displayTable += '<div class="form-group col-md-3">';
    displayTable += "<input type=\"button\" value=\"Mitgliedschaft erneut auswählen\" id=\"getMembership\" class=\"btn btn-dark\" style=\"background-color: rgb(0, 3, 192);\" ";
    displayTable += " onclick=\"selectMembership()\" />";
    displayTable += '</div>';
    displayTable += "</div>";
    displayTable += "</div>";
    $("#pay-form-container").html(displayTable);
};

function selectMembership() {
  document.getElementById("stripe-container").style.display = "block";
  document.getElementById("payment-block").style.display = "none";
  const bank = document.getElementById('bank-button-container').style.display = 'none';
  bank.innerHTML = '';
  const element = document.getElementById('paypal-button-container');
  element.innerHTML = '';
}

 function blockPriceF() {
  var name = document.getElementById("firstname_pay");
  var email = document.getElementById("email_payment");
  if (name.value!="" && email.value!="" ) {
    //document.getElementById("addPaypal").style.display = "block";
    document.getElementById("addBank").style.display = "block";
    //document.getElementById("addStripe").style.display = "block";
    //document.getElementById("addStripe").disabled = false;
    //document.getElementById("addPaypal").disabled = false;
    document.getElementById("addBank").disabled = false;
    document.getElementById("course_pay").disabled = true;
    name.disabled = true;
    email.disabled = true;
    document.getElementById("newmember").disabled = true;
    document.getElementById("blockPrice").style.display = "none";
    document.getElementById("display_error_pay").innerHTML= "";
  } else {
    document.getElementById("display_error_pay").innerHTML= "Bitte Name & Email eingeben"; 
  }

 };

 function enablePriceCalculation() {
  document.getElementById('smart-button-container').style.display = 'none';
  const bank = document.getElementById('bank-button-container').style.display = 'none';
  bank.innerHTML = '';
  const element = document.getElementById('paypal-button-container');
  element.innerHTML = '';
  document.getElementById("blockPrice").disabled = false;
  document.getElementById("blockPrice").style.display = "block";
  //document.getElementById("addPaypal").style.display = "none";
  document.getElementById("addBank").style.display = "none";
  //document.getElementById("addStripe").style.display = "none";
  document.getElementById("sendPaymentEmail").disabled = true;
  document.getElementById("sendPaymentEmail").style.display = "none";
  document.getElementById("selectPriceAgain").disabled = true;
  document.getElementById("selectPriceAgain").style.display = "none";
  document.getElementById("course_pay").disabled = false;
  document.getElementById("firstname_pay").disabled = false;
  document.getElementById("email_payment").disabled = false;
  document.getElementById("newmember").disabled = false;

 };



function paypalProcess() {
  //get prices from db and select from dictionary
  //get payment data
  //get payment datum als due datum für bestehende kunde für neue kunde ist zahlungsdatum
  console.log("Paypal Process starting");
  var membershiptype =  document.getElementById("membership").value;
  var price_class = Number(document.getElementById("price_course").value) +2;
  document.getElementById("selectPriceAgain").disabled = false;
  document.getElementById("selectPriceAgain").style.display = "block";

  document.getElementById("course_pay").disabled = true;
  document.getElementById("firstname_pay").disabled = true;
  document.getElementById("email_payment").disabled = true;
  document.getElementById("newmember").disabled = true;
  //document.getElementById("addPaypal").disabled = true;
  document.getElementById("addBank").disabled = true;
  document.getElementById("blockPrice").disabled = true;
  
  document.getElementById('ItemOrdered').value = membershiptype;
  document.getElementById('ItemOrdered').setAttribute( "price", price_class );
  document.getElementById('ItemOrdered').innerHTML = membershiptype+" "+price_class+" EUR";
  document.getElementById('smart-button-container').style.display = 'block';

  initPayPalButton();
  //create a new user if new
  //create a new payment
  //send a payment 
  //show a receipt 
};




//// PAYPAL 


async function initPayPalButton() {
  document.getElementById("price_shield").style.display = "block";


  var shipping = 0;
  var itemOptions = document.querySelector("#smart-button-container #item-options");
var quantity = parseInt();
var quantitySelect = document.querySelector("#smart-button-container #quantitySelect");
if (!isNaN(quantity)) {
quantitySelect.style.visibility = "visible";
}
var orderDescription = 'ALMA DANCE COURSES';
if(orderDescription === '') {
orderDescription = 'Item';
}
paypal.Buttons({
style: {
  shape: 'rect',
  color: 'gold',
  layout: 'vertical',
  label: 'paypal',
  
},
createOrder: function(data, actions) {
  var selectedItemDescription = itemOptions.options[itemOptions.selectedIndex].value;
  var selectedItemPrice = parseFloat(itemOptions.options[itemOptions.selectedIndex].getAttribute("price"));
  var tax = (0 === 0 || false) ? 0 : (selectedItemPrice * (parseFloat(0)/100));
  if(quantitySelect.options.length > 0) {
    quantity = parseInt(quantitySelect.options[quantitySelect.selectedIndex].value);
  } else {
    quantity = 1;
  }

  tax *= quantity;
  tax = Math.round(tax * 100) / 100;
  var priceTotal = quantity * selectedItemPrice + parseFloat(shipping) + tax;
  priceTotal = Math.round(priceTotal * 100) / 100;
  var itemTotalValue = Math.round((selectedItemPrice * quantity) * 100) / 100;

  return actions.order.create({
    purchase_units: [{
      description: orderDescription,
      amount: {
        currency_code: 'EUR',
        value: priceTotal,
        breakdown: {
          item_total: {
            currency_code: 'EUR',
            value: itemTotalValue,
          },
          shipping: {
            currency_code: 'EUR',
            value: shipping,
          },
          tax_total: {
            currency_code: 'EUR',
            value: tax,
          }
        }
      },
      items: [{
        name: selectedItemDescription,
        unit_amount: {
          currency_code: 'EUR',
          value: selectedItemPrice,
        },
        quantity: quantity
      }]
    }]
  });
},
onApprove: function(data, actions) {
  return actions.order.capture().then(function(orderData) {
    
    // Full available details
    console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));

    // Show a success message within this page, e.g.
    var displayTable_thankyou = ""
    displayTable_thankyou += '<h3>Vielen Dank für Ihre Zahlung!</h3>';
    displayTable_thankyou += '<p>Eine E-Mail mit der Zahlungsbestätigung wurde an Ihre E-Mail-Adresse gesendet.</p>';
    displayTable_thankyou += '<p>Das System wird innerhalb von 24 Stunden aktualisiert.</p>';
    displayTable_thankyou += '<p>Sie können anfangen zu tanzen!</p>';
    const element = document.getElementById('message-button-small-container');
    element.innerHTML = displayTable_thankyou;

    console.log('Payment Processed');

    output.innerHTML = '<h3>Vielen Dank für Ihre Zahlung!</h3>';
    document.getElementById('smart-button-container').style.display = 'none';
    document.getElementById('paypal-button-container').style.display = 'none';
    document.querySelector(".paypal").disabled = 'true';

      //Elements to take
    var newmember = document.getElementById("newmember").value;
    var membershiptype =  document.getElementById("membership").value;
    var firstname_pay = document.getElementById("firstname_pay").value;
    var email_payment = document.getElementById("email_payment").value;
    var course_pay = $('#course_pay').val(); 
    var membershiptype_nr = document.getElementById("nr_months").value;
    var coursesnumber_nr = document.getElementById("nr_courses").value;
    var course_price = document.getElementById("price_course").value;
    var type_payment = document.getElementById("pricemonthly").value;

    //GET DATE
    const date = new Date();
    const date2 = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${day}-${month}-${year}`;  
  
    let future_datum;
    if(type_payment=="Monthly") {
      future_datum = addMonths(date, Number(1));
    } else {
      future_datum = addMonths(date, Number(membershiptype_nr));
    }

    let future_day = future_datum.getDate();
    let future_month = future_datum.getMonth() + 1;
    let future_year = future_datum.getFullYear();
    let future_date = `${future_day}-${future_month}-${future_year}`; 

    var contract_datum = addMonths(date2, Number(membershiptype_nr));
    let contract_day = contract_datum.getDate();
    let contract_month = contract_datum.getMonth() + 1;
    let contract_year = contract_datum.getFullYear();
    let contract_date = `${contract_day}-${contract_month}-${contract_year}`; 

    console.log('This person paid',firstname_pay, ", ",email_payment, ", ",idinput.value );

    payment_array.length = 0;

    let arr_pay = [String(newmember),idinput.value,firstname_pay,membershiptype,currentDate,course_price,"Paypal",false,type_payment,String(year)+String(month),currentDate,"Kein",email_payment,"nein","",course_pay.toString(),coursesnumber_nr,membershiptype_nr,"",currentDate,future_date,"Active",contract_date,true];
    console.log(arr_pay);

    payment_array.push(arr_pay);


    //CREATE FUTURE OPEN PAYMENTS
    if(type_payment=="Monthly") {

      for (let i = 0; i < (membershiptype_nr-1); i++) {
        let future_datum2 = addMonths(date, Number(1));
    
        let future_day2 = future_datum2.getDate();
        let future_month2 = future_datum2.getMonth();
        let future_month3 = future_datum2.getMonth() + 1;
        let future_year2 = future_datum2.getFullYear();
        let future_date2 = `${future_day2}-${future_month2}-${future_year2}`;
        let future_date3 = `${future_day2}-${future_month3}-${future_year2}`;
    
        let array = [String(newmember),idinput.value,firstname_pay,membershiptype,future_date2,course_price,"Paypal",false,type_payment,String(year)+String(month),currentDate,"NotPaidYet",email_payment,"nein","",course_pay.toString(),coursesnumber_nr,membershiptype_nr,"",future_date2,future_date3,"NotPaidYet",contract_date,false];
    
        payment_array.push(array);
      }
      console.log("future_payments_array");
      } 
      sDataPay(payment_array);
  });
},
onError: function(err) {
  console.log(err);
},
}).render('#paypal-button-container');

await sleep(5000);
location.reload();


}


    // Save Booking hl
    function sDataPay(arr) {
      console.log(arr);

       let formData = new FormData();
       formData.append('data', JSON.stringify(arr));
       console.log("posting registration in API")
       fetch(url_payment, {
         method: 'POST'
         , body: formData
       }).then(function (rep) {
         return rep.json()
       }).then(function (data) {
          console.log("Subscribed");
         //repMessage.textContent = "Subscribed" ;
       })
     };


    // Process Future Payments
        function sDataPay_Future(arr) {
          console.log(arr);
    
           let formData = new FormData();
           formData.append('data', JSON.stringify(arr));
           console.log("posting future PAYMENT in API")
           fetch(url_future_payments, {
             method: 'POST'
             , body: formData
           }).then(function (rep) {
             return rep.json()
           }).then(function (data) {
              console.log("FUTURE PAYMENT POSTED");
             //repMessage.textContent = "Subscribed" ;
           })
         };




function bankProcess() {

  //create a new user if new
  //create a new payment not paid
  //send a email with payment details 
  payment_status = document.getElementById("payment_status").value;

  let payment_status_var; 
  let pay_yes_no;
  if (payment_status=="Paid") {
    payment_status_var="Kein";
    pay_yes_no=true
  } else {
    payment_status_var="NotPaidYet";
    pay_yes_no=false
  }

  payment_method = document.getElementById("payment_method").value;

  document.getElementById("payment_method").disabled = true;
  document.getElementById("payment_status").disabled = true;
  document.getElementById("addBank").disabled = true;
  //document.getElementById("addPaypal").disabled = true;
  document.getElementById("course_pay").disabled = true;
  document.getElementById("firstname_pay").disabled = true;
  document.getElementById("email_payment").disabled = true;
  document.getElementById("newmember").disabled = true;
  document.getElementById("blockPrice").disabled = true;
  document.getElementById("selectPriceAgain").disabled = false;
  document.getElementById("selectPriceAgain").style.display = "block";

  console.log("Bank process")
  document.querySelector(".section-1").style.display = 'block';
  var firstname_pay = document.getElementById("firstname_pay").value;
  var membershiptype =  document.getElementById("membership").value;
  var course_price = document.getElementById("price_course").value;
  document.querySelector(".section-2").style.display = 'none';


  /// BEZAHLUNG 
  var newmember = document.getElementById("newmember").value;
  var email_payment = document.getElementById("email_payment").value;
  var course_pay = $('#course_pay').val(); 
  var membershiptype_nr = document.getElementById("nr_months").value;
  var coursesnumber_nr = document.getElementById("nr_courses").value;
  var course_price = document.getElementById("price_course").value;
  var type_payment = document.getElementById("pricemonthly").value;

  //GET DATE
  const date = new Date();
  const date2 = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  // This arrangement can be altered based on how we want the date's format to appear.
  let currentDate = `${day}-${month}-${year}`;  

  let future_datum;
    
    if(type_payment=="Monthly") {
      future_datum = addMonths(date, Number(1));
    } else {
      future_datum = addMonths(date, Number(membershiptype_nr));
    }
  let future_day = future_datum.getDate();
  let future_month = future_datum.getMonth() + 1;
  let future_year = future_datum.getFullYear();
  let future_date = `${future_day}-${future_month}-${future_year}`;

   //Contract
  var contract_datum = addMonths(date2, Number(membershiptype_nr));
  let contract_day = contract_datum.getDate();
  let contract_month = contract_datum.getMonth() + 1;
  let contract_year = contract_datum.getFullYear();
  let contract_date = `${contract_day}-${contract_month}-${contract_year}`;   



  var beginner_3_months = dict_prices["Beginners 1 Course - 3 Months"];
  var beginner_6_months = dict_prices["Beginners 1 Course - 6 Months"];

  btnBookaclass.style.display = 'block';

  var displayTable = ""
  var espace = ": ";
  var displayTable = ""
    displayTable += "<div class=\"container-fluid\">";
    displayTable += "<div class=\"col\" style=\"font-weight: bold\" >";
    displayTable += "<h3 id=\"paymentTitle\">Zahlungsdetails</h3>";
displayTable +="<p style=\"font-size: 14px; line-height: 160%;text-align: left;\">Vielen Dank für Deine Anmeldung zu unserem Kurs(en). </p>";
displayTable +="<p style=\"font-size: 14px; line-height: 160%;text-align: left;\"> </p>";
displayTable +="<p style=\"font-size: 14px; line-height: 160%;text-align: left;\">Kurs: <strong>"+course_pay+" </strong>.</p>";
displayTable +="<p style=\"font-size: 14px; line-height: 160%;text-align: left;\">Mitgliedschaftstyp: <strong>"+membershiptype+"</strong>.</p>";
displayTable +="<p style=\"font-size: 14px; line-height: 160%;text-align: left;\"> </p>";
displayTable +="<p style=\"font-size: 14px; line-height: 160%; text-align: left;\">Um Deine Bestellung abzuschließen, bitte überweise den entsprechenden Betrag auf unser Bankkonto:</p>";
displayTable +="<p style=\"font-size: 14px; line-height: 160%; text-align: left;\"><br />Gesamtbeitrag: <strong>"+course_price+" EUR</strong><br />Kontoinhaber: Ivan Eduardo Millan Jorge<br />IBAN: DE47 1001 1001 2620 4751 14<br />BIC: NTSBDEB1XXX<br />Verwendungszweck: Tanzkurs-"+currentDate+"-"+firstname_pay+"</p>";
displayTable +="<p style=\"font-size: 14px; line-height: 160%; text-align: left;\"><br />Paypal-Zahlung:<br />Konto: millan.jorge.ie@gmail.com<br />Verwendungszweck: Tanzkurs-"+currentDate+"-"+firstname_pay+"</p>";
displayTable +="<p style=\"font-size: 14px; line-height: 160%; text-align: left;\">Man kann Paypal-Zahlung als Freunde ohne die extra Paypal-Gebühren tätigen. Also gleiche Summe als bei der Banküberweisung.Einfach hier bestätigen & per Email oder bei deinem ersten Kurs melden.</p>";
displayTable +="<p style=\"font-size: 14px; line-height: 160%; text-align: left;\">Du bekommst eine Zahlungsbestätigung per Email spätestens 24 hr nach Zahlungseingang.</p>";
displayTable +="<p style=\"font-size: 14px; line-height: 160%; text-align: left;\"> </p>";
displayTable +="<p style=\"font-size: 14px; line-height: 160%; text-align: left;\">Deine Mitgliedschaft wird aktiv nach Zahlungseingang. Schreib uns gerne wenn Du Fragen zu unseren Kursen / Anmeldungen hast.</p>";
displayTable +="<p style=\"font-size: 14px; line-height: 160%; text-align: left;\">Liebe Grüße / Best</p>";
displayTable +="<p style=\"font-size: 14px; line-height: 160%; text-align: left;\">Eduardo &amp; Natalia<br />Alma Dance Team</p>";
displayTable += "<input type=\"button\" value=\"Bankzahlungsmethode bestätigen\" style=\"background-color: rgb(172, 22, 22);\"  id=\"sendPaymentEmail2\" class=\"btn btn-dark\" ";
displayTable += " onclick=\"bankProcess_sendEmail()\" />";
displayTable += "</div>";
displayTable += "</div>";
  const element = document.getElementById('bank-button-container');
  element.innerHTML = displayTable;
  document.getElementById('bank-button-container').style.display = 'block';

/// SEND EMAIL FOR PAYMENT
console.log(course_pay);

payment_array.length = 0;

let array0 = [String(newmember),idinput.value,firstname_pay,membershiptype,currentDate,course_price,payment_method,false,type_payment,String(year)+String(month),currentDate,payment_status_var,email_payment,"nein","",course_pay.toString(),coursesnumber_nr,membershiptype_nr,"",currentDate,future_date,"NotPaidYet",contract_date,pay_yes_no];

payment_array.push(array0);

document.getElementById("sendPaymentEmail").disabled = false;
document.getElementById("sendPaymentEmail").style.display = 'block';

if(type_payment=="Monthly") {


  for (let i = 0; i < (membershiptype_nr-1); i++) {
    let future_datum2 = addMonths(date, Number(1));

    let future_day2 = future_datum2.getDate();
    let future_month2 = future_datum2.getMonth() ;
    let future_month3 = future_datum2.getMonth() + 1;
    let future_year2 = future_datum2.getFullYear();
    let future_date2 = `${future_day2}-${future_month2}-${future_year2}`;
    let future_date3 = `${future_day2}-${future_month3}-${future_year2}`;

    let array = [String(newmember),idinput.value,firstname_pay,membershiptype,future_date2,course_price,payment_method,false,type_payment,String(year)+String(month),currentDate,payment_status_var,email_payment,"nein","",course_pay.toString(),coursesnumber_nr,membershiptype_nr,"",future_date2,future_date3,"NotPaidYet",contract_date,false];

    payment_array.push(array);
  }
  console.log("future_payments_array");
  console.log(payment_array);


} 


return payment_array
};
 

function getFuturePayments() {
  console.log("getFuturePayments");
  for (let i = 0; i < future_payments_array.length; i++) {
    console.log(future_payments_array[i]);
  }
}




//// BANK PAYMENT
async function  bankProcess_sendEmail(arr) {
  console.log("sending pre bank cash payment");
  document.getElementById("sendPaymentEmail").disabled = true;
  document.getElementById("paymentTitle").innerText = 'Zahlungsdetails per Email versendet.Bitte prüfe auch deinen Spamordner. Nach Zahlungseingang bist du offiziell angemeldet.';
  document.getElementById("paymentTitle").style = "color: red;font-weight:bold";

  sDataPay(payment_array);

  await sleep(5000);
  
  location.reload();

}



///   	UTILS    /// 
////ADD MONTH FUNTION


function addMonths(date, months) {
  date.setMonth(date.getMonth() + months);

  return date;
}

 function downloadPdfFromHtml(htmlString, fileName) {
  var opt = {
    margin:       1,
    filename:     fileName,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  
  // New Promise-based usage:
  html2pdf().set(opt).from(htmlString).save();

 }


// STRIPE PAYMENT HANDLER
//ABONNEMENTS FOR 6 and 12 Months
//PAYMENTS FOR 3 MONTHS and Beginners Promotion
//STRIPE LINKS FROM GOOGLE IMPORTIEREN
//PREISE IN DER TABELEL DINAMISCH AUSFÜLLEN
//NACH AUSWAHL ZUM FORMULAR
//NACH FORMULAR ZUM AUSWAHL -- BANK/STRIPE > ABOS  ALL METHODS>PAY ALL
//NACH ZAHLUNG EMAIL ZAHLUNGSBESTÄTIGUNG PAYPAL/STRIPE --BANK ZAHLUNGSAUFFORDERUNG
//LINK EXAMPLE WITH PREFILLED OBJECTS
//https://buy.stripe.com/test_28o17G3CZ2IH0tWcMO?prefilled_email=jenny%40example.com&prefilled_promo_code=20off&locale=de



const inv1 = `
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>A simple, clean, and responsive HTML invoice template</title>

		<style>
			.invoice-box {
				max-width: 800px;
				margin: auto;
				padding: 30px;
				border: 1px solid #eee;
				box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
				font-size: 16px;
				line-height: 24px;
				font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
				color: #555;
			}

			.invoice-box table {
				width: 100%;
				line-height: inherit;
				text-align: left;
			}

			.invoice-box table td {
				padding: 5px;
				vertical-align: top;
			}

			.invoice-box table tr td:nth-child(2) {
				text-align: right;
			}

			.invoice-box table tr.top table td {
				padding-bottom: 20px;
			}

			.invoice-box table tr.top table td.title {
				font-size: 45px;
				line-height: 45px;
				color: #333;
			}

			.invoice-box table tr.information table td {
				padding-bottom: 40px;
			}

			.invoice-box table tr.heading td {
				background: #eee;
				border-bottom: 1px solid #ddd;
				font-weight: bold;
			}

			.invoice-box table tr.details td {
				padding-bottom: 20px;
			}

			.invoice-box table tr.item td {
				border-bottom: 1px solid #eee;
			}

			.invoice-box table tr.item.last td {
				border-bottom: none;
			}

			.invoice-box table tr.total td:nth-child(2) {
				border-top: 2px solid #eee;
				font-weight: bold;
			}

			@media only screen and (max-width: 600px) {
				.invoice-box table tr.top table td {
					width: 100%;
					display: block;
					text-align: center;
				}

				.invoice-box table tr.information table td {
					width: 100%;
					display: block;
					text-align: center;
				}
			}

			/** RTL **/
			.invoice-box.rtl {
				direction: rtl;
				font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
			}

			.invoice-box.rtl table {
				text-align: right;
			}

			.invoice-box.rtl table tr td:nth-child(2) {
				text-align: left;
			}
		</style>
	</head>

	<body>
		<div class="invoice-box">
			<table cellpadding="0" cellspacing="0" style="background-color: #48005f; color: aliceblue; font-family: Arial, Helvetica, sans-serif;">
				<tr class="top">
					<td colspan="2">
						<table>
							<tr>
								<td class="title">
									<img align="center" border="0" src="https://lh5.googleusercontent.com/tGsnLIfvPBtebcXXik_OGsj1XatcpeFXE9ciM5-kmy6OpoJrXGtwBKUDZfl9SiUfGA0=w2400" alt="image" title="image" style="outline:none;text-decoration:none;clear:both;display:inline-block!important;border:none;height:auto;float:none;width:57%;max-width:334.02px" width="334.02" class="m_-5765270377848614674v-src-width m_-5765270377848614674v-src-max-width CToWUd" crossorigin="" data-bit="iit">
								</td>

								<td>
									Payments History<br />
                  https://alma-dance-frankfurt.de/<br />
								</td>
							</tr>
						</table>
					</td>
				</tr>

				<tr class="information">
					<td colspan="2">
						<table>
							<tr>
								<td>
									Alma Dance Frankfurt<br />
									Dreieichstraße 35 <br />
									60594 Franfurt am Main
								</td>

								<td>
									Eduardo Millan<br />
									+49 163 9641730<br />
									info@alma-dance.de
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</div>
    `
    const inv2 = `
    </body>
</html>
`
// STRIPE PAYMENT HANDLER
//ABONNEMENTS FOR 6 and 12 Months
//PAYMENTS FOR 3 MONTHS and Beginners Promotion
//STRIPE LINKS FROM GOOGLE IMPORTIEREN
//PREISE IN DER TABELEL DINAMISCH AUSFÜLLEN
//NACH AUSWAHL ZUM FORMULAR
//NACH FORMULAR ZUM AUSWAHL -- BANK/STRIPE > ABOS  ALL METHODS>PAY ALL
//NACH ZAHLUNG EMAIL ZAHLUNGSBESTÄTIGUNG PAYPAL/STRIPE --BANK ZAHLUNGSAUFFORDERUNG
//LINK EXAMPLE WITH PREFILLED OBJECTS
//https://buy.stripe.com/test_28o17G3CZ2IH0tWcMO?prefilled_email=jenny%40example.com&prefilled_promo_code=20off&locale=de