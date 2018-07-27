// @flow

import React from 'react'
import { inject, observer } from 'mobx-react'
import { TouchableOpacity, View } from 'react-native'
import { Card, Text, Right, Radio, Badge } from 'native-base'
import type { ListItem } from '../../types/ListItem'
import styles from './styles'
import { RootStore } from '../../stores/RootStore'
import Icon from '../Icon'

type Props = {
  listItem: ListItem,
  store: RootStore,
  onRemovePress: (listItemId: string) => void,
}

function ShoppingListItem({ listItem, store, onRemovePress }: Props) {
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
        <Text style={styles.name}>{item.name}</Text>
        <View>
          <Badge info style={styles.quantityBadge}>
            <Text numberOfLines={1} style={styles.quantity}>{listItem.quantity}</Text>
          </Badge>
        </View>
        {onRemovePress ? (
          <Icon
            name="trash"
            size={22}
            onPress={() => onRemovePress(listItem.id)}
            style={styles.icon}
          />
        ) : null}
        <Right>
          <Radio selected={listItem.isChecked} />
        </Right>
      </Card>
    </TouchableOpacity>
  )
}

export default inject('store')(observer(ShoppingListItem))
