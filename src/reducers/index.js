import { FETCH_START, FETCH_HACKATHONS_SUCCESS, POST_SUCCESS, POST_START, FETCH_FAILURE, REDIRECT_TO, REDIRECT_COMPLETE, HACKATHONS_SORTED } from "../actions"

export const initialState = {
    hackathons: {},
    isFetching: false,
    error: "",
    redirectTo: ""
}

export const rootReducer = (state, action) => {
    switch (action.type) {
        case POST_START:
            return {
                ...state,
                isFetching: true,
                redirectTo: ""
            }
        case POST_SUCCESS: {
            return {
                ...state,
                isFetching: false,
                redirectTo: ""

            }
        }
        case FETCH_START:
            return {
                ...state,
                isFetching: true,
                redirectTo: ""
            }
        case FETCH_HACKATHONS_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                hackathons: [...action.payload],
                isFetching: false,
            }
        case FETCH_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.payload,
                redirectTo: ""
            }
        case REDIRECT_TO:
            console.log('redirect to called') 
            return {
                ...state,
                isFetching: false,
                error: false,
                redirectTo: action.payload
            }
        case REDIRECT_COMPLETE:
            return {
                ...state,
                redirectTo: ""
            }
        case HACKATHONS_SORTED:
            return {
                ...state,
                hackathons: {...action.payload}
            }
        default:
            return state
    }
}