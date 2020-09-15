import React from "react";
import './TBody.css'

function TBody ({ showTable }) {

    return (
        <tbody
            className="TBody"
        >
            {showTable}
        </tbody>
    )
}

export default TBody;
