import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, Switch, useHistory, useParams } from "react-router-dom"
import { createAGroupThunk, editAGroupThunk } from "../../../store/Groups"
import "./EditGroupFormModal.css"

function GroupEditForm({ group, setShowModal }) {
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
        setShowModal(false)
        history.push(`/groups/${response.id}`)
      } else {
        setError(response)
      }
    }
  }


  return isLoaded && (
    // <>
    //   <h2>{group ? "Edit" : "Create"} Form</h2>
    //   <form
    //     onSubmit={handleSubmit}
    //     style={{ display: "flex", flexDirection: "column", maxWidth: "500px" }}
    //   >
    //     <label>
    //       Name:
    //       <input
    //         onChange={(e) => setName(e.target.value)}
    //         value={name}
    //       >
    //       </input>
    //     </label>
    //     <label>
    //       About:
    //       <textarea
    //         onChange={(e) => setAbout(e.target.value)}
    //         value={about}
    //       >
    //       </textarea>
    //     </label>
    //     <label>
    //       Type:
    //       <select
    //         type="select"
    //         onChange={(e) => setType(e.target.value)}
    //         value={type}
    //       >
    //         <option>In Person</option>
    //         <option>Online</option>
    //       </select>
    //     </label>
    //     <label>
    //       Is this group private?:
    //       <select
    //         type="select"
    //         onChange={(e) => setPrivacy(e.target.value)}
    //         value={privacy}
    //       >
    //         <option value={true}>Yes</option>
    //         <option value={false}>No</option>
    //       </select>
    //     </label>
    //     <label>
    //       State:
    //       <select
    //         onChange={(e) => {
    //           if (e.target.value.length > 0) {
    //             foundCities(allStates[e.target.value])
    //           }
    //           setState(e.target.value)
    //         }}
    //         value={state}
    //       >
    //         <option value={""}>Please select a state</option>
    //         {statesAbbr.map((state, i) => {
    //           return (
    //             <option key={i} value={state}>
    //               {state}
    //             </option>
    //           )
    //         })}
    //       </select>
    //     </label>
    //     <label>
    //       City:
    //       <select
    //         onChange={(e) => setCity(e.target.value)}
    //         value={city}
    //         disabled={state.length === 0}
    //       >
    //         <option value={""} disabled={state.length > 0}>Please select a city</option>
    //         {cities.map((city, i) => {
    //           return (
    //             <option key={i}>
    //               {city}
    //             </option>
    //           )
    //         })}
    //       </select>
    //     </label>
    //     <button>Submit {group ? "edit" : "new group"}</button>
    //   </form>
    //   <div>
    //     {!!error.errors && (error.errors.length > 0 && (
    //       <>
    //         <h4>{error.message}</h4>
    //         <ul>
    //           {error.errors.map((err, i) => {
    //             return (
    //               <li key={i}>
    //                 {Object.keys(err)}: {Object.values(err)}
    //               </li>
    //             )
    //           })}
    //         </ul>
    //       </>
    //     ))}
    //   </div>
    // </>
    <>
      <div className="group-event-delete-form-cross modal-event"><i className="fa-solid fa-xmark" onClick={() => setShowModal(false)}></i></div>

      <div className="edit-a-group-form-main-body-container">
        <div className="edit-a-group-form-container">

          <h1 className="edit-a-group-form-title">Edit your group</h1>
          {!!error.errors && (error.errors.length > 0 && (
            <div className="edit-a-group-form-errors">
              <div className="edit-roup-form-submit-errors">
                <h4>Submission errors:</h4>
                <ul
                  className="edit-a-group-form" >
                  {error.errors.map((err, i) => {
                    return (
                      <li
                        className="edit-a-group-form" key={i}>
                        {/* {Object.keys(err)}: */}
                        {Object.values(err)}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          ))}
          <form
            className="edit-a-group-form"
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", maxWidth: "500px" }}
          >
            <label
              className="edit-a-group-form" >
              State:
              <select
                className="edit-a-group-form"
                onChange={(e) => {
                  if (e.target.value.length > 0) {
                    foundCities(allStates[e.target.value])
                  }
                  setState(e.target.value)
                }}
                value={state}
              >
                <option
                  className="edit-a-group-form" value={""} disabled={true}>Please select a state</option>
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
              className="edit-a-group-form" >
              City:
              <select
                className="edit-a-group-form"
                onChange={(e) => setCity(e.target.value)}
                value={city}
                disabled={state.length === 0}
              >
                <option
                  className="edit-a-group-form" value={""} disabled={state.length > 0}>Please select a city</option>
                {cities.map((city, i) => {
                  return (
                    <option key={i}>
                      {city}
                    </option>
                  )
                })}
              </select>
            </label>
            <label
              className="edit-a-group-form" >
              Name:
              <input
                className="edit-a-group-form"
                onChange={(e) => setName(e.target.value)}
                value={name}
              >
              </input>
            </label>
            <label
              className="edit-a-group-form" >
              About:
              <textarea
                className="edit-a-group-form"
                onChange={(e) => setAbout(e.target.value)}
                value={about}
                placeholder="Please write at least 50 characters..."
              >
              </textarea>
              <div style={{ visibility: `${50 - about.length > 0 ? "visible" : "hidden"}`, fontWeight: "normal" }}> {50 - about.length} characters remaining</div>
            </label>
            <label
              className="edit-a-group-form" >
              Type:
              <select
                className="edit-a-group-form"
                type="select"
                onChange={(e) => setType(e.target.value)}
                value={type}
                placeholder="test"
              >
                <option
                  className="edit-a-group-form" >In Person</option>
                <option
                  className="edit-a-group-form" >Online</option>
              </select>
            </label>
            <label
              className="edit-a-group-form" >
              Is this group private?:
              <select
                className="edit-a-group-form"
                type="select"
                onChange={(e) => setPrivacy(e.target.value)}
                value={privacy}
              >
                <option
                  className="edit-a-group-form" value={true}>Yes</option>
                <option
                  className="edit-a-group-form" value={false}>No</option>
              </select>
            </label>
            <button
              className="edit-a-group-form" >Submit group edit</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default GroupEditForm;
