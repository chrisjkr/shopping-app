// @flow

import React from 'react'
import { inject, observer } from 'mobx-react'
import { Container, Text, Content } from 'native-base'
import BaseScreenComponent from '../../components/BaseScreenComponent'
import type { List } from '../../types/List'
import type { ListItem } from '../../types/ListItem'
import ShoppingListItem from '../../components/ShoppingListItem'

type Props = {}

@inject('store')
@observer
export default class ShoppingList extends BaseScreenComponent<void> {
  static navigationOptions = ({ navigation }: { navigation: Object }) => {
    const { params } = navigation.state
    const list: List = params.list

    return {
      title: list.name
    }
  }

  get list(): List {
    return this.props.navigation.state.params.list
  }

  get items(): ListItem[] {
    return this.store.getListItems(this.list.id)
  }

  renderItems = (): ShoppingListItem[] => {
    return this.items.map((listItem, index) => (
      <ShoppingListItem listItem={listItem} key={index} />
    ))
  }

  render() {
    return (
      <Container>
        <Content padder>
          {this.renderItems()}
        </Content>
      </Container>
    )
  }
}
