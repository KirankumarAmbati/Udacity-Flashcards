import {ADD_DECK, RETRIEVE_DECKS, UPDATE_DECK, REMOVE_DECK} from '../actions'

export default function reducer(state = {}, action) {
    switch (action.type) {
        case RETRIEVE_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case ADD_DECK:
            return {
                ...state,
                ...action.deck
            }
        case UPDATE_DECK:
            return {
                ...state,
                ...action.deck
            }
        case REMOVE_DECK:
            state = {}
            return {
                ...state,
                ...action.decks
            }
        default: 
            return state
    }
}