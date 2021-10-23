var str = document.getElementsByTagName('div')[0].innerHTML.toString();
var i = 0;
document.getElementsByTagName('div')[0].innerHTML = "";

setTimeout(function() {
    var se = setInterval(function() {
        i++;
        document.getElementsByTagName('div')[0].innerHTML = str.slice(0, i) + "|";
        if (i == str.length) {
            clearInterval(se);
            document.getElementsByTagName('div')[0].innerHTML = str;
        }
    }, 10);
},0);

function new1(){
    document.getElementById("mm").innerHTML += '<p>> <span>SOME PAGES ON THIS SERVER THAT YOU DO HAVE PERMISSION TO ACCESS</span>: [<a href="/">Home Page</a>, <a href="/">About Us</a>, <a href="/">Contact Us</a>, <a href="/">Blog</a>...]</p>';
}

setInterval(new1, 5000);

pageScroll();

function pageScroll() {
    window.scrollBy(0,1);
    scrolldelay = setTimeout(pageScroll,10);
}

