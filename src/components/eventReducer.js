export const initialState = {
    searchTerm: ""
}

export const ACTIONS = {
    FILTER_EVENTS: "filter-events",
  };

const eventReducer = (state, action) => {
    const {type } = action
    
    switch (type) {
        case ACTIONS.FILTER_EVENTS:

            return {
                ...state,
                searchTerm: action.payload
            }
        default:
            return state
    }
}

export default eventReducer