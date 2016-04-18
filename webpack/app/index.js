/**
 * Created by jzwmxz on 16-4-18.
 * jzwmxz@hotmail.com
 */
require('./main.css');
var sub = require('./sub');
var app  = document.createElement('div');
app.innerHTML = '<h1>Hello World</h1>';
app.appendChild(sub());
document.body.appendChild(app);