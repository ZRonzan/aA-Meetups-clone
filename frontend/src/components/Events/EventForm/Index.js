import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import * as sessionEvents from "../../../store/Events"



const EventForm = ({ setShowModalEvent }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { groupId, eventId } = useParams();

  const group = useSelector(state => state.groups.groupDetails);
  const event = useSelector(state => state.events.eventDetails);

  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState([])

  const newDate = new Date().toISOString().slice(0,23)
  console.log(newDate)

  const [name, setName] = useState("")
  const [type, setType] = useState("Online")
  const [capacity, setCapacity] = useState(1)
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState("")
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0,16))
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0,16))
  const [venueId, setVenueId] = useState()

  const [venues, setVenues] = useState([])

  useEffect(() => {

    if (eventId) {
      dispatch(sessionEvents.getEventByIdThunk(eventId))
        .then((res) => {
          const startDateString = ""
          const endDateString = ""

          console.log(res.startDate)
          setVenueId(res.venue)
          setName(res.name)
          setType(res.type)
          setCapacity(res.capacity)
          setPrice(res.price)
          setDescription(res.description)
          setStartDate(new Date(res.startDate).toISOString().slice(0,23))
          setEndDate(new Date(res.endDate).toISOString().slice(0,23))
        })
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
        endDate
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
        setError(response);
      }
    } else {
      const response = await dispatch(sessionEvents.editAEventThunk(newEvent, eventId));
      if (!response.message) {
        setShowModalEvent(false)
        history.push(`/events/${response.id}`);
      } else {
        setError(response);
      }
    }
  }


  return isLoaded && (
    <>
      <h2>Event {eventId ? "Edit" : "Create"} Form</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", maxWidth: "500px" }}
      >
        <label>
          Venue: <select
            type="number"
            onChange={(e) => setVenueId(e.target.value)}
            value={venueId}
            placeholder={"Please Select a venue"}
          >
            <option value={""}>No venue</option>
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
          Price ($USD): <input
            type="number"
            step={0.10}
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          >
          </input>
        </label>
        <label>
          Description: <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          >
          </textarea>
        </label>
        <label>
          Start date and time (UTC): <input
            type="datetime-local"
            onChange={(e) => setStartDate(e.target.value)}
            value={startDate}
            min={new Date().toString().slice(0,16)}
          >
          </input>
        </label>
        <label>
          End date and time (UTC): <input
            type="datetime-local"
            onChange={(e) => setEndDate(e.target.value)}
            value={endDate}
            min={new Date().toString().slice(0,16)}
            max={new Date().toString().slice(0,16)}
          >
          </input>
        </label>
        <button>Submit {eventId ? "edit" : "new event"}</button>
      </form>
      <div>
        {!!error.errors && (error.errors.length > 0 && (
          <>
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
          </>
        ))}
      </div>
    </>
  )
}

export default EventForm
