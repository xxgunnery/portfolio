import React from 'react'

export default function Forms(props) {

    const [formData,setFormData] = React.useState(
        {firstName: "", lastName: "", email: "", comments: "", isFriendly: true, radioChoice: ""}
    )
    const [formData2,setFormData2] = React.useState(
        {email: "", pass: "", passC: "", newsletter: false, class: ""}
    )

    function handleChange(event) {
        setFormData(prevFormData => {
            const {name, value, type, checked} = event.target
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }
    function handleSubmit(event) {
        event.preventDefault()
        console.log(event)
        console.log(formData)
    }
    function handleChange2(event) {
        setFormData2(prevFormData => {
            const {name, value, type, checked} = event.target

            let obj

            if(name === "passC" || name === "pass") {
                obj = {
                    ...prevFormData,
                    [name]: type === "checkbox" ? checked : value,
                    class: value === prevFormData.pass ? "correct" : "incorrect"
                }
            } else {
                obj = {
                    ...prevFormData,
                    [name]: type === "checkbox" ? checked : value
                }               
            }

            return obj
        })
    }
    function handleSubmit2(event) {
        event.preventDefault()
        if(formData2.pass !== formData2.passC) {
            alert("Passwords do not match!")
        } else {
            alert(`Successfully signed up!${formData2.newsletter === true ? " Thank you for signing up for our newsletter!" : ""}`)
        }
    }

    return (
        <div className={props.class}>
            <form onSubmit={handleSubmit}className="reactForms hidden">
                <input type="text" placeholder="First Name" onChange={handleChange} name="firstName" value={formData.firstName}/>
                <input type="text" placeholder="Last Name" onChange={handleChange} name="lastName" value={formData.lastName}/>
                <input type="text" placeholder="Email" onChange={handleChange} name="email" value={formData.email}/>
                <textarea placeholder="ENTER COMMENTS HERE" onChange={handleChange} name="comments" value={formData.comments}/>
                <div>
                    <input checked={formData.isFriendly} name="isFriendly" type="checkbox" id="isFriendly" onChange={handleChange}/>
                    <label htmlFor="isFriendly">Are you friendly?</label>
                </div>
                <fieldset>
                    <input name="radioChoice" value="unemployed" checked={formData.radioChoice === "unemployed"} type="radio" id="unemployed" onChange={handleChange}/>
                    <label htmlFor="unemployed">Unemployed</label>
                    <input name="radioChoice" value="parttime" checked={formData.radioChoice === "parttime"} type="radio" id="parttime" onChange={handleChange}/>
                    <label htmlFor="parttime">Part Time</label>
                    <input name="radioChoice" value="fulltime" checked={formData.radioChoice === "fulltime"} type="radio" id="fulltime" onChange={handleChange}/>
                    <label htmlFor="fulltime">Full Time</label>
                </fieldset>
                <div>{formData.radioChoice}</div>
                <button>Submit</button>
            </form>
            <form onSubmit={handleSubmit2}className="reactForms2">
                <input type="text" placeholder="Email" onChange={handleChange2} name="email" value={formData2.email}/>
                <input type="password" placeholder="Password" onChange={handleChange2} name="pass" value={formData2.pass}/>
                <input className={formData2.passC ? formData2.class : ""} type="password" placeholder="Confirm password" onChange={handleChange2} name="passC" value={formData2.passC}/>
                <div>
                    <input checked={formData2.newsletter} name="newsletter" type="checkbox" id="newsletter" onChange={handleChange2}/>
                    <label htmlFor="newsletter">I want to join the news letter</label>
                </div>
                <button>Sign Up</button>
            </form>
        </div>
    )

}