function toRad(Value) {
    /** Converts numeric degrees to radians */
    return Value * Math.PI / 180;
}

function haversine( lat1, lng1, lat2, lng2){
	var R = 6371; // km
	var dLat = toRad( (lat2-lat1) );
	var dLon = toRad( (lng2-lng1) );
	var lat1 = toRad( lat1 );
	var lat2 = toRad( lat2 );
	
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
	        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c;
	
	if (d < 1){
		return Math.round( d*1000 ) + "m";
	} else {
		return Math.round(d*10.0)/10.0 +"km";
	}
}

var args = arguments[0] || {};

if (args.placemark){
	var dist = haversine( args.latitude, args.longitude, args.placemark.place.lat, args.placemark.place.lng );
	$.title.text = args.placemark.place.name || '';
	
	if ( args.placemark.place.street_address ){
		$.address.text = args.placemark.place.street_address +  " | " + dist;
	} else {
		$.address.text = dist;	
	}
	
	$.row.customView = 'place';
	$.row.placemark = args.placemark;
	$.row.slug = args.placemark.place.slug || '';
	$.row.customTitle = args.placemark.place.name;
	$.tags.text = args.placemark.tags.join(',') || '';
} else {
	var place = args.place;
	
	var dist = haversine( args.latitude, args.longitude, place.get('lat'), place.get('lng') );
	
	$.title.text = place.get('name') ;
	
	if ( place.get('streetAddress') ){
		$.address.text = place.get('streetAddress') +  " | " + dist;
	} else {
		$.address.text = dist;	
	}
	
	$.row.customView = 'place';
	$.row.slug = place.get('slug') || '';
	$.row.customTitle = place.get('name');
	$.tags.text = place.get('tags');
}


