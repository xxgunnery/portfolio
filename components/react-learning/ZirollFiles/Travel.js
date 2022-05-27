export default function Travel(props) {
    return (
        <div className={`${props.class} travel--container`}>
            <img className="travel--mainimg" src={props.location.image} alt="travel"/>
            <div className="travel--information">
                <div className="travel--topdata">
                    <img src="https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_location_on_48px-512.png" alt="location"/>
                    <div>{props.location.location.toUpperCase()}</div>
                    <a href={props.location.link}>View in map</a>
                </div>
                <div className="travel--information--title">{props.location.title}</div>
                <div className="travel--information--date">{props.location.startDate} - {props.location.endDate}</div>
                <div className="travel--information--description">{props.location.description}</div>
            </div>
        </div>
    )
}