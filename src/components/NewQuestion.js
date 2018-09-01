import React from 'react'
import { StyleSheet, Text, TextInput, KeyboardAvoidingView , Button } from 'react-native'
import {handleAddCardToTheDeck} from '../actions'
import {connect} from 'react-redux'

class NewQuestion extends React.Component {
  state = {
    questionText:'',
    answer:''
  }

  submit = () => {
    const {title} = this.props.navigation.state.params
    let {questionText, answer} = this.state

    if(questionText == '') {
      alert('Please enter question !')
    } else if(answer == '') {
      alert('Please enter the answer !')
    } else {
      this.props.handleAddCardToTheDeck(title, {
        questionText,
        answer
      })

      this.props.navigation.navigate('DeckDetails', {title})
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={{fontSize: 25, paddingBottom: 20}}>New Card</Text>
        <TextInput placeholder="Enter The Question" style={{width: 200, height: 20, marginBottom: 40}}  onChangeText={questionText => this.setState({questionText})}/>
        <TextInput placeholder="Enter The Answer" style={{width: 200, height: 20,}}  onChangeText={answer => this.setState({answer})}/>
        <Button
            onPress={this.submit}
            title="Add Card"
            color="#841584"
            accessibilityLabel="Add Card"
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

export default connect(null, {handleAddCardToTheDeck})(NewQuestion)