
function closeWindow() {
	$.placeWin.remove();
	
}


exports.setPlace = function( placemark ){
	
	$.placeName.setText( placemark.place.slug );
	
	$.mapImage.image = placemark.place.map_url;
	
}
