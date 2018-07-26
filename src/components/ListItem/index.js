// @flow

import React from 'react'
import { observer } from 'mobx-react'
import { TouchableOpacity } from 'react-native'
import { Text, Card, CardItem, Body } from 'native-base'

import styles from './styles'
import type { List } from '../../types/List'

type Props = {
  list: List,
  onPress: () => void,
}

function ListItem ({ list, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={styles.card}>
        <Text>{list.name}</Text>
      </Card>
    </TouchableOpacity>
  )
}

export default ListItem
