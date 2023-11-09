const users= [];
const urluser='https://script.google.com/macros/s/AKfycbwSTDQj8m9dHS0iTVyr3QDViZ8ItpT6QEQXhgu9QqobhxwZmYIMpJuWoj-umCh7gcM/exec';
const output = document.querySelector('.output');
const btn_login = document.getElementById('loginbutton');
btn_login.addEventListener('click',getLogin);


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
          output.innerHTML = "Email: "+email_value+" not registered yet. Register!";
          } 
          else {
          activeinput.value = val.posts[0][2];

          emailinput.disabled = false;
          nameinput.disabled = false;
          coursesinput.disabled = false;
          idinput.disabled = false;
          lastpaymentinput.disabled = false;
          saldoinput.disabled = false;
          anmerkungeninput.disabled = false;
          nextpaymentinput.disabled = false;

          emailinput.value = email_value;
          nameinput.value = val.posts[0][3];
          coursesinput.value = val.posts[0][1];
          idinput.value = val.posts[0][0];
          lastpaymentinput.value = val.posts[0][7];
          saldoinput.value = val.posts[0][5];
          anmerkungeninput.value = val.posts[0][6];
          nextpaymentinput.value = val.posts[0][4];

        }
        });

      } else {
        output.innerHTML = "Enter a valid email";
      }
}

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