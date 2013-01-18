migration.up = function(db) {
	    db.createTable({
		"columns": {
			"placeId":"string",
			"name":"string",
			"lat":"float",
			"lng":"float",
			"googleMapUrl":"string",
			"wishList":"boolean",
			"memo":"string",
			"slug":"string",
			"lastViewed":"datetime",
			"googleUrl":"string"
		},
		"adapter": {
			"type": "placeId:string",
			"collection_name": "places"
		}
    });

};

migration.down = function(db) {
	db.dropTable("places");

};
