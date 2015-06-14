/**
 * Created by дЦ╣дльбьку on 2015/6/13.
 */
function isPrime(num) {
    if (typeof num !== "number" || isNaN(num) || num < 2) return false;
    for (var i = 2; i <= Math.floor(Math.sqrt(num)); i++) {
        if (num % i == 0) return false;
    }
    return true;
}
console.log(isPrime(2));
console.log(isPrime(4));
console.log(isPrime("hello"));