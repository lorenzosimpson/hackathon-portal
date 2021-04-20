import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { axiosWithAuth } from '../axiosWithAuth/axiosWithAuth';

const HackathonList = () => {
    const [hackathons, setHackathons] = useState([])

    useEffect(() => {
        fetchHackathons()
    }, [])

    const fetchHackathons = async() => {
        try {
        const response = await axiosWithAuth().get("http://localhost:3001/api/hackathons")
        console.log(response)
    } catch (err) {
        console.log(err)
    }
    }
    return (
        null
    )
}
export default HackathonList;