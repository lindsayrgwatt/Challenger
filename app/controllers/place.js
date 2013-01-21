var placeSlug;
var place;

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
		$.wishlistButton.title = "Add to Wishlist";
		place.set('wishlist', false);
		place.save();
	} else {
		$.wishlistButton.title = "Remove from Wishlist";
		place.set('wishlist', true);
		place.save();
	}
}

exports.setSlug = function( slug ){	
	Titanium.API.log( "setting slug: " + slug );
	placeSlug = slug;
	
	var collection = Alloy.createCollection("Place");
	collection.fetch();
	
	var places = collection.where({ slug: slug });
	Titanium.API.log( JSON.stringify( places ) );
	
	// open the color info window
	if ( places[0] ) {
		place = places[0];
	
		$.placeName.text = place.get('name');
		
		$.mapImage.image = place.get('googleMapUrl').replace("size=100x100", "size="+$.mapImage.width+"x"+$.mapImage.height);
		
		$.streetAddress.text = place.get('street_address');
		$.placeTags.text = place.get('tags');
		$.placeMemo.text = place.get('memo');
	}
}

exports.setPlace = function( placemark ){
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
	}
	place.save();
	
	if ( place.get('wishlist') ){
		$.wishlistButton.title = "Remove from Wishlist";
	} else {
		$.wishlistButton.title = "Add to Wishlist";
	}
	
	$.placeName.text = placemark.place.name;
	
	$.mapImage.image = placemark.place.map_url.replace("size=100x100", "size="+$.mapImage.width+"x"+$.mapImage.height);
	
	$.streetAddress.text = placemark.place.street_address;
	$.placeTags.text = placemark.tags.join(",")
	$.placeMemo.text = placemark.memo;
	
	$.imagesViewHolder.height = 50;
}
