import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import OldSidebar from './nav/OldSidebar';
import Table from './Table';

export const formatDate = date => {
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

const Dashboard = (props) => {
    const hackathons = useSelector(state => state.hackathons);
    const isLoading = useSelector(state => state.isLoading)

    if (!hackathons.current || !hackathons.past || !hackathons.future || isLoading) {
        return <Loader />
    }

    return (
        <div className="row">
            <OldSidebar />
            <main role="main" className="bg-white col-md-9 ml-sm-auto col-lg-10 px-md-4">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h3 className="h3">Dashboard</h3>
                    <div className="btn-toolbar mb-2 mb-md-0">
                      
                            <button type="button" 
                            className="btn btn-sm btn-primary"
                            onClick={() => props.history.push('/new')}
                            >
                                + Create Hackathon
                        </button>
                 
                    </div>
                </div>

                {/* <canvas className="my-4 w-100" id="myChart" width="900" height="380"></canvas> */}

                <h2 className="h3">Current Hackathons</h2>
                <div className="table-responsive mb-3">
                    <Table classN={{ thead: 'thead-dark' }} body={hackathons.current} headers={[
                        '#',
                        'Start Date',
                        'End Date',
                        'Name',
                        'Location',
                        'Open',
                    ]} />
                </div>

                <h3 className="h4">Upcoming Hackathons</h3>
                <div className="table-responsive mb-3">
                    <Table classN={{ thead: 'thead-dark' }} body={hackathons.future} headers={[
                        '#',
                        'Start Date',
                        'End Date',
                        'Name',
                        'Location',
                        'Open',
                    ]} />
                </div>

                <h3 className="h4">Past Hackathons</h3>
                <div className="table-responsive mb-3">
                    <Table classN={{ thead: 'thead-dark' }} body={hackathons.past} headers={[
                        '#',
                        'Start Date',
                        'End Date',
                        'Name',
                        'Location',
                        'Open',
                    ]} />
                </div>
            </main>
        </div>

    )
}
export default withAuthenticationRequired(Dashboard, {
    onRedirecting: () => <Loader />,
});