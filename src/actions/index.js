import {getDecks, saveDeckTitle, addCardToDeck, removeDeck} from '../utils/api'

export const ADD_DECK = 'ADD_DECK'
export const UPDATE_DECK = 'UPDATE_DECK'
export const RETRIEVE_DECKS = 'RETRIEVE_DECKS'
export const REMOVE_DECK = 'REMOVE_DECK';


export function handleRemoveDeck(title) {
    return (dispatch) => {
        return removeDeck(title).then(decks => dispatch(removeTheDeck(decks)))
    }
}

function removeTheDeck(decks) {
    return {
        type: REMOVE_DECK,
        decks
    }
}

function addDeck(deck) {
    return {
        type: ADD_DECK,
        deck
    }
}

function updateDeck(deck) {
    return {
        type: UPDATE_DECK,
        deck
    }
}

export function handleAddDeck(title) {
    return (dispatch) => {
        return dispatch(addDeck(saveDeckTitle(title)))
    }
}

export function handleAddCardToTheDeck(title, newCard) {
    return (dispatch) => {
        return addCardToDeck(title, newCard).then((deck) => dispatch(updateDeck(deck)))
    }
}

function retrieveDecks(decks) {
    return {
        type: RETRIEVE_DECKS,
        decks
    }
}

export function handleRetrieveDecks() {
    return (dispatch) => {
        return getDecks().then(decks => dispatch(retrieveDecks(decks)))
    }
}