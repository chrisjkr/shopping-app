// @flow

import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Text, Card } from 'native-base'

import styles from './styles'
import type { List } from '../../types/List'

type Props = {
  list: List,
  onPress: (list: List) => void,
}

function ListItem ({ list, onPress }: Props) {
  return (
    <TouchableOpacity onPress={() => onPress(list)}>
      <Card style={styles.card}>
        <Text style={styles.listName}>{list.name}</Text>
      </Card>
    </TouchableOpacity>
  )
}

export default ListItem
