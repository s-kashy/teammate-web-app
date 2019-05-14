
import moment from "moment"
export const findTheNextEvent = (type, dateArray) => {
    if (type === "Daily") {
        return "tommorow"
    }
    else if (type === "Weekly") {
        return findTheNextWeekEvent(dateArray)

    } else if (type === "Monthly") {
        return getClosesDate(dateArray)
    }
}
export const findTheNextWeekEvent = (datesArr) => {
    let indexDay = 1;
    let day = new Date()
    indexDay = day.getDay() + indexDay
    if (indexDay > 6) {
        indexDay = 0
    }
    var dates = datesArr.map(item => item.value)
    var daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let nextDay = daysOfTheWeek[indexDay]
    let found = true;
    while (found) {
        if (dates.includes(nextDay)) {
            return nextDay
        }
        else {
            ++indexDay
            if (indexDay > 6) {
                indexDay = 0
                nextDay = daysOfTheWeek[indexDay]
            } else {
                nextDay = daysOfTheWeek[indexDay]
            }
        }
    }
}
export const getClosesDate = (dateArray) => {

    let sortedArray = dateArray.sort((a, b) => {
        return new Date(a) - new Date(b)
    })
    var dateOfToday = new Date()

    let result = sortedArray.find((date) => {
        return moment(date).isAfter(dateOfToday) || moment(date).isSame(dateOfToday)
    })
    if (result) {
        return moment(result).format("DD-MM-YYYY").toString()
    } else {
        return "No Event Date"
    }




}

