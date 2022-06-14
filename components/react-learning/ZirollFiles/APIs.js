import React from 'react'

function Width() {

    const [width, setWidth] = React.useState(1920)

    React.useEffect(() => {
        function watchWidth() {
            console.log("Setting up")
            setWidth(window.innerWidth)
        }

        window.addEventListener("resize", watchWidth)

        return () => {
            //console.log("Cleaning Up")
            window.removeEventListener("resize", watchWidth)
        }
    }, [] )

    return (
        <div>{width}</div>
    )
}

export default function APIs(props) {

    const [starWarsData,setStarWarsData] = React.useState({})
    const [count, setCount] = React.useState(1)
    const [show, setShow] = React.useState(true)

    // 1. GET the data (fetch)
    // 2. Save the data to state

    // fetch("https://swapi.dev/api/people/1")
    //     .then(res => res.json())
    //     .then(data => console.log(data))


    function toggle() {
        setShow(prevShow => !prevShow)

    }
    //side effects
    React.useEffect(() => {
        //console.log("Effect ran")
        fetch(`https://swapi.dev/api/people/${count}`)
            .then(res => res.json())
            .then(data => setStarWarsData(data))
    }, [count])


    return (
        <div className={props.class}>
            <h3>{count}</h3>
            <button onClick={() => setCount(prevCount => prevCount + 1)}>SET COUNT +1</button>
            <pre style={{width: "100%", overflow:"auto"}}>{JSON.stringify(starWarsData,null,2)}</pre>
            <button onClick={toggle}>TOGGLE WIDTH</button>
            {show && <Width />}
        </div>
    )

}