//GENERAL VARIABLES
const listElement = document.querySelector('.review_side');
const postTemplate = document.getElementById('single-post');
const url = 'https://script.google.com/macros/s/AKfycbxFy18JvPmQixnw7enJSFQYe4tVC9newrU9MngM0l9I2lEgiY1LLJOoLCptTQlWmsA/exec';
const users= [];

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

///DEFINE BUTTON FILTERS AND EVENT LISTENERS
const btn_female =  document.getElementById('followers');

btn_female.addEventListener("click", function(){
    filterUsers("Female/Follower");
}, false);
const btn_male =  document.getElementById('leaders');
btn_male.addEventListener("click", function(){
    filterUsers("Male/Leader");
}, false);



/// PASS FILTER TO USERS
function filterUsers(filter_value) {
    listElement.innerHTML="";

    for (const post of users) {
        if (post[2]==filter_value){
            const postEl = document.importNode(postTemplate.content, true);
            postEl.querySelector(".city").textContent = post[8];
            postEl.querySelector('h3').textContent = post[1].toUpperCase();
            postEl.querySelector('span').textContent = post[2];
            postEl.querySelector('h2').textContent = post[7];
            postEl.querySelector('p').textContent = post[3];
            postEl.querySelector(".aboutme").textContent = post[4];
            postEl.querySelector(".idealdancepartner").textContent = post[6];
            postEl.querySelector(".goals").textContent = post[5];
            postEl.querySelector(".customer-container").setAttribute('id',post[0]);
            postEl.querySelector(".customer-container").setAttribute('value',post[0]);
            postEl.querySelector("a").setAttribute("onclick","contactPartner('post[0]');");
            if (post[9]=="Registration saved without a photo / Registrierung ohne Foto gespeichert") {
                postEl.querySelector('img').src = "images/review1.png";
            }   else {
                postEl.querySelector('img').src = post[9];
            }
            listElement.append(postEl);
            
        }
    }
    //$('.bachata').css('display', 'none')
    console.log("BUTTON PRESSED")
}


//// ONLOAD HHTP REQUEST TO GET DATA
const xhr = new XMLHttpRequest();
xhr.open('GET', url);
xhr.responseType = 'json';
xhr.onload = function() {
  // const listOfPosts = JSON.parse(xhr.response);
  const listOfPosts = xhr.response.posts;
  console.log(listOfPosts)
  for (const post of listOfPosts) {
    const postEl = document.importNode(postTemplate.content, true);
            postEl.querySelector(".city").textContent = post[8];
            postEl.querySelector('h3').textContent = post[1].toUpperCase();
            postEl.querySelector('span').textContent = post[2];
            postEl.querySelector('h2').textContent = post[7];
            postEl.querySelector('p').textContent = post[3];
            postEl.querySelector(".aboutme").textContent = post[4];
            postEl.querySelector(".idealdancepartner").textContent = post[6];
            postEl.querySelector(".goals").textContent = post[5];
            postEl.querySelector(".customer-container").setAttribute('id',post[0]);
            postEl.querySelector(".customer-container").setAttribute('value',post[0]);
            postEl.querySelector("a").setAttribute("onclick","contactPartner('"+post[0]+"');");

            if (post[9]=="Registration saved without a photo / Registrierung ohne Foto gespeichert") {
                postEl.querySelector('img').src = "images/review1.png";
            }   else {
                postEl.querySelector('img').src = post[9];
            }
    listElement.append(postEl);

    users.push(post);
  }
  console.log(users)

      // Get User Data from Local Storage
      const extractedUser = JSON.parse(localStorage.getItem('user'));
      console.log(extractedUser);
      if (extractedUser) {
        console.log('Got the id - ' + extractedUser.id);
        document.getElementById("name_display").style.display="block";
        document.getElementById("name_display").innerHTML = extractedUser.name;
        document.getElementById("email_display").innerHTML = extractedUser.email;
        document.getElementById("user_message").innerHTML = "You can contact a user now.";
        document.getElementById("user_message2").innerHTML = "";
        coursesinput.value=extractedUser.name;
        emailinput.value=extractedUser.email;
        btn_edit_profile.style.display="block";

      } else {
        console.log('Could not find id.');
      }
};
xhr.send();








//GENERAL FIELDS

urluser='https://script.google.com/macros/s/AKfycbwSTDQj8m9dHS0iTVyr3QDViZ8ItpT6QEQXhgu9QqobhxwZmYIMpJuWoj-umCh7gcM/exec';
const output = document.querySelector('.output');
const btn_login = document.getElementById('loginbutton');
btn_login.addEventListener('click',getLogin);
const btn_edit_profile = document.getElementById('edit_profile');


