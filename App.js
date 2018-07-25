import React, { Component } from 'react'
import { SafeAreaView } from 'react-native'
import { Provider } from 'mobx-react'

import Screens from './src/screens'
import RootStore from './src/stores/RootStore'

const testItem = {
  name: 'Tomato',
  lastQuantity: 1,
  createdAt: new Date(),
}

const rootStore = new RootStore({
  lists: [
    {
      name: 'My shopping list',
      items: [
        {
          item: testItem,
          quantity: 1,
          addedAt: new Date(),
        }
      ],
      createdAt: new Date(),
      isArchived: false,
    }
  ]
})

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
        <Screens />
      </Provider>
    )
  }
}
