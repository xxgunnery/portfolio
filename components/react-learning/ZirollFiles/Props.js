import Image from "next/image"

//props allow us to pass information to make our React components more dynamic
export default function Props(props) {
    const firstName = "Joe"
    const lastName = "Schmoe"

    //console.log(props)

    let date = new Date()
    date = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

    //All code inside curly braces is considered JavaScript.
    //There is JS syntax for concise conditional rendering!
    return (
        <div className={props.class}>
            <h1>Hello {`${firstName} ${lastName}`}</h1>
            <h1>Hello {firstName} {lastName}</h1>
            <h1>It is currently about {date}!</h1>
            {props.name && <h1>{props.name}</h1>}
            <h1 style={{display: props.setup ? "block" : "none"}}>{props.name}</h1>
            <Image className="imgShrink" src={props.img} alt={props.alt}/>
        </div>
    )
}