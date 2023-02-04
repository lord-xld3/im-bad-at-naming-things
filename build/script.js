"use strict";
var currentDate = new Date();
var currentHour = currentDate.getHours();
var currentDateKey = currentDate.toDateString();
$("#currentDay").text(currentDateKey);
$("#createEvent").on("click", () => {
    $("#modalCreate").css("display", "block");
});
$("#showRepeat").on("click", () => {
    if (($("#repeatOptions").css("display")) == "none") {
        $("#repeatOptions").css("display", "block");
    }
    else
        $("#repeatOptions").css("display", "none");
});
$("#saveBtn").on("click", () => {
    if ($("#eventStart").val() == ""
        || $("#eventEnd").val() == ""
        || $("#eventText").val() == "") {
        return alert("Please fill out required fields");
    }
    else {
        var weekArr = $(".weekNum").toArray();
        var dayArr = $(".weekDay").toArray();
        if (weekArr.every((e) => e.checked == false)
            && dayArr.some((e) => e.checked == true)) {
            return alert("When selecting a week, you must also select a day");
        }
        else if (weekArr.some((e) => e.checked == true)
            && dayArr.every((e) => e.checked == false)) {
            return alert("When selecting a day, you must also select a week");
        }
        else {
            let startDate = new Date();
            let endDate = new Date();
            let startArr = $("#eventStart").val().split(":");
            let endArr = $("#eventEnd").val().split(":");
            startDate.setHours(parseInt(startArr[0]), parseInt(startArr[1]));
            endDate.setHours(parseInt(endArr[0]), parseInt(endArr[1]));
            if (startDate >= endDate) {
                return alert("Start time cannot be greater than or equal to End time");
            }
            let eventNumRecurs = +$("#eventNumRecurs").val();
            if (isNaN(eventNumRecurs)) {
                console.warn($("#eventNumRecurs").val() + " is not a number\nit will be treated as empty and script will continue");
                eventNumRecurs = 0;
            }
            let eventDayRecurs = emptyNumIfBlank("#eventNumDays");
            let eventRecurDatesOfMonth = emptyNumIfBlank("#eventNumDaysMonthly");
            var eventWeekArr = [];
            for (let i = 0; i < weekArr.length; i++) {
                isThisChecked(weekArr[i], eventWeekArr, i);
            }
            var eventDayArr = [];
            for (let i = 0; i < dayArr.length; i++) {
                isThisChecked(dayArr[i], eventDayArr, i);
            }
            let currentEventArr = localStorage.getItem(currentDateKey);
            currentEventArr = JSON.parse(currentEventArr);
            if (currentEventArr == null) {
                currentEventArr = [];
            }
            let event = {
                eventStart: (startDate.getTime()),
                eventEnd: (endDate.getTime()),
                eventText: ($("#eventText").val()),
                eventTags: emptyTagIfBlank("#eventTags"),
                eventWeeks: eventWeekArr,
                eventDays: eventDayArr,
                eventNumRecurs: (eventNumRecurs == "") ? 0 : eventNumRecurs,
                eventRecurDays: eventDayRecurs,
                eventRecurDates: eventRecurDatesOfMonth
            };
            currentEventArr.push(event);
            localStorage.setItem(currentDateKey, (JSON.stringify(currentEventArr)));
            closeModal();
            initPage();
            $("#modalSave").css("display", "block");
        }
    }
});
$(".close").on("click", closeModal);
initPage();
function initPage() {
    $(".row").remove();
    $(".eventText").remove();
    for (let t = 0; t < 24; t++) {
        let blockColor = (t < currentHour) ? "past"
            : (t == currentHour) ? "present"
                : "future";
        if (t < 10)
            t = "0" + t;
        let createBlock = $("<div id='" + t + "' class='row time-block'><div class='col-2 hour text-center'>" + t + ":00</div><div class='col description " + blockColor + "'></div></div>");
        $(".eventContainer").append(createBlock);
    }
    var recurEvents = localStorage.getItem("recurEvents");
    if (recurEvents != null) {
        checkEventRecurrence(recurEvents);
    }
    var currentDateObj = localStorage.getItem(currentDateKey);
    if (currentDateObj != null) {
        checkEventToday(currentDateObj);
    }
    return;
}
function isThisChecked(e, a, i) {
    if ($(e).is(":checked")) {
        a.push(i);
    }
}
function emptyNumIfBlank(e) {
    let v = $(e).val();
    if (v == "")
        return [];
    else {
        let a = v.split(",");
        for (let i = 0; i < a.length; i++) {
            if (isNaN(+a[i])) {
                console.warn(a[i] + " is not a number\nit will be omitted and script will continue");
                a.splice(i, 1);
                i--;
            }
            else if ((+a[i] < 1 && e == "#eventNumDays")
                || ((+a[i] > 30) || (+a[i] < 0) && e == "#eventNumDaysMonthly")) {
                console.warn(a[i] + " is an invalid day OR day of month\nit will be omitted and script will continue");
                a.splice(i, 1);
                i--;
            }
            else
                a[i] = +a[i];
        }
        return a;
    }
}
function emptyTagIfBlank(e) {
    if ($(e).val() == "")
        return [];
    else {
        return $(e).val().split(",");
    }
}
function closeModal() {
    $(".close").parent().parent().css("display", "none");
}
function checkEventRecurrence(recurEvents) {
    console.log(recurEvents + "\n \n not implemented");
}
function checkEventToday(currentDateObj) {
    let currentDateArr = JSON.parse(currentDateObj);
    for (let i = 0; i < currentDateArr.length; i++) {
        let startTime = new Date(currentDateArr[i].eventStart);
        let eventMargin = (startTime.getHours() * 9) + (startTime.getMinutes() * 0.15);
        let endTime = new Date(currentDateArr[i].eventEnd);
        let eventHeight = ((endTime.getHours() * 9) + (endTime.getMinutes() * 0.15)) - eventMargin;
        let createEvent = $("<div class='eventText' style='margin-top: " + eventMargin + "vh; height: " + eventHeight + "vh;'>" + currentDateArr[i].eventText + "</div>");
        $(".eventOverlay").append(createEvent);
    }
}
$("#prevDay").on("click", notYetImp);
$("#nextDay").on("click", notYetImp);
$("#editEvent").on("click", notYetImp);
$("#timeEvent").on("click", notYetImp);
function notYetImp() {
    alert("Not yet implemented");
}
