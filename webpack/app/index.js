require('./main.css');
var sub = require('./sub');
var $ = require('jquery');
var moment =require('moment');
var app  = document.createElement('div');
app.innerHTML = '<h1>Hello World</h1>';
document.body.appendChild(app);
app.appendChild(sub());
$('body').append('<p>look at me! now is '+ moment().format()+'</p>');