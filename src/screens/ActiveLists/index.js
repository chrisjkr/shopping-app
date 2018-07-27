// @flow

import React from 'react'
import { Alert } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Container, Content } from 'native-base'
import BaseScreenComponent from '../../components/BaseScreenComponent'
import ListItem from '../../components/ListItem'
import type { List } from '../../types/List'
import AddButton from '../../components/AddButton'

@inject('store')
@observer
export default class ActiveLists extends BaseScreenComponent<void, void> {
  static navigationOptions = {
    title: 'Active lists',
  }

  onCardPress = (list: List) => {
    this.navigation.navigate('ShoppingList', { list })
  }

  archiveList = (listId: string) => {
    this.store.updateList(listId, { isArchived: true })
  }

  removeList = (listId: string) => {
    const yesButton = {
      text: 'Yes',
      onPress: () => this.store.removeList(listId),
    }
    const noButton = {
      text: 'No',
      onPress: () => {},
    }

    Alert.alert(
      'Are you sure you want to remove a list?',
      '',
      [
        yesButton,
        noButton,
      ],
    )
  }

  onAddButtonPress = () => {
    this.navigation.navigate('NewList')
  }

  renderLists = () => {
    return this.store
      .getActiveLists()
      .map(list => (
        <ListItem
          list={list}
          onPress={this.onCardPress}
          onArchivePress={this.archiveList}
          onRemovePress={this.removeList}
          key={list.id}
        />
      ))
  }

  render() {
    return (
      <Container>
        <Content padder>{this.renderLists()}</Content>
        <AddButton onPress={this.onAddButtonPress} />
      </Container>
    )
  }
}
