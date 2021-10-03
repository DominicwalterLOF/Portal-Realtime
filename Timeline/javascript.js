




const left = document.querySelector(".left");
const right = document.querySelector(".right");
const container = document.querySelector(".container");

left.addEventListener("mouseenter", () => {
  container.classList.add("hover-left");
});

left.addEventListener("mouseleave", () => {
  container.classList.remove("hover-left");
});

right.addEventListener("mouseenter", () => {
  container.classList.add("hover-right");
});

right.addEventListener("mouseleave", () => {
  container.classList.remove("hover-right");
});
//-----------------------------------------------------------
function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
function openForm2() {
  document.getElementById("myForm2").style.display = "block";
}
function closeForm2() {
  document.getElementById("myForm2").style.display = "none";
}
  

//-----------------------------------------------------------

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


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function writedata (){

  var mname=document.getElementById("mname").value;
  var aname=document.getElementById("aname").value;
  var log=document.getElementById("log").value;
  var textlog=document.getElementById("textlog").value;

  const dp=firebase.database().ref("FC").set({
    Mission_name:mname,
    author:aname,
    Tagline: log,
    Log_info:textlog

  });
}


function writedata2 (){
  var keyvalue=0;
  var mname=document.getElementById("mname1").value;
  var aname=document.getElementById("aname1").value;
  var log=document.getElementById("log1").value;
  var textlog=document.getElementById("textlog1").value;

  const dp2=firebase.database().ref("BSC").set({
    Mission_name:mname,
    author:aname,
    Tagline: log,
    Log_info:textlog

  });
}

//-----------------------------------------------------------

// Dominic -- Firebase -- Writing data

//-----------------------------------------------------------

function dataUpdate(key, value) {

  firebase.database().ref(key).set(value);

}

//-----------------------------------------------------------

// Adding Dynamic Nodes -------------------------------------

function addNode(log, time, author, detail){

  DOMNode = '<li><div class="direction-r"><div class="flag-wrapper"><span class="flag" id="flag">' + log + '</span><span class="time-wrapper"><span class="time">' + author + '</span><span class="time-wrapper"><span class="time">' + time + '</span></span></div><div class="desc"><div class="section full-height"><input class="modal-btn" type="checkbox" id="modal-btn" name="modal-btn" /><label for="modal-btn">Details<i class="uil uil-expand-arrows"></i></label><div class="modal"><div class="modal-wrap"><p id="p-wrap">' + detail + '</p></div></div></div></div></li>';
  document.getElementById("timeline").innerHTML = DOMNode + document.getElementById("timeline").innerHTML;
}


function test(){
  console.log("Added");
  addNode(document.getElementById("log").value, "3:25 Pm", document.getElementById("aname").value, document.getElementById("textlog").value);
}