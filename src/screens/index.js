import React from 'react'
import { Platform } from 'react-native'
import { createBottomTabNavigator, createStackNavigator }  from 'react-navigation'
import { Ionicons } from '@expo/vector-icons';

import colours from '../constants/colours'

import ActiveListsScreen from './ActiveLists'
import ArchivedListsScreen from './ArchivedLists'
import ShoppingListScreen from './ShoppingList'


const ActiveListsStack = createStackNavigator({
  ActiveLists: ActiveListsScreen,
  ShoppingList: ShoppingListScreen,
  // NewList: NewListScreen,
})

const ArchivedListsStack = createStackNavigator({
  ArchivedLists: ArchivedListsScreen,
  //
})

function tabIcon (iconName) {
  return function ({ focused, tintColor }) {

    const platformIconName = `${Platform.OS === 'ios' ? 'ios' : 'md'}-${iconName}`;
    return <Ionicons
      name={platformIconName}
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
