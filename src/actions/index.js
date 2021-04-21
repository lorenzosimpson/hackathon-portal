import { axiosWithAuth } from '../axiosWithAuth/axiosWithAuth';

export const FETCH_HACKATHONS_SUCCESS = "FETCH_HACKATHONS_SUCCESS";
export const FETCH_START = "FETCH_START";
export const FETCH_FAILURE = "FETCH_FAILURE";

export const POST_START = "POST_START";
export const POST_SUCCESS = "POST_SUCCESS";

export const REDIRECT_TO = "REDIRECT_TO";
export const REDIRECT_COMPLETE = "REDIRECT_COMPLETE";


export const fetchHackathons = () => async dispatch => {
    dispatch({ type: FETCH_START });
    return (await axiosWithAuth())
    .get("http://localhost:3001/api/hackathons")
    .then(
        response => dispatch({ type: FETCH_HACKATHONS_SUCCESS, payload: response.data }),
        error => {
          dispatch({ type: FETCH_FAILURE, payload: error.response })
          throw error
        }
      )
}

export const createHackathon = (creatorId, hackathonData) => async dispatch => {
    console.log(hackathonData)
    dispatch({ type: POST_START });
    (await axiosWithAuth())
    .post(`/hackathons/u/${creatorId}`, hackathonData)
    .then(response => dispatch({ type: POST_SUCCESS, payload: response.data }))
    .catch(error => {
          dispatch({ type: FETCH_FAILURE, payload: error.response })
          throw error
        })
    }

export const createHackathonAndFetchHackathons = (creatorId, hackathonData, link) => async dispatch => {
    return dispatch(createHackathon(creatorId, hackathonData))
    .then(() => {
        return dispatch(fetchHackathons())
        .then(() => dispatch(redirect(link)))
    })
    .catch(err =>  {
        throw err
    })
}

export const redirectTo = link => async dispatch => {
    dispatch({ type: REDIRECT_TO, payload: link })
};

export const redirectComplete = () => async dispatch => {
    dispatch({ type: REDIRECT_COMPLETE })
}

export const redirect = (link) => async dispatch => {
    return dispatch(redirectTo(link)).then(() => {
        return dispatch(redirectComplete())
    })
}