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
import { Dimensions } from 'react-native'
import styles from './styles'
import ToastService from '../../services/ToastService'
import FormScreenComponent from '../../components/FormScreenComponent'

const { height } = Dimensions.get('window')

type State = {
  itemName: string,
  quantity: string,
}

@inject('store')
@observer
export default class NewItem extends FormScreenComponent<void, State> {
  static navigationOptions = {
    title: 'New item',
  }

  state: State = {
    itemName: '',
    quantity: '1',
  }

  toastStyle = {
    marginBottom: height * 0.15,
    width: '98%',
  }

  get listId(): string {
    return this.navigation.state.params.listId
  }

  onAddPress = () => {
    const { itemName, quantity } = this.state
    if (itemName.length === 0) {
      ToastService.show({ text: 'Please name your item', style: this.toastStyle })
      return
    }
    console.log(quantity.length === 0)
    if (quantity.length === 0) {
      ToastService.show({ text: 'Please insert item quantity', style: this.toastStyle })
      return
    }

    if (isNaN(quantity)) {
      ToastService.show({ text: 'Invalid quantity format', style: this.toastStyle })
      this.setState({ quantity: '1' })
      return
    }

    this.store.addListItem(
      itemName,
      Number(quantity),
      this.listId,
    )
    ToastService.show({ text: 'Item added!' })
    this.navigation.goBack()
  }

  render() {
    return (
      <Container>
        <Content padder style={styles.content}>
          <Item floatingLabel style={styles.item}>
            <Label>New item</Label>
            <Input
              value={this.state.itemName}
              onChangeText={this.handleInputChange('itemName')}
            />
          </Item>
          <Item floatingLabel style={styles.item}>
            <Label>Quantity</Label>
            <Input
              keyboardType='numeric'
              value={this.state.quantity}
              onChangeText={this.handleInputChange('quantity')}
            />
          </Item>
        </Content>
        <Button full style={styles.addButton} onPress={this.onAddPress}>
          <Text>Add</Text>
        </Button>
      </Container>
    )
  }
}
