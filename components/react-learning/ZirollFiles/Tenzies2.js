import React from 'react'
import boxes from './boxes'
import Die from './capstone/Die'

export default function Tenzies() {
    const initialBoxes = [1,1,1,1,1,1,1,1].map((num) => Math.ceil(num * Math.random() * 6))

    const [boxes, setBoxes] = React.useState( initialBoxes.map(
        (box,ind) => <Die className="tenzies__game__board__box" onClick={holdBox} key={`${ind}-${box}`} box={box} ind={ind}/>
    ))

    const [button, setButton] = React.useState(<button onClick={rollTenzies} className="tenzies__game__roll">ROLL</button>)
    
    function holdBox(e) {
        setBoxes(boxes => {
            let boxValues = []
            let uniqueBoxValues = []
            return (
                boxes.map((box,ind) => {
                    boxValues.push(box.props.box)
                    if(ind === (boxes.length-1)) {
                        uniqueBoxValues = [...new Set(boxValues)]
                        if(uniqueBoxValues.length === 1) {
                            setButton(<button onClick={resetTenzies} className="tenzies__game__roll">RESET GAME</button>)
                        }
                    }
                    const boxID = `box${box.props.ind}`
                    if(boxID === e.target.id) {
                        if(box.props.className === "tenzies__game__board__box--selected") {
                            return({...box, props: {...box.props, className: "tenzies__game__board__box"}})
                        } else {
                            return({...box, props: {...box.props, className: "tenzies__game__board__box--selected"}})
                        }
                    } else {
                        return box
                    } 
                })
            )
        })
    }

    function rollTenzies() {

        function delayRolls(i) {
                setTimeout(() => {
                    setBoxes(boxes => {
                        return (
                            boxes.map(box => {
                                console.log(box)
                                if(box.props.className !== "tenzies__game__board__box--selected") {
                                    return(
                                        {...box, props: {...box.props, box: Math.ceil(Math.random() * 6)}}
                                    )
                                } else {
                                    return box
                                }               
                            })
                        )
                    })
            }, 10*i)
        }

        for(let i = 0; i < 5; i++) {
            delayRolls(i)
        }
    }

    function resetTenzies() {
        const initialBoxes = [1,1,1,1,1,1,1,1].map((num) => Math.ceil(num * Math.random() * 6))
        setBoxes(initialBoxes.map(
            (box,ind) => <Die className="tenzies__game__board__box" onClick={holdBox} key={`${ind}-${box}`} box={box} ind={ind}/>
            )
        )
        setButton(<button onClick={rollTenzies} className="tenzies__game__roll">ROLL</button>)
    }

    return(
        <main className="tenzies">
            <div className="tenzies__game--container">
                <div className="tenzies__game">
                    <h1 className="tenzies__game__header">Tenzies</h1>
                    <p className="tenzies__game__subheader">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
                    <div className="tenzies__game__board">
                        {boxes}
                    </div>
                    {button}
                </div>
            </div>
        </main>
    )
}