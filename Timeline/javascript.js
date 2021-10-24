
var count=0;


//-----------------------------------------------------------
function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
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
//-----------------------------------
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;
//----------------------------------
const d = new Date();
  var mname=document.getElementById("mname").value;
  var aname=document.getElementById("aname").value;
  var log=document.getElementById("log").value;
  var textlog=document.getElementById("textlog").value;

  const dp=firebase.database().ref("NASA/log"+d.getTime()).set({
    date_time:dateTime,
    Mission_name:mname,
    author:aname,
    Tagline: log,
    Log_info:textlog

  });location.reload();
}




//-----------------------------------------------------------

// Dominic -- Firebase -- Writing and Reading

//-----------------------------------------------------------

function dataUpdate(key, value) {

  firebase.database().ref(key).set(value);

}

function readData(key) {
  
  var rootRef = firebase.database().ref();

  var urlRef = rootRef.child(key);

  urlRef.on("value", function (snapshot) {

  return snapshot.val();
  

  });
}

//-----------------------------------------------------------
function read(){  


  firebase.database().ref('NASA/').on('value',(snap)=>{
  display(snap.val());;})
  }

  function display(value){
    l=[];
    console.log(value);
    console.log("printingggg");
    for (const item in value){
      var innerdata=value[item];
        l=[];
        for (const items2 in innerdata){
          l.push(innerdata[items2])
         
        
  
      }  
      
  
      addNode(l[2], l[4], l[3], l[0]);
    }

}


//-----------------------------------------------------------

// Adding Dynamic Nodes -------------------------------------

function addNode(log, time, author, detail){
  count++;
  if (count%2==0){
    DOMNode = '<li><div class="direction-r"><div class="flag-wrapper"><span class="flag" id="flag"><img src="https://freedesignfile.com/upload/2017/08/spaceship-icon-vector.png"alt="profile image">'
     + log + '</span></span><span class="time-wrapper"><span class="time">' + author + '</span><span class="time-wrapper"><span class="time">' + time + '</span></span></div><div class="desc"><div class="section full-height"><input class="modal-btn" type="checkbox" id="modal-btn" name="modal-btn" /><label for="modal-btn">Details<i class="uil uil-expand-arrows"></i></label><div class="modal"><div class="modal-wrap"><p id="p-wrap">' + detail + '</p></div></div></div></div></li>';
  document.getElementById("timeline").innerHTML = DOMNode + document.getElementById("timeline").innerHTML;
  }
  else {
    DOMNode = '<li><div class="direction-l"><div class="flag-wrapper"><span class="flag" id="flag"><img src="https://icon-library.com/images/icon-earth/icon-earth-14.jpg"alt="profile image">' 
    + log + '</span></span><span class="time-wrapper"><span class="time">' + author + '</span><span class="time-wrapper"><span class="time">' + time + '</span></span></div><div class="desc"><div class="section full-height"><input class="modal-btn" type="checkbox" id="modal-btn" name="modal-btn" /><label for="modal-btn">Details<i class="uil uil-expand-arrows"></i></label><div class="modal"><div class="modal-wrap"><p id="p-wrap">' + detail + '</p></div></div></div></div></li>';
  document.getElementById("timeline").innerHTML = DOMNode + document.getElementById("timeline").innerHTML;
  }
  
}


function test(){

//-----------------------------------
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;
//----------------------------------

  writedata(dateTime);
  console.log("Added");
  closeForm();
  read();
  
}
