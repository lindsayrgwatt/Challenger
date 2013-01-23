

var backButton = Titanium.UI.createButton({backgroundImage:"/images/NavBar_Back_Static.png", height:29,
			width:36});
backButton.addEventListener('click', function() {
	$.win.navGroup.close( $.win );
});
$.win.leftNavButton = backButton;

var section = Ti.UI.createTableViewSection();

var customView = Ti.UI.createView( );

var customLabel = Ti.UI.createLabel( {text: 'Wishlisted Places' } );

customView.add(customLabel);

section.headerView = customView;	

var data = [];
var places = Alloy.createCollection('Place');

places.fetch();
Ti.API.info( JSON.stringify( places ) );
places = places.where({wishlist:1});
Ti.API.info( JSON.stringify( places ) );

places.forEach( function(place){
	section.add(Alloy.createController('menurow', {
		title : place.get('name'),
		customView : 'place',
		slug: place.get('slug'),
		image : "images/ic_search.png"
	}).getView());
});

data.push( section );

// Pass data to widget tableView
$.placeTable.data = data;
	
// Swap views on menu item click
$.placeTable.addEventListener('click', function selectRow(e) {
	clickedController = Alloy.createController(e.row.customView);
	view = clickedController.getView();
	clickedController.setSlug( e.row.slug );		
	
	$.win.navGroup.open( view );
});
