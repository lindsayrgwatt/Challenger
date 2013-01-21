migration.up = function(db) {
    db.createTable({
		"columns": {
			"placeId":"string PRIMARY KEY",
			"name":"string",
			"lat":"float",
			"lng":"float",
			"googleMapUrl":"string",
			"wishlist":"boolean",
			"memo":"string",
			"slug":"string",
			"lastViewed":"datetime",
			"googleUrl":"string"
		},
		"adapter": {
			"type": "sql",
			"collection_name": "Place"
		}
    });

};

migration.down = function(db) {
	db.dropTable("Place");

};
