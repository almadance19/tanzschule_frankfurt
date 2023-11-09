//GIT GUIDE
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
};

// call API COURSES
const url = 'https://script.google.com/macros/s/AKfycbwFcDRbzmC0LsFZBn2Z5EL5Vn5DdwcT7Llh94W2xIaFy8h-iaGaYa-Wot7PlC4hU8Mt/exec';

const urluser =  'https://script.google.com/macros/s/AKfycbzWu6k32M7XjlK51cEYH-5qqO0Az5cHKI1zypbU_nHwFxzGGP2DmOa4U0u6FbY9AO-r/exec';

const url_prices = 'https://script.google.com/macros/s/AKfycbxQJP0x0GEQQ7ZbdYxed1_EQfr5aRNonJWH82iEzg8wUn-M5cNy2l7yGZ2FPpx0Vz4D/exec';

const url_payment = 'https://script.google.com/macros/s/AKfycbwDNQg1LmMXmX9hCQfNr6BltWYJwNIO664U5YgqbTyB7ZyMWFkxkd_Ky96YCMpHsAI/exec';

//get buttons 
const output = document.querySelector('.output');
const outputMembership = document.querySelector('.output-membership');
const outputMember = document.querySelector('.output-member');
//const btnPayment = document.querySelector('.payment');
const btnPayments = document.querySelector('.allpayments');
const btnEmail = document.querySelector('.emailer');
const btnPaypal = document.querySelector('.paypal');
const btnBookaclass = document.querySelector('.bookaclass');

//get fields
//const iName = document.querySelector('input[name=name]');
//const iMes = document.querySelector('input[name=message]');
const repMessage = document.querySelector('.rep');

//event listener buttons 
//btnPayment.addEventListener('click', showPaymentModal);
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
        displayTable += "<th>Course</th>";
        displayTable += "<th>Day/Time</th>";
        displayTable += "<th>Day/Date</th>";
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
        displayTable += "<td><input type=\"button\" value=\"Register\" class=\"btn btn-colour-1\" ";
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
        inputEl.value = "One-time payment";
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
        inputEl.value = "Monthly Subscription";
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



function Create_Payment_Form(membership, price_total,nr_months,stripe_link,nr_courses) { 
  //output.innerHTML = "membership " + membership + "price_month " + price_total+"price_total " + price_total+"nr_months " + nr_months;
  paymentForm(membership, price_total,nr_months,stripe_link,"One-time payment",nr_courses); 
  document.getElementById("stripe-container").style.display = 'none';
  document.getElementById("payment-block").style.display = 'block';

  document.getElementById('sect1').scrollIntoView();
} 

function Create_Payment_Form_Abo(membership, price_total,nr_months,stripe_link,nr_courses) { 
  //output.innerHTML = "membership " + membership + "price_month " + price_total+"price_total " + price_total+"nr_months " + nr_months;
  paymentForm(membership, price_total,nr_months,stripe_link,"Monthly Subscription",nr_courses);
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
    getUser(email_value);
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
    getUser(email_value);
    } else {
      outputMembership.innerHTML = "Enter a valid email";
    }
}