function getLogin() { 
    var email_value = document.querySelector('input[name=email-class]').value;
    if (email_value != '') { 
        output.innerHTML = "..loading";
        getUser(email_value);
        
      } else {
        output.innerHTML = "Enter a valid email";
      }
  
  }
  

// get users data 
function getUser(email_value) {
    if (email_value != '') {
      urlapi = urluser+"/exec?code="+email_value
      console.log(urlapi);
      //output.innerHTML = "loading...";
      console.log("fetching user data");
      fetch(urlapi).then(function (rep) {
        return rep.json()
      }).then(function (val) {
        console.log(val);
        output.innerHTML = "";
          var name_user = val.posts[0][1] 
          console.log(name_user);
          if (val.posts[0][1]  == 'No Active User') {
          document.getElementById("name_display").style.display="none";
          document.getElementById("name_display").innerHTML = val.posts[0][1];
          document.getElementById("email_display").innerHTML = email_value;
          document.getElementById("user_message").innerHTML = "Not Registered yet. You have to register to use our partner search services.";
          document.getElementById("user_message2").innerHTML = ""
          emailinput.value = email_value;
          nameinput.value = val.posts[0][3];
          coursesinput.value = val.posts[0][1];
          idinput.value = val.posts[0][0];
          activeinput.value = val.posts[0][2];
          lastpaymentinput.value = val.posts[0][7];
          saldoinput.value = val.posts[0][5];
          anmerkungeninput.value = val.posts[0][6];
          nextpaymentinput.value = val.posts[0][4];

          } 
          else {
          document.getElementById("name_display").style.display="block";
          btn_edit_profile.style.display="block";
          document.getElementById("name_display").innerHTML = val.posts[0][1];
          document.getElementById("email_display").innerHTML = email_value;
          document.getElementById("user_message").innerHTML = "You can contact a user now."
          document.getElementById("user_message2").innerHTML = ""
          //document.getElementById("user_message2").innerHTML = val.posts[0][3];
          emailinput.value = email_value;
          nameinput.value = val.posts[0][3];
          coursesinput.value = val.posts[0][1];
          idinput.value = val.posts[0][0];
          activeinput.value = val.posts[0][2];
          lastpaymentinput.value = val.posts[0][7];
          saldoinput.value = val.posts[0][5];
          anmerkungeninput.value = val.posts[0][6];
          nextpaymentinput.value = val.posts[0][4];

          const user = {
            id: val.posts[0][0],
            name: val.posts[0][1],
            email:email_value,
            gender: val.posts[0][2],
            level: val.posts[0][3],
            description: val.posts[0][4],
            ideal_partner: val.posts[0][5],
            goals: val.posts[0][6],
            styles: val.posts[0][7],
          };

            localStorage.setItem('user', JSON.stringify(user));

        }
        });
      } else {
        output.innerHTML = "Enter a valid email";
      }
}


///CONTACT PARTNER FUNCTION 

