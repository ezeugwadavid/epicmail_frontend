 //Menu Toggle Script 


 
function w3_open() {
   document.getElementById("mySidebar").style.display = "block";
   

 };

  


function w3_close() {
  document.getElementById("mySidebar").style.display = "none";
}

var myLoader;

function showLoader() {
  myLoader = setTimeout(showPage, 3000);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("myDiv").style.display = "block";
}

