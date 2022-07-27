import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useParams } from "react-router-dom";
import * as sessionEvents from "../../../store/Events"
import "./EventsCards.css"

export default function EventsCard() {
    const dispatch = useDispatch();

    const { groupId } = useParams()

    let events = useSelector(state => Object.values(state.events.eventsList));

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (groupId) {
            dispatch(sessionEvents.getAllEventsForGroupIdThunk(Number(groupId))).then(() => setIsLoaded(true));
        } else {
            dispatch(sessionEvents.getAllEventsThunk()).then(() => setIsLoaded(true));
        };
    }, [dispatch]);


    //TO BE IMPLEMENTED AS PART OF THE ATTENDEES FEATURE
    // const handleJoin = (e) => {
    //     e.preventDefault();
    //     //console.log(e.target.value)
    //     dispatch(sessionEvents.joinEventThunk(e.target.value))
    // }

    return (
        <div>
            <h2>EVENTS:</h2>
            <div className="events-cards container">
                {isLoaded && (
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
                            <div className="events-card-card-container">
                                <div>preview image goes here</div>
                                <div className={`events-cards cards ${groupId ? "right" : "left"}`} key={i}>
                                    <div>{startDateString()}</div>
                                    <h4><NavLink to={`/events/${event.id}`} >{event.name}</NavLink></h4>
                                    <div><i className="fa-solid fa-location-dot"></i> {event.Venue ? `${event.Venue.city},` : "No Venue"} {`${event.Venue ? event.Venue.state : ""}`}</div>
                                    <div>{event.numAttending} {event.numAttending === 1 ? "attendee" : "attendees"}</div>
                                    {/* <div><button value={event.id}>Attend (NEED TO IMPLEMENT LATER FOR ATTENDEES FEATURE)</button></div> */}
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}
