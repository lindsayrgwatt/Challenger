exports.definition = {
	
	config: {
		"columns": {
			"name":"string",
			"slug":"string",
			"lastVisited":"datetime"
		},
		"adapter": {
			"type": "sql",
			"collection_name": "PublisherCategory"
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

