


var backButton = Titanium.UI.createButton({backgroundImage:"/images/NavBar_Back_Static.png", height:29,
			width:36});
backButton.addEventListener('click', function() {
	$.win.navGroup.close( $.win );
});
$.win.leftNavButton = backButton;


var pinhandle = function(evt){
    Ti.API.info("Annotation " + evt.title + " clicked, source: " + evt.clicksource + ", id: " + evt.annotation.myid);

    // Check for all of the possible names that clicksouce
    // can report for the left button/view.
    if (evt.clicksource == 'rightButton' || evt.clicksource == 'title') {
        Ti.API.info("Annotation " + evt.title + ", right button clicked.");
        
        var placePage = Alloy.createController('place');
        var placemark = places[ evt.annotation.myid ];
        placePage.setPlace( placemark );
        placePage.getView().navGroup = $.win.navGroup;
		$.win.navGroup.open(placePage.getView());
    }
};

var places;

function drawPlaces( places ){
	for (i in places){
		var placemark = places[i];
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
}

exports.setPlaces = function( nplaces ){	
	places = nplaces;
}

Titanium.Geolocation.getCurrentPosition(function(e) {
    if (e.error) {
        alert('HFL cannot get your current location');
        return;
    }
 
    var longitude = e.coords.longitude;
    var latitude = e.coords.latitude;
	
    var region = {latitude:latitude,longitude:longitude,latitudeDelta:0.010, longitudeDelta:0.018};

	$.mapView.setRegion( region );
	
	loadPlaces();
});
	

function loadPlaces(){
	
	Titanium.Geolocation.getCurrentPosition(function(e) {
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
	    
	    Ti.API.info( JSON.stringify(e.coords));
	    
	    var region = {latitude:latitude,longitude:longitude,latitudeDelta:0.010, longitudeDelta:0.018};
	
		$.mapView.setRegion( region );
		
		var url = Alloy.CFG.serverUrl + "/publishers/" + Alloy.CFG.publisher +  "/publisher_categories/best-of-vancouver-2012/perspectives.json";
	
		if ( places ){
			drawPlaces( places );
			return;
		}
	
		Ti.API.log( "info", "grabbing contents from: " + url);
		
		var xhr = Ti.Network.createHTTPClient({
			onload: function(e) {
				var result = JSON.parse(this.responseText);
				var placemarks = result.perspectives;
				places = placemarks;
				
				drawPlaces( places );	
			},
			onerror: function(e) {	
				alert("Error:"+JSON.stringify(e));
			},
			timeout: 10000
		});
		xhr.open("GET", url +"?lat="+latitude+"&lng="+longitude);
		xhr.send();
	 
	});
}
