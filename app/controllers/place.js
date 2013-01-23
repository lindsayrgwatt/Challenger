var placeSlug;
var place;



var mapButton = Titanium.UI.createButton({backgroundImage:"/images/NavBar_Share_Static.png", height:29,
			width:36});
$.win.rightNavButton = mapButton;

var backButton = Titanium.UI.createButton({backgroundImage:"/images/NavBar_Back_Static.png", height:29,
			width:36});
backButton.addEventListener('click', function() {
	$.win.navGroup.close( $.win );
});
$.win.leftNavButton = backButton;

function closeWindow() {
	$.placeWin.remove();
	
}


function doHours(){
	
}

function doCall(){
	
}

function toggleWishlist(e){
	Ti.API.info( "toggleWishlist" );
	if ( place.get('wishlist') ){
		place.set('wishlist', false);
		place.save();
	} else {
		place.set('wishlist', true);
		place.save();
	}
}

function drawPlace( place ){
	Titanium.API.info( JSON.stringify( place ) );
	$.placeName.text = place.get('name').toUpperCase();
	
	$.mapImage.image = place.get('googleMapUrl').replace("size=100x100", "size="+$.mapImage.width+"x"+$.mapImage.height);
	$.streetAddress.text = place.get('streetAddress');
	$.placeMemo.text = place.get('memo');
	
	var rand = Math.floor((Math.random()*3)+1);
	if (rand ==1 ){
		$.tweetText.text = "Check out our weekly specials!";
	} else if (rand ==2 ){
		$.tweetText.text = "#ff to @placeling for making an awesome app!";
	} else if (rand ==3 ){
		$.tweetText.text = "We just got featured in SF Indie";
	}
	$.tweetText.text  = '"' + $.tweetText.text + '"';
	$.twitterPost.text = "JAN 24|2013";
	
	if ( place.get('imageUrl') ){
		$.imageViewer.image = place.get('imageUrl');
	} else {
		$.imageViewer.height = 0;
	}
	
	
}


exports.setSlug = function( slug ){	
	placeSlug = slug;
	
	var collection = Alloy.createCollection("Place");
	collection.fetch();
	
	var places = collection.where({ slug: slug });
	
	// open the color info window
	if ( places[0] ) {
		place = places[0];
	
		$.placeName.text = place.get('name');
		
		$.mapImage.image = place.get('googleMapUrl').replace("size=100x100", "size="+$.mapImage.width+"x"+$.mapImage.height);
		
		$.streetAddress.text = place.get('street_address');
		$.placeMemo.text = place.get('memo');
	} else {
		var url = Alloy.CFG.serverUrl + "/places/" + slug +  ".json?newcall=true&rf=" + Alloy.CFG.publisher		
		
		var xhr = Ti.Network.createHTTPClient({
			onload: function(e) {
				var result = JSON.parse(this.responseText);
				Ti.API.info( JSON.stringify( result ) );
				var placemark = result.place.referring_perspectives[0];
				
				var rPlace = result.place;
				
				place = Alloy.createModel('Place', {
					name:rPlace.name, 
					slug:rPlace.slug,
					lng:parseFloat( rPlace.lng ),
					lat:parseFloat( rPlace.lat ),
					googleMapUrl:rPlace.map_url,
					streetAddress:rPlace.street_address,
					tags:placemark.tags.join(","),
					googleUrl:rPlace.google_url,
					memo:placemark.memo, 
					placeId:rPlace.id,
					lastViewed:(new Date()),
					wishlist:false
				});
				
				if (placemark.photos.length > 0){
					var photo = placemark.photos[0];
					place.set('imageUrl', photo.wide_url);
				}
				
				place.save();
						
				drawPlace( place );
				
			},
			onerror: function(e) {	
				alert("Error:"+JSON.stringify(e));
			},
			timeout: 10000
		});
		xhr.open("GET", url);
		xhr.send();
	}
}



function setPlace( placemark ){
	var collection = Alloy.createCollection("Place");
	collection.fetch();
	
	var places = collection.where({ placeId: placemark.place.id});
	//Titanium.API.log( JSON.stringify( places ) );
	
	// open the color info window
	if ( places[0] ) {
		place = places[0];
		place.set('lastViewed', new Date());
	} else {	
		place = Alloy.createModel('Place', {
			name:placemark.place.name, 
			slug:placemark.place.slug,
			lng:parseFloat( placemark.place.lng ),
			lat:parseFloat( placemark.place.lat ),
			googleMapUrl:placemark.place.map_url,
			streetAddress:placemark.place.street_address,
			tags:placemark.tags.join(","),
			googleUrl:placemark.place.google_url,
			memo:placemark.memo, 
			placeId:placemark.place.id,
			lastViewed:(new Date()),
			wishlist:false
		});
		if (placemark.photos.length > 0){
			var photo = placemark.photos[0];
			place.set('imageUrl', photo.wide_url);
		}
	}
	
	place.save();
	
	drawPlace( place );
}

exports.setPlace = setPlace;


