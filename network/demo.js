var mission = "Apollo 11";
var user1 = "Dominic";
var Netpath = "";
var connected = false;
var htm = "";
var bufferHTM = "";


const firebaseConfig = {
    apiKey: "AIzaSyCNsNa2W1Xpp1arD_KQldqEpOPCP51pkDU",
    authDomain: "portal-realtime.firebaseapp.com",
    databaseURL: "https://portal-realtime-default-rtdb.firebaseio.com",
    projectId: "portal-realtime",
    storageBucket: "portal-realtime.appspot.com",
    messagingSenderId: "385255785015",
    appId: "1:385255785015:web:6ee27cb5970f49af05b5b2",
    measurementId: "G-NFTMTJZND7"
};


firebase.initializeApp(firebaseConfig);

function read(mode) {
    consoleInfo("[Connected]", "...")
    firebase.database().ref("networks/" + Netpath + "/stream").on('value', (snap) => {
        push1(snap.val(), mode);;
    })
}

function push1(DataValue, mode) {
    console.log("Its me making this error");
    switch (mode) {

        case 1:
            console.log(DataValue);
            break;
        case 2:
            return getFromRTDB(DataValue);
        case 3:
            return 0;
        default:
            console.log("Error : invalid push mode");
            return "invalid push mode";

    }
}

function writedata() {

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;

    var log = document.getElementById("log").value;

    const dp = firebase.database().ref("networks/" + Netpath + "/stream/" + today.getTime()).set({
        date_time: dateTime,
        Mission_name: mission,
        author: user1,
        Tagline: "null",
        Log_info: log

    });
}


function consoleLine(info, text, data) {
    htm += "<p>> [<span>" + info + "</span>]: " + text + " <i> " + data + " </i></p>";
}

function consoleInfo(info, text) {
    document.getElementById("mm").innerHTML += "<p>> <span> " + info + "</span>: " + text + " </p>";

}

function consoleLine1(info, text, data) {
    document.getElementById("mm1").innerHTML += "<p>> [<span>" + info + "</span>]: " + text + " <i> " + data + " </i></p>";
}

function consoleInfo1(info, text) {
    document.getElementById("mm1").innerHTML += "<p>> <span> " + info + "</span>: " + text + " </p>";

}




function updateConsole() {

}



function readConsole() {
    var t = document.getElementById("log").value;
    if (!connected) {
        if (t != "") {
            consoleInfo(user1, t);
            consoleInfo1(user1, t);
            var txt = t.split("[");
            if (txt[0] == "connect") {
                txt = txt[1].split("]");
                Netpath = txt[0];
                console.log(Netpath);
                console.log("here12");
                read(2);
                connected = true;
                bufferHTM = document.getElementById("mm").innerHTML;
            }
            document.getElementById("log").value = "";
        }
    } else {
        if (t != "") {
            consoleInfo1(user1, t);
            writedata();
            console.log("here1");
            document.getElementById("log").value = "";
        }
    }
}


function reRender() {
    document.getElementById("mm").innerHTML = bufferHTM + htm;
    $('#mm').scrollTop($('#mm')[0].scrollHeight);
}


function sortObject(obj) {
    return Object.keys(obj).sort().reduce(function (result, key) {
        result[key] = obj[key];
        return result;
    }, {});
}

function getFromRTDB(data) {
    console.log(data);
    console.log(sortObject(data));
    consoleInfo("Client", "Connection successful");
    htm = "";
    for (const item in sortObject(data)) {
        var innerdata = data[item];
        l = [];
        for (const items2 in innerdata) {
            l.push(innerdata[items2])

        }
        consoleLine(l[4], l[3], l[0]);
    }
    reRender();
}



var str = document.getElementById('mm').innerHTML.toString();
var i = 0;
document.getElementById('mm').innerHTML = "";

function init() {
    setTimeout(function () {
        var se = setInterval(function () {
            i++;
            document.getElementById('mm').innerHTML = str.slice(0, i) + "|";
            if (i == str.length) {
                clearInterval(se);
                document.getElementById('mm').innerHTML = str;
            };
        }, 10);
    }, 0);

}

var div11 = document.getElementById("mm");



