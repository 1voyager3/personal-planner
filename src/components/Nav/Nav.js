import React from "react";
import './Nav.css';

function Nav ({prevCalendar, nextCalendar}) {

    return (
        <div className="Nav">
            <a href="" className="prev" onClick={prevCalendar}>←</a>
            <a href="" className="next" onClick={nextCalendar}>→</a>
        </div>
    )
}

export default Nav;