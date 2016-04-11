// First capture the program name and screen number
var progname = session._private.props()._parent.children[0].children[0].properties.ScreenProgram.toString();
var screenNo = session._private.props()._parent.children[0].children[0].properties.ScreenNumber.toString();

// Generate the RFC that we are going to call to get all the coordinates for the heatmap
var rfc = session.createRFC("ZFM_HEATMAPS_GEN");
rfc.setParameter("IV_PROGNAME", progname);
rfc.setParameter("IV_SCREEN", screenNo);
rfc.requestResults(JSON.stringify(["ET_COORDINATES"]));
rfc.send();
var coordinates = JSON.parse(rfc.getResult("ET_COORDINATES"));

//Fetch the heatmap
$.getScript("https://rawgit.com/pa7/heatmap.js/master/build/heatmap.js").done(function() { 

// minimal heatmap instance configuration
var heatmapInstance = h337.create({
  // only container is required, the rest will be defaults
  container: document.querySelector('.sap-desktop')
	
});
	
//The points are our click coordinates	
	var points = [];
	 
	$.map(coordinates, function(el) { 
	var point = {
		x: el.X,
		y: el.Y,
		value: 1
	  };
	  points.push(point);
	});
	var max = points.lentgh;
	var data = { 
	  max: max, 
	  data: points 
	};
	heatmapInstance.setData(data);
});
	