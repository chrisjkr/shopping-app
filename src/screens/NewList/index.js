// @flow

import React from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { inject, observer } from 'mobx-react'
import {
  Container,
  Content,
  Text,
  Input,
  Button,
  Item,
  Label,
} from 'native-base'
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
    const listName = this.state.listName.trim()

    if (listName.length === 0) {
      ToastService.show({
        text: 'Please name your list',
        style: this.toastStyle,
      })
      return
    }

    this.store.addList(listName)
    ToastService.show({ text: 'List added!' })
    this.navigation.goBack()
  }

  render() {
    return (
      <Container>
        <Content padder style={styles.content}>
          <Item floatingLabel style={styles.item}>
            <Label>New list</Label>
            <Input
              autoFocus
              value={this.state.listName}
              onChangeText={this.handleInputChange('listName')}
            />
          </Item>
        </Content>
        <KeyboardAvoidingView>
          <Button full style={styles.addButton} onPress={this.onAddPress}>
            <Text>Add</Text>
          </Button>
        </KeyboardAvoidingView>
      </Container>
    )
  }
}
