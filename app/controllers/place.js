
function closeWindow() {
	$.placeWin.remove();
	
}


function doHours(){
	
}

function doCall(){
	
}

exports.setPlace = function( placemark ){
	
	var collection = Alloy.createCollection('Place');

	// fetch color info from the color collection based on the
	// given color from the user model
	
	Titanium.API.log( JSON.stringify( collection ) );
	
	collection.where({ placeId: placemark.place.id});
	
	Titanium.API.log( JSON.stringify( collection ) );
	
	var place;
	// open the color info window
	if ( collection.at(0) ) {
		Titanium.API.log( "Updating place:" + collection.at(0).get('name') );
		place = collection.at( 0 );
		place.set('lastViewed', new Date());
	} else {	
		var place = Alloy.createModel('place', {
			name:placemark.place.name, 
			slug:placemark.place.slug,
			lng:parseFloat( placemark.place.lng ),
			lat:parseFloat( placemark.place.lat ),
			googleMapUrl:placemark.place.map_url,
			googleUrl:placemark.place.google_url,
			memo:placemark.memo, 
			placeId:placemark.place.id,
			lastViewed:(new Date()),
			wishList:false
		});
	}
	place.save();
	
	$.placeName.text = placemark.place.name;
	
	$.mapImage.image = placemark.place.map_url.replace("size=100x100", "size="+$.mapImage.width+"x"+$.mapImage.height);
	
	$.streetAddress.text = placemark.place.street_address;
	$.placeTags.text = placemark.tags.join(",")
	$.placeMemo.text = placemark.memo;
	
	$.imagesViewHolder.height = 50;
	
	
	
}
