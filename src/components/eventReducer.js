export const initialState = {
    searchTerm: "",
    categorySelected: "no filter",
    saveToggle: true
}

export const ACTIONS = {
    FILTER_EVENTS: "filter-events",
    FILTER_CATS: "filter-cats",
    SHOW_SAVE: "show-save",
    EDIT_DESCR: "edit-description",
    EDIT_LOC: "edit-location",
    EDIT_CATS: "edit-cats",
    EDIT_START: "edit-start",
    EDIT_END:   "edit-end"
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

        case ACTIONS.SHOW_SAVE:

            return {
                ...state,
                saveToggle: action.payload
            }

        case ACTIONS.EDIT_DESCR:

            return {
                ...state,
                editDescription: action.payload
            }

        case ACTIONS.EDIT_LOC:

            return {
                ...state,
                editLocation: action.payload
            }

        case ACTIONS.EDIT_CATS:

            return {
                ...state,
                editCats: action.payload
            }

        case ACTIONS.EDIT_START:

            return {
                ...state,
                editStart: action.payload
            }

        case ACTIONS.EDIT_END:

            return {
                ...state,
                editEnd: action.payload
            }

        default:
            return state
    }
}

export default eventReducer