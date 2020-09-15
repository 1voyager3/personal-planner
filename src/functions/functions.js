
// utility source
const listMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const listWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export let date = new Date();
export let year = date.getFullYear();
export let month = date.getMonth();
export let currentDate = date.getDate();
export let currentMoment = { year: year,  month: month, date: currentDate}

// Utility functions

export let getLastDayOfMonth = (year, month) => {
    let date = new Date (year, month + 1, 0)
    return date.getDate();
}

// utility function defines what is the numeric day of the
// week as a first number of the month
export const getFirstWeekDay = (year, month) => {
    let date = new Date (year, month, 1);
    let num  = date.getDay();

    if (num === 0) {
        return 6;
    } else {
        return num - 1;
    }
}

// utility function defines what is the numeric day of the
// week as a last number of the month
export const getLastWeekDay = (year, month) => {
    let date = new Date (year, month + 1, 0);
    let num  = date.getDay();

    if (num === 0) {
        return 6;
    } else {
        return num - 1;
    }
}

export const getPrevYear = (year, month) => {
    if (month === 0) {
        return year - 1;
    } else {
        return year;
    }
}

export const getPrevMonth = (month) => {
    if (month === 0) {
        return 11;
    } else {
        return month - 1;
    }
}

export const getNextYear = (year, month) => {
    if (month === 11) {
        return year + 1;
    } else {
        return year;
    }
}
export const getNextMonth = (month) => {
    if (month === 11) {
        return 0;
    } else {
        return month + 1;
    }
}

export const showInfo = (year, month) => {
    return `${listMonths[month]} ${year}`
}

// getting range of the days in a particular month
export const getRangeMonthDays = (lastDayOfMonth) => {
    let arr = [];
    for (let i = 1; i <= lastDayOfMonth; i++) {
        arr.push(i);
    }
    return arr;
}

// the filling of empty cells in the calendar
export const getNormalize = (arr, left, right) => {
    for (let i = 0; i < left; i++) {
        arr.unshift('');
    }
    for (let i = 0; i < right; i++) {
        arr.push('');
    }
    return arr;
}

//to break into 2D Sub Array in order to fill the calendar
export const getChunk = (arr, n) => {
    let result = [];
    const countOfSubArr = Math.ceil(arr.length / n);

    for (let i = 0; i < countOfSubArr; i++) {
        let elements = arr.splice(0, n);
        result.push(elements);
    }
    return result;
}