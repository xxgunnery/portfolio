import React from 'react'
import boxes from './boxes'
import Die from './capstone/Die'
import Confetti from 'react-confetti'

export default function Tenzies(props) {

    const [dice, setDice] = React.useState(getRandomDice)
    const [win, setWin] = React.useState(false)

    function getRandomDice() {
        let allDice = []
        const numDice = 10;
        for(let i = 0; i < numDice; i++) {
            let value = Math.ceil(Math.random()*10)
            allDice.push(
                {
                    value: value,
                    id: `${i+1}-${value}`,
                    isHeld: false
                }
            )
        }
        return (allDice)
    }

    React.useEffect(() => {

        setDice(getRandomDice)
    }, [])

    function holdDice(id) {
        setDice(dice => dice.map(
            die => {
                return die.id === id ? {...die, isHeld: !die.isHeld} : die
            } 
        ))
    }

    function rollNewDice() {
        if(!win) {
            setDice(dice => dice.map(
                (die,ind) => {
                    let value = Math.ceil(Math.random()*10)
                    return !die.isHeld ? {...die, value: value, id: `${ind+1}-${value}`} : die
                }
            ))
        } else {
            setDice(getRandomDice)
            setWin(false)
        }
    }

    React.useEffect(() => {
        const allEqual = dice.every(die => die.value === dice[0].value)
        const allHeld = dice.every(die => die.isHeld)

        if(allEqual && allHeld) {
            setWin(true)
        }
    }, [dice])

    let diceComponents = dice.map((die) => <Die holdDice={() => holdDice(die.id)} key={die.id} value={die.value} isHeld={die.isHeld}/>)

    function getConfetti() {
        const confettiWidth = document.getElementsByClassName("tenzies__game--container")[0].clientWidth
        const confettiHeight = document.getElementsByClassName("tenzies__game--container")[0].clientHeight
        return (
            <div>
                <Confetti id="HELLO" width={confettiWidth} height={confettiHeight}/>
            </div>
        )
    }

    return(
        <main className={`tenzies ${props.class}`}>
            <div className="tenzies__game--container">
                {win && getConfetti()}
                <div className="tenzies__game">
                    {win && <div className="tenzies__game__congratulations">CONGRATULATIONS!</div>}
                    <h1 className="tenzies__game__header">Tenzies</h1>
                    <p className="tenzies__game__subheader">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
                    <div className="tenzies__game__board">
                        {
                            diceComponents
                        }
                    </div>
                     <div onClick={rollNewDice} className="tenzies__game__roll">{win ? "RESET GAME" : "ROLL"} </div>
                </div>
            </div>
        </main>
    )
}