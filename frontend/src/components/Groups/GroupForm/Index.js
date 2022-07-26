import { useEffect, useState } from "react"
import { useDispatch} from "react-redux"
import { Redirect, useHistory, useParams } from "react-router-dom"
import { createAGroupThunk, editAGroupThunk } from "../../../store/Groups"



const GroupForm = ({ group }) => {
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
                setError(response)
            }
        } else {
            const response = await dispatch(editAGroupThunk(newGroup, groupId))
            if (!response.message) {
                return <Redirect to={`/groups/${groupId}`} />
                // history.push(`/groups/${response.id}`)
            } else {
                setError(response)
            }
        }
    }


    return isLoaded && (
        <>
            <h2>{group? "Edit" : "Create"} Form</h2>
            <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", maxWidth: "500px" }}
            >
                <label>
                    Name:
                    <input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    >
                    </input>
                </label>
                <label>
                    About:
                    <textarea
                        onChange={(e) => setAbout(e.target.value)}
                        value={about}
                    >
                    </textarea>
                </label>
                <label>
                    Type:
                    <select
                        type="select"
                        onChange={(e) => setType(e.target.value)}
                        value={type}
                    >
                        <option>In Person</option>
                        <option>Online</option>
                    </select>
                </label>
                <label>
                    Is this group private?:
                    <select
                        type="select"
                        onChange={(e) => setPrivacy(e.target.value)}
                        value={privacy}
                    >
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                </label>
                <label>
                    State:
                    <select
                        onChange={(e) => {
                            if (e.target.value.length > 0) {
                                foundCities(allStates[e.target.value])
                            }
                            setState(e.target.value)
                        }}
                        value={state}
                    >
                        <option value={""}>Please select a state</option>
                        {statesAbbr.map((state, i) => {
                            return (
                                <option key={i} value={state}>
                                    {state}
                                </option>
                            )
                        })}
                    </select>
                </label>
                <label>
                    City:
                    <select
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
                        disabled={state.length === 0}
                    >
                        <option value={""} disabled={state.length > 0}>Please select a city</option>
                        {cities.map((city, i) => {
                            return (
                                <option key={i}>
                                    {city}
                                </option>
                            )
                        })}
                    </select>
                </label>
                <button>Submit {group? "edit" : "new group"}</button>
            </form>
            <div>
                {!!error.errors && (error.errors.length > 0 && (
                    <>
                        <h4>{error.message}</h4>
                        <ul>
                            {error.errors.map((err, i) => {
                                return (
                                    <li key={i}>
                                        {Object.keys(err)}: {Object.values(err)}
                                    </li>
                                )
                            })}
                        </ul>
                    </>
                ))}
            </div>
        </>
    )
}

export default GroupForm;
