# Time Blox
We're going to make a 'schedule' in hour blocks for each day. Although not required, this program is pretty useless if we can't plan more than a day in advance, or view past events. Additionally, being able to set start and end times for each event, and notifications once events start make this far more useful.

## Sequence

INIT or when current day is changed

First: Get the current day

Second: Read local data to generate time blocks for current day
>we need an ordered list of 'blockHour','blockText'
>>this can be a 2D array, or two 1D arrays within the same for loop

>Option 1 (safer): data{dataArray[blockTuple[blockTime: number,blockText: string]]}
>>*Safer?*:Fixed length, data type validation, missing data from one type of data would not shift the entire for loop/array. *Harder*: requires TypeScript and 2D array

>Option 2 (simple): data{blockTime[int],blockText[string]}
>>*Scary?*: If data is not passed to correct array there is no error / data validation. Empty arrays/elements have a length of 0, so if 'blockText' element is empty it will be skipped, meaning blockTime no longer links to the correct blockText by [i]

>Let's be real, any sane person would rather get an error at compile time than finding a bug after hours of testing in runtime. That means we have to put more thought and work into our code, but hopefully less work debugging.

Third: Conditionally set classes on blocks by comparing them to current hour.

Finally: Set a timer to notify user when next event starts

### Get current day

Display something like "January 12th, 2023" at top of website