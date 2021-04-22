import React, { useEffect, useState } from 'react';
import { axiosWithAuth } from '../axiosWithAuth/axiosWithAuth';
import Loading from './Loading';

function HackathonDetail(props) {
    const { id } = props.match.params
    const [hackathon, setHackathon] = useState({
        projects: [],
        admins: [],
    })

    useEffect(() => {
        fetchSingleHackathon()
    }, [])

    const fetchSingleHackathon = async () => {
        (await axiosWithAuth())
        .get(`/hackathons/${id}`)
        .then(response => {
            setHackathon(response.data)
        })
        .catch(error => {
              console.log('error in fetch single', error)
        })
    }

    if (!hackathon.name) {
        return <Loading />
    }

    return (
        <div>
            <h1>{hackathon.name}</h1>
            <>
            {hackathon.projects.map(project => (<p>{project.project_title}</p>))}
            {hackathon.admins.map(admin => (<p>{admin.username}</p>))}
            </>
        </div>
    );
}

export default HackathonDetail;