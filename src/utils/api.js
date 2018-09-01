import {AsyncStorage} from 'react-native'

const FLASH_CARD_KEY = 'MyFlashCards'

export function getDecks(){
    // AsyncStorage.removeItem(FLASH_CARD_KEY)
    return AsyncStorage.getItem(FLASH_CARD_KEY).then(getResults)
}

function getResults(decks) {
    return (decks === null || decks.length <= 0 ) ? setDummyDecks() : JSON.parse(decks)
}

function setDummyDecks() {
    const dummyDecks = {
        react: {
            title: 'React',
            questions: [
                {
                    'questionText': 'What is React ?',
                    'answer': 'It is a UI Library'
                },
                {
                    'questionText': 'Who owns React ?',
                    'answer': 'The Facebook'
                }
            ]
        },
        css: {
            title: 'css',
            questions: [
                {
                    'questionText': 'Expand CSS.',
                    'answer': 'Cummulative Style Sheet'
                }
            ]
        }
    }

    AsyncStorage.setItem(FLASH_CARD_KEY, JSON.stringify(dummyDecks))
    return dummyDecks
}

export function getDeck(title){
    return AsyncStorage.getItem(FLASH_CARD_KEY).then((decks) => JSON.parse(decks)[title])
}

export function saveDeckTitle(title){
    let newDeck = {
        [title]: {
            title: title,
            questions: []
        }
    }

    AsyncStorage.mergeItem(FLASH_CARD_KEY, JSON.stringify(newDeck))
    return newDeck
}

export function addCardToDeck(title, newCard){
    return getDeck(title).then(deck => {

        let reqDeck = deck
        
        reqDeck.questions.push(newCard)

        let updatedDeck = {
            [reqDeck.title]: {
                title: reqDeck.title,
                questions: reqDeck.questions
            }
        }

        AsyncStorage.mergeItem(FLASH_CARD_KEY, JSON.stringify(updatedDeck))

        return updatedDeck
    })
}

export function removeDeck(title) {
    return getDecks().then((decks) => {
        const reqDecks = Object.keys(decks).filter(key => key !== title).map(key => decks[key])
        AsyncStorage.removeItem(FLASH_CARD_KEY)
        
        if(Object.keys(reqDecks).length > 1) {
            AsyncStorage.setItem(FLASH_CARD_KEY, JSON.stringify(reqDecks))
        }

        return reqDecks
    })
}