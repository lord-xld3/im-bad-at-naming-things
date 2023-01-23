# Time Blox
We're going to make a 'schedule' for events each day. Although not required, this program is pretty useless if we can't plan more than a day in advance, or view past events. Additionally, being able to set start and end times for each event, event durations + custom tags (to compute total time per day) notifications once events start, and recurring events make this program MUCH more useful.

This requires some fundamental changes to the requirements (sorry, not sorry!) so we can start events at more specific times, like 6:25PM. To do this, we won't use hourly "time blocks", and instead we will generate the time blocks as needed, using the event start/end time. ---EVENTS CANNOT OCCUR AT THE SAME TIME, I KNOW YOU'RE NOT *THAT* BUSY---

## Flow
![flow demo img](./build/images/BLOXDEMO.png)

## Global immutables

`const containerElement = $("#eventContainer")`

## Data objects - saved to local storage

// Main data, tied to a date

```
----Events are ALWAYS tied to the date they are created----
dateKey(DD-MM-YYYY){

----List of events for this date---- 
    eventArray: [

----Each index in eventArray contains...----
        (index){ 
            eventStart: (unix milliseconds)
            eventEnd: (unix millliseconds)
            eventDuration: (eventEnd - eventStart)
            eventText: (string)
            eventRecur: {
                byWeekday:[Monday, Tuesday,...]
                byWeekOfMonth:[0,1,2,3]
                byNumberOfDays:[2,7,12,...]
                byDateOfMonth:[2,7,12,...]
            }
            eventTags: ["Work","Sleep","School",...] (optional custom tags)
        }
    ]
}
```

// Keep track of specific events that are recurring

```
recurEvents{
    recurArray:[
        dateKey{eventIndex:[]} // Array of events that recur that were created on that date
    ]
}
```

## Global mutables

`var dateObject = new Date()`

// Date can be incremented with 

`dateObject.setDate(1+(dateObject.getDate()))`

// Then, update date/time

    var currentDate = dateObject.toDateString()
    var currentWeekday = new Intl.DateTimeFormat("en-US", options).format(dateObject)
    var currentTime = dateObject.getTime()

## Interactables

`<=Prev` & `Next=>` - change current date

`Create` - opens pop-up with the following options:

    Time inputs:
        Start - define hour/minute event starts
        End - define hour/minute event ends

    String inputs:
        Name - define event name
        Tags - define custom tags separated by commas

    Recurrence options
        Checkbox inputs:
            Weekdays: 
                ✅ Monday
                ✅ Tuesday
                ...
            Week number:
                ✅ First
                ✅ Second
                ...
        Number inputs:
            Every x,y,... days:
                🔳(2,5,...)
            Every x,y,... day of month:
                🔳(12,21,31,...)


`Data` - shows raw data from local storage, useful for locating recurring events, has `Clear` button to clear selected cell(s)

`Time` - shows total time per custom tag, has `Range` to select days to include



## Basic functions
```
function initPage(){
    // Get current date
    // Check for recurring events 
        if (recurEvents) { // Not empty
            call checkRecur()
        }
    // Check for a dateKey with current date
    if (currentDate in localStorage){
        call checkToday()
    }
    return // Do nothing if no events can be displayed
}
```

```
function eventTimer(){
    // Check if an event is coming up
    // Set timer until next event, alert on event start
    // After alert, clearInterval() and call eventTimer()
}
```

```
function saveEvent(){
    // push input data to eventArray[] on current dateKey{}
}
```

```
    // Check for recurring events, show on page if not overlapping AND it recurs today
function checkRecur(){
    for (i=0; i < recurEvents.keys(); i++){ // Iterate thru each dateKey{} in recurEvents{}
        for (j=0; j < dateKey[i].keys(); j++){ // Iterate thru each eventArray[] in dateKey{}
            for (k=0; k < eventArray[j].length; k++){ // Iterate thru each event in eventArray[]
                 
                // Check each recurrence option
                
                for (l=0; l < eventArray[j].eventRecur[k].byWeekOfMonth.length; l++){
                    // if (currentDate in byWeekday[] && currentDate in byWeekOfMonth[l])
                        // call loadEvent()
                }

                for (l=0; l < eventArray[k].eventRecur.byNumberOfDays.length; l++){
                    // if (daySince % byNumberOfDays[l] == 0)
                        // call loadEvent()
                }

                for (l=0; l < eventArray[k].eventRecur.byDateOfMonth.length; l++){
                    // if (currentDate == byDateOfMonth[l])
                        // call loadEvent()
                }
            }
        }
    }
}
```

```
function checkToday(){
    // Retrieve dateKey{} from localStorage
    for (i=0; i < dateKey.eventArray.length; i++){
        // call loadEvent()
    }
}
```

```
function loadEvent(){
    // determine where to insert event on page vertically (time-wise)
    // determine overlapping events (insert side-by-side)
}
```