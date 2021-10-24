var mission = "";
var user = "Dominic";
var Netpath = "";



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
    consoleInfo("reading", "---------------------------------------------")
    firebase.database().ref("networks/" + Netpath + "/stream").on('value', (snap) => {
        push1(snap.val(), mode);;
    })
}

function push1(DataValue, mode) {
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
    //-----------------------------------
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    //----------------------------------

    var aname = document.getElementById("aname").value;
    var log = document.getElementById("log").value;
    var textlog = document.getElementById("textlog").value;

    const dp = firebase.database().ref("NASA/log" + dateTime).set({
        date_time: dateTime,
        Mission_name: mission,
        author: "Dominic",
        Tagline: log,
        Log_info: textlog

    }); location.reload();
}


function consoleLine(info, text, data) {
    document.getElementById("mm").innerHTML += "<p>> [<span>" + info + "</span>]: " + text + " <i> " + data + " </i></p>";
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


function readConsole(){
    t = document.getElementById("log").value;
    consoleInfo(user,t);
    consoleInfo1(user,t);
    var txt = t.split("[");
    if (txt[0] == "connect"){
        txt = txt[1].split("]");
        Netpath = txt[0];
        console.log(Netpath);
        read(2);
    }
    document.getElementById("log").value = "";
}




function getFromRTDB(data) {
    consoleInfo("Client","Connection successful");
    for (const item in data) {
        var innerdata = data[item];
        l = [];
        for (const items2 in innerdata) {
            l.push(innerdata[items2])

        }
        consoleLine(l[4], l[3], l[0]);
    }
}

var str = document.getElementById('mm').innerHTML.toString();
var i = 0;
document.getElementById('mm').innerHTML = "";

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



pageScroll();

var div11 = document.getElementById("mm");
function pageScroll() {
    $('#mm').scrollTop($('#mm')[0].scrollHeight);
    scrolldelay = setTimeout(pageScroll, 10000);
}


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
            // selector for handle that starts dragging
            handleSelector: null,
            // resize the width
            resizeWidth: true,
            // resize the height
            resizeHeight: true,
            // the side that the width resizing is relative to
            resizeWidthFrom: 'right',
            // the side that the height resizing is relative to
            resizeHeightFrom: 'bottom',
            // hook into start drag operation (event passed)
            onDragStart: null,
            // hook into stop drag operation (event passed)
            onDragEnd: null,
            // hook into each drag operation (event passed)
            onDrag: null,
            // disable touch-action on $handle
            // prevents browser level actions like forward back gestures
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
                $(document).bind('selectstart.rsz', noop); // disable selection
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

                // reset changed values
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

