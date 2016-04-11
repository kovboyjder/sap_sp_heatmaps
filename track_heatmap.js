// Add event listener to the click event
window.addEventListener("click", function(e) {  
	// Load the custom function module
	var rfc = session.createRFC("ZFM_HEATMAPS");
	// Capture the screen program. Couldn't use the session.info.program parameter
	rfc.setParameter("IV_PROGNAME", session._private.props()._parent.children[0].children[0].properties.ScreenProgram.toString());
	// Capture screen number to we can filter out the right heatmap
	rfc.setParameter("IV_SCREEN", session._private.props()._parent.children[0].children[0].properties.ScreenNumber.toString());	
	//Capture X and Y coordinates.
	rfc.setParameter("IV_X", e.clientX.toString());
	rfc.setParameter("IV_Y", e.clientY.toString())
	rfc.send();
});
