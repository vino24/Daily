/**
 * Created by jzwmxz on 16-4-18.
 * jzwmxz@hotmail.com
 */
import './main.css';
import $ from 'jquery';
import 'imports?jQuery=jquery!./plugin.js';
$(document).ready(function () {
    let app = document.createElement('div');
    app.innerHTML = '<h1>vino</h1>';
    document.body.appendChild(app);
    $('h1').greenify();
});