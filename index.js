const express = require('express');
let cors = require('cors');
const { resolve } = require('path');

const app = express();
const port = 3000;


app.use(express.static('static'));
app.use(cors());

//server side values

let taxRate = 5;
let discountPercentage = 10;
let loyatyRate = 2;

// cart total


function getCartTotal(newItemPrice, cartTotalto) {
  let result = newItemPrice + cartTotalto;
  return 'Total cart value is ' + result.toString();
}

// Calculate the total price of items in the cart

app.get('/cart-total', (req, res) => {

  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotalto = parseFloat(req.query.cartTotalto);

  res.send(getCartTotal(newItemPrice, cartTotalto));

});


//Apply a discount based on membership status

function getMembershipDiscount(cartTotal, isMember) {
  if (isMember) {
    let membershipDiscountValue = cartTotal / discountPercentage;
    let finalPrice = cartTotal - membershipDiscountValue;
    return 'Total price is  ' + finalPrice.toString();
  } else {
    return 'Total price is  ' + cartTotal;
  }
}

app.get('/membership-discount', (req, res) => {

  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === "true";

  res.send(getMembershipDiscount(cartTotal, isMember));

});


// Calculate tax on the cart total

function getCalculatedTax(cartTotal) {
  let result = (cartTotal * taxRate) / 100;
  return 'Total cart value is ' + result.toString();
}


app.get('/calculate-tax', (req, res) => {

  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(getCalculatedTax(cartTotal));

});




//Estimate delivery time based on shipping method

function getEstimateDelivery(shippingMethod, distance) {
  let result;
  if (shippingMethod == 'standard') {
    console.log("Standard shipping")
    result = distance / 50;
    return 'Days to deliver is ' + result.toString();
  }
  else if (shippingMethod == 'express') {
    console.log("Express shipping")
    result = distance / 100;
    return 'Days to deliver is Uma' + result.toString();
  }

}


app.get('/estimate-delivery', (req, res) => {

  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);

  res.send(getEstimateDelivery(shippingMethod, distance));

});



//  Calculate the shipping cost based on weight and distance

function getShippingCost(weight, distance) {
  let result = weight * distance * 0.1;
  return 'Shipping cost is  Rs.' + result.toString();
}

app.get('/shipping-cost', (req, res) => {

  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);

  res.send(getShippingCost(weight, distance));

});



// Calculate loyalty points earned from a purchase

function getLoyaltyPoints(purchaseAmount) {
  let result = purchaseAmount * loyatyRate;
  return 'Loyalty Points are  ' + result.toString();
}

app.get('/loyalty-points', (req, res) => {

  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  res.send(getLoyaltyPoints(purchaseAmount));
});





app.get('/shout', (req, res) => {
  let name = req.query.name;
  let upperCase = name.toUpperCase();
  res.send(upperCase);
});

app.get('/fullname', (req, res) => {
  let fn = req.query.firstname;
  let ln = req.query.lastName;
  let fullName = fn + ' ' + ln;
  res.send(fullName);
});

app.get('/monthdate', (req, res) => {
  let month = req.query.month;
  let date = req.query.date;
  let formattedDate = month + ', ' + date;
  res.send(formattedDate);
});

app.get('/greeting', (req, res) => {
  let name = req.query.name;
  let greeting = 'Namaste, ' + name + '!';
  res.send(greeting);
});

app.get('/address', (req, res) => {
  let street = req.query.street;
  let city = req.query.city;
  let state = req.query.state;
  let formattedAddress = street + ' ,' + city + ' ,' + state;
  res.send(formattedAddress);
});

app.get('/totalDistance', (req, res) => {
  let dist1 = parseFloat(req.query.distance1);
  let dist2 = parseFloat(req.query.distance2);
  let totalDistance = dist1 + dist2;
  res.send(totalDistance.toString());
});

app.get('/averageSpeed', (req, res) => {
  let distance = parseFloat(req.query.distance);
  let time = parseFloat(req.query.time);
  let speed = distance / time;
  res.send(speed.toString());
});

app.get('/findNumber', (req, res) => {
  let number = parseFloat(req.query.num);
  let result;
  if (number >= 0) {
    result = 'Positive';
  } else {
    result = 'Negative';
  }
  res.send('Number is ' + result);
});

app.get('/evenodd', (req, res) => {
  let number = parseFloat(req.query.num);
  let result;
  if (number % 2 == 0) {
    result = 'Even';
  } else {
    result = 'Odd';
  }
  res.send('Number is ' + result);
});

app.get('/isloggedin', (req, res) => {
  let isLogged = req.query.isLogged === 'true';
  let result;
  if (isLogged) {
    result = 'Logged in';
  } else {
    result = 'Not Logged in';
  }
  res.send('User is ' + result);
});

app.get('/eligible', (req, res) => {
  let age = parseFloat(req.query.age);
  let result;
  if (age > 65) {
    result = 'Eligible';
  } else {
    result = 'not eligible';
  }
  res.send('User is ' + result);
});

app.get('/checknum', (req, res) => {
  let num = parseFloat(req.query.num);
  let result;
  if (num == 0) {
    result = 'zero';
  } else if (num > 0) {
    result = 'Positive';
  } else {
    result = 'Negative';
  }
  res.send('Number is ' + result);
});

function getMessage() {
  return 'Welcome to the portal';
}

function getHelloMsg(name) {
  return 'Hello, ' + name;
}
app.get('/welcome', (req, res) => {
  res.send(getMessage());
});

app.get('/hello', (req, res) => {
  res.send(getHelloMsg(req.query.name));
});

function getPasswordStrength(password) {
  if (password.length > 15) {
    return 'Password is strong';
  } else {
    return 'Password is weak';
  }
}
app.get('/pwdStrength', (req, res) => {
  let password = req.query.password;
  res.send(getPasswordStrength(password));
});

function getSum(num1, num2) {
  let sum = parseFloat(num1) + parseFloat(num2);

  return 'sum of two numbers is ' + sum.toString();
}

app.get('/getSum', (req, res) => {
  let num1 = req.query.num1;
  let num2 = req.query.num2;

  res.send(getSum(num1, num2));
});

function isSubscribed(name, subscribed) {
  if (subscribed === "true") {
    return name + ' is Subscribed';
  } else {
    return name + ' is not subscribed';
  }
}
app.get('/isSubscription', (req, res) => {
  let name = req.query.name;
  let subscribed = req.query.sub;

  res.send(isSubscribed(name, subscribed));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
