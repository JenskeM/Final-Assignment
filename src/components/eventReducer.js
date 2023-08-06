export const initialState = {
    searchTerm: "",
    categorySelected: "no filter"
}

export const ACTIONS = {
    FILTER_EVENTS: "filter-events",
    FILTER_CATS: "filter-cats"
  };

const eventReducer = (state, action) => {
    const {type } = action
    
    switch (type) {
        case ACTIONS.FILTER_EVENTS:

            return {
                ...state,
                searchTerm: action.payload
            }
        case ACTIONS.FILTER_CATS:

            return {
                ...state,
                categorySelected: action.payload
            }

        default:
            return state
    }
}

export default eventReducer