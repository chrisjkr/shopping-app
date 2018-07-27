import React, { Component } from 'react'
import { Provider } from 'mobx-react'
import { Root } from 'native-base'

import Screens from './src/screens'
import rootStore from './src/stores/RootStore'

export default class App extends Component {

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
  }

  render() {
    return (
      <Provider store={rootStore}>
        <Root>
          <Screens />
        </Root>
      </Provider>
    )
  }
}
