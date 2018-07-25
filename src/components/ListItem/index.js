// @flow

import React from 'react'
import { observer } from 'mobx-react'
import { TouchableOpacity } from 'react-native'
import { Text, ListItem as ListItemContainer } from 'native-base'

import styles from './styles'
import type { List } from '../../types/List'

const ListItem = observer(({ list }: { list: List }) => {
  const onPress = () => {
    console.log('navigate to list')
  }

  return (
    <TouchableOpacity onPress={onPress()}>
      <ListItemContainer style={styles.container}>
        <Text>{list.name}</Text>
      </ListItemContainer>
    </TouchableOpacity>
  )
})

export default ListItem
