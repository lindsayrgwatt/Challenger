
var categorySlug = "all";

var rowHandle = function(evt){
    // Check for all of the possible names that clicksouce
    // can report for the left button/view.

    var placePage = Alloy.createController('place');
    var placemark = evt.rowData.placemark;
    placePage.setPlace( placemark );
	$.win.navGroup.open(placePage.getView());
};

exports.setCategory = function( newCategory ){	
	categorySlug = newCategory;

}

exports.setSlug = function( newCategory ){	
	categorySlug = newCategory;
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
			
		var url = Alloy.CFG.serverUrl + "/publishers/" + Alloy.CFG.publisher +  "/publisher_categories/" + categorySlug + "/perspectives.json";		
		
		var xhr = Ti.Network.createHTTPClient({
			onload: function(e) {
				var result = JSON.parse(this.responseText);
				var placemarks = result.perspectives;
				
				var categoryRaw = result.publisher_category;
				places = placemarks;
				var tableData = [];
				
				placemarks.forEach( function(placemark) {			
					var rowData = {title:placemark.place.name, className:'placeRow', touchEnabled:true, hasDetail:true, placemark: placemark};		
					tableData.push( rowData );
				});
								
				$.placeTable.setData( tableData );	
				
				var collection = Alloy.createCollection("PublisherCategory");
				collection.fetch();
				
				var categories = collection.where({ slug: categoryRaw.slug});
				
				var category;
				// open the color info window
				if ( categories[0] ) {
					category = categories[0];
					category.set('lastViewed', new Date());
				} else {	
					category = Alloy.createModel('PublisherCategory', {
						name:categoryRaw.name, 
						slug:categoryRaw.slug,
						lastViewed:(new Date())
					});
				}
				category.save();
				
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
	loadPlaces();	
});	



var ptrCtrl = Alloy.createWidget('nl.fokkezb.pullToRefresh');
ptrCtrl.init({
    table: $.placeTable,
    loader: myLoaderCallback
});

