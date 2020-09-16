import React from "react";
import './Nav.css';

function Nav ({prevCalendar, nextCalendar}) {

    return (
        <div className="Nav">
            <button className="prev" onClick={prevCalendar}>
                ←
            </button>
            <button className="next" onClick={nextCalendar}>
                →
            </button>
        </div>
    )
}

export default Nav;