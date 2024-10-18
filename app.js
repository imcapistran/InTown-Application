const x = document.getElementById("demo");
function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
}

function showError(error){
    switch(error.code){
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN:
            x.innerHTML = "An unknown error has occured."
            break;
    }
}


//Checks if inputs are blank, Needs Password validators!!
function validateForm() {
    var x = document.forms["userLogin"].value;
    if (x == "") {
      alert("Name must be filled out");
      return false;
    }
  }
  
  