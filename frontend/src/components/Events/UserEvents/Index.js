import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import * as sessionEvents from "../../../store/Events"

export default function UserEventsCards() {
    const dispatch = useDispatch();

    let events = useSelector(state => Object.values(state.events.userEvents));

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(sessionEvents.getCurrentUserEventsThunk()).then(() => setIsLoaded(true))
    }, [dispatch]);


    //TO BE IMPLEMENTED AS PART OF THE ATTENDEES FEATURE
    // const handleJoin = (e) => {
    //     e.preventDefault();
    //     //console.log(e.target.value)
    //     dispatch(sessionEvents.joinEventThunk(e.target.value))
    // }

    return (
        <div>
            <h2>Your events:</h2>
            <div className="events-cards container">
                {isLoaded && events.length > 0 && (
                    events.map((event, i) => {

                        const startDateString = () => {
                            const newDate = new Date(event.startDate)
                            const date = newDate.toDateString()
                            const hours = newDate.getHours()
                            const minutes = newDate.getMinutes()
                            const timeSplit = newDate.toTimeString().split("0 ")
                            const timeZone = timeSplit[timeSplit.length - 1]

                            return `${date} ${hours > 12 ? 24 - hours : hours}:${minutes < 10 ? `0${minutes}` : minutes}${hours >= 12 ? `PM` : `AM`} ${timeZone}`
                        }

                        return (
                            <div className={`events-cards cards`} key={i}>
                                <div>{startDateString()}</div>
                                <h4>{event.name}</h4>
                                <div><i className="fa-solid fa-location-dot"></i> {event.Venue.city}, {event.Venue.state}</div>
                                <div>{event.numAttending} {event.numAttending === 1 ? "attendee" : "attendees"}</div>
                                {/* <div><button value={event.id}>Attend (NEED TO IMPLEMENT LATER FOR ATTENDEES FEATURE)</button></div> */}
                            </div>
                        )
                    })
                )}
            </div>
            {events.length === 0 && (
                <div>
                    <h3>You are not currently attending any events</h3>
                </div>
            )}
        </div>
    )
}
