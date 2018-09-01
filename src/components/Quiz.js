import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import {connect} from 'react-redux'
import {setLocalNotification, clearLocalNotification} from '../utils/helper'

class Quiz extends React.Component {
  state = {
    score: 0,
    current: 0,
    showAnswer: false
  }

  onSubmit(answer) {
    this.setState((prevState) => ({
      current: prevState.current + 1,
      score: answer === 'correct' ? prevState.score + 1 : prevState.score
    }))

    const {decks, title} = this.props
    const {questions} = decks[title]

    console.log('#### NOTCLEARED', this.state.current, questions.length)

    if(this.state.current >= questions.length-1) {
      console.log('#### CLEARED')
      clearLocalNotification().then(setLocalNotification)
    }
  }

  render() {
    const {decks, title} = this.props
    const {questions} = decks[title]

    const currentQuestion = questions[this.state.current]

    if(questions.length == 0) {
      return <Text style={{fontSize: 15, flex: 1, justifyContent: 'center', alignItems: 'center'}}>Oops. No cards present. Please add some cards and come back !</Text>
    }

    return (
      <View style={styles.container}>
        <Text style={{fontSize: 25, paddingBottom: 30}}>{title}</Text>
        <Text>{this.state.current >= questions.length && `You scored ${this.state.score} out of  ${questions.length}`}</Text>
        <Text>{this.state.current < questions.length && `Question: ${this.state.current + 1} / ${questions.length}`   }</Text>

        <View>
        {this.state.current < questions.length && (
          <View>
            {this.state.showAnswer ? (
              <Text style={{fontSize: 15, paddingBottom: 30}}>
                Answer: {currentQuestion.answer}
              </Text>
            ) : (
              <Text style={{fontSize: 15, paddingBottom: 30}}>
                Question: {currentQuestion && currentQuestion.questionText}
              </Text>
            )}
            <View>
              <TouchableOpacity 
                onPress={() => this.setState(prevState => ({showAnswer: !prevState.showAnswer}))} 
                style={{margin: 10, padding: 10, backgroundColor:"#841584"}}
              >
                <Text style={{color: 'white', textAlign: 'center'}}>{this.state.showAnswer ? `Click to View Question` : `Click to View Answer`}</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={() => this.onSubmit('correct')}
                style={{margin: 10, padding: 10, backgroundColor:"#841584"}}
              >
                <Text style={{color: 'white', textAlign: 'center'}}>Correct</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={() => this.onSubmit('incorrect')}
                style={{margin: 10, padding: 10, backgroundColor:"#841584",}}
              >
                <Text style={{color: 'white', textAlign: 'center'}}>Incorrect</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        </View>
      </View>
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

function mapStateToProps(state, props) {
  const {title} = props.navigation.state.params

  return {
    decks: state,
    title
  }
}

export default connect(mapStateToProps)(Quiz)
