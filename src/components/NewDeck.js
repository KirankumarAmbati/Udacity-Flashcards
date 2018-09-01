import React from 'react'
import { StyleSheet, Text, KeyboardAvoidingView, TextInput, Button } from 'react-native'
import {handleAddDeck} from '../actions'
import {connect} from 'react-redux'

class NewDeck extends React.Component {
    state = {
        title: '',
    }

    submit = () => {
        let {title} = this.state
        
        if(title !== '') {
            this.props.handleAddDeck(title)
            this.props.navigation.navigate('Decks')
        }
        else {
            alert('Please give a title and try again')
        }
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={[styles.container, {paddingTop: 30}]}>
                <Text style={{fontSize: 25, paddingBottom:50,}}>Name the deck !!</Text>
                <TextInput
                    placeholder="Enter Deck Title"
                    style={{width: 200, height: 20,}} 
                    onChangeText={(title) => this.setState({title})} />
                <Button
                    onPress={this.submit}
                    title="Add Deck"
                    color="#841584"
                    accessibilityLabel="Add Deck"
                />
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
})

export default connect(null, {handleAddDeck})(NewDeck)