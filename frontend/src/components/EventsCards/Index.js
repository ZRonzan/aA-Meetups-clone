import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import * as sessionEvents from "../../store/Events"

export default function EventsCard({groupId}) {
    const dispatch = useDispatch();
    const events = useSelector(state => Object.values(state.events.eventsList))

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        if(groupId) {
            dispatch(sessionEvents.getAllEventsForGroupIdThunk(Number(groupId))).then(() => setIsLoaded(true))
        } else {
            dispatch(sessionEvents.getAllEventsThunk()).then(() => setIsLoaded(true))
        }

    }, [dispatch])

    const handleJoin = (e) => {
        e.preventDefault();
        //console.log(e.target.value)
        dispatch(sessionEvents.joinEventThunk(e.target.value))
    }

    return (
        <div>
            <h2>EVENTS:</h2>
            <div className="events-cards container">
            {isLoaded && (
                events.map(event => {
                    const newDate = new Date(event.startDate)
                    const date = newDate.toDateString()
                    const hours = newDate.getHours()
                    const minutes = newDate.getMinutes()
                    const timeSplit = newDate.toTimeString().split("0 ")
                    const timeZone = timeSplit[timeSplit.length - 1]
                    return (
                        <div className="events-cards cards">
                            <div>{date} {hours > 12? 24 - hours: hours}:{minutes < 10? `0${minutes}`: minutes}{hours>=12? `PM`: `AM`} {timeZone}</div>
                            <h4>{event.name}</h4>
                            <div>LOCATION</div>
                            <div>Attendees number</div>
                            {/* <div><button value={event.id}>Attend (NEED TO IMPLEMENT LATER)</button></div> */}
                        </div>
                    )
                })
            )}
            </div>
        </div>
    )
}
