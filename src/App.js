import React, {useEffect, useState} from 'react';
import './App.css';
import Info from "./components/Info/Info";
import Nav from "./components/Nav/Nav";
import THead from "./components/THead/THead";
import TBody from "./components/TBody/TBody";
import Todos from "./components/Todo/Todo";
import { listWeek,
    getLastDayOfMonth, getFirstWeekDay, getLastWeekDay, getPrevYear,
    getPrevMonth, getNextYear, getNextMonth, showInfo, getRangeMonthDays,
    getNormalize, getChunk
} from "./functions/functions"

// utility source
let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();
let currentDate = date.getDate();
let currentMoment = { year: year,  month: month, date: currentDate}


function App() {
    const [currentMonthYear, setCurrentMonthYear] = useState(showInfo(year, month));

    // creating initial calendar table
    let createCalendar = (year, month) => {

        let lastDayOfMonth = getLastDayOfMonth(year, month)
        let firstWeekDay = getFirstWeekDay(year, month);
        let lastWeekDay = getLastWeekDay(year, month);
        let rangeMonthDays = getRangeMonthDays(lastDayOfMonth)
        let normalize = getNormalize(rangeMonthDays, firstWeekDay, 6 - lastWeekDay)
        let chunk = getChunk(normalize, 7);

        return chunk.map((item, index) => {
            return <tr key={index}>
                {item.map((subItem, subIndex) => {
                    let activeElem = () => {
                        if (year === currentMoment.year && month === currentMoment.month) {
                            return subItem === currentMoment.date ? 'active' : '';
                        }
                    }
                    return <td
                        key={subIndex}
                        className={activeElem()}
                        onClick={(event) => activeTodo(event, subItem)}
                    >
                        {subItem}
                    </td>
                })}
            </tr>
        })
    }
    const [table, setTable] = useState(createCalendar(year, month));
    const showPrevCalendar = (event) => {
        year = getPrevYear(year, month);
        month = getPrevMonth(month);
        setCurrentMonthYear(showInfo(year, month) )

        const showPrevTable = createCalendar(year, month);
        setTable(showPrevTable);

        event.preventDefault();
    }
    const showNextCalendar = (event) => {
        year = getNextYear(year, month);
        month = getNextMonth(month);
        setCurrentMonthYear(showInfo(year, month) )

        const showNextTable = createCalendar(year, month);
        setTable(showNextTable);

        event.preventDefault();
    }

    // Revoking the local storage for testing
    // localStorage.clear();

    const [showTodoInput, setShowTodoInput] = useState(false);
    const [keyLocalStorage, setKeyLocalStorage] = useState('');
    const [todoList, setTodoList] = useState([]);
    const [currentTodoValue, setCurrentTodoValue] = useState(todoList);

    const activeTodo = (event, subItem) => {
        setShowTodoInput(true);
        let clickedCell = `${subItem} ${currentMonthYear}`;
        setKeyLocalStorage(clickedCell);
        let json = localStorage.getItem(clickedCell);
        let arr = JSON.parse(json);
        if (arr !== null) {
            setTodoList(arr)
        } else {
            setTodoList([])
        }
    }

    useEffect(() => {
        return localStorage.setItem(keyLocalStorage, JSON.stringify(todoList))
    })
    const handleValueInput = (event) => {
        setCurrentTodoValue(event.target.value);
    }

    const addTodo = (key, newValue) => {
        let json = localStorage.getItem(key);
        let arr = JSON.parse(json);
        arr.push(newValue);
        localStorage.setItem(key, JSON.stringify(arr));
        setTodoList(JSON.parse(localStorage.getItem(key)));
    }

    const editTodo = (event, index) => {
        const copy = Object.assign([], todoList);
        copy[index] = event.target.value;
        setTodoList(copy);
        localStorage.setItem(keyLocalStorage, JSON.stringify(copy));
    }

    console.log(localStorage)

    const deleteTodo = (index) => {
    const copy = Object.assign([], todoList);
    copy.splice(index, 1);
    setTodoList(copy);
    localStorage.setItem(keyLocalStorage, JSON.stringify(copy));
}

  return (
    <div className='App'>
      <Info showInfo={currentMonthYear} />
      <Nav
          prevCalendar={(event) => showPrevCalendar(event)}
          nextCalendar={(event) => showNextCalendar(event)}
      />
      <table>
          <THead className="THead" listWeek={listWeek}/>
          <TBody showTable={table} />
      </table>
        { showTodoInput &&
        <Todos
            todoList={todoList}
            handleValueInput={(event) => handleValueInput(event)}
            addTodo={() => addTodo(keyLocalStorage, currentTodoValue)}
            editTodo={editTodo}
            deleteTodo={deleteTodo}
        /> }
    </div>
  );
}

export default App;



















