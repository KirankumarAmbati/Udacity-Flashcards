import React from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import {connect} from 'react-redux'
import {handleRetrieveDecks, handleRemoveDeck} from '../actions'

class Decks extends React.Component {
  componentDidMount() {
    this.props.handleRetrieveDecks()
  }

  onPress = (title) => {
    this.props.navigation.navigate('DeckDetails', {title})
  }

  render() {
    const {decks} = this.props

    return (
      <ScrollView contentContainerStyle={styles.container}>
          {Object.keys(decks).map(title => (
            !!title && (
              <View key={title}>
                <TouchableOpacity 
                  style={{
                    borderWidth: 1,
                    borderRadius: 5,
                    padding: 10,
                    marginTop: 20,
                    width: 100,
                    height: 100
                  }}
                  key={title}
                  onPress={() => this.onPress(title)}
                >
                  <Text style={{fontSize:20}}>{decks[title].title}</Text>
                  <Text style={{fontSize:15, color:'gray'}}>Cards: {decks[title].questions.length}</Text>
                </TouchableOpacity>
              </View>
            )
          ))}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  }
})

function mapStateToProps(state) {
  return {
    decks: state
  }
}

export default connect(mapStateToProps, {handleRetrieveDecks, handleRemoveDeck})(Decks)
