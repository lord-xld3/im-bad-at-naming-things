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
        let weekArr = $(".weekNum").toArray();
        let dayArr = $(".weekDay").toArray();
        if (weekArr.every((e) => e.checked == false)
            && dayArr.some((e) => e.checked == true)) {
            alert("When selecting a week, you must also select a day");
        }
        else if (weekArr.some((e) => e.checked == true)
            && dayArr.every((e) => e.checked == false)) {
            alert("When selecting a day, you must also select a week");
        }
        else {
            let currentDateObj = localStorage.getItem(currentDateKey);
            if (currentDateObj == null) {
                currentDateObj = { eventArray: [] };
            }
            let event = {
                eventStart: ($("#eventStart"))
            };
        }
    }
});
$(".close").on("click", () => {
    $(".close").parent().parent().css("display", "none");
});
$(function initPage() {
    for (let t = 0; t < 24; t++) {
        let blockColor = (t < currentHour) ? "past"
            : (t == currentHour) ? "present"
                : "future";
        if (t < 10)
            t = "0" + t;
        let createBlock = $("<div id='" + t + "' class='row time-block'><div class='col-2 hour text-center py-3'>" + t + ":00</div><div class='col description " + blockColor + "'></div></div>");
        $("#eventContainer").append(createBlock);
    }
    var recurEvents = localStorage.getItem("recurEvents");
    if (recurEvents != null) {
        checkEventRecurrence(recurEvents);
    }
    if (localStorage.getItem(currentDateKey) != null) {
        checkEventToday(currentDateKey);
    }
    return;
});
function checkEventRecurrence(recurEvents) {
}
function checkEventToday(currentDateKey) {
}
