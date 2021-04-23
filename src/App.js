import React, { useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { Container } from "reactstrap";

import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Profile from "./views/Profile";
import ExternalApi from "./views/ExternalApi";
import { useAuth0 } from "@auth0/auth0-react";
import {getConfig} from './config';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchHackathons } from './actions/index';

// styles
import "./App.css";
import "./dashboard.css";

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
import Dashboard from "./components/Dashboard";
import CreateHackathonForm from "./components/forms/CreateHackathonForm";
import HackathonDetail from "./components/HackathonDetail";

initFontAwesome();

const App = (props) => {
  const { isLoading, error, user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch()

    useEffect(() => {
     dispatch(fetchHackathons());
    }, [])

    useEffect(() => {
      putUser()
    }, [user])

    const putUser = async () => {
      try {
        const token = await getAccessTokenSilently();
        const id = user.sub;
        const url = process.env.REACT_APP_SERVER_URL
        const res = await axios.put(`${url}/api/users/${id}`, {
          username: user.nickname,
          email: user.email
        },{
          headers: {
            Authorization: `Bearer ${token}`
          }
        } )
        console.log(res)
    } catch(err) {
      console.log(err)
    }
    }

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  const exclusionArray = [
    '/dashboard',
  ]
  

  return (
    <div id="app" className="d-flex flex-column h-100">
      <NavBar />
      <Container className="flex-grow-1 mt-5">
        <Switch>
          <Route exact path='/dashboard' component={(props) => <Dashboard  {...props} />}/>
          <Route exact path="/dashboard/view/:id" component={(props) => <HackathonDetail {...props} />}/>
          <Route exact path="/"  component={Home} />
          <Route exact path="/profile"   component={Profile} />
          <Route exact path="/external-api" component={ExternalApi} />
          <Route exact path='/new' render={(props) => (<CreateHackathonForm {...props}  />)} />
        </Switch>
      </Container>
      {exclusionArray.indexOf(props.location.pathname) < 0 && <Footer/>}
    </div>
  );
};

export default withRouter(App);
