import React, { useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";

import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Profile from "./views/Profile";
import ExternalApi from "./views/ExternalApi";
import { useAuth0 } from "@auth0/auth0-react";
import history from "./utils/history";
import {getConfig} from './config';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHackathons } from './actions/index';

// styles
import "./App.css";
import "./dashboard.css";

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
import HackathonList from "./components/HackathonList";
import Dashboard from "./components/Dashboard";
import CreateHackathonForm from "./components/forms/CreateHackathonForm";

initFontAwesome();

const App = () => {
  const { isLoading, error, user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { apiOrigin = "http://localhost:3001", audience } = getConfig();
  const hackathons = useSelector(state => state.hackathons);
  const dispatch = useDispatch()

    const fetch = () => {
      dispatch(fetchHackathons())
    } 

      useEffect(() => {
        fetch()
      }, [])


  const putUser = async () => {
      try {
        const token = await getAccessTokenSilently();
        const id = user.sub.replace("auth0|", "")
        await axios.put(`${apiOrigin}/api/users/${id}`, {
          email: user.email,
          first_name: user.nickname
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
      } catch (err) {
        console.log(err)
      }
      ;
    }
  useEffect(() => {
    if (isAuthenticated && user) {
     putUser()
    }
  },[user, isAuthenticated])

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  

  return (
    <Router history={history}>
      <div id="app" className="d-flex flex-column h-100">
        <NavBar />
        <Container className="flex-grow-1 mt-5">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/profile" component={Profile} />
            <Route path="/external-api" component={ExternalApi} />
            <Route path="/hackathons/" component={HackathonList} />
            <Route exact path='/dashboard'component={() => <Dashboard hackathons={hackathons} />}/>
            <Route exact path="/new" component={CreateHackathonForm} />
          </Switch>
        </Container>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
