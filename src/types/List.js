// @flow

import type { ListItem } from './ListItem'

export type List = {
  id: string,
  name: string,
  createdAt: Date,
  isArchived: boolean,
}

export type BoundList = List & {
  items: ListItem[],
}
