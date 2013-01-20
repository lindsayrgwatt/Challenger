
var category;

var rowHandle = function(evt){
    Ti.API.info("Row " + evt.index + " clicked, source: " + evt.source + ", id: " + evt.rowData.placemark.place.name);

    // Check for all of the possible names that clicksouce
    // can report for the left button/view.

    var placePage = Alloy.createController('place');
    var placemark = evt.rowData.placemark;
    placePage.setPlace( placemark );
	$.win.navGroup.open(placePage.getView());
};

exports.setCategory = function( newCategory ){	
	category = newCategory;
}

$.placeTable.setFooterView( Alloy.createController('footerRow', {
	title : 'Powered By: ',
	image : "images/placeling-logo.png"
}).getView() ); 

$.placeTable.setFooterTitle("test");


$.placeTable.addEventListener('click', rowHandle);	

function myLoaderCallback(widgetCallback) {
    // DO YOUR LOADING
    loadPlaces();
    
    widgetCallback(true);
}

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
			
		var url = Alloy.CFG.serverUrl + "/publishers/" + Alloy.CFG.publisher +  "/publisher_categories/" + category + "/perspectives.json";		
		
		Ti.API.log( "info", "grabbing contents from: " + url);
		
		var xhr = Ti.Network.createHTTPClient({
			onload: function(e) {
				var result = JSON.parse(this.responseText);
				var placemarks = result.perspectives;
				places = placemarks;
				var tableData = [];
				
				for (i in placemarks){
					var placemark = placemarks[i];					
					var rowData = {title:placemark.place.name, className:'placeRow', touchEnabled:true, hasDetail:true, placemark: placemark};
					
					tableData.push( rowData );
				}				
				$.placeTable.setData( tableData );	
				
				
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

$.win.addEventListener('open', function(e){
	Ti.API.log( "Opening the thing: " + category);
	loadPlaces();	
});	



var ptrCtrl = Alloy.createWidget('nl.fokkezb.pullToRefresh');
ptrCtrl.init({
    table: $.placeTable,
    loader: myLoaderCallback
});

