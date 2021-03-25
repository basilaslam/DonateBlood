const string = $('#about__text').text();

console.log(string);

var length = 50;  // set to the number of characters you want to keep
var pathname = document.getElementById('#about__text');
var trimmedPathname = pathname.substring(0, Math.min(length,pathname.length));