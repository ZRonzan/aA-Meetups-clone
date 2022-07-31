import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams, Link, NavLink } from "react-router-dom"
import * as sessionEvents from "../../../store/Events"
import * as sessionGroups from "../../../store/Groups"
import "./EventForm.css"



const EventForm = ({ setShowModalEvent }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { groupId, eventId } = useParams();

  const group = useSelector(state => state.groups.groupDetails);
  const event = useSelector(state => state.events.eventDetails);
  const user = useSelector(state => state.session.user)


  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState([])

  const [name, setName] = useState("")
  const [type, setType] = useState("Online")
  const [capacity, setCapacity] = useState(1)
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState("")
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 16))
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 16))
  const [venueId, setVenueId] = useState()

  const [venues, setVenues] = useState([])

  useEffect(() => {

    if (eventId) {
      dispatch(sessionEvents.getEventByIdThunk(eventId))
        .then((res) => {
          setVenueId(res.Venue ? res.Venue.id : "")
          setName(res.name)
          setType(res.type)
          setCapacity(res.capacity)
          setPrice(res.price)
          setDescription(res.description)
          setStartDate(new Date(res.startDate).toISOString().slice(0, 23))
          setEndDate(new Date(res.endDate).toISOString().slice(0, 23))
        })
    }

    if (groupId) {
      dispatch(sessionGroups.getGroupByIdThunk(groupId))
    }

    const getVenues = async (groupId) => {
      const response = await fetch(`/api/groups/${groupId}/venues`);

      if (response.ok) {
        const data = await response.json()
        return data.Venues;
      } else {
        return [];
      }
    }

    const id = groupId ? groupId : group.id

    getVenues(id)
      .then((data) => {
        setVenues(data)
      })
      .then(() => setIsLoaded(true))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newEvent;
    if (!venueId) {
      newEvent = {
        name,
        type,
        capacity,
        price,
        description,
        startDate,
        endDate,
        venueId: null
      };
    } else {
      newEvent = {
        name,
        type,
        capacity,
        price,
        description,
        startDate,
        endDate,
        venueId
      };
    }

    if (groupId) {
      const response = await dispatch(sessionEvents.createAEventThunk(newEvent, groupId));
      if (!response.message) {
        history.push(`/events/${response.id}`);
      } else {
        window.alert("There are errors in your form submission. Please correct issues outlined at the top of the page and resubmit")
        setError(response);
      }
    } else {
      const response = await dispatch(sessionEvents.editAEventThunk(newEvent, eventId));
      if (!response.message) {
        setShowModalEvent(false)
        history.push(`/events/${response.id}`);
      } else {
        window.alert("There are errors in your form submission. Please correct issues outlined at the top of the page and resubmit")
        setError(response);
      }
    }
  }

  if (isLoaded && !user) {
    return (
      <div>
        <h2>{`Sorry, you must be logged in to access this page.`}</h2>
        <div>{`Please log in and re-access this page through the correct channels.`}</div>
        <Link to="/">Go Home</Link>
      </div>
    )
  } else if (isLoaded && (Object.values(group).length === 0 || user.id !== group.organizerId)) {
    return (
      <div>
        <h2>{`Sorry, the page you’re looking for doesn’t exist.`}</h2>
        <div>{`The link you followed might be broken, or the page may have been deleted.`}</div>
        <Link to="/">Go Home</Link>
      </div>
    )
  }


  return isLoaded && (
    <>
      <div className="create-an-event-form-main-body-container">
        <div className="create-an-event-form-container">
          <h1 className="create-an-event-form-title">{eventId ? "Edit your event" : "Create your event"}</h1>
          <div className="create-an-event-form-errors">
            {!!error.errors && (error.errors.length > 0 && (
              <div className="group-form-submit-errors">
                <h4>{error.message}</h4>
                <ul>
                  {error.errors.map((err, i) => {
                    return (
                      <li key={i}>
                        {Object.values(err)}
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>

          <form className="create-an-event-form"
            onSubmit={handleSubmit}
          >
            <label className="create-an-event-form">
              Venue: <select className="create-an-event-form"
                type="number"
                onChange={(e) => setVenueId(e.target.value)}
                value={venueId}
                placeholder={"Please Select a venue"}
              >
                <option className="create-an-event-form" value={""}>No venue</option>
                {venues && venues.length > 0 && (
                  venues.map((venue, i) => {
                    return (
                      <option key={i} value={venue.id}>
                        {venue.address}, {venue.city}, {venue.state}
                      </option>
                    )
                  })
                )}
              </select>
            </label>
            <label className="create-an-event-form">
              Name: <input className="create-an-event-form"
                onChange={(e) => setName(e.target.value)}
                value={name}
              >
              </input>
            </label>
            <label className="create-an-event-form">
              type: <select className="create-an-event-form"
                onChange={(e) => setType(e.target.value)}
                value={type}
              >
                <option className="create-an-event-form">Online</option>
                <option className="create-an-event-form">In Person</option>
              </select>
            </label>
            <label className="create-an-event-form">
              Capacity: <input className="create-an-event-form"
                type="number"
                onChange={(e) => setCapacity(e.target.value)}
                value={capacity}
              >
              </input>
            </label>
            <label className="create-an-event-form">
              Price ($USD): <input className="create-an-event-form"
                type="number"
                step={0.10}
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              >
              </input>
            </label>
            <label className="create-an-event-form">
              Description: <textarea className="create-an-event-form"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              >
              </textarea>
            </label>
            <label className="create-an-event-form">
              Start date and time (UTC): <input className="create-an-event-form"
                type="datetime-local"
                onChange={(e) => setStartDate(e.target.value)}
                value={startDate}
                min={new Date().toString().slice(0, 16)}
              >
              </input>
            </label>
            <label className="create-an-event-form">
              End date and time (UTC): <input className="create-an-event-form"
                type="datetime-local"
                onChange={(e) => setEndDate(e.target.value)}
                value={endDate}
                min={new Date().toString().slice(0, 16)}
                max={new Date().toString().slice(0, 16)}
              >
              </input>
            </label>
            <button className="create-an-event-form">Submit {eventId ? "edit" : "new event"}</button>
            <NavLink className="create-a-group-form-go-home" to={`/groups/${groupId}/events`}>Actually, I've changed my mind. Take me back...</NavLink>
          </form>
        </div>
      </div>
    </>
  )
}

export default EventForm
