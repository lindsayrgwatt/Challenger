
function closeWindow() {
	$.placeWin.remove();
	
}


function doHours(){
	
}

function doCall(){
	
}

exports.setPlace = function( placemark ){
	
	$.placeName.text = placemark.place.name;
	
	$.mapImage.image = placemark.place.map_url;
	
	$.streetAddress.text = placemark.place.street_address;
	$.placeTags.text = placemark.tags.join(",")
	$.placeMemo.text = placemark.memo;
	
	$.imagesViewHolder.height = 50;
	
}
