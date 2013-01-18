exports.definition = {
	
	config: {
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
			"type": "sql",
			"collection_name": "places",
			"idAttribute": "placeId" 
		}
	},		

	extendModel: function(Model) {		
		_.extend(Model.prototype, {
						
			// extended functions go here

		}); // end extend
		
		return Model;
	},
	
	
	extendCollection: function(Collection) {		
		_.extend(Collection.prototype, {
			
			// extended functions go here			
			
		}); // end extend
		
		return Collection;
	}
		
}

