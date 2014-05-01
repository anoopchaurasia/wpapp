fm.Package("lib");
fm.Class("MSGesture");
lib.MSGesture = function () {
	this.MSGesture = function(elem){
		elem.addEventListener("MSPointerDown",onTableTopPointerDown, true);
        elem.addEventListener("MSPointerUp", onTableTopPointerUp, true);
        elem.addEventListener("MSPointerCancel", onTableTopPointerUp, true);

        elem.gestureObject = new MSGesture(); // expando on element: tracks the tabletop gesture
        elem.gestureObject.target = tableTop;
        elem.gestureObject.pointerType = null;  // expando on gesture: filter against mixed pointer types
        elem.targetedContacts = [];           // expando on element: list of contacts that target the tabletop
        elem.topmostZ = 3;                      // expando on element: used for quicky and dirty z-reordering

        elem.addEventListener("MSGestureStart", onTableTopGestureChange, false);
        elem.addEventListener("MSGestureEnd", onTableTopGestureEnd, false);
	};


	function onTableTopPointerDown(e) {
		
    }
};
