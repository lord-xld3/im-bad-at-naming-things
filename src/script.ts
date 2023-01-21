$(()=>{
	var currentDateTime = new Date() // display for user, everything else will be in unix time for precise timers
	var currentUnixTime = Date.now() // Should work until ~ September 13, 27,5760 CE
	selectedDate=currentDateTime // Init with current date
	localStorage.getItem(blockObj)
	for (var i=0; i<blockObj.blockArray.length; i++){

	}
	$("button.saveBtn").toArray()
	// TODO: Add a listener for click events on the save button. This code should
	// use the id in the containing time-block as a key to save the user input in
	// local storage. HINT: What does `this` reference in the click listener
	// function? How can DOM traversal be used to get the "hour-x" id of the
	// time-block containing the button that was clicked? How might the id be
	// useful when saving the description in local storage?
	//
	// TODO: Add code to apply the past, present, or future class to each time
	// block by comparing the id to the current hour. HINTS: How can the id
	// attribute of each time-block be used to conditionally add or remove the
	// past, present, and future classes? How can Day.js be used to get the
	// current hour in 24-hour time?
	//
	// TODO: Add code to get any user input that was saved in localStorage and set
	// the values of the corresponding textarea elements. HINT: How can the id
	// attribute of each time-block be used to do this?
	//
	// TODO: Add code to display the current date in the header of the page.
});

// Return a date from milliseconds
function millisec2date(eventMsec:number):Date{
	return eventDate = new Date(eventMsec)}

// Go forward/back a day
function changeCurrentDate(goFwd:boolean):void{
	if (goFwdDate) selectedDate.setDate((selectedDate.getDate())+1)
	else selectedDate.setDate((selectedDate.getDate())-1)
	currentDateTime=selectedDate} // ... update current date on page

// Check if event reoccurs today
function checkEventRecurrence(blockFreq:[],selectedDate:Date):boolean{
	let currentWeekday:number = selectedDate.getDay() // Get weekday
	if (currentWeekday in blockFreq) return true
	else return false}

function selectRecurrence()