// @flow

import React from 'react'
import { Header } from 'react-navigation'
import { inject, observer } from 'mobx-react'
import { Container, Content } from 'native-base'
import BaseScreenComponent from '../../components/BaseScreenComponent'
import type { List } from '../../types/List'
import type { ListItem } from '../../types/ListItem'
import ShoppingListItem from '../../components/ShoppingListItem'
import AddButton from '../../components/AddButton'

@inject('store')
@observer
export default class ShoppingList extends BaseScreenComponent<void, void> {
  static navigationOptions = ({
    navigation,
  }: {
    navigation: Object,
  }) => {
    const { params } = navigation.state
    const list: List = params.list

    return {
      title: list.name,
    }
  }

  get list(): List {
    return this.store.getList(this.props.navigation.state.params.list.id)
  }

  get items(): ListItem[] {
    return this.store.getListItems(this.list.id)
  }

  onAddButtonPress = () => {
    this.navigation.navigate('NewItem', { listId: this.list.id })
  }

  renderItems = (): ShoppingListItem[] => {
    return this.items.map((listItem) => (
      <ShoppingListItem listItem={listItem} key={listItem.id} />
    ))
  }

  render() {
    return (
      <Container>
        <Content padder>{this.renderItems()}</Content>
        <AddButton onPress={this.onAddButtonPress} />
      </Container>
    )
  }
}
