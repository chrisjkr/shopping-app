// @flow

import { AsyncStorage } from 'react-native'
import { observable, action, extendObservable } from 'mobx'
import { create, persist } from 'mobx-persist'
import type { BoundList, List } from '../types/List'
import type { BoundListItem, ListItem } from '../types/ListItem'
import type { Item } from '../types/Item'
import uuid from 'uuid/v4'

type DefaultState = {
  items: Item[],
  lists: List[],
  listItems: ListItem[],
}

export class RootStore {
  static defaultState: DefaultState = {
    items: [],
    lists: [],
    listItems: [],
  }

  @persist('list') @observable items: Item[]

  @persist('list') @observable lists: List[]

  @persist('list') @observable listItems: ListItem[]

  constructor(initialState?: DefaultState) {
    extendObservable(this, { ...RootStore.defaultState, ...initialState })
  }

  getLists(): List[] {
    return this.lists.sort((l1, l2) => l2.createdAt - l1.createdAt)
  }

  getLists(isArchived: boolean): List[] {
    return this.getSortedLists(true)
      .filter(list => list.isArchived === isArchived)
  }

  getSortedLists(descending: boolean): List[] {
    let sortFunction
    if (descending) {
      sortFunction = (l1: List, l2: List) => (
        new Date(l2.createdAt) - new Date(l1.createdAt)
      )
    } else {
      sortFunction = (l1: List, l2: List) => (
        new Date(l1.createdAt) - new Date(l2.createdAt)
      )
    }
    return this.lists.slice().sort(sortFunction)
  }

  getActiveLists(): List[] {
    return this.getLists(false)
  }

  getArchivedLists(): List[] {
    return this.getLists(true)
  }

  getBoundActiveLists(): BoundList[] {
    const activeLists = this.getLists(false)
    return this._bindItemsToLists(activeLists)
  }

  getBoundArchivedLists(): BoundList[] {
    const archivedLists = this.getLists(true)
    return this._bindItemsToLists(archivedLists)
  }

  getList(id: string): List {
    return this.lists.filter((list) => list.id === id)[0] || null
  }

  getListItems(listId: string): ListItem[] {
    return this.listItems.filter((listItem) => listItem.listId === listId)
  }

  getBoundListItems(listId: string): BoundListItem[] {
    return this.getListItems(listId).map(this._bindItemToListItem)
  }

  getListItem(id: string): ?ListItem {
    return this.listItems.filter((listItem) => listItem.id === id)[0] || null
  }

  getItem(id: string): Item {
    return this.items.filter((item) => item.id === id)[0]
  }

  getItemByName(name: string): ?Item {
    return this.items.filter((item) => item.name === name)[0] || null
  }

  @action toggleCheckListItem(id: string): boolean {
    const listItem = this.getListItem(id)
    if (listItem == null) return false
    listItem.isChecked = !listItem.isChecked
    return true
  }

  @action addItem(name: string, lastQuantity: number): Item {
    const item: Item = {
      id: uuid(),
      name,
      lastQuantity,
      createdAt: new Date(),
    }

    this.items.push(item)
    return item
  }

  @action updateItem(id: string, { lastQuantity }: { lastQuantity?: number }): boolean {
    for (let i = 0, len = this.items.length; i < len; ++i) {
      if (this.items[i].id === id) {
        if (lastQuantity != null) this.items[i].lastQuantity = lastQuantity
        return true
      }
    }

    return false
  }

  @action addListItem(name: string, quantity: number, listId: string): ListItem {
    let item = this.getItem(name)
    if (item == null) {
      item = this.addItem(name, quantity)
    }

    const listItem: ListItem = {
      id: uuid(),
      itemId: item.id,
      listId,
      isChecked: false,
      quantity,
      addedAt: new Date(),
    }

    this.listItems.push(listItem)
    this.updateItem(item.id, { lastQuantity: quantity })

    return listItem
  }

  @action removeListItem(listItemId: string) {
    this.listItems = this.listItems
      .filter((listItem) => listItem.id !== listItemId)
  }

  @action removeListItems(listId: string) {
    this.listItems = this.listItems
      .filter((listItem) => listItem.listId !== listId)
  }

  @action addList(name: string): List {
    const list: List = {
      id: uuid(),
      name,
      createdAt: new Date(),
      isArchived: false,
    }

    this.lists.push(list)

    return list
  }

  @action updateList(id: string, { name, isArchived }: { name?: string, isArchived?: boolean}): boolean {
    for (let i = 0, len = this.lists.length; i < len; ++i) {
      if (this.lists[i].id === id) {
        if (name != null) this.lists[i].name = name
        if (isArchived != null) this.lists[i].isArchived = isArchived
        return true
      }
    }

    return false
  }

  @action removeList(id: string) {
    this.removeListItems(id)
    this.lists = this.lists.filter((list) => list.id !== id)
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

function hydrateStore(keys: string[], store) {
  keys.forEach((key) => {
    hydrate(key, store).then(() => console.log(`${key} hydrated`))
  })
}

const hydrate = create({
  storage: AsyncStorage,
})

// const testItems = [
//   {
//     id: uuid(),
//     name: 'Tomato',
//     lastQuantity: 1,
//     createdAt: new Date(),
//   },
//   {
//     id: uuid(),
//     name: 'Cheese',
//     lastQuantity: 3,
//     createdAt: new Date(),
//   }
// ]
//
// const testLists = [
//   {
//     id: uuid(),
//     name: 'My cool shopping list',
//     createdAt: new Date(),
//     isArchived: false,
//   },
// ]
//
// const testListItems = [
//   {
//     id: uuid(),
//     itemId: testItems[0].id,
//     listId: testLists[0].id,
//     isChecked: true,
//     quantity: 1,
//     addedAt: new Date(),
//   },
//   {
//     id: uuid(),
//     itemId: testItems[1].id,
//     listId: testLists[0].id,
//     isChecked: false,
//     quantity: 3,
//     addedAt: new Date(),
//   }
// ]
//
// console.log(AsyncStorage.getAllKeys().then((keys) => console.log(keys)))
// const testData = {
//   items: testItems,
//   lists: testLists,
//   listItems: testListItems,
// }

const rootStore = new RootStore()
export default rootStore

hydrateStore(['items', 'lists', 'listItems'], rootStore)
