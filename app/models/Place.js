exports.definition = {
	
	config: {
		"columns": {
			"placeId":"string",
			"name":"string",
			"lat":"float",
			"tags":"string",
			"streetAddress":"string",
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
			"collection_name": "Place",
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
			
            // Implement the comparator method.
    	    comparator : function( place ) {
        	    return place.get('lastVisited');
            }
		
			
		}); // end extend
		
		return Collection;
	}
		
}

