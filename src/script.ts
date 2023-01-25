var currentDate = new Date() // display for user, everything else will be in unix time for precise timers
var currentDateKey = currentDate.toDateString()
var currentHour = currentDate.getHours()
$("#currentDay").append(currentDateKey)

$(()=>{
	for (var t=0; t < 24; t++){
		// Determine blockColor
		let blockColor = (t < currentHour)?"past"
		:(t == currentHour)?"present"
		:"future"
		
		// Create & append block to page
		let createBlock = $("<div id='" + t + "' class='row time-block'><div class='col-2 col-md-1 hour text-center py-3'>" + t + ":00</div><div class='col description " + blockColor + "'></div></div>")
		$("#eventContainer").append(createBlock)
	}

	if (localStorage.getItem("recurEvents")!=null) checkEventRecurrence()
	if (localStorage.getItem(currentDateKey)!=null) checkEventToday()
	return
})

// Check if event reoccurs today
function checkEventRecurrence(){

}

function checkEventToday(){

}