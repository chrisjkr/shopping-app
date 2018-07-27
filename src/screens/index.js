import React from 'react'
import { createBottomTabNavigator, createStackNavigator }  from 'react-navigation'
import Icon from '../components/Icon'

import colours from '../constants/colours'

import ActiveListsScreen from './ActiveLists'
import ArchivedListsScreen from './ArchivedLists'
import ShoppingListScreen from './ShoppingList'
import NewItemScreen from './NewItem'
import NewListScreen from './NewList'

const ActiveListsStack = createStackNavigator({
  ActiveLists: ActiveListsScreen,
  NewList: NewListScreen,
  ShoppingList: ShoppingListScreen,
  NewItem: NewItemScreen,
}, {
  headerMode: 'screen'
})

const ArchivedListsStack = createStackNavigator({
  ArchivedLists: ArchivedListsScreen,
  //
})

function tabIcon (iconName) {
  return function ({ focused, tintColor }) {

    return <Icon
      name={iconName}
      size={32}
      color={focused ? tintColor : 'black'}
    />
  }
}

const MainNavigator = createBottomTabNavigator(
  {
    ActiveLists: {
      screen: ActiveListsStack,
      navigationOptions: () => ({
        title: 'Active',
        tabBarIcon: tabIcon('list')
      })
    },
    ArchivedLists: {
      screen: ArchivedListsStack,
      navigationOptions: () => ({
        title: 'Archived',
        tabBarIcon: tabIcon('archive')
      })
    },
  },
  {
    tabBarOptions: {
      activeTintColor: colours.mainColour,
    }
  }
)

const navigationPersistenceKey = __DEV__ ? "NavigationStateDEV" : null;

export default () => <MainNavigator persistenceKey={navigationPersistenceKey} />
