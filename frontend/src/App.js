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
import HomePage from "./components/HomePage";
import GroupForm from "./components/GroupForm/Index";
import { getCurrentUserGroupsThunk } from "./store/Groups";
import { getCurrentUserEventsThunk } from "./store/Events";
import UserGroupsCards from "./components/UserGroups/Index";
import UserEventsCards from "./components/UserEvents/Index";

function App() {

  const [isLoaded, setIsLoaded] = useState(false)

  const dispatch = useDispatch()

  //restore a logged in user on refresh
  useEffect(() => {
    dispatch(restoreUserSession()).then(() => setIsLoaded(true))
  }, [dispatch])

  return isLoaded && (
    <>
      <h1>Street-Up</h1>

      <Navigation isLoaded={isLoaded} />
      <Switch>
        <Route exact path="/">
            <HomePage />
        </Route>
        <Route exact path="/session/groups">
            <UserGroupsCards />
        </Route>
        <Route exact path="/session/events">
            <UserEventsCards />
        </Route>
        <Route exact path="/groups">
            <GroupsCard />
        </Route>
        <Route exact path="/events">
            <EventsCard />
        </Route>
        <Route path="/groups/:groupId">
            <GroupDetails />
        </Route>
        <Route path="/forms/groupForm">
            <GroupForm />
        </Route>
      </Switch>
    </>
  );
}

export default App;
