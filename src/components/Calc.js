import React, { Component } from "react";
import "../styles/Calc.css";
import Display from "./Display";
import KeyPad from "./KeyPad";
import evaluateExpression from "../utils/evaluateExpression"

class Calc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curExp: "0",
            prevExp: "",
        };
        this.handleClick = this.handleClick.bind(this);
    }

    isNumber(expression) {
        return !expression || /^-?\d+\.?\d*$/.test(expression);
    }

    isString(expression) {
        return /[a-zA-Z]+/.test(expression);
    }

    handleClick(keyValue) {
        // invalid checks
        const curExp = this.state.curExp;
        if (curExp === "" && !this.isNumber(this.state.curExp)) return;

        if (
            curExp &&
            (this.isString(this.state.curExp) ||
            !this.isNumber(curExp[curExp.length - 1])) &&
            !this.isNumber(keyValue) && keyValue !=="C"
        )
            return;
        switch (keyValue) {
            // equals
            case "＝": {
                // replace spl chars
                this.setState((prevState) => {
                    let result;
                    try {
                        result = evaluateExpression(prevState.curExp);
                    } catch (err) {
                        result = "Bad Expression";
                    }
                    return {
                        curExp: result + "",
                        prevExp: prevState.curExp + "",
                    };
                });
                break;
            }
            // clear screen
            case "C": {
                this.setState({ curExp: "0", prevExp: "" });
                break;
            }
            // backspace
            case "⌫": {
                this.setState((prevState) => ({
                    curExp: prevState.curExp.slice(0, -1),
                }));
                break;
            }
            // append
            default: {
                this.setState((prevState) => {
                    // replace curExp if string
                    if (
                        this.isString(prevState.curExp) ||
                        (prevState.curExp === "0" && this.isNumber(keyValue))
                    )
                        return { curExp: keyValue };
                    // else append
                    return { curExp: prevState.curExp + keyValue };
                });
            }
        }
    }

    render() {
        return (
            <div className="calc">
                <Display
                    previous={this.state.prevExp}
                    current={this.state.curExp}
                />
                <KeyPad handleClick={this.handleClick} />
            </div>
        );
    }
}

export default Calc;
