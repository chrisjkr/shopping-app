// @flow

import React from 'react'
import { inject, observer } from 'mobx-react'
import { Container, Content } from 'native-base'
import BaseScreenComponent from '../../components/BaseScreenComponent'
import ListItem from '../../components/ListItem'
import ToastService from '../../services/ToastService'

@inject('store')
@observer
export default class ActiveLists extends BaseScreenComponent<void, void> {
  static navigationOptions = {
    title: 'Archived lists',
  }

  toastStyle = {
    width: '98%',
  }

  unarchiveList = (listId: string) => {
    this.store.updateList(listId, { isArchived: false })
  }

  showArchivedToast = () => {
    ToastService.show({ text: 'Unarchive a list to edit it', style: this.toastStyle })
  }

  renderList = (): ListItem[] => {
    return this.store
      .getArchivedLists()
      .map(list => (
        <ListItem
          list={list}
          key={list.id}
          onPress={this.showArchivedToast}
          onUnarchivePress={this.unarchiveList}
        />
      ))
  }

  render() {
    return (
      <Container>
        <Content padder>{this.renderList()}</Content>
      </Container>
    )
  }
}
