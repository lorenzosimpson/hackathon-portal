import { axiosWithAuth } from '../axiosWithAuth/axiosWithAuth';

export const FETCH_ALL_HACKATHONS = "FETCH_ALL_HACKATHONS";
export const FETCH_START = "FETCH_START";
export const FETCH_FAILURE = "FETCH_FAILURE";

export const POST_START = "POST_START";
export const POST_HACKATHON = "POST_HACKATHON";


export const fetchHackathons = () => async dispatch => {
    dispatch({ type: FETCH_START });
    (await axiosWithAuth())
    .get("http://localhost:3001/api/hackathons")
        .then(response => {
            console.log(response)
           dispatch({ type: FETCH_ALL_HACKATHONS, payload: response.data })
        })
        .catch(err => {
            console.log(err)
           dispatch({ type: FETCH_FAILURE, payload: err.response })
        })
}

export const createHackathon = (creatorId, hackathonData) => async dispatch => {
    console.log(hackathonData)
    dispatch({ type: POST_START });
    (await axiosWithAuth())
    .post(`/hackathons/u/${creatorId}`, hackathonData)
    .then(response => {
        console.log(response)
        dispatch({ type: POST_HACKATHON, payload: response.data })
    })
    .catch(err => {
        console.log(err)
        dispatch({ type: FETCH_FAILURE, payload: err.response })
    })
}