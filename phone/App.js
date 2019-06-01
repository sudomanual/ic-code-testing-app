/**
 * CI Code Testing
 * https://github.com/sudo-man/ic-code-testing-app
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import {AppRegistry} from 'react-native'
import { applyMiddleware, createStore } from 'redux'
import AppNavigator from './src/navigators/AppNavigator.js'
import { Root, ImageBackground } from 'native-base'
import { Provider } from 'react-redux'
import appReducers from './src/reducers'
import thunk from 'redux-thunk'

const store = createStore(
    appReducers,
    applyMiddleware(thunk)
)

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isReady: false
    }
  }

  render() {
    return (
        <Root>
          <Provider store={store}>
              <AppNavigator />
          </Provider>
        </Root>
    );
  }
}

AppRegistry.registerComponent('phone', () => App)

export default App

