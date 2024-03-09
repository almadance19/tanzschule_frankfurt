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
  getPrices();
};

// call API COURSES
const url_prices = 'https://script.google.com/macros/s/AKfycbxQJP0x0GEQQ7ZbdYxed1_EQfr5aRNonJWH82iEzg8wUn-M5cNy2l7yGZ2FPpx0Vz4D/exec';

//get user fields

// Directory to save prices from the Prices API
var dict_prices = {}
var dict_prices_monthly = {}
//Array For Payment
var payment_array = [];


// gets classes data

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


      }

      if (list[i].id==val[0] & val[7]!="NO" ) {
        document.getElementById(list[i].id).getElementsByTagName('span')[0].innerHTML=" "+val[1]+" EUR (monatlich)";
    
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

