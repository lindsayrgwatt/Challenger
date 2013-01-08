
var url = Alloy.CFG.serverUrl + "/publishers/" + Alloy.CFG.publisher +  "/home.html";

Ti.API.log( "info", "grabbing contents from: " + url);

var xhr = Ti.Network.createHTTPClient({
	onload: function(e) {
		var result = this.responseText;
		$.webView.setHtml( result )	
	},
	onerror: function(e) {	
		alert("Error:"+JSON.stringify(e));
		Ti.API.info(JSON.stringify( e ));
	},
	timeout: 10000
});

xhr.open("GET", url );
xhr.send();

Ti.App.addEventListener('openLink',function(e){
	Ti.API.info(JSON.stringify( e ));
    
    var UriParser = require("parseUri");
    Ti.API.info( e.URL );
    var URI = UriParser.parseUri( e.URL );

	Ti.API.info(JSON.stringify( URI ));
	
	if (URI['realtive'] != ""){
		var nearbyPage = Alloy.createController('nearby');
	    nearbyPage.setCategory( URI['relative'].split("/")[-1] );
		nearbyPage.getView().open();
	} else {
		Ti.Platform.openURL( e.URL );
	}

});
