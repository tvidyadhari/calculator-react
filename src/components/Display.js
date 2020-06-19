import React from "react";
import "../styles/Display.css";
function Display(props) {
    return (
        <div className="display">
            <div className="previous">{props.previous}</div>
            <div 
                className="current"
            >{props.current}</div>
        </div>
    );
}

export default Display;
