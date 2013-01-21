migration.up = function(db) {
    db.createTable({
		"columns": {
			"placeId":"string PRIMARY KEY",
			"name":"string",
			"streetAddress":"string",
			"lat":"float",
			"lng":"float",
			"tags":"string",
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
