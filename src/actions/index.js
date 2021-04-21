import { axiosWithAuth } from '../axiosWithAuth/axiosWithAuth';

export const FETCH_HACKATHONS_SUCCESS = "FETCH_HACKATHONS_SUCCESS";
export const FETCH_START = "FETCH_START";
export const FETCH_FAILURE = "FETCH_FAILURE";

export const POST_START = "POST_START";
export const POST_SUCCESS = "POST_SUCCESS";


export const fetchHackathons = () => async dispatch => {
    dispatch({ type: FETCH_START });
    return (await axiosWithAuth())
    .get("http://localhost:3001/api/hackathons")
        .then(response => {
            console.log(response)
           dispatch({ type: FETCH_HACKATHONS_SUCCESS, payload: response.data })
        })
        .catch(err => {
            console.log(err)
           dispatch({ type: FETCH_FAILURE, payload: err.response })
        })
}

export const createHackathon = (creatorId, hackathonData) => async dispatch => {
    console.log(hackathonData)
    dispatch({ type: POST_START });
    return (await axiosWithAuth())
    .post(`/hackathons/u/${creatorId}`, hackathonData)
    .then(response => {
        console.log(response)
        dispatch({ type: POST_SUCCESS, payload: response.data })
    })
    .catch(err => {
        console.log(err)
        dispatch({ type: FETCH_FAILURE, payload: err.response })
    })
}

export const createHackathonAndFetchHackathons = (creatorId, hackathonData) => async dispatch => {
    return dispatch(createHackathon(creatorId, hackathonData)).then(response => {
        return dispatch(fetchHackathons())
    })
}