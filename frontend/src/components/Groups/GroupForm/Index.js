import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useHistory, useParams, Link } from "react-router-dom"
import { createAGroupThunk, editAGroupThunk } from "../../../store/Groups"
import "./GroupForm.css"



const GroupForm = ({ group }) => {

    const user = useSelector(state => state.session.user)

    const history = useHistory();
    const dispatch = useDispatch();
    const { groupId } = useParams();

    const [isLoaded, setIsLoaded] = useState(false)
    const [name, setName] = useState("")
    const [about, setAbout] = useState("")
    const [type, setType] = useState("In Person")
    const [privacy, setPrivacy] = useState(true)
    const [state, setState] = useState("")
    const [city, setCity] = useState("")
    const [cities, setCities] = useState([])

    const [error, setError] = useState([])

    const allStates = {
        "AL": "Alabama", "AK": "Alaska", "AZ": "Arizona",
        "AR": "Arkansas", "CA": "California", "CO": "Colorado",
        "CT": "Connecticut", "DE": "Delaware", "FL": "Florida",
        "GA": "Georgia", "HI": "Hawaii", "ID": "Idaho",
        "IL": "Illinois", "IN": "Indiana", "IA": "Iowa",
        "KS": "Kansas", "KY": "Kentucky", "LA": "Louisiana",
        "ME": "Maine", "MD": "Maryland", "MA": "Massachusetts",
        "MI": "Michigan", "MN": "Minnesota", "MS": "Mississippi",
        "MO": "Missouri", "MT": "Montana", "NE": "Nebraska",
        "NV": "Nevada", "NH": "New Hampshire", "NJ": "New Jersey",
        "NM": "New Mexico", "NY": "New York", "NC": "North Carolina",
        "ND": "North Dakota", "OH": "Ohio", "OK": "Oklahoma",
        "OR": "Oregon", "PA": "Pennsylvania", "RI": "Rhode Island",
        "SC": "South Carolina", "SD": "South Dakota", "TN": "Tennessee",
        "TX": "Texas", "UT": "Utah", "VT": "Vermont", "VA": "Virginia",
        "WA": "Washington", "WV": "West Virginia", "WI": "Wisconsin", "WY": "Wyoming"
    }

    const statesAbbr = Object.keys(allStates)

    useEffect(() => {
        if (groupId && group.id && Number(groupId) === group.id) {
            setName(group.name)
            setAbout(group.about)
            setType(group.type)
            setPrivacy(group.private)
            setState(group.state)
            foundCities(allStates[group.state])
            setCity(group.city)
        }
        setIsLoaded(true)
    }, [])

    useEffect(() => {
        setCity("")
    }, [state])

    const foundCities = async (state) => {
        const stateObj = {
            "country": "United States",
            "state": state
        }

        const cities = await fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(stateObj)
        })

        const allCities = await cities.json()
        setCities(allCities.data)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newGroup = {
            name,
            about,
            type,
            private: privacy,
            city,
            state
        }

        if (!group) {
            const response = await dispatch(createAGroupThunk(newGroup))
            if (!response.message) {
                history.push(`/groups/${response.id}`)
            } else {
                window.alert("There are errors in your form submission. Please correct issues outlined at the top of the page and resubmit")
                setError(response)
            }
        } else {
            const response = await dispatch(editAGroupThunk(newGroup, groupId))
            if (!response.message) {
                return <Redirect to={`/groups/${groupId}`} />
                // history.push(`/groups/${response.id}`)
            } else {
                window.alert("There are errors in your form submission. Please correct issues outlined at the top of the page and resubmit")
                setError(response)
            }
        }
    }

    if (isLoaded && !user) {
        return (
            <div>
                <h2>{`Whoops, looks like you aren't logged in!`}</h2>
                <div>{`Please log in, and then you can get started on making your group!`}</div>
            </div>
        )
    } else if (isLoaded && group && Object.values(group).length === 0) {
        return (
            <div>
                <h2>{`Sorry, the page you’re looking for doesn’t exist.`}</h2>
                <div>{`The link you followed might be broken, or the page may have been deleted.`}</div>
                <Link to="/">Go Home</Link>
            </div>
        )
    }

    return isLoaded && (
        <div className="create-a-group-form-main-body-container">
            <div className="create-a-group-form-container">

                <h1 className="create-a-group-form-title">Let's get your new group started, shall we?</h1>
                <div className="create-a-group-form-errors">
                    {!!error.errors && (error.errors.length > 0 && (
                        <div className="group-form-submit-errors">
                            <h4>Submission errors:</h4>
                            <ul
                                className="create-a-group-form" >
                                {error.errors.map((err, i) => {
                                    return (
                                        <li
                                            className="create-a-group-form" key={i}>
                                            {/* {Object.keys(err)}:*/}
                                            {Object.values(err)}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    ))}
                </div>
                <form
                    className="create-a-group-form"
                    onSubmit={handleSubmit}
                    style={{ display: "flex", flexDirection: "column", maxWidth: "500px" }}
                >
                    <div className="create-a-group-form-text">
                        <h2>First, set your group’s location.</h2>
                        <div>Street-Up groups meet locally, in person and online. We'll connect you with people in your area, and more can join you online.</div>
                    </div>
                    <label
                        className="create-a-group-form" >
                        State:
                        <select
                            className="create-a-group-form"
                            onChange={(e) => {
                                if (e.target.value.length > 0) {
                                    foundCities(allStates[e.target.value])
                                }
                                setState(e.target.value)
                            }}
                            value={state}
                        >
                            <option
                                className="create-a-group-form" value={""} disabled={true}>Please select a state</option>
                            {statesAbbr.map((state, i) => {
                                return (
                                    <option key={i} value={state}>
                                        {state}
                                    </option>
                                )
                            })}
                        </select>
                    </label>
                    <label
                        className="create-a-group-form" >
                        City:
                        <select
                            className="create-a-group-form"
                            onChange={(e) => setCity(e.target.value)}
                            value={city}
                            disabled={state.length === 0}
                        >
                            <option
                                className="create-a-group-form" value={""} disabled={state.length > 0}>Please select a city</option>
                            {cities.map((city, i) => {
                                return (
                                    <option key={i}>
                                        {city}
                                    </option>
                                )
                            })}
                        </select>
                    </label>
                    <div className="create-a-group-form-text">
                        <h2>What will your group’s name be?</h2>
                        <div>Choose a name that will give people a clear idea of what the group is about. Feel free to get creative! You can edit this later if you change your mind.</div>
                    </div>
                    <label
                        className="create-a-group-form" >
                        Name:
                        <input
                            className="create-a-group-form"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        >
                        </input>
                    </label>
                    <div className="create-a-group-form-text">
                        <h2>Now describe what your new group will be about</h2>
                        <div>
                            People will see this when we promote your group, but you’ll be able to add to it later, too.
                            <ol>
                                <li>What's the purpose of the group?</li>
                                <li>Who should join?</li>
                                <li>What will you do at your events?</li>
                            </ol>
                        </div>
                    </div>
                    <label
                        className="create-a-group-form" >
                        About:
                        <textarea
                            className="create-a-group-form"
                            onChange={(e) => setAbout(e.target.value)}
                            value={about}
                            placeholder="Please write at least 50 characters..."
                        >
                        </textarea>
                        <div style={{visibility: `${50-about.length > 0? "visible" : "hidden"}`, fontWeight: "normal"}}> {50-about.length} characters remaining</div>
                    </label>
                    <div className="create-a-group-form-text">
                        <h2>Lastly, let others know what type of group this will be... </h2>
                        <div>Whether it's in person or online, public or private, you can set your group to suit your needs.</div>
                    </div>
                    <label
                        className="create-a-group-form" >
                        Type:
                        <select
                            className="create-a-group-form"
                            type="select"
                            onChange={(e) => setType(e.target.value)}
                            value={type}
                            placeholder="test"
                        >
                            <option
                                className="create-a-group-form" >In Person</option>
                            <option
                                className="create-a-group-form" >Online</option>
                        </select>
                    </label>
                    <label
                        className="create-a-group-form" >
                        Is this group private?:
                        <select
                            className="create-a-group-form"
                            type="select"
                            onChange={(e) => setPrivacy(e.target.value)}
                            value={privacy}
                        >
                            <option
                                className="create-a-group-form" value={true}>Yes</option>
                            <option
                                className="create-a-group-form" value={false}>No</option>
                        </select>
                    </label>
                    <button
                        className="create-a-group-form" >Submit {group ? "edit" : "new group"}</button>
                </form>
            </div>
        </div>
    )
}

export default GroupForm;
