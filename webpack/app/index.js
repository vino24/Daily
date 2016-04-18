/**
 * Created by jzwmxz on 16-4-18.
 * jzwmxz@hotmail.com
 */
import './main.css';
import generateText from './sub';
import './plugin'
import moment from 'moment';

let app  = document.createElement('div');
const myPromise = Promise.resolve(42);
myPromise.then((number) => {
    $('body').append('<p>promise result is ' + number + ' now is ' + moment().format() + '</p>');
    $('p').greenify();
});
app.innerHTML = '<h1>Hello World it</h1>';
document.body.appendChild(app);
app.appendChild(generateText());
