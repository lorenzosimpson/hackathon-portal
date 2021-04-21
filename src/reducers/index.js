import { FETCH_START, FETCH_HACKATHONS_SUCCESS, POST_SUCCESS, POST_START } from "../actions"

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
        case POST_SUCCESS: {
            return {
                ...state,
                isFetching: false
            }
        }
        case FETCH_START:
            return {
                ...state,
                isFetching: true,
            }
        case FETCH_HACKATHONS_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                hackathons: [...action.payload],
                isFetching: false
            }
        default:
            return state
    }
}