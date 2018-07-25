// @flow

import React from 'react'
import { Container, Text } from 'native-base'
import type { ListItem } from '../../types/ListItem'

export default function ShoppingListItem({ listItem }: { listItem: ListItem }) {
  return (
    <Container>
      <Text>{listItem.item.name}</Text>
    </Container>
  )
}
