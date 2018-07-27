// @flow

import React from 'react'
import { inject, observer } from 'mobx-react'
import {
  Container,
  Content,
  Text,
  Input,
  Button,
  Toast,
} from 'native-base'
import BaseScreenComponent from '../../components/BaseScreenComponent'
import styles from './styles'
import FormScreenComponent from '../../components/FormScreenComponent'
import ToastService from '../../services/ToastService'

type State = {
  listName: string,
}

@inject('store')
@observer
export default class NewList extends FormScreenComponent<void, State> {
  static navigationOptions = {
    title: 'New list',
  }

  state: State = {
    listName: '',
  }

  onAddPress = () => {
    const { listName } = this.state
    this.store.addList(listName)
    ToastService.show({ text: 'List added!' })
    this.navigation.goBack()
  }

  render() {
    return (
      <Container>
        <Content padder style={styles.content}>
          <Input
            placeholder="New list"
            value={this.state.listName}
            onChangeText={this.handleInputChange('listName')}
          />
        </Content>
        <Button full style={styles.addButton} onPress={this.onAddPress}>
          <Text>Add</Text>
        </Button>
      </Container>
    )
  }
}