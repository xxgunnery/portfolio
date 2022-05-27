import React from 'react'
import Box from "./Box.js"
import boxes from "./boxes.js"

export default function Event(props) {

    //console.log(props.numComponents)

    const arr = ["thing 1", "thing 2"]
    const obj = { first: "Paul", last:"D'Antonio" }

    const [things, setThings] = React.useState(arr)
    const [isImportant, setIsImportant] = React.useState(0)
    const [isGoingOut, setIsGoingOut] = React.useState(true)
    const [person, setPerson] = React.useState(obj)

    let thingsElements = things.map(thing => <p key={thing}>{thing}</p>)

    function Count(props) {
        return (
            <div className="event--example">
                <button onClick={add}>+</button>
                <div className="event--example--count">{props.state}</div>
                <button onClick={minus}>-</button>
            </div>
        )
    }
    function Things() {
        //console.log(props.state)
        return (
            <div className="event--example">
                <button onClick={addThing}>Add Thing</button>
                {thingsElements}
            </div>     
        )
    }
    function Out() {
        //console.log(props.state)
        return (
            <div className="event--example">
                <button onClick={changeMind}>Set It</button>
                <div>{isGoingOut ? "Yes" : "No"}</div>
            </div>
        )
    }
    function Person() {
        //console.log(props.state)
        return (
            <div className="event--example">
                <button onClick={changePerson}>Set It</button>
                <div>{person.first} {person.last}</div>
            </div>
        )
    }

    const components = [<Things key="things"/>, <Out key="out"/>, <Person key="person"/>]
    //const [renderedComponents, setRenderedComponents] = React.useState([])

    function Components(props) {
        return(
            <div>
                {components}
            </div>
        )
    }

    function addThing() {
        let newThing = `thing ${things.length + 1}`
        setThings(prevThings => [...prevThings,newThing])
        console.log(things)
    }
    function changeMind() {
        setIsGoingOut(isGoingOut => !isGoingOut)
    }
    function add() {
        setIsImportant(prevCount => prevCount + 1)
        props.setNumComponents(numComponents => numComponents + 1)
    }
    function minus() {
        setIsImportant(prevCount => prevCount - 1)
        props.setNumComponents(numComponents => numComponents - 1)
        
    }
    function changePerson() {
        let { first, last } = person
        console.log(first)
        first = "Mary"
        last = "Sue"
        //Surround the returned object with parentheses for implicit return
        setPerson(prevPerson => ({first, last}))
    }


    const [squares, setSquares] = React.useState(boxes)

    function toggleColor(id) {
        //{...prevSquare, on: !prevSquare.on} : prevSquare 
        console.log(id)
        setSquares(prevSquares => prevSquares.map( square => {
            return square.id === id ? {...square,on: !square.on} : square
        }))
    }

    const squareElements = squares.map(square => (
        <Box key={square.id} id={square.id} on={square.on} fn={() => toggleColor(square.id)}/>
    ))

    return (
        <div className={props.class}>
            <Count state={isImportant}/>
            <Components numComponentProp={props.numComponents}/>
            {squareElements}
        </div>
    )
}