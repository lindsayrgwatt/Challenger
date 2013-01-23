
var url = Alloy.CFG.serverUrl + "/publishers/" + Alloy.CFG.publisher +  "/home.html";

function refreshWindow( placemark ){
	var xhr = Ti.Network.createHTTPClient({
		onload: function(e) {
			var result = this.responseText;
			$.webView.setHtml( result );	
		},
		onerror: function(e) {	
			alert("Error:"+JSON.stringify(e));
		},
		timeout: 10000
	});
	
	xhr.open("GET", url );
	xhr.send();		
}

exports.refreshWindow =refreshWindow;

refreshWindow();

Ti.App.addEventListener('openLink',function(e){
    
    var UriParser = require("parseUri");
    var URI = UriParser.parseUri( e.URL );
	
	if ( URI['host'] == "" || URI['host'] == "." ){
		var newPage;
		var urlArray = URI['path'].split("/");
		if (urlArray[0] == ""){
			urlArray.splice(0,1);
		}
		
		if (urlArray[0].toLowerCase() == "category"){
			newPage = Alloy.createController('nearby');
			newPage.setSlug( urlArray[ urlArray.length -1] );	
		} else if (urlArray[0].toLowerCase() == "place" || urlArray[0].toLowerCase() == "places") {
			newPage = Alloy.createController('place');
			newPage.setSlug( urlArray[ urlArray.length -1] );	
		} else if ( urlArray[0].toLowerCase() == "nearby" ){
			newPage = Alloy.createController('nearby');
		} else if ( urlArray[0].toLowerCase() == "wishlist"){
			newPage = Alloy.createController('wishlist');	
		}
		
		newPage.getView().navGroup = $.win.navGroup;
		$.win.navGroup.open( newPage.getView()) ;
		
		$.win.ds.button.hide();
		
		newPage.getView().addEventListener('close', function(e){
			$.win.ds.button.show();
			$.win.drawSideBar();
		});
		
	} else {
		Ti.Platform.openURL( e.URL );
	}

});
