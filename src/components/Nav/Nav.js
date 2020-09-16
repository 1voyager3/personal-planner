import React from "react";
import './Nav.css';

function Nav ({prevCalendar, nextCalendar}) {

    return (
        <div className="Nav">
            <a href="" className="prev" onClick={prevCalendar}>
                <button>←</button>
            </a>
            <a href="" className="next" onClick={nextCalendar}>
                <button>→</button>
            </a>
        </div>
    )
}

export default Nav;