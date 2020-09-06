import React from "react";
import './THead.css'

function THead ({listWeek}) {
    const getTHead = listWeek.map((item,  index) => {
        return <th key={index}>{item}</th>
    })
    return (
        <thead className="THead">
            <tr>
                {getTHead}
            </tr>
        </thead>
    )
}

export default THead;