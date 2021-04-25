import { axiosWithAuth } from '../axiosWithAuth/axiosWithAuth';
import moment from 'moment';

export const FETCH_HACKATHONS_SUCCESS = "FETCH_HACKATHONS_SUCCESS";
export const FETCH_START = "FETCH_START";
export const FETCH_FAILURE = "FETCH_FAILURE";

export const POST_START = "POST_START";
export const POST_SUCCESS = "POST_SUCCESS";

export const REDIRECT_TO = "REDIRECT_TO";
export const REDIRECT_COMPLETE = "REDIRECT_COMPLETE";

export const HACKATHONS_SORTED = "HACKATHONS_SORTED";



export const fetchHackathons = () => async dispatch => {
    dispatch({ type: FETCH_START });
    return (await axiosWithAuth())
    .get("/hackathons")
    .then(response => {
        dispatch({type: FETCH_HACKATHONS_SUCCESS, payload: response.data })
        dispatch(moveHackathonsToCorrectTable(response.data))
    })
    .catch(error => {
          dispatch({ type: FETCH_FAILURE, payload: error.response })
          console.log('error in fetch')
          throw new Error('error in fetch')
    })
}

export const createHackathon = (creatorId, hackathonData, path) => async dispatch => {
    dispatch({ type: POST_START });
    (await axiosWithAuth())
    .post(`/hackathons/u/${creatorId}`, hackathonData)
    .then(response => {
        dispatch({ type: POST_SUCCESS, payload: response.data })
        dispatch(fetchHackathons()).then(() => dispatch(redirectTo(path)))
        .catch(err => console.log('error fetching after creating', err))
        .then(() => dispatch({ type: REDIRECT_COMPLETE}))
        .catch(err => console.log('error redirecting', err))
        })
    .catch(error => {
        dispatch({ type: FETCH_FAILURE, payload: error.response })
        console.log('error in create')
    })
}

export const redirectTo = link => async dispatch => {
    dispatch({ type: REDIRECT_TO, payload: link })
};

export const moveHackathonsToCorrectTable = hackathonsArr => dispatch => {
    const currentDate = moment();
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
    const result = {
        current: currentArr,
        future: futureArr,
        past: pastArr
    }
    dispatch({type: HACKATHONS_SORTED, payload: result })
}


