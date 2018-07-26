// @flow

import type { Item } from './Item'

export type ListItem = {
  id: string,
  itemId: string,
  listId: string,
  isChecked: boolean,
  quantity: number,
  addedAt: Date,
}

export type BoundListItem =  ListItem & {
  item: Item,
}
