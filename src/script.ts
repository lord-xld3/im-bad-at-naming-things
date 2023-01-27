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
		if (weekArr.every((e)=>e.checked==false) 
		
		// If any day is checked, return "true"
		&& dayArr.some((e)=>e.checked==true)){
			
			// No week is checked & some day is checked
			alert("When selecting a week, you must also select a day")
		}

		// If some week is checked, return "true"
		else if (weekArr.some((e)=>e.checked==true)

		// If every day is unchecked, return "true"
		&& dayArr.every((e)=>e.checked==false)){

			// Some day is checked & no week is checked
			alert("When selecting a day, you must also select a week")
		}
	//#endregion

		else {
			let startArr = $("#eventStart").val().split(":")
			let startDate = new Date()
			let endDate = new Date()
			let endArr = $("#eventEnd").val().split(":")
			startDate.setHours(parseInt(startArr[0]),parseInt(startArr[1]))
			endDate.setHours(parseInt(endArr[0]),parseInt(endArr[1]))

			if(startDate >= endDate) return alert("Start time cannot be greater than or equal to End time")
			
			let eventWeekArr = []
			if ($("#eventWeekFirst").is(":checked")) eventWeekArr.push(0)
			if ($("#eventWeekSecond").is(":checked")) eventWeekArr.push(1)
			if ($("#eventWeekThird").is(":checked")) eventWeekArr.push(2)
			if ($("#eventWeekFourth").is(":checked")) eventWeekArr.push(3)

			let eventDayArr = []
			if ($("#eventWeekSun").is(":checked")) eventDayArr.push(0)
			if ($("#eventWeekMon").is(":checked")) eventDayArr.push(1)
			if ($("#eventWeekTue").is(":checked")) eventDayArr.push(2)
			if ($("#eventWeekWed").is(":checked")) eventDayArr.push(3)
			if ($("#eventWeekThu").is(":checked")) eventDayArr.push(4)
			if ($("#eventWeekFri").is(":checked")) eventDayArr.push(5)
			if ($("#eventWeekSat").is(":checked")) eventDayArr.push(6)

			if ($("#eventTags").val()=="") var eventTagsData = []
			else var eventTagsData = $("#eventTags").val().split(",")
			
			if ($("#eventNumRecurs").val()=="") var eventRecurNumData = []
			else var eventRecurNumData = $("#eventTags").val().split(",")

			if ($("#eventNumDays").val()=="") var eventRecurDaysData = []
			else var eventRecurDaysData = $("#eventNumDays").val().split(",")

			if ($("#eventNumDaysMonthly").val()=="") var eventRecurWeeksData = []
			else var eventRecurWeeksData = $("#eventNumDaysMonthly").val().split(",")

			let currentEventArr = localStorage.getItem(currentDateKey)
			currentEventArr = JSON.parse(currentEventArr)
			if (currentEventArr==null){
				currentEventArr = []
			}
			let event = {
				eventStart: (startDate.getTime()),
				eventEnd: (endDate.getTime()),
				eventText: ($("#eventText").val()),
				eventTags: eventTagsData,
				eventWeeks: eventWeekArr,
				eventDays: eventDayArr,
				eventRecurNum: eventRecurNumData,
				eventRecurDays: eventRecurDaysData,
				eventRecurWeeks: eventRecurWeeksData
			}
			currentEventArr.push(event)
			localStorage.setItem(currentDateKey,(JSON.stringify(currentEventArr)))
		}
	}
})

// Close any modal
$(".close").on("click",()=>{
	$(".close").parent().parent().css("display", "none")
})

$(function initPage(){
	for (let t=0; t < 24; t++){
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
