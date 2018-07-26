// @flow

import { observable, action, extendObservable } from 'mobx'
import type { BoundList, List } from '../types/List'
import type { BoundListItem, ListItem } from '../types/ListItem'
import type { Item } from '../types/Item'

type DefaultState = {
  items: Item[],
  lists: List[],
  listItems: ListItem[],
}

export default class RootStore {
  static defaultState: DefaultState = {
    items: [],
    lists: [],
    listItems: [],
  }

  @observable items: Item[]

  @observable lists: List[]

  @observable listItems: ListItem[]

  constructor(initialState: DefaultState) {
    extendObservable(this, { ...RootStore.defaultState, ...initialState })
  }

  @action getLists(): List[] {
    return this.lists
  }

  @action getLists(isArchived: boolean): List[] {
    return this.lists.filter(list => list.isArchived === isArchived)
  }

  @action getActiveLists(): List[] {
    return this.getLists(false)
  }

  @action getArchivedLists(): List[] {
    return this.getLists(true)
  }

  @action getBoundActiveLists(): BoundList[] {
    const activeLists = this.getLists(false)
    return this._bindItemsToLists(activeLists)
  }

  @action getBoundArchivedLists(): BoundList[] {
    const archivedLists = this.getLists(true)
    return this._bindItemsToLists(archivedLists)
  }

  @action getList(id: string): ?List {
    return this.lists.filter((list) => list.id === id)[0] || null
  }

  @action getListItems(listId: string): ListItem[] {
    return this.listItems.filter((listItem) => listItem.listId === listId)
  }

  @action getBoundListItems(listId: string): BoundListItem[] {
    return this.getListItems(listId).map(this._bindItemToListItem)
  }

  @action getListItem(id: string): ?ListItem {
    return this.listItems.filter((listItem) => listItem.id === id)[0] || null
  }

  @action getItem(id: string): Item {
    return this.items.filter((item) => item.id === id)[0]
  }

  @action toggleCheckListItem(id: string): boolean {
    const listItem = this.getListItem(id)
    if (listItem == null) return false
    listItem.isChecked = !listItem.isChecked
    return true
  }

  _bindItemsToList(list: List): BoundList {
    return { ...list, items: this.getListItems(list.id) }
  }

  _bindItemsToLists(lists: List[]): BoundList[] {
    return lists.map(this._bindItemsToList)
  }

  _bindItemToListItem(listItem: ListItem): BoundListItem {
    return { ...listItem, item: this.getItem(listItem.itemId)}
  }
}
