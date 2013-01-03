
var pinhandle = function(evt){
    Ti.API.info("Annotation " + evt.title + " clicked, source: " + evt.clicksource + ", id: " + evt.annotation.myid);

    // Check for all of the possible names that clicksouce
    // can report for the left button/view.
    if (evt.clicksource == 'rightButton' || evt.clicksource == 'title') {
        Ti.API.info("Annotation " + evt.title + ", right button clicked.");
        
        var placePage = Alloy.createController('place');
        var placemark = places[ evt.annotation.myid ];
        placePage.setPlace( placemark );
		$.nav.open(placePage.getView());
    }
};

var places;

var region = {latitude:49.2799,longitude:-123.112158,latitudeDelta:0.010, longitudeDelta:0.018};

$.mapView.setRegion( region );

Titanium.Geolocation.getCurrentPosition(function(e)
{
    if (e.error) {
        alert('HFL cannot get your current location');
        return;
    }
 
    var longitude = e.coords.longitude;
    var latitude = e.coords.latitude;
    var altitude = e.coords.altitude;
    var heading = e.coords.heading;
    var accuracy = e.coords.accuracy;
    var speed = e.coords.speed;
    var timestamp = e.coords.timestamp;
    var altitudeAccuracy = e.coords.altitudeAccuracy;
 
    //
    //CREATE MAP VIEW
    //
    var region = {latitude:latitude,longitude:longitude,latitudeDelta:0.010, longitudeDelta:0.018};

	$.mapView.setRegion( region );
	
	var url = Alloy.CFG.serverUrl + "/publishers/georgiastraight/publisher_categories/best-of-vancouver-2012/perspectives.json";
	
	Ti.API.log( "info", "grabbing contents from: " + url);
	
	var xhr = Ti.Network.createHTTPClient({
		onload: function(e) {
			var result = JSON.parse(this.responseText);
			var placemarks = result.perspectives;
			places = placemarks;
			
			for (i in placemarks){
				var placemark = placemarks[i];
				var pinView = Titanium.Map.createAnnotation(
	            {
	                latitude:placemark.place.lat,
	                longitude:placemark.place.lng,
	                title:placemark.place.name,
	                subtitle:placemark.place.street_address,
	                pincolor: Titanium.Map.ANNOTATION_RED,
	                rightButton: Titanium.UI.iPhone.SystemButton.DISCLOSURE,	 
	                myid: i,               
	                animate:true
	            });
	            pinView.addEventListener( 'click', pinhandle );
	            
	            $.mapView.addAnnotation( pinView );

			}
			
		},
		onerror: function(e) {	
			alert("Error:"+JSON.stringify(e));
		},
		timeout: 10000
	});
	xhr.open("GET", url +"?lat="+latitude+"&lng="+longitude);
	xhr.send();
	
 
});