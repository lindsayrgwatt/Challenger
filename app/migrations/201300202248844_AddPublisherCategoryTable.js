migration.up = function(db) {
	db.createTable({
		"columns": {
			"name":"string",
			"slug":"string PRIMARY KEY",
			"lastVisited":"datetime"
		},
		"adapter": {
			"type": "sql",
			"collection_name": "PublisherCategory"
		}
	});
};

migration.down = function(db) {
	db.dropTable("PublisherCategory");
};
