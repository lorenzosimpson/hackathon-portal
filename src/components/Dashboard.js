import React, {useState, useEffect} from 'react';
import axios from 'axios';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import OldSidebar from './nav/OldSidebar';

const Dashboard = (props) => {
    const hackathons = useSelector(state => state.hackathons);
    const [filteredHackathons, setFilteredHackathons] = useState({
        current: [],
        past: [],
        future: []
    })

    useEffect(() => {
        moveHackathonsToCorrectTable(hackathons);
    }, [hackathons]);


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
        <div className="row">
            <OldSidebar />
            <main role="main" className="bg-white col-md-9 ml-sm-auto col-lg-10 px-md-4">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h3 className="h3">Dashboard</h3>
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
                                <tr key={hackathon.id}>
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
                                <tr key={hackathon.id}>
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
                                    <tr key={hackathon.id}>
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
          
  )
}
export default withAuthenticationRequired(Dashboard, {
    onRedirecting: () => <Loader />,
  });