// @flow

import React from 'react'
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
    title: 'Active lists'
  }

  onCardPress = (list: List) => {
    this.navigation.navigate('ShoppingList', { list })
  }

  archiveList = (listId: string) => {
    this.store.updateList(listId, { isArchived: true })
  }

  onAddButtonPress = () => {
    this.navigation.navigate('NewList')
  }

  renderLists = (): ListItem[] => {
    return this.store
      .getActiveLists()
      .map(list => (
        <ListItem
          list={list}
          onPress={this.onCardPress}
          onArchivePress={this.archiveList}
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
