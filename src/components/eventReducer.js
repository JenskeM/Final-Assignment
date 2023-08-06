export const initialState = {
    searchTerm: ""
}

export const ACTIONS = {
    FILTER_EVENTS: "filter-events",
  };

const eventReducer = (state, action) => {
    const {type, payload } = action
    
    switch (type) {
        case ACTIONS.FILTER_EVENTS:
            console.log("ACTIONS.FILTER_EVENTS", payload)

            return {
                ...state,
                searchTerm: action.payload
            }
    }
}

export default eventReducer