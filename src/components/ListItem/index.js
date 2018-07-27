// @flow

import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Text, Card } from 'native-base'

import styles from './styles'
import type { List } from '../../types/List'
import Icon from '../Icon'

type Props = {
  list: List,
  onPress?: (list: List) => void,
  onArchivePress?: (listId: string) => void,
  onUnarchivePress?: (listId: string) => void,
}

function ListItem({ list, onPress, onArchivePress, onUnarchivePress }: Props) {
  return (
    <TouchableOpacity onPress={onPress ? () => onPress(list) : undefined}>
      <Card style={styles.card}>
        <Text style={styles.listName}>{list.name}</Text>
        {onArchivePress ? (
          <Icon
            name='archive'
            size={28}
            onPress={() => onArchivePress(list.id)}
          />
        ) : null}
        {onUnarchivePress ? (
          <Icon
            name='list'
            size={28}
            onPress={() => onUnarchivePress(list.id)}
          />
        ) : null}
      </Card>
    </TouchableOpacity>
  )
}

export default ListItem
