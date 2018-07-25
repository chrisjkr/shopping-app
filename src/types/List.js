// @flow

import type {Item} from "./Item";

export type List = {
  name: string,
  items: Array<Item>,
  createdAt: Date,
  isArchived: boolean,
}
