export function getFormattedDateString(date) {
    if (date instanceof Date === false) {
        date = new Date(date);
    }

    if (isNaN(date)) {
        return "";
    }

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const days = date.getDay();
    const year = date.getFullYear();
    const month = date.getMonth();
    const currentDate = date.getDate();
    return `${shortDays[days]}, ${currentDate} ${shortMonth[month]} ${year} ${hours}:${minutes}${seconds > 0 ? ':' + seconds : ''}`;

}

export function isTodaysDate(date) {
    if (!date) return false;
    const todayDateObj = new Date();
    const dateObj = new Date(date);
    return (todayDateObj.getDate() === dateObj.getDate()
        && todayDateObj.getMonth() === dateObj.getMonth()
        && todayDateObj.getFullYear() === dateObj.getFullYear())
}

export function isTommorowsDate(date) {
    if (!date) return false;
    const todayDateObj = new Date();
    const dateObj = new Date(date);
    return ((todayDateObj.getDate() + 1) === dateObj.getDate()
        && todayDateObj.getMonth() === dateObj.getMonth()
        && todayDateObj.getFullYear() === dateObj.getFullYear())
}


var shortMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const shortDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

