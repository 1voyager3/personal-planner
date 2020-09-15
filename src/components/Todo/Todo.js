import React from "react";
import TodoItem from  '../TodoItem/TodoItem.js'

function Todos ({addTodo, handleValueInput, todoList, editTodo, deleteTodo}) {

    const list = todoList.map((item, index) => {
        return <TodoItem
            key={index}
            item={item}
            index={index}
            editTodo={editTodo}
            deleteTodo={deleteTodo}
        />
    })

    return (
            <div>
                <input type="text" onChange={handleValueInput}/>
                <button onClick={addTodo}>add todo</button>
                <br/>
                <ul>{list}</ul>
            </div>
    )
}

export default Todos;