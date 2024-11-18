const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

app.use(express.static('static'));

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
