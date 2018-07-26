// @flow

import React from 'react'
import { inject, observer } from 'mobx-react'
import { TouchableOpacity } from 'react-native'
import { Card, Text, Left, Right, Radio } from 'native-base'
import type { ListItem } from '../../types/ListItem'
import styles from './styles'
import RootStore from '../../stores/RootStore'

type Props = {
  listItem: ListItem,
  store: RootStore,
}

function ShoppingListItem({ listItem, store }: Props) {
  const toggleItemCheck = () => {
    store.toggleCheckListItem(listItem.id)
  }

  const item = store.getItem(listItem.itemId)
  const cardStyles = [styles.card]
  if (listItem.isChecked) {
    cardStyles.push(styles.checkedCard)
  }

  return (
    <TouchableOpacity onPress={toggleItemCheck}>
      <Card style={cardStyles}>
        <Text>{item.name}</Text>
        <Right>
          <Radio selected={listItem.isChecked} />
        </Right>
      </Card>
    </TouchableOpacity>
  )
}

export default inject('store')(observer(ShoppingListItem))
