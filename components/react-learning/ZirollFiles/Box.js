import React from 'react'

export default function Box(props) {


    const styles = {
        backgroundColor: props.on ? "#222222" : "#EEEEEE",
    }

    return (
        <div onClick={props.fn} style={styles} className="box"></div>
    )
}