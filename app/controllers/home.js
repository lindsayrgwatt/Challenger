
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
		var nearbyPage = Alloy.createController('nearby');
		var urlArray = URI['path'].split("/");
		
	    nearbyPage.setSlug( urlArray[ urlArray.length -1] );
		nearbyPage.getView().navGroup = $.win.navGroup;
		$.win.navGroup.open( nearbyPage.getView()) ;
		
		$.win.ds.button.hide();
		
		nearbyPage.getView().addEventListener('close', function(e){
			$.win.ds.button.show();
			$.win.drawSideBar();
		});
		
	} else {
		Ti.Platform.openURL( e.URL );
	}

});
