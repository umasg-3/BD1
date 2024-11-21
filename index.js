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
  return 'Total cart value is ' +result.toString();
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
    return 'Total price is  ' +finalPrice.toString();
  } else {
    return 'Total price is  ' +cartTotal;
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
  return 'Total cart value is ' +result.toString();
}


app.get('/calculate-tax', (req, res) => {

  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(getCalculatedTax(cartTotal));

});




//Estimate delivery time based on shipping method

function getEstimateDelivery(shippingMethod, distance) {
  let result;
  if (shippingMethod == 'standard') {
    result = distance / 50;
    return 'Days to deliver is ' +result.toString();
  }
  else if (shippingMethod == 'express') {
    result = distance / 100;
    return 'Days to deliver is ' +result.toString();
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
  return 'Shipping cost is  Rs.' +result.toString();
}

app.get('/shipping-cost', (req, res) => {

  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);

  res.send(getShippingCost(weight, distance));

});



// Calculate loyalty points earned from a purchase

function getLoyaltyPoints(purchaseAmount) {
  let result = purchaseAmount * loyatyRate;
  return 'Loyalty Points are  ' +result.toString();
}

app.get('/loyalty-points', (req, res) => {

  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  res.send(getLoyaltyPoints(purchaseAmount));
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
