//#region Init
var currentDate = new Date() // display for user, everything else will be in unix time for precise timers
var currentHour = currentDate.getHours()
var currentDateKey = currentDate.toDateString() //shorten date
	$("#currentDay").text(currentDateKey) // ^ display it

// Open 'create' modal
$("#createEvent").on("click",()=>{
	$("#modalCreate").css("display","block")
})

// Show/Hide "Repeat?" options
$("#showRepeat").on("click",()=>{
	if (($("#repeatOptions").css("display"))=="none"){
		$("#repeatOptions").css("display","block")
	}
	else $("#repeatOptions").css("display","none")
})

// Save event
$("#saveBtn").on("click",()=>{
	
	// If required fields are blank...
	if ($("#eventStart").val()==""
	||$("#eventEnd").val()==""
	||$("#eventText").val()==""){
		return alert("Please fill out required fields")
	}

	else{ // Parse input data, still handle invalid input

		let weekArr = $(".weekNum").toArray()
		let dayArr = $(".weekDay").toArray()

	//#region Brain-pain zone!!!
		
		// If no week is checked, return "true"
		if (weekArr.every((e:any)=>e.checked==false) 
		
		// If any day is checked, return "true"
		&& dayArr.some((e:any)=>e.checked==true)){
			
			// No week is checked & some day is checked
			alert("When selecting a week, you must also select a day")
		}

		// If some week is checked, return "true"
		else if (weekArr.some((e:any)=>e.checked==true)

		// If every day is unchecked, return "true"
		&& dayArr.every((e:any)=>e.checked==false)){

			// Some day is checked & no week is checked
			alert("When selecting a day, you must also select a week")
		}
	//#endregion

		else {
			let currentDateObj:string|object|null = localStorage.getItem(currentDateKey)
			if (currentDateObj==null){
				currentDateObj = {eventArray:[]}
			}
			let event = {
				eventStart: ($("#eventStart"))
			}
		}
	}
})

// Close any modal
$(".close").on("click",()=>{
	$(".close").parent().parent().css("display", "none")
})

$(function initPage(){
	for (let t:any=0; t < 24; t++){
		// Determine blockColor
		let blockColor = (t < currentHour)?"past"
		:(t == currentHour)?"present"
		:"future"
		
		if (t < 10) t = "0" + t // use 00:00 instead of 0:00
		// Create & append block to page
		let createBlock = $("<div id='" + t + "' class='row time-block'><div class='col-2 hour text-center py-3'>" + t + ":00</div><div class='col description " + blockColor + "'></div></div>")
		$("#eventContainer").append(createBlock)
	}
	
	var recurEvents = localStorage.getItem("recurEvents")
	if (recurEvents!=null) {
		checkEventRecurrence(recurEvents)
	}
	if (localStorage.getItem(currentDateKey)!=null) {
		checkEventToday(currentDateKey)
	}
	return
})
//#endregion
function checkEventRecurrence(recurEvents){

}

function checkEventToday(currentDateKey){

}
