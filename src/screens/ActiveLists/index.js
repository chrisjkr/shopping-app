// @flow

import React from 'react'
import { inject, observer } from 'mobx-react'
import { Container, Content } from 'native-base'
import BaseScreenComponent from '../../components/BaseScreenComponent'
import ListItem from '../../components/ListItem'
import type { List } from '../../types/List'

@inject('store')
@observer
export default class ActiveLists extends BaseScreenComponent<void> {
  static navigationOptions = {
    title: 'Active lists'
  }

  onCardPress = (list: List) => {
    this.props.navigation.navigate('ShoppingList', { list })
  }

  renderLists = (): ListItem[] => {
    return this.store.getActiveLists().map((list, index) => (
      <ListItem list={list} onPress={this.onCardPress} key={index}/>
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
