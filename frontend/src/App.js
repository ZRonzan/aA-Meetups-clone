import LogInFormPage from "./components/LogInFormPage";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import { useEffect } from "react";
import { restoreUserSession } from "./store/session";

function App() {

  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(restoreUserSession())
  }, [])

  return (
    <>
      <h1>Meetups Clone</h1>
      <Route exact path="/login">
        <LogInFormPage />
      </Route>
      <Route exact path="/">
        <Link to="/login"><button>Login</button></Link>
      </Route>
      {user !== null && (<div>
            <h3>Current user:</h3>
            <div>First name: {user.firstName}</div>
            <div>Last name: {user.lastName}</div>
            <div>email: {user.email}</div>
        </div>)}
    </>
  );
}

export default App;
