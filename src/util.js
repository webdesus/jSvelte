export const fireKeyboardEvent = function(el, event, keyCode)
{
	var eventObj = document.createEventObject ?
			document.createEventObject() : document.createEvent("Events");

	if(eventObj.initEvent){
		eventObj.initEvent(event, true, true);
	}

	eventObj.keyCode = keyCode;
	eventObj.which = keyCode;
	
	el.dispatchEvent ? el.dispatchEvent(eventObj) : el.fireEvent("onkeydown", eventObj); 
} 


