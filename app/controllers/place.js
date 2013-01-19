
function closeWindow() {
	$.placeWin.remove();
	
}


function doHours(){
	
}

function doCall(){
	
}

exports.setPlaceId = function( place_id ){
	
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
		var place = Alloy.createModel('Place', {
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
