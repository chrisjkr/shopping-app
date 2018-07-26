// @flow

import React from 'react'
import { Header } from 'react-navigation'
import { inject, observer } from 'mobx-react'
import { Container, Content } from 'native-base'
import BaseScreenComponent from '../../components/BaseScreenComponent'
import ListItem from '../../components/ListItem'
import type { List } from '../../types/List'

@inject('store')
@observer
export default class ActiveLists extends BaseScreenComponent<void, void> {
  static navigationOptions = ({
    navigation,
    screenProps,
  }: {
    navigation: Object,
    screenProps: Object,
  }) => {

    return {
      title: 'Active lists',
    }
  }

  onCardPress = (list: List) => {
    this.navigation.navigate('ShoppingList', { list })
  }

  renderLists = (): ListItem[] => {
    return this.store.getActiveLists().map((list) => (
      <ListItem list={list} onPress={this.onCardPress} key={list.id}/>
    ))
  }

  render() {
    return (
      <Container>
        <Content padder>
          {this.renderLists()}
        </Content>
      </Container>
    )
  }
}