function contactPartner(Userid){
    console.log(Userid);

       var name_user = coursesinput.value;
       var email_pay = emailinput.value;

       console.log(name_user);
  
      if ( name_user !="No Active User") {

        var displayTable = "<div class=\"modal\" tabindex=\"-1\" role=\"dialog\" id=\"myModal\">";
        displayTable += "<div class=\"modal-dialog\" role=\"document\">";
        displayTable += "<div class=\"modal-content\" >";
        displayTable += "<div class=\"modal-header\ style=\"background-color:#48005f;color:White\">";
        displayTable += "<h3 class=\"modal-title\" id=\"exampleModalLongTitle\" > "+ "SEND A MESSAGE TO USER" + "</h3>";
        displayTable += "<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">";
        displayTable += "<span aria-hidden=\"true\">×</span>";
        displayTable += "</button>";
        displayTable += "</div>";
        displayTable += "<div class=\"modal-body\">";
        displayTable += "<div class=\"container-fluid\">";
        displayTable += "<div class=\"row\">";
        displayTable += "<div class=\"col\" style=\"font-weight: bold\" ></div>";
        displayTable += "</div>";

        // Gets data from array created in getStates() function

          var espace = ": ";
          displayTable += '<p><strong>SEND A MESSAGE / NACHRICHT SENDEN</strong> </p>';

        displayTable += "<div class=\"row\"> </div>";
        displayTable += "<div class=\"row\"> </div>";
        displayTable += '<form style="background-color:white;color:black">';
        displayTable += '<div class="form-row">';
        displayTable += "<label for=\"disabledTextInput\" style=\"font-weight: bold\" >"+" "+"</label>";
        displayTable += '</div>';
        
        displayTable += '<form id="myForm" onsubmit="handleFormSubmit(this)">';
        displayTable += '<div class="form-row">';
        displayTable += '<label for="firstname" style="font-weight: bold">Name</label>';
        displayTable += "<input type=\"text\" id=\"firstname\" class=\"form-control\" Value=\""+name_user+"\" >";
        displayTable += '</div>';
        displayTable += '<div class="form-row">';
        displayTable += '<label for="lastname" style="font-weight: bold">Message / Nachricht</label>';
        displayTable += '<textarea rows="3" id="lastname" class="form-control" placeholder="Enter Message"></textarea>';
        displayTable += '</div>';
        displayTable += '<div class="form-row">';
        displayTable += '<label for="lastname" style="font-weight: bold">More about me</label>';
        displayTable += '<textarea rows="3" id="leader_jn" class="form-control" placeholder="Enter Message"></textarea>';
        displayTable += '</div>';
        displayTable += '<div class="form-row">';
        displayTable += '<label for="phone" style="font-weight: bold">More Contact Infos</label>';
        displayTable += '<input type="text" id="phone" class="form-control" aria-describedby="phoneHelp" placeholder="Example +4915344446342 / @dancer_22" />';
        displayTable += '<small id="phoneHelp" class="form-text text-muted" style="color:yellow" >** not mandatory / nicht erforderlich</small>';
        displayTable += '</div>';
        displayTable += '<div class="form-row">';
        displayTable += '<label for="email" style="font-weight: bold" >Email (mandatory/erforderlich) </label>';
        displayTable += "<input type=\"email\" id=\"email\" class=\"form-control\" placeholder=\"Enter email\" aria-describedby=\"emailHelp\" Value=\""+email_pay+"\" >";
        displayTable += '<small id="emailHelp" class="form-text text-muted" style="color:yellow" >** Check your email is correct.</small>';
        displayTable += '<div id="display_error" style="color: red" ></div>';
        displayTable += '<div id="display_success" style="color: black" ></div>';
        displayTable += '</div>';
        displayTable += '<div class="form-row">';
        displayTable += "<input type=\"button\" value=\"Send Email\" class=\"btn btn-colour-1\" ";
        displayTable += " onclick=\"AddRow('"+Userid+"',"+"'"+name_user+"',"+"'"+email_pay+"')\" />";

        displayTable += '</div>';       
        displayTable += '</form>';
        displayTable += '<br>';
        displayTable += '<div id="output"></div>';
        displayTable += "</div>";
        displayTable += "</div>";
        displayTable += "</div>";
        displayTable += "</div>";
        displayTable += "</div>";

        $("#contactModal").html(displayTable);
        $("#myModal").modal();
   
      }
      else {
        if(window.confirm("Please Login or Register first -> Go to registration: OK? or Cancel to login")){
          window.open("dance-partner-registration.html");
       } 

      }
    } 


    function AddRow(userid,name,adress)
    {
      var firstname = document.getElementById("firstname").value;
      var lastname = document.getElementById("lastname").value;
      var phone = document.getElementById("phone").value;
      var leader_jn = document.getElementById("leader_jn").value;
      var email = document.getElementById("email").value;
      var foto =  "Hello"; //document.getElementById("myFoto");
      if(firstname != '' && lastname != ''   && leader_jn != ''  && email != '')
      {
      /// SEND CONTACT
      var message=[email,firstname, lastname, phone, leader_jn,userid];
      console.log(message);
      sData(message);
      $("#firstname").prop( "disabled", true ).val("");
      $("#lastname").prop( "disabled", true ).val("");
      $("#leader_jn").prop( "disabled", true ).val("");
      $("#phone").prop( "disabled", true ).val("");
      $("#email").prop( "disabled", true ).val("");

      document.getElementById("display_success").innerHTML = "Thank you "+firstname+" "+" (email: "+email+"). You both just received an Email from info@alma-dance.com  with your message, so that you can communicate. Take care and have fun practicing. Please check also in your spam folder.";
      }
      else
      {
        /// ERRORS
      document.getElementById("display_error").innerHTML = "Please Enter All Information!";
      }
    }


        // Send & Save Message
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