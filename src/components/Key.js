import React from "react";
import "../styles/Key.css";

function Key(props) {
    const specificStyles = {};
    if (props.operator)
        specificStyles["background"] = "rgba(255, 255, 255, 0.125)";
    if (props.value === "＝") specificStyles["background"] = "#85ADBF";
    if (+props.value === 0) specificStyles["gridColumn"] = "2";
    
    return (
        <div
            className="key"
            style={specificStyles}
            onClick={() => props.handleClick(props.value)}
        >
            {props.value}
        </div>
    );
}

export default Key;
