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
        (index)[ 
            eventStart: (unix milliseconds)
            eventEnd: (unix millliseconds)
            eventDuration: (eventEnd - eventStart)
            eventText: (string)
            eventRecur: [onMonday, onTuesday,...]
            eventTags: [] (optional custom tags)
        ]
    ]
}
```

// Keep track of specific events that are recurring

```
recurEvents{
    recurArray:[
        dateKey[], eventID[]
    ]
}
```

## Global mutables

`var dateObject = new Date()`

// Date can be incremented with `dateObject.setDate(1+(dateObject.getDate()))`

// Then, update date/time

`var currentDate = dateObject.toDateString()`

`var currentTime = dateObject.getTime()`

## Interactables

`<=Prev` & `Next=>` to change current date

`Create Event` - opens pop-up with options for creating event, has `SAVE` & `CANCEL` buttons

`Clear Events` - clears events from current date

`Data Table` - shows raw data from local storage, useful for locating recurring events, has `CLEAR ALL` button

## Basic functions
```
initFunction(){
    // Get current date
    // Check for recurring events (call loadEvents(dateKey,eventID) if found)
    // Check for dateKey with current date (call loadEvents(dateKey) if found)
    call eventTimer()
}
```

```
eventTimer(){
    // Check if an event is coming up
    // Set timer until next event, alert on event start
    // After alert, call eventTimer()
}
```

```
saveEvent(){
    // Check if start time OR end time is > existing event start time AND < existing event end time (return "overlapping event" error)

}
```

```
loadEvents(){
    arguments[0] // dateKey
    arguments[1] // eventID
    if (arguments[1]){ // recurring events exist
        // check recurring event to see if it recurs today
    }
}
```