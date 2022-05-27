import React from "react"

export default function Die(props) {
    let cssClass = "tenzies__game__board__die"
    if(props.isHeld) {
        cssClass = "tenzies__game__board__die--selected"
    }

    return (
        <div onClick={props.holdDice} className={cssClass}>{props.value}</div>
    )
}