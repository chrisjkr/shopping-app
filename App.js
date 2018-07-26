import React, { Component } from 'react'
import { SafeAreaView } from 'react-native'
import { Provider } from 'mobx-react'

import Screens from './src/screens'
import RootStore from './src/stores/RootStore'

import uuid from 'uuid/v4'

const testItems = [
  {
    id: uuid(),
    name: 'Tomato',
    lastQuantity: 1,
    createdAt: new Date(),
  },
  {
    id: uuid(),
    name: 'Cheese',
    lastQuantity: 3,
    createdAt: new Date(),
  }
]

const testLists = [
  {
    id: uuid(),
    name: 'My cool shopping list',
    createdAt: new Date(),
    isArchived: false,
  },
]

const testListItems = [
  {
    id: uuid(),
    itemId: testItems[0].id,
    listId: testLists[0].id,
    isChecked: true,
    quantity: 1,
    addedAt: new Date(),
  },
  {
    id: uuid(),
    itemId: testItems[1].id,
    listId: testLists[0].id,
    isChecked: false,
    quantity: 3,
    addedAt: new Date(),
  }
]

const testData = {
  items: testItems,
  lists: testLists,
  listItems: testListItems,
}

const rootStore = new RootStore(testData)

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
