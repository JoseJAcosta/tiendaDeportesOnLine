
var mapContainer = document.getElementById('contenedorMapa');

function successGeoData(position) {
    var successMessage = "We found your position!";
    successMessage += '\n Latitude = ' + position.coords.latitude;
    successMessage += '\n Longitude = ' + position.coords.longitude;
    successMessage += '\n Accuracy = ' + position.coords.accuracy + console.log(successMessage);
    var successMessageHTML = successMessage.replace(/\n/g, '<br />');
    var currentContent = mapContainer.innerHTML;
    mapContainer.innerHTML = currentContent + "<br />" + successMessageHTML;
}


function failGeoData(error) {
    switch(error.code) {
        case error.POSITION_UNAVALABLE:
            errorMessage = "Can't get the location"; break;
        case error.PERMISSION_DENIED:
            errorMessage = "The user doesn't want to share location";
            break;
        case error.TIMEOUT:
            errorMessage = "Timeout - Finding location takes too long";
            break;
        case error.UNKNOWN_ERROR:
            errorMessage = "Unknown error: " + error.code; break;
    }
    console.log(errorMessage);
    mapContainer.innerHTML = errorMessage;
}

if (navigator.geolocation) {
    var startMessage = 'Browser supports geolocation API :)';
    mapContainer.innerHTML = startMessage;
    mapContainer.innerHTML = startMessage
        + '<br />Checking current position...';
    navigator.geolocation.getCurrentPosition(
        successGeoData, failGeoData, {
            maximumAge : 60000,
            enableHighAccuracy : true,
            timeout : 5000
        } );
}else{
    mapContainer.innerHTML =
        'Browser does not support geolocation';
}