import React, {useState} from "react";

function TodoItem ({item, index, editTodo, deleteTodo}) {
    const [isEdit, setIsEdit] = useState(false);

    return <li key={index}>
        {!isEdit ?
            <>
                <span>{item}</span>
                <button onClick={() => setIsEdit(true)}>edit</button>
            </>
            :
            <>
                <input
                    value={item}
                    onChange={(event) => editTodo(event, index)}
                    onBlur={() => setIsEdit(false)}/>
            </>
        }
        <button onClick={() => deleteTodo(index)}>delete</button>
    </li>

}

export default TodoItem;