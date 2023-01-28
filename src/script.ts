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

		var weekArr = $(".weekNum").toArray()
		var dayArr = $(".weekDay").toArray()

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
			let startArr = $("#eventStart").val().split(":")
			let startDate = new Date()
			let endDate = new Date()
			let endArr = $("#eventEnd").val().split(":")
			startDate.setHours(parseInt(startArr[0]),parseInt(startArr[1]))
			endDate.setHours(parseInt(endArr[0]),parseInt(endArr[1]))

			if(startDate >= endDate) return alert("Start time cannot be greater than or equal to End time")
			
			var eventWeekArr:any = []
			for (let i=0; i < weekArr.length; i++){
				isThisChecked(weekArr[i],eventWeekArr,i)
			}

			var eventDayArr:any = []
			for (let i=0; i < dayArr.length; i++){
				isThisChecked(dayArr[i],eventDayArr,i)
			}
			
			let currentEventArr:any = localStorage.getItem(currentDateKey)
			currentEventArr = JSON.parse(currentEventArr)
			if (currentEventArr==null){
				currentEventArr = []
			}
			let event = {
				eventStart: (startDate.getTime()),
				eventEnd: (endDate.getTime()),
				eventText: ($("#eventText").val()),
				eventTags: emptyIfBlank("#eventTags"),
				eventWeeks: eventWeekArr,
				eventDays: eventDayArr,
				eventRecurNum: emptyIfBlank("#eventNumRecurs"),
				eventRecurDays: emptyIfBlank("#eventNumDays"),
				eventRecurWeeks: emptyIfBlank("#eventNumDaysMonthly")
			}
			currentEventArr.push(event)
			localStorage.setItem(currentDateKey,(JSON.stringify(currentEventArr)))
			closeModal()
		}
	}
})

// Close any modal
$(".close").on("click",closeModal)

$(function initPage(){
	for (let t:any=0; t < 24; t++){
		// Determine blockColor
		let blockColor = (t < currentHour)?"past"
		:(t == currentHour)?"present"
		:"future"
		
		if (t < 10) t= "0" + t // use 00:00 instead of 0:00
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

function isThisChecked(e:any,a:any,i:number){
	if ($(e).is(":checked")) a.push(i)
}

function emptyIfBlank(e:any){
	if ($(e).val()=="") return []
	else return $(e).val().split(",")
}

function closeModal(){
	$(".close").parent().parent().css("display", "none")
}

function checkEventRecurrence(recurEvents){

}

function checkEventToday(currentDateKey){

}
