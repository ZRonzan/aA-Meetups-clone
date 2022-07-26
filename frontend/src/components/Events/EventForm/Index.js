import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useHistory, useParams } from "react-router-dom"
import { createAGroupThunk, editAGroupThunk } from "../../../store/Groups"
import * as sessionEvents from "../../../store/Events"



const EventForm = ({ event }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { groupId, eventId } = useParams();

    const group = useSelector(state => state.groups.groupDetails);

    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState([])

    const [name, setName] = useState("")
    const [type, setType] = useState("Online")
    const [capacity, setCapacity] = useState(1)
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState("")
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [venueId, setVenueId] = useState(0)

    useEffect(() => {

        setIsLoaded(true)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newEvent = {
            name,
            type,
            capacity,
            price,
            description,
            startDate,
            endDate,
            venueId
        };

        if (!event) {
            const response = await dispatch(sessionEvents.createAEventThunk(newEvent));
            if (!response.message) {
                history.push(`/events/${response.id}`);
            } else {
                setError(response);
            }
        } else {
            const response = await dispatch(sessionEvents.editAEventThunk(newEvent));
            if (!response.message) {
                history.push(`/events/${response.id}`);
            } else {
                setError(response);
            }
        }
    }


    return isLoaded && (
        <>
            <h2>Event {event ? "Edit" : "Create"} Form</h2>
            <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", maxWidth: "500px" }}
            >
                <label>
                    Venue: <input
                        type="number"
                        onChange={(e) => setVenueId(e.target.value)}
                        value={venueId}
                    >
                    </input>
                </label>
                <label>
                    Name: <input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    >
                    </input>
                </label>
                <label>
                    type: <select
                        onChange={(e) => setType(e.target.value)}
                        value={type}
                    >
                        <option>Online</option>
                        <option>In Person</option>
                    </select>
                </label>
                <label>
                    Capacity: <input
                        type="number"
                        onChange={(e) => setCapacity(e.target.value)}
                        value={capacity}
                    >
                    </input>
                </label>
                <label>
                    Price: <input
                        type="number"
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                    >
                    </input>
                </label>
                <label>
                    Description: <textarea
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    >
                    </textarea>
                </label>
                <label>
                    Start date: <input
                        type="datetime-local"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    >
                    </input>
                </label>
                <label>
                    End date: <input
                        type="datetime-local"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    >
                    </input>
                </label>
                <button>Submit {event ? "edit" : "new event"}</button>
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

export default EventForm;
