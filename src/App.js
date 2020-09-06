import React, {useState} from 'react';
import './App.css';
import Info from "./components/Info/Info";
import Nav from "./components/Nav/Nav";
import THead from "./components/THead/THead";
import TBody from "./components/TBody/TBody";

// utility functions
const listMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const listWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();
let currentDate = date.getDate()
let currentMoment = { year: year,  month: month, date: currentDate}

const getLastDayOfMonth= (year, month) => {
    let date = new Date (year, month + 1, 0)
    return date.getDate();
}
const lastDayOfMonth = getLastDayOfMonth(year, month)

// utility function defines what is the numeric day of the
// week as a first number of the month
const getFirstWeekDay = (year, month) => {
    let date = new Date (year, month, 1);
    let num  = date.getDay();

    if (num === 0) {
        return 6;
    } else {
        return num - 1;
    }
}
const firstWeekDay = getFirstWeekDay(year, month);
// utility function defines what is the numeric day of the
// week as a last number of the month
const getLastWeekDay = (year, month) => {
    let date = new Date (year, month + 1, 0);
    let num  = date.getDay();

    if (num === 0) {
        return 6;
    } else {
        return num - 1;
    }
}
const lastWeekDay = getLastWeekDay(year, month);

const getPrevYear = (year, month) => {
    if (month === 0) {
        return year - 1;
    } else {
        return year;
    }
}

const getPrevMonth = (month) => {
    if (month === 0) {
        return 11;
    } else {
        return month - 1;
    }
}

const getNextYear = (year, month) => {
    if (month === 11) {
        return year + 1;
    } else {
        return year;
    }
}
const getNextMonth = (month) => {
    if (month === 11) {
        return 0;
    } else {
        return month + 1;
    }
}

// const currentMonth = listMonths[month];

const showInfo = (year, month) => {
    return `${listMonths[month]} ${year}`
}


const getRangeMonthDays = (lastDayOfMonth) => {
    let arr = [];
    for (let i = 1; i <= lastDayOfMonth; i++) {
        arr.push(i);
    }
    return arr;
}
const rangeMonthDays = getRangeMonthDays(lastDayOfMonth)

// the filling of empty cells in the calendar
const getNormalize = (arr, left, right) => {
    for (let i = 0; i < left; i++) {
        arr.unshift('');
    }
    for (let i = 0; i < right; i++) {
        arr.push('');
    }
    return arr;
}
const normalize = getNormalize(rangeMonthDays, firstWeekDay, 6 - lastWeekDay)

//to break into 2D Sub Array in order to fill the calendar
const getChunk = (arr, n) => {
    let result = [];
    let countOfSubArr = Math.ceil(arr.length / n);

    for (let i = 0; i < countOfSubArr; i++) {
        let elems = arr.splice(0, n);
        result.push(elems);
    }
    return result;
}
const chunk = getChunk(normalize, 7)

const createTable = (year, month) => {




    return chunk.map((item, index) => {
        return <tr key={index}>
            {item.map((subItem, subIndex) => {
                let activeElem = () => {
                    if (year === currentMoment.year && month === currentMoment.month) {
                        return subItem === currentMoment.date ? 'active' : '';
                    }
                }
                return <td key={subIndex} className={activeElem()}>{subItem}</td>
            })}
        </tr>
    })
}


function App() {

    const [table, setTable] = useState(createTable);

    const [info, setInfo] = useState(showInfo(year, month));

    const showPrevCalendar = (event) => {
        year = getPrevYear(year, month);
        month = getPrevMonth(month);
        setInfo(showInfo(year, month) )

        // drawCalendar(body, year, month, currentMoment);
        event.preventDefault();
    }

    const showNextCalendar = (event) => {
        year = getNextYear(year, month);
        month = getNextMonth(month);
        setInfo(showInfo(year, month) )

        // drawCalendar(body, year, month, currentMoment);
        event.preventDefault();
    }


  return (
    <div className='App'>
      <Info showInfo={info} />
      <Nav
          prevCalendar={(event) => showPrevCalendar(event)}
          nextCalendar={(event) => showNextCalendar(event)}
      />
      <table>
          <THead className="THead" listWeek={listWeek}/>
          <TBody
              showTable={table}
          />
      </table>
    </div>
  );
}

export default App;
