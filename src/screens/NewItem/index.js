// @flow

import React from 'react'
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
import BaseScreenComponent from '../../components/BaseScreenComponent'
import styles from './styles'

type State = {
  itemName: string,
  quantity: string,
}

@inject('store')
@observer
export default class NewItem extends BaseScreenComponent<void, State> {
  static navigationOptions = {
    title: 'New item',
  }

  state: State = {
    itemName: '',
    quantity: '',
  }

  get listId(): string {
    return this.navigation.state.params.listId
  }

  onAddPress = () => {
    const { itemName, quantity } = this.state
    if (itemName.length === 0 && quantity.length === 0) {
      // TODO show alert/toast
      return
    }
    this.store.addListItem(
      itemName,
      Number(quantity),
      this.listId,
    )
    this.navigation.goBack()
  }

  handleInputChange = (key: string) => {
    return (value: any) => {
      this.setState({ [key]: value })
    }
  }

  render() {
    return (
      <Container>
        <Content padder style={styles.content}>
          <Input
            placeholder="New item"
            value={this.state.itemName}
            onChangeText={this.handleInputChange('itemName')}
          />
          <Input
            placeholder="Quantity"
            keyboardType="numeric"
            value={this.state.quantity}
            onChangeText={this.handleInputChange('quantity')}
          />
        </Content>
        <Button full style={styles.addButton} onPress={this.onAddPress}>
          <Text>Add</Text>
        </Button>
      </Container>
    )
  }
}
