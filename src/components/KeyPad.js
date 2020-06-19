import React from "react";
import "../styles/KeyPad.css"
import Key from "./Key";
import keysJSON from "../utils/keysJSON";

function KeyPad(props) {
    return (
        <div className="key-pad">
            {keysJSON.map((key) => {
                return (
                    <Key
                        key={key.value}
                        value={key.value}
                        operator={key.operator}
                        handleClick={props.handleClick}
                    />
                );
            })}
        </div>
    );
}

export default KeyPad;
