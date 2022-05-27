export default function ArrayTrick(props) {
    let colors = ["Red","Orange","Yellow","Green","Blue","Indigo","Violet"]
    colors = colors.map(color => <p key={color}>{color}</p>)
    return (
        <div className={props.class}>
            {colors}
        </div>
    )
}