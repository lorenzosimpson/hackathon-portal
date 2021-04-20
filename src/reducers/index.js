import { FETCH_ALL_HACKATHONS, FETCH_START, POST_HACKATHON, POST_START } from "../actions"

export const initialState = {
    hackathons: [],
    isFetching: false
}

export const rootReducer = (state, action) => {
    switch (action.type) {
        case POST_START:
            return {
                ...state,
                isFetching: true
            }
        case POST_HACKATHON: {
            return {
                ...state,
                isFetching: false
            }
        }
        case FETCH_START:
            return {
                ...state,
                isFetching: true
            }
        case FETCH_ALL_HACKATHONS:
            return {
                ...state,
                hackathons: [...action.payload],
                isFetching: false
            }
        default:
            return state
    }
}