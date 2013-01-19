

function drawSideBar(){ 
	var data = [];
	
	var section = Ti.UI.createTableViewSection();
	
	var headerViewOptions = {height : 'auto',
		backgroundGradient : {
			type : "linear",
			startPoint : {
				x : "0%",
				y : "0%"
			},
			endPoint : {
				x : "0%",
				y : "100%"
			},
			colors : [{
				color : "#EEE",
				offset : 0.0
			}, {
				color : "#CCC",
				offset : 1.0
			}]
		}};
		
	var headerLabelOptions ={
		top : 8,
		bottom : 8,
		left : 10,
		right : 10,
		height : 'auto',
		font : {
			fontSize : 12,
			fontWeight : 'bold'
		},
		color : '#666666'
	}; 
	
	var customView = Ti.UI.createView( headerViewOptions );
	
	headerLabelOptions['text'] = 'SF Indie';
	var customLabel = Ti.UI.createLabel( headerLabelOptions );
	
	customView.add(customLabel);
	
	section.headerView = customView;
	
	section.add(Alloy.createController('menurow', {
		title : 'Nearby',
		customView : 'nearby',
		image : "images/ic_search.png"
	}).getView());
	
	section.add(Alloy.createController('menurow', {
		title : 'Wishlist',
		customView : 'wishlist',
		image : "images/ic_search.png"
	}).getView());
	
	
	data.push( section );
	
	var section = Ti.UI.createTableViewSection();
	var customView = Ti.UI.createView( headerViewOptions );
	
	headerLabelOptions['text'] = 'Recently Viewed Guides';
	var customLabel = Ti.UI.createLabel( headerLabelOptions );
	
	customView.add(customLabel);
	
	section.headerView = customView;
	
	data.push( section );
	var section = Ti.UI.createTableViewSection();
	
	var customView = Ti.UI.createView( headerViewOptions );
	
	headerLabelOptions['text'] = 'Recently Viewed Places';
	var customLabel = Ti.UI.createLabel( headerLabelOptions );
	
	customView.add(customLabel);
	
	section.headerView = customView;	
	
	var places = Alloy.createCollection('Place');
	
	places.fetch();
	
	places.sort();
	
	places.first(5).forEach( function(place){
		section.add(Alloy.createController('menurow', {
			title : place.get('name'),
			customView : 'place',
			image : "images/ic_search.png"
		}).getView());
	});
	
	data.push( section );
	
	// Pass data to widget tableView
	$.ds.tableView.data = data;
}

exports.drawSideBar = drawSideBar;
drawSideBar();

var homeController = Alloy.createController("home");
var currentView = homeController.getView();
currentView.drawSideBar = drawSideBar
currentView.navGroup = $.ds.nav;
currentView.ds = $.ds; //need a reference to this to enable/disable button
$.ds.innerwin.add(currentView);

// Swap views on menu item click
$.ds.tableView.addEventListener('click', function selectRow(e) {
	if (currentView.id != e.row.customView) {
		currentView = Alloy.createController(e.row.customView).getView();
		currentView.navGroup = $.ds.nav;
		$.ds.button.hide();
		
		currentView.addEventListener('close', function(e){
			$.ds.button.show();
			drawSideBar();
		});
		
		$.ds.nav.open( currentView );
	}
	$.ds.toggleSlider();
});


var infoBtn = Titanium.UI.createButton({systemButton: Titanium.UI.iPhone.SystemButton.INFO_LIGHT });
$.ds.innerwin.rightNavButton = infoBtn;
 
infoBtn.addEventListener('click', function(e){
     homeController.refreshWindow();
});


// Set row title highlight colour
var storedRowTitle = null;
$.ds.tableView.addEventListener('touchstart', function(e) {
	storedRowTitle = e.row.customTitle;
	storedRowTitle.color = "#FFF";
});
$.ds.tableView.addEventListener('touchend', function(e) {
	storedRowTitle.color = "#666";
});
$.ds.tableView.addEventListener('scroll', function(e) {
	if (storedRowTitle != null)
		storedRowTitle.color = "#666";
});

if (Ti.Platform.osname === 'iphone')
	$.win.open({
		transition : Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
	});
else
	$.win.open();
