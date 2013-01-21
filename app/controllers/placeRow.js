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
	
	if (d < 0.5){
		return Math.round( d*1000 ) + "m";
	} else {
		return Math.round(d/10)*10 +"km";
	}
}

var args = arguments[0] || {};
$.icon.image = args.placemark.place.thumb_url;
$.title.text = args.placemark.place.name || '';
$.address.text = args.placemark.place.street_address || '';

$.distance.text = haversine( args.latitude, args.longitude, args.placemark.place.lat, args.placemark.place.lng );
$.row.customView = 'place';
$.row.placemark = args.placemark;
$.row.slug = args.placemark.place.slug || '';
$.row.customTitle = args.placemark.place.name;