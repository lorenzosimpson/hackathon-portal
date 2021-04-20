import React, {useState, useEffect} from 'react';
import axios from 'axios';
import moment from 'moment';
import { fetchHackathons } from '../actions/index';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';
const Dashboard = () => {
    const hackathons = useSelector(state => state.hackathons);

    useEffect(() => {
        moveHackathonsToCorrectTable(hackathons)
    }, [hackathons])

    const [filteredHackathons, setFilteredHackathons] = useState({
        current: [],
        past: [],
        future: []
    })
    const isLoading = useSelector(state => state.isLoading)
    const currentDate = new Date();

    const moveHackathonsToCorrectTable = hackathonsArr => {
        var currentArr = []
        var pastArr = []
        var futureArr = []
        hackathonsArr.map(hackathon => {
            if (moment(hackathon.start_date).isBefore(currentDate) && (
            moment(hackathon.end_date).isAfter(currentDate) ||
            moment(hackathon.start_date).isSame(currentDate) ||
            moment(hackathon.end_date).isSame(currentDate))){
                currentArr.push(hackathon)
            }
            if (moment(hackathon.start_date).isAfter(currentDate)) {
                futureArr.push(hackathon)
            }
            if (moment(hackathon.end_date).isBefore(currentDate)) {
                pastArr.push(hackathon)
            }
        })
        setFilteredHackathons({
            current: currentArr,
            future: futureArr,
            past: pastArr
        })
    }

    
    const formatDate = date => {
        const months = [
            "01",
            "02",
            "03",
            "04",
            "05",
            "06",
            "07",
            "08",
            "09",
            "10",
            "11",
            "12"
        ];
        const newDate = new Date(date);
        const y = newDate.getFullYear().toString().substr(2);
        const d = newDate.getDate();
        const m = months[newDate.getMonth()];
        return `${m}/${d}/${y}`;
    };
  

     if (!hackathons.length || isLoading) {
         return <Loader />
     }
    return (
        <div className="cont">
            <div className="container-fluid">
                <div className="row">
                    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                        <div className="sidebar-sticky pt-3">
                            <ul className="nav pl-2 flex-column">
                                <li className="nav-item">
                                    <a className="nav-link active" href="#">
                                        <span data-feather="home"></span>
              Dashboard <span className="sr-only">(current)</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                        <span data-feather="file"></span>
              Orders
            </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                        <span data-feather="shopping-cart"></span>
              Products
            </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                        <span data-feather="users"></span>
              Customers
            </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                        <span data-feather="bar-chart-2"></span>
              Reports
            </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                        <span data-feather="layers"></span>
              Integrations
            </a>
                                </li>
                            </ul>

                            <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                                <span>Saved reports</span>
                                <a className="d-flex align-items-center text-muted" href="#" aria-label="Add a new report">
                                    <span data-feather="plus-circle"></span>
                                </a>
                            </h6>
                            <ul className="nav pl-2 flex-column mb-2">
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                        <span data-feather="file-text"></span>
              Current month
            </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                        <span data-feather="file-text"></span>
              Last quarter
            </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                        <span data-feather="file-text"></span>
              Social engagement
            </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                        <span data-feather="file-text"></span>
              Year-end sale
            </a>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h1">Dashboard</h1>
                            <div className="btn-toolbar mb-2 mb-md-0">
                                <Link to="/new">
                                <button type="button" className="btn btn-sm btn-primary">
                                    + Create Hackathon
                                </button>
                                </Link>
                            </div>
                        </div>

                        {/* <canvas className="my-4 w-100" id="myChart" width="900" height="380"></canvas> */}

                        <h2 className="h3">Current Hackathons</h2>
                        <div className="table-responsive mb-3">
                            <table className="table table-striped table-sm">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Name</th>
                                        <th>Location</th>
                                        <th>Open</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredHackathons.current.map(hackathon => (
                                        <tr>
                                        <td>{hackathon.id}</td>
                                        <td>{formatDate(hackathon.start_date)}</td>
                                        <td>{formatDate(hackathon.end_date)}</td>
                                        <td>{hackathon.name}</td>
                                        <td>{hackathon.location}</td>
                                        <td>{hackathon.is_open}</td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <h3 className="h4">Upcoming Hackathons</h3>
                        <div className="table-responsive mb-3">
                            <table className="table table-striped table-sm">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Name</th>
                                        <th>Location</th>
                                        <th>Open</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredHackathons.future.map(hackathon => (
                                        <tr>
                                        <td>{hackathon.id}</td>
                                        <td>{formatDate(hackathon.start_date)}</td>
                                        <td>{formatDate(hackathon.end_date)}</td>
                                        <td>{hackathon.name}</td>
                                        <td>{hackathon.location}</td>
                                        <td>{hackathon.is_open}</td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <h3 className="h4">Past Hackathons</h3>
                        <div className="table-responsive mb-3">
                            <table className="table table-striped table-sm">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Name</th>
                                        <th>Location</th>
                                        <th>Open</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredHackathons.past.map(hackathon => (
                                        <tr>
                                        <td>{hackathon.id}</td>
                                        <td>{formatDate(hackathon.start_date)}</td>
                                        <td>{formatDate(hackathon.end_date)}</td>
                                        <td>{hackathon.name}</td>
                                        <td>{hackathon.location}</td>
                                        <td>{hackathon.is_open}</td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </main>
                </div>
            </div>
        </div>
  )
}
export default withAuthenticationRequired(Dashboard, {
    onRedirecting: () => <Loader />,
  });