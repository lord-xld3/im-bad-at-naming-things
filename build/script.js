"use strict";
var currentDate = new Date(); // display for user, everything else will be in unix time for precise timers
var currentHour = currentDate.getHours();
$("#createEvent").on("click", () => {
    $("#modalCreate").css("display", "block");
});
$(".close").on("click", () => {
    $(".close").parent().parent().css("display", "none");
});
$(function initPage() {
    var currentDateKey = currentDate.toDateString(); //shorten date
    $("#currentDay").text(currentDateKey); // display it
    for (let t = 0; t < 24; t++) {
        // Determine blockColor
        let blockColor = (t < currentHour) ? "past"
            : (t == currentHour) ? "present"
                : "future";
        if (t < 10)
            t = "0" + t; // use 00:00 instead of 0:00
        // Create & append block to page
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
