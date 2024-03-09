const users= [];
const urluser='https://script.google.com/macros/s/AKfycbwSTDQj8m9dHS0iTVyr3QDViZ8ItpT6QEQXhgu9QqobhxwZmYIMpJuWoj-umCh7gcM/exec';
const output = document.querySelector('.output');
const btn_login = document.getElementById('loginbutton');
btn_login.addEventListener('click',getLogin);

const emailinput = document.getElementById("User_email");
const nameinput = document.getElementById("User_name");  
const coursesinput = document.getElementById("User_courses");  
const idinput = document.getElementById("User_id");  
const activeinput = document.getElementById("User_active"); 
const lastpaymentinput = document.getElementById("User_lastpayment");  
const saldoinput = document.getElementById("User_saldo");  
const anmerkungeninput = document.getElementById("User_anmerkungen");  
const nextpaymentinput = document.getElementById("User_nextpayment");


window.onload = (event) => {
  console.log('Check if user is login');

        // Get User Data from Local Storage
        const extractedUser = JSON.parse(localStorage.getItem('user'));
        console.log(extractedUser);
        if (extractedUser) {
          console.log('Got the id - ' + extractedUser.id);

          emailinput.disabled = false;
          nameinput.disabled = false;
          coursesinput.disabled = false;
          idinput.disabled = false;
          lastpaymentinput.disabled = false;
          saldoinput.disabled = false;
          anmerkungeninput.disabled = false;
          nextpaymentinput.disabled = false;


          coursesinput.value=extractedUser.name;
          emailinput.value=extractedUser.email;
          nameinput.value = extractedUser.level;
          activeinput.value = extractedUser.gender;
          idinput.value = extractedUser.id;
          lastpaymentinput.value = extractedUser.styles;
          saldoinput.value = extractedUser.ideal_partner;
          anmerkungeninput.value = extractedUser.goals;
          nextpaymentinput.value = extractedUser.description;
          document.querySelector('input[name=email-class]').value= extractedUser.email;
  
        } else {
          console.log('Could not find id.');
        }

};




function getLogin() { 
    var email_value = document.querySelector('input[name=email-class]').value;
    if (email_value != '') { 
        output.innerHTML = "..posting new data";
        /// SEND EDITED INFORMATION TO PROFILE
        //getUser(email_value);
        
      } else {
        output.innerHTML = "Enter a valid email";
      }
  
  }
  

// get users data 
function getUser(email_value) {


}

//get user fields