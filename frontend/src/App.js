// import LogInFormPage from "./components/LogInFormPage";
// import UserSignUpPage from "./components/UserSignUpPage";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import { restoreUserSession } from "./store/session";
import Navigation from "./components/Navigation";
import GroupsCard from "./components/GroupsCards/Index";
import GroupDetails from "./components/GroupDetails";
import EventsCard from "./components/EventsCards/Index";

function App() {

  const [isLoaded, setIsLoaded] = useState(false)

  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)

  //restore a logged in user on refresh
  useEffect(() => {
    dispatch(restoreUserSession()).then(() => setIsLoaded(true))
  }, [dispatch])

  return isLoaded && (
    <>
      <h1>Meetups Clone</h1>

      <Navigation isLoaded={isLoaded} />
      <Switch>
        <Route exact path="/groups">
            <GroupsCard />
        </Route>
        <Route exact path="/events">
            <EventsCard />
        </Route>
        <Route path="/groups/:groupId">
            <GroupDetails />
        </Route>
      </Switch>
      {/* <Switch>
        <Route path="/login">
          <LogInFormPage />
        </Route>
        <Route path="/signup">
          <UserSignUpPage />
        </Route>
      </Switch> */}
      {/* comment out or delete below later. this is testing to see the current logged in user */}
      {/* {user !== null && (<div>
        <h3>Current user:</h3>
        <div>First name: {user.firstName}</div>
        <div>Last name: {user.lastName}</div>
        <div>email: {user.email}</div>
      </div>)} */}
    </>
  );
}

export default App;
