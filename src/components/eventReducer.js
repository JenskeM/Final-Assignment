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

            return {
                ...state,
                searchTerm: payload.searchTerm
            }
    }
}

export default eventReducer