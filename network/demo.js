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




function addnode(info) {

    document.getElementById("timelinemain").innerHTML = info + document.getElementById("timelinemain").innerHTML;

}


function space() {
    in1 = '<li><div class="direction-r"><div class="flag-wrapper"><span class="flag"> <img src="https://freedesignfile.com/upload/2017/08/spaceship-icon-vector.png"alt="profile image"> Pilot 3</span><span class="time-wrapper"><span class="time">3:55 p.m.</span></span></div><div class="desc"><textarea style = "background: none; border:none; overflow:auto; height: 100px; width:300px;">This is a message received from Spacecraft</textarea></div></div></li>';
    addnode(in1);
}

function earth() {
    in1 = '<li><div class="direction-l"><div class="flag-wrapper"><span class="flag"> <img src="https://icon-library.com/images/icon-earth/icon-earth-14.jpg"alt="profile image">Chief Command</span><span class="time-wrapper"><span class="time">3:55 p.m.</span></span></div><div class="desc">This is a message received from Base Command Center </div></div></li>';
    addnode(in1);


}

var dataBuffer = "";

var missionID;

function update() {

    var data = readData(missionID);

    if(data != dataBuffer){

    }

    else{

    }

}

function readData(key) {

    var rootRef = firebase.database().ref();

    var urlRef = rootRef.child(key);

    urlRef.on("value", function (snapshot) {

    return snapshot.val();

    });
}

function writeData(key, value) {

    firebase.database().ref(key).set(value);
    return 1;

}

setInterval(update, 5000);