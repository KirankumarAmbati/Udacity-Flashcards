import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import {connect} from 'react-redux'

class DeckDetails extends React.Component {
  render() {
    const {title} = this.props.navigation.state.params
    const {decks} = this.props

    return (
      <View style={styles.container}>
        <Text style={{fontSize: 25, paddingBottom: 20}}>{decks[title].title}</Text>
        <Text style={{fontSize: 15, paddingBottom: 20, color: 'gray', }}>
          {decks && decks[title] && decks[title].questions && decks[title].questions.length} cards
        </Text>
        <TouchableOpacity 
          onPress={() => this.props.navigation.navigate('NewQuestion', {title})} 
          style={{margin: 10, padding: 10, backgroundColor:"#841584", width: 150}}
        >
          <Text style={{color: 'white', textAlign: 'center'}}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => this.props.navigation.navigate('Quiz', {title})}
          style={{margin: 10, padding: 10, backgroundColor:"#841584", width: 150}}
        >
          <Text style={{color: 'white', textAlign: 'center'}}>Take Quiz</Text>
        </TouchableOpacity>
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
  }
})

function mapStateToProps(state) {
  return {
    decks: state
  }
}

export default connect(mapStateToProps)(DeckDetails)
