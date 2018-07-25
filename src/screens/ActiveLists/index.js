// @flow

import React from 'react'
import { inject, observer } from 'mobx-react'
import { Container } from 'native-base'
import BaseScreenComponent from '../../components/BaseScreenComponent'
import ListItem from '../../components/ListItem'

@inject('store')
export default class ActiveLists extends BaseScreenComponent<void> {
  renderList = () => {
    return this.store.getActiveLists().map((list, index) => (
      <ListItem list={list} key={index}/>
    ))
  }

  render() {
    return (
      <Container>
        {this.renderList()}
      </Container>
    )
  }
}
