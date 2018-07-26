// @flow

import React from 'react'
import { inject, observer } from 'mobx-react'
import { Container, Content } from 'native-base'
import BaseScreenComponent from '../../components/BaseScreenComponent'
import ListItem from '../../components/ListItem'

@inject('store')
export default class ActiveLists extends BaseScreenComponent<void> {
  onCardPress = () => {
    this.props.navigation.navigate('ShoppingList')
  }

  renderList = () => {
    return this.store.getActiveLists().map((list, index) => (
      <ListItem list={list} onPress={this.onCardPress} key={index}/>
    ))
  }

  render() {
    return (
      <Container>
        <Content padder>
          {this.renderList()}
        </Content>
      </Container>
    )
  }
}