(function ($, undefined) {
    function getHandle(selector, $el) {
        if (selector.trim()[0] === ">") {
            selector = selector.trim().replace(/^>\s*/, "");

            return $el.find(selector);
        }

        return selector ? $(selector) : $el;
    }

    if ($.fn.resizable)
        return;

    $.fn.resizable = function fnResizable(options) {
        var opt = {

            handleSelector: null,

            resizeWidth: true,

            resizeHeight: true,

            resizeWidthFrom: 'right',

            resizeHeightFrom: 'bottom',

            onDragStart: null,

            onDragEnd: null,

            onDrag: null,

            touchActionNone: true
        };
        if (typeof options == "object") opt = $.extend(opt, options);

        return this.each(function () {
            var startPos, startTransition;

            var $el = $(this);

            var $handle = getHandle(opt.handleSelector, $el);

            if (opt.touchActionNone)
                $handle.css("touch-action", "none");

            $el.addClass("resizable");
            $handle.bind('mousedown.rsz touchstart.rsz', startDragging);

            function noop(e) {
                e.stopPropagation();
                e.preventDefault();
            };

            function startDragging(e) {
                startPos = getMousePos(e);
                startPos.width = parseInt($el.width(), 10);
                startPos.height = parseInt($el.height(), 10);

                startTransition = $el.css("transition");
                $el.css("transition", "none");

                if (opt.onDragStart) {
                    if (opt.onDragStart(e, $el, opt) === false)
                        return;
                }
                opt.dragFunc = doDrag;

                $(document).bind('mousemove.rsz', opt.dragFunc);
                $(document).bind('mouseup.rsz', stopDragging);
                if (window.Touch || navigator.maxTouchPoints) {
                    $(document).bind('touchmove.rsz', opt.dragFunc);
                    $(document).bind('touchend.rsz', stopDragging);
                }
                $(document).bind('selectstart.rsz', noop);
            }

            function doDrag(e) {
                var pos = getMousePos(e), newWidth, newHeight;

                if (opt.resizeWidthFrom === 'left')
                    newWidth = startPos.width - pos.x + startPos.x;
                else
                    newWidth = startPos.width + pos.x - startPos.x;

                if (opt.resizeHeightFrom === 'top')
                    newHeight = startPos.height - pos.y + startPos.y;
                else
                    newHeight = startPos.height + pos.y - startPos.y;

                if (!opt.onDrag || opt.onDrag(e, $el, newWidth, newHeight, opt) !== false) {
                    if (opt.resizeHeight)
                        $el.height(newHeight);

                    if (opt.resizeWidth)
                        $el.width(newWidth);
                }
            }

            function stopDragging(e) {
                e.stopPropagation();
                e.preventDefault();

                $(document).unbind('mousemove.rsz', opt.dragFunc);
                $(document).unbind('mouseup.rsz', stopDragging);

                if (window.Touch || navigator.maxTouchPoints) {
                    $(document).unbind('touchmove.rsz', opt.dragFunc);
                    $(document).unbind('touchend.rsz', stopDragging);
                }
                $(document).unbind('selectstart.rsz', noop);

                $el.css("transition", startTransition);

                if (opt.onDragEnd)
                    opt.onDragEnd(e, $el, opt);

                return false;
            }

            function getMousePos(e) {
                var pos = { x: 0, y: 0, width: 0, height: 0 };
                if (typeof e.clientX === "number") {
                    pos.x = e.clientX;
                    pos.y = e.clientY;
                } else if (e.originalEvent.touches) {
                    pos.x = e.originalEvent.touches[0].clientX;
                    pos.y = e.originalEvent.touches[0].clientY;
                } else
                    return null;

                return pos;
            }
        });
    };
})(jQuery, undefined);

var ww = $(window).width();

if (ww >= 768) {
    $(".wr-flex_resize").resizable({
        handleSelector: ".splitter",
        resizeHeight: false,
        resizeWidth: true
    });
} else {
    $(".wr-flex_resize").resizable({
        handleSelector: ".splitter",
        resizeWidth: false,
        resizeHeight: true
    });
}

var input = document.getElementById("log");
input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("submit").click();
    }
});


$("#login-btn").click(function () {
    $(this).addClass("btn-shadow");
})
$("#login-btn").mouseout(function () {
    $(this).removeClass("btn-shadow");
})
function myfunction(isinya) {
    if (isinya == "register") {
        $("#loginbtn").removeClass("active"); $("#registerbtn").addClass("active");
        $("#login").css({ "display": "none" }); $("#register").css({ "display": "block" });
    } else {
        $("#registerbtn").removeClass("active"); $("#loginbtn").addClass("active");
        $("#register").css({ "display": "none" }); $("#login").css({ "display": "block" });
    }
}


function rem() {

    document.getElementsByClassName("LoginOverlay")[0].style.display = "none";
    init();
}

function sig() {
    console.log("Started");
    googleSignInPopup();
    console.log("Success");
    
}

var userdata;

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log(firebase.auth().currentUser);
        console.log("changed");
        userdata = user;
        rem();
        document.getElementById("userphoto").src = userdata.photoURL;
        document.getElementById("uname").innerHTML = userdata.displayName;
        user1 = userdata.email.split("@")[0];
    } else {

    }
});

var provider1 = new firebase.auth.GoogleAuthProvider();

var credential;

function googleSignInPopup() {

    var provider1 = new firebase.auth.GoogleAuthProvider();
    console.log("here");
    firebase.auth().signInWithPopup(provider1).then((result) => {
        credential = result.credential;
        console.log(credential[photoURL]);
        console.log("suc");
        var token = credential.accessToken;
        var user = result.user;
        console.log("loggedin");



    }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        var email = error.email;

        var credential = error.credential;

    });
}