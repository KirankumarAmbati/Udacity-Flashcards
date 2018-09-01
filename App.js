import React from 'react';
import { StyleSheet, Text,ScrollView, View, StatusBar, Platform } from 'react-native';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation'
import {FontAwesome, Ionicons} from '@expo/vector-icons'
import Decks from './src/components/Decks'
import DeckDetails from './src/components/DeckDetails'
import Quiz from './src/components/Quiz'
import NewDeck from './src/components/NewDeck'
import {Constants} from 'expo'
import middleware from './src/middlewares'
import {createStore} from 'redux'
import reducer from './src/reducers'
import NewQuestion from './src/components/NewQuestion'
import {Provider} from 'react-redux'
import {setLocalNotification} from './src/utils/helper'

const store = createStore(reducer, middleware)

function MyStatusBar({backgroundColor, ...props}) {
  return(
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = createBottomTabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />,
      tabBarLabel: 'Decks'
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => <FontAwesome name= 'plus-square' size={30} color={tintColor} />,
      tabBarLabel: 'New Deck'
    }
  }
}, {
  navigationOptions: {
    header: null,
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? 'purple' : 'white',
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? 'white' : 'purple',
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigation = createStackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckDetails: {
    screen: DeckDetails,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'purple'
      },
      title: 'Deck Details'
    }
  },
  NewQuestion: {
    screen: NewQuestion,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'purple'
      },
      title: 'Add Card'
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'purple'
      },
      title: 'Quiz'
    }
  }
})

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <MyStatusBar backgroundColor={'red'} barStyle='light-content' />
          <MainNavigation />
        </View>
      </Provider>
    );
  }
}
