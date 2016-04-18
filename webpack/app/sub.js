/**
 * Created by jzwmxz on 16-4-18.
 * jzwmxz@hotmail.com
 */
function generateText() {
    var element = document.createElement('h2');
    element.innerHTML = "Hello h2 world";
    return element;
}

module.exports = generateText;
