

var backButton = Titanium.UI.createButton({backgroundImage:"/images/NavBar_Back_Static.png", height:29,
			width:36});
backButton.addEventListener('click', function() {
	$.win.navGroup.close( $.win );
});
$.win.leftNavButton = backButton;


Titanium.Geolocation.getCurrentPosition(function(e) {
    if (e.error) {
        alert('HFL cannot get your current location');
        return;
    }
 
    var longitude = e.coords.longitude;
    var latitude = e.coords.latitude;
	var section = Ti.UI.createTableViewSection();
	
	var customView = Ti.UI.createView( );
	
	var customLabel = Ti.UI.createLabel( {text: 'Wishlisted Places' } );
	
	customView.add(customLabel);
	
	section.headerView = customView;	
	
	var data = [];
	var places = Alloy.createCollection('Place');
	
	places.fetch();
	places = places.where({wishlist:1});
	Ti.API.info( "Processing Wishlist" );
	
	places.forEach( function(place){
		section.add(Alloy.createController('placeRow', {
			place : place,
			latitude: latitude,
			longitude: longitude
		}).getView());
	});
	
	data.push( section );
	
	// Pass data to widget tableView
	$.placeTable.data = data;
});
	
// Swap views on menu item click
$.placeTable.addEventListener('click', function selectRow(e) {
	clickedController = Alloy.createController(e.row.customView);
	view = clickedController.getView();
	clickedController.setSlug( e.row.slug );		
	view.navGroup = $.win.navGroup;
	$.win.navGroup.open( view );
});