//
function getPayments() { 
  var email_value = document.querySelector('input[name=email-member]').value;
  if (email_value != '') { 
      //outputMember.innerHTML = "..loading";
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
    displayTable += '<form style="background-color:white;color:black">';
    displayTable += '<div class="form-row">';
    displayTable += "<label for=\"disabledTextInput\" style=\"font-weight: bold\" >"+" "+"</label>";
    displayTable += '</div>';
    displayTable += '<div class="form-row">';
    displayTable += '<label for="firstname" style="font-weight: bold">Name</label>';
    displayTable += "<input type=\"text\" id=\"firstname\" class=\"form-control\" Value=\""+"\" >";
    displayTable += '<small id="nameHelp" class="form-text text-muted" style="color:yellow" >** Check your name is correct.</small>';
    displayTable += '</div>';
    displayTable += '<div class="form-row">';
    displayTable += '<label for="exampleFormControlSelect2" style="font-weight: bold">Registration Type</label>';
    displayTable += '<select class="custom-select" id="leader_jn">';
    displayTable += '<option>Active Member /Mitglied </option>';
    displayTable += '<option>Trial Class / Probestunde</option>';
    displayTable += '<option>Workshops / Workshops</option>';
    displayTable += '</select>';
    displayTable += '</div>';
    displayTable += '<div class="form-row">';
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
      //output.innerHTML = "loading...";
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
          document.getElementById("user_message").innerHTML = "Not Registered Yet! You can Book a Trial Class in the Schedule below or Register a Membership";
          emailinput.value = email_value;
          nameinput.value = val[3];
          coursesinput.value = val[1];
          idinput.value = val[0];
          activeinput.value = val[2];
          lastpaymentinput.value = val[7];
          saldoinput.value = val[5];
          anmerkungeninput.value = val[6];
          nextpaymentinput.value = val[4];

          } 
          else {
          document.getElementById("name_display").style.display="block";
          document.getElementById("name_display").innerHTML = val[3];
          document.getElementById("email_display").innerHTML = email_value;
          document.getElementById("user_message").innerHTML = "Make a Payment, check your Payment History or check your Membership Status";
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
        displayTable += "<div class=\"row\">"+"<strong>If there are active Payments for your Membership they will get show, if not please write us. </strong> "+"</div>";
        displayTable += "<div class=\"row\">"+"<strong>Wenn es aktive Zahlungen deiner Mitgliedschaft gibt, werden diese hier angezeigt, wenn nicht, schreib uns bitte. </strong> "+"</div>";
        displayTable += "<br/>"
        displayTable += "<div class=\"row\">"+"<strong>________Last Payment___________</strong> "+"</div>";
        displayTable += "<div class=\"row\">"+"<strong>User ID </strong> "+espace+idinput.innerText+"</div>";
        displayTable += "<div class=\"row\">"+"<strong>Name </strong> "+espace+nameinput.innerText+"</div>";
        displayTable += "<div class=\"row\">"+"<strong>Email </strong> "+espace+emailinput.innerText+"</div>";
        displayTable += "<div class=\"row\">"+"<strong>Last Payment </strong> "+espace+lastpaymentinput.innerText+"</div>";
        displayTable += "<div class=\"row\">"+"<strong>Last Due Payment Date </strong> "+espace+nextpaymentinput.innerText+"</div>";
        displayTable += "<div class=\"row\">"+"<strong>Saldo </strong> "+espace+saldoinput.innerText+"</div>";
        displayTable += "<div class=\"row\">"+"<strong>More Infos </strong> "+espace+anmerkungeninput.innerText+"</div>";
        displayTable += "<div class=\"row\">"+"<strong>Active Membership (TRUE/FALSE) </strong> "+espace+activeinput.innerText+"</div>";
        displayTable += "<br/>"

        // Gets data from array created in getStates() function

        payment.forEach(function(val,index) 
        {
          var num = index +1;
    
          displayTable += "<div class=\"row\">"+"<strong>________Active Payments___________</strong> "+"</div>";
          displayTable += "<div class=\"row\">"+"<strong>User ID </strong> "+espace+idinput.innerText+"</div>";
          displayTable += "<div class=\"row\">"+"<strong>Payment ID </strong> "+espace+val[6]+"</div>";
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

        });

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

        $("#payModal").html(displayTable);
        //$("#mypaymodal").appendTo("body").modal('show');
    };   

    function showPaymentModal() {
      $("#mypaymodal").appendTo("body").modal('show');
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

        // Gets data from array created in getStates() function

        payments.forEach(function(item, index) 
        {
          var num = index +1;
          var espace = ": ";
          displayTable += "<div class=\"row\">"+"<strong>___________________</strong> "+"</div>";
          displayTable += "<div class=\"row\">"+"<strong>Payment ID </strong> "+espace+item[0]+"</div>";
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

        });

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

        $("#paymentsModal").html(displayTable);
    };

    function showPaymentsModal() {
      $("#mypaymentsModal").appendTo("body").modal('show');
    };
    

  /// Save Class Registration and Post in Classes Api
    function AddRow(id,name,adress,dia,hora,fecha,details,genre,last_payment,last_due_payment,active)
    {
      var firstname = document.getElementById("firstname").value;
      var lastname = "";
      var phone = "01-TEST"
      var leader_jn = document.getElementById("leader_jn").value;
      var promocode = document.getElementById("promocode").value;
      var promocode = document.getElementById("promocode").value;
      var email = document.getElementById("email_registration").value;
      let arr = [firstname, lastname, phone, leader_jn, promocode, email,id,name,adress,dia,hora,fecha,details,genre,last_payment,last_due_payment,active];
      if(firstname != ''   && leader_jn != ''  && email != '' && last_payment != 'Not Registered yet')
      {
      console.log(arr);
      sData(arr);
      document.getElementById("display_success").innerHTML = "Thank you "+firstname+" "+lastname+" (email: "+email+").You just received just an Email from info@alma-dance.com with the course details. Please check also in your spam folder";
      document.getElementById("display_error").innerHTML = "";
      document.getElementById("addRegis").disabled = true; 
      }
      else if(firstname != ''   && leader_jn != ''  && email != '' && last_payment == 'Not Registered yet')
      {
      console.log(arr);
      sData(arr);
      document.getElementById("display_success").innerHTML = "Thank you "+firstname+" "+lastname+" (email: "+email+").You just received just an Email from info@alma-dance.com with the course details. Please check also in your spam folder";
      document.getElementById("display_error").innerHTML = "";
      document.getElementById("addRegis").disabled = true; 
      }
      else {
        document.getElementById("display_error").innerHTML = "Please enter name and valid email!";
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


function paymentForm(membership, price_total,nr_months,stripe_link,payment_type,nr_courses)
{
    document.querySelector(".section-1").style.display = 'block';
    var name_user = document.getElementById("User_name").value;
    var last_payment = document.getElementById("User_lastpayment").value;
    var last_due_payment = document.getElementById("User_nextpayment").value;
    var active = document.getElementById("User_active").value;
    var user_email = document.getElementById("User_email").value;
    document.querySelector(".section-2").style.display = 'none';
    btnBookaclass.style.display = 'block';



    var displayTable = ""
    displayTable += "<div class=\"container-fluid\">";
    displayTable += "<div class=\"col\" style=\"font-weight: bold\" >";

    var espace = ": ";
    
    displayTable += "<div class=\"row\"> </div>";
    displayTable += "<div class=\"row\"> </div>";
    displayTable += '<form style="background-color:white;color:black">';
    displayTable += '<div class="form-row">';
    displayTable += "<label for=\"disabledTextInput\" style=\"font-weight: bold\" >"+membership+" / "+payment_type+"</label>";
    displayTable += '</div>';
    displayTable += '<div class="form-row">';
    displayTable += '<label for="firstname" style="font-weight: bold">Name</label>';
    displayTable += "<input type=\"text\" id=\"firstname_pay\" class=\"form-control\" Value=\""+name_user+"\" >";
    displayTable += '<small id="nameHelp" class="form-text text-muted" style="color:yellow" >** Check your name is correct.</small>';
    displayTable += '</div>';
    displayTable += '<div class="form-row">';
    displayTable += '<label for="course_pay" style="font-weight: bold">Course(s) / Kurs(e)</label>';
    displayTable += '<select class="custom-select" multiple data-live-search="true" id="course_pay"  >';
    displayTable += '<option >Bachata Fundamentals</option>';
    displayTable += '<option >Bachata Improvers</option>';
    displayTable += '<option >Bachata Intermediate</option>';
    displayTable += '<option >Bachata Advanced</option>';
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
    displayTable += '<label for="newmember" style="font-weight: bold" >Phone/Telefonnummer (optional) </label>';
    displayTable += "<input type=\"phone\" id=\"newmember\" class=\"form-control\"   placeholder=\"Example +49 123 04235673\" Value=\""+""+"\" >";
    displayTable += '</div>';
    displayTable += '<div class="form-row">';
    displayTable += '<label for="emaiemail_paymentl" style="font-weight: bold" >Email (mandatory/erforderlich) </label>';
    displayTable += "<input type=\"email\" id=\"email_payment\" class=\"form-control\" aria-describedby=\"emailHelp\" Value=\""+user_email+"\" >";
    displayTable += '<small id="emailHelp" class="form-text text-muted" style="color:yellow" >** Check your email is correct.</small>';
    displayTable += '</div>';
    displayTable += '<div class="form-row">';
    displayTable += "<input type=\"text\" id=\"pricemonthly\" class=\"form-control\" style=\"display:none\" aria-describedby=\"pricemonthlyHelp\" Value=\""+price_total+"\" disabled>";
    displayTable += '</div>';
    displayTable += '<div class="form-row">';
    displayTable += '<label for="price" style="font-weight: bold" >Price / Preis EUR</label>';
    displayTable += "<input type=\"text\" id=\"price_course\" class=\"form-control\" aria-describedby=\"priceHelp\" Value=\""+price_total+"\" disabled>";
    displayTable += '<small id="priceHelp" class="form-text text-muted" style="color:yellow" >**You can only pay monthly or all at once (3/6/12 months) with a Bank Regular Order </small>';
    displayTable += '</div>';
    displayTable += '<div class="form-group col-md-3">';
    displayTable += "<input type=\"button\" value=\"Select Payment Method Again\" style=\"display:none\"  id=\"selectPriceAgain\" class=\"btn btn-dark\" ";
    displayTable += " onclick=\"enablePriceCalculation()\"/disabled>";
    displayTable += '</div>';
    displayTable += '<div class="form-group col-md-3">';
    displayTable += "<input type=\"button\" value=\"Pay\"  style=\"display:block\"  id=\"blockPrice\" class=\"btn btn-dark\" ";
    displayTable += " onclick=\"blockPriceF()\" />";
    displayTable += '</div>';
    displayTable += '<div class="form-group col-md-3">';
    displayTable += "<input type=\"button\" value=\"Select Membership Again\" id=\"getMembership\" class=\"btn btn-dark\" ";
    displayTable += " onclick=\"selectMembership()\" />";
    displayTable += '</div>';
    displayTable += '<div class="form-group col-md-3">';
    displayTable += "<a class=\"btn btn-dark\" href=\""+stripe_link+"\" id=\"addStripe\" style=\"display:none;text-align:left\">Pay with Stripe</a>";
    displayTable += '</div>';
    displayTable += '<div class="form-group col-md-3">';
    displayTable += "<input type=\"button\" value=\"Pay with Paypal (+2 EUR Fee)\" style=\"display:none\"  id=\"addPaypal\" class=\"btn btn-dark\" ";
    displayTable += " onclick=\"paypalProcess()\" / disabled>";
    displayTable += '</div>';
    displayTable += '<div class="form-group col-md-3">';
    displayTable += "<input type=\"button\" value=\"Bank payment (No Fee)\" style=\"display:none\"  id=\"addBank\" class=\"btn btn-dark\" ";
    displayTable += " onclick=\"bankProcess()\" / disabled>";
    displayTable += '</div>';
    displayTable += '<div class="form-group col-md-3">';
    displayTable += "<input type=\"button\" value=\"Register & Send me Email with Payment Infos\" style=\"display:none\"  id=\"sendPaymentEmail\" class=\"btn btn-dark\" ";
    displayTable += " onclick=\"bankProcess_sendEmail()\" / disabled>";
    displayTable += '</div>';
    displayTable += "</div>";
    displayTable += "</div>";
    $("#pay-form-container").html(displayTable);
};

function selectMembership() {
  document.getElementById("stripe-container").style.display = "block";
  document.getElementById("payment-block").style.display = "none";
  const bank = document.getElementById('bank-button-container').style.display = 'none';
  bank = '';
  const element = document.getElementById('paypal-button-container');
  element.innerHTML = '';
}

 function blockPriceF() {
  document.getElementById("addPaypal").style.display = "block";
  document.getElementById("addBank").style.display = "block";
  //document.getElementById("addStripe").style.display = "block";
  //document.getElementById("addStripe").disabled = false;
  document.getElementById("addPaypal").disabled = false;
  document.getElementById("addBank").disabled = false;
  document.getElementById("course_pay").disabled = true;
  document.getElementById("firstname_pay").disabled = true;
  document.getElementById("email_payment").disabled = true;
  document.getElementById("newmember").disabled = true;
  document.getElementById("blockPrice").style.display = "none";

 };

 function enablePriceCalculation() {
  document.getElementById('smart-button-container').style.display = 'none';
  const bank = document.getElementById('bank-button-container').style.display = 'none';
  bank.innerHTML = '';
  const element = document.getElementById('paypal-button-container');
  element.innerHTML = '';
  document.getElementById("blockPrice").disabled = false;
  document.getElementById("blockPrice").style.display = "block";
  document.getElementById("addPaypal").style.display = "none";
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
  document.getElementById("addPaypal").disabled = true;
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


function initPayPalButton() {
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
    displayTable_thankyou += '<h3>Thank you for your payment!</h3>';
    displayTable_thankyou += '<p>An Email was send to your Email with the Payment Confirmation was send to your Email Address.</p>';
    displayTable_thankyou += '<p>The System will be updated within 24 hrs.</p>';
    displayTable_thankyou += '<p>You can start </p>';
    const element = document.getElementById('message-button-small-container');
    element.innerHTML = displayTable_thankyou;

    console.log('Payment Processed');

    output.innerHTML = '<h3>Thank you for your payment!</h3>';
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

    //GET DATE
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${day}-${month}-${year}`;  
  
    const future_datum = addMonths(date, Number(membershiptype_nr));
    let future_day = future_datum.getDate();
    let future_month = future_datum.getMonth() + 1;
    let future_year = future_datum.getFullYear();
    let future_date = `${future_day}-${future_month}-${future_year}`; 


    console.log('This person paid',firstname_pay, ", ",email_payment, ", ",idinput.value );

    let arr_pay = [String(newmember),idinput.value,firstname_pay,membershiptype,currentDate,course_price,"Paypal",false,"",String(year)+String(month),currentDate,"Kein",email_payment,"nein","",course_pay.toString(),coursesnumber_nr,membershiptype_nr,"",currentDate,future_date,"active","nein","FFM"];
    console.log(arr_pay);

    sDataPay(arr_pay);
    // Or go to another URL:  actions.redirect('thank_you.html');
  });
},
onError: function(err) {
  console.log(err);
},
}).render('#paypal-button-container');
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




function bankProcess() {

  //create a new user if new
  //create a new payment not paid
  //send a email with payment details 
 
  document.getElementById("addBank").disabled = true;
  document.getElementById("addPaypal").disabled = true;
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

  //GET DATE
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  // This arrangement can be altered based on how we want the date's format to appear.
  let currentDate = `${day}-${month}-${year}`;  

  const future_datum = addMonths(date, Number(membershiptype_nr));
  let future_day = future_datum.getDate();
  let future_month = future_datum.getMonth() + 1;
  let future_year = future_datum.getFullYear();
  let future_date = `${future_day}-${future_month}-${future_year}`;  

  /////////////
  let button_message 

  if (idinput.value == 'No Active User') {
     button_message =  "Register and get Payment Details Email";
  } else {
    button_message =  "Send me Payment Details Email";
  }

  var beginner_3_months = dict_prices["Beginners 1 Course - 3 Months"];
  var beginner_6_months = dict_prices["Beginners 1 Course - 6 Months"];

  btnBookaclass.style.display = 'block';

  var displayTable = ""
  var espace = ": ";
  var displayTable = ""
    displayTable += "<div class=\"container-fluid\">";
    displayTable += "<div class=\"col\" style=\"font-weight: bold\" >";
    displayTable += "<h3 id=\"paymentTitle\">Payment Details</h3>";
    displayTable +="<p style=\"font-size: 14px; line-height: 160%; text-align: left;\">Many thanks for registering to our course(s): "+firstname_pay+"</p>";
displayTable +="<p style=\"font-size: 14px; line-height: 160%; text-align: left;\"> </p>";
displayTable +="<p style=\"font-size: 14px; line-height: 160%; text-align: left;\">Course(s): <strong>"+course_pay+" </strong>.</p>";
displayTable +="<p style=\"font-size: 14px; line-height: 160%; text-align: left;\">Membership Type: <strong>"+membershiptype+"</strong>.</p>";
displayTable +="<p style=\"font-size: 14px; line-height: 160%; text-align: left;\"> </p>";
displayTable +="<p style=\"font-size: 14px; line-height: 160%; text-align: left;\">Please complete the order by transfering the payment to our bank account or just bring the money on cash before your next class:</p>";
displayTable +="<p style=\"font-size: 14px; line-height: 160%; text-align: left;\">Total Amount: <strong>"+course_price+" EUR</strong><br />Kontoinhaber: Ivan Eduardo Millan Jorge<br />IBAN: DE47 1001 1001 2620 4751 14<br />BIC: NTSBDEB1XXX<br />Verwendungszweck: Tanzkurs-"+currentDate+"-"+firstname_pay+"</p>";
displayTable +="<p style=\"font-size: 14px; line-height: 160%; text-align: left;\"><br />Or pay via Paypal <br />Account: millan.jorge.ie@gmail.com<br />Message: Tanzkurs-"+currentDate+"-"+firstname_pay+"</p>";
displayTable +="<p style=\"font-size: 14px; line-height: 160%; text-align: left;\">Alternatively pay via Paypal as a Friend without the paypal fee.</p>";
displayTable +="<p style=\"font-size: 14px; line-height: 160%; text-align: left;\">After payment you will get your digital confirmation within the next 24 hrs.</p>";
displayTable +="<p style=\"font-size: 14px; line-height: 160%; text-align: left;\"><br />3/6/12 Months Subscription:<br />You create a regular transfer order with your bank or paypal paying monthly.</p>";
displayTable +="<p style=\"font-size: 14px; line-height: 160%; text-align: left;\"> </p>";
displayTable +="<p style=\"font-size: 14px; line-height: 160%; text-align: left;\">Check if we have current discounts for Beginners.<br />1 Beginners Course - 3 Months (Total Amount): "+beginner_3_months+" EUR .<br /> 1 Beginners Course - 6 Months (Total Amount): "+beginner_6_months+" EUR. </p>";
displayTable +="<p style=\"font-size: 14px; line-height: 160%; text-align: left;\">Your Subscription will be active after payment. Feel free to write back if you have any questions.<br />We are looking forward to dancing with you!</p>";
displayTable +="<p style=\"font-size: 14px; line-height: 160%; text-align: left;\"> </p>";
displayTable +="<p style=\"font-size: 14px; line-height: 160%;text-align: left;\"> </p>";
displayTable +="<p style=\"font-size: 14px; line-height: 160%;text-align: left;\">DEUTSCH</p>";
displayTable +="<p style=\"font-size: 14px; line-height: 160%;text-align: left;\"> </p>";
displayTable +="<p style=\"font-size: 14px; line-height: 160%;text-align: left;\">Vielen Dank für Deine Anmeldung zu unserem Kurs(en). </p>";
displayTable +="<p style=\"font-size: 14px; line-height: 160%;text-align: left;\"> </p>";
displayTable +="<p style=\"font-size: 14px; line-height: 160%;text-align: left;\">Kurs: <strong>"+course_pay+" </strong>.</p>";
displayTable +="<p style=\"font-size: 14px; line-height: 160%;text-align: left;\">Mitgliedschaftstyp: <strong>"+membershiptype+"</strong>.</p>";
displayTable +="<p style=\"font-size: 14px; line-height: 160%;text-align: left;\"> </p>";
displayTable +="<p style=\"font-size: 14px; line-height: 160%; text-align: left;\">Um Deine Bestellung abzuschließen, kannst Du nun zur Zahlung übergehen. Bitte überweise den entsprechenden Betrag auf unser Bankkonto oder bring das Geld vor deiner nächsten Kurstunde:</p>";
displayTable +="<p style=\"font-size: 14px; line-height: 160%; text-align: left;\"><br />Gesamtbeitrag: <strong>"+course_price+" EUR</strong><br />Kontoinhaber: Ivan Eduardo Millan Jorge<br />IBAN: DE47 1001 1001 2620 4751 14<br />BIC: NTSBDEB1XXX<br />Verwendungszweck: Tanzkurs-"+currentDate+"-"+firstname_pay+"</p>";
displayTable +="<p style=\"font-size: 14px; line-height: 160%; text-align: left;\"><br />Paypal-Zahlung:<br />Konto: millan.jorge.ie@gmail.com<br />Verwendungszweck: Tanzkurs-"+currentDate+"-"+firstname_pay+"</p>";
displayTable +="<p style=\"font-size: 14px; line-height: 160%; text-align: left;\">Man kann Paypal-Zahlung als Freunde ohne die extra Paypal-Gebühren tätigen. Also gleiche Summe als bei der Banküberweisung</p>";
displayTable +="<p style=\"font-size: 14px; line-height: 160%; text-align: left;\">Du bekommst eine Zahlungsbestätigung per Email spätestens 24 hr nach Zahlungseingang.</p>";
displayTable +="<p style=\"font-size: 14px; line-height: 160%; text-align: left;\"> </p>";
displayTable +="<p style=\"font-size: 14px; line-height: 160%; text-align: left;\"><br />3/6/12 Monate-Mitgliedschaft:<br />Überweisungsauftrag bei der Bank oder Paypal einrichten und monatlich bezahlen.</p>";
displayTable +="<p style=\"font-size: 14px; line-height: 160%; text-align: left;\"> </p>";
displayTable +="<p style=\"font-size: 14px; line-height: 160%; text-align: left;\">Gerne nach Rabattierte Preise für Anfängerkurse hier unten prüfen.<br /> 1 Anfängerkurs - 3 Monate (Gesamtbeitrag): "+beginner_3_months+" EUR .<br /> 1 Anfängerkurs - 6 Monate (Gesamtbeitrag):: "+beginner_6_months+" EUR </p>";
displayTable +="<p style=\"font-size: 14px; line-height: 160%; text-align: left;\">Deine Mitgliedschaft wird aktiv nach Zahlungseingang. Schreib uns gerne wenn Du Fragen zu unseren Kursen / Anmeldungen hast.</p>";
displayTable +="<p style=\"font-size: 14px; line-height: 160%; text-align: left;\">Liebe Grüße / Best</p>";
displayTable +="<p style=\"font-size: 14px; line-height: 160%; text-align: left;\">Eduardo &amp; Natalia<br />Alma Dance Team</p>";
displayTable += "</div>";
displayTable += "</div>";
  const element = document.getElementById('bank-button-container');
  element.innerHTML = displayTable;
  document.getElementById('bank-button-container').style.display = 'block';

/// SEND EMAIL FOR PAYMENT
console.log(course_pay);

payment_array.length = 0;

payment_array.push(String(newmember),idinput.value,firstname_pay,membershiptype,currentDate,course_price,"Online NotPaidYet","","",String(year)+String(month),currentDate,"NotPaidYet",email_payment,"nein","",course_pay.toString(),coursesnumber_nr,membershiptype_nr,"",currentDate,future_date,"NotPaidYet","nein","FFM");

console.log(payment_array);

document.getElementById("sendPaymentEmail").disabled = false;
document.getElementById("sendPaymentEmail").style.display = 'block';

return payment_array
};

//// BANK PAYMENT
function  bankProcess_sendEmail(arr) {
  console.log("sending pre bank cash payment");
  document.getElementById("sendPaymentEmail").disabled = true;
  document.getElementById("paymentTitle").innerText = 'Payment Infos sent to your Email';

  sDataPay(payment_array);
}



///   	UTILS    /// 
////ADD MONTH FUNTION


function addMonths(date, months) {
  date.setMonth(date.getMonth() + months);

  return date;
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