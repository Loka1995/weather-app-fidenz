// function to format our date and time and return and object.
export const timeAndDateFormatter = function (millisecs, offset) {
    const milliseconds = (millisecs * 1000) + (offset * 1000);
    const date = new Date(milliseconds);
    const dateTimeItems = date.toUTCString().split(" ");
    const displayedDate = dateTimeItems[2] + " " + dateTimeItems[1];
    const timeItems = dateTimeItems[4].split(":");
    const rowHours = timeItems[0];
    const displayHours = rowHours % 12 === 0 ? 12 : rowHours % 12;
    const displayMinutes = timeItems[1];
    const amORpm = rowHours > 12 ? 'pm' : 'am';
    const displayedTime = `${displayHours}:${displayMinutes}${amORpm}`;
    return { date: displayedDate, time: displayedTime };
}