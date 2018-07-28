import { RootStore } from './RootStore'
import type { List } from '../types/List'

describe('RootStore', () => {
  const store = new RootStore

  let list: List
  let list2: List
  it('should create two lists', () => {

    const listName = 'Cool list no. 1'
    list = store.addList(listName)
    list2 = store.addList('Cool list no. 2')

    const lists = store.getLists(false)
    expect(lists.length).toBe(2)
    expect(store.getList(list.id).name).toBe(listName)
    expect(typeof lists[0].id).toBe('string')
    expect(lists[1].isArchived).toBe(false)
  })

  it('should add list items', () => {
    store.addListItem('Chicken', 3, list.id)
    store.addListItem('Bread', 1, list.id)

    expect(store.getAllListItems().length).toBe(2)
    expect(store.getListItems(list.id).length).toBe(2)
    expect(store.getListItems(list.id)[0].quantity).toBe(3)
    expect(store.getAllListItems()[1].isChecked).toBe(false)

    expect(store.getItems().length).toBe(2)
  })

  it('should add unique items', () => {
    expect(store.getItems()[0].lastQuantity).toBe(3)
    expect(store.getItems()[1].name).toBe('Bread')

    store.addListItem('Tomato', 2, list2.id)
    store.addListItem('Toothpaste', 1, list2.id)
    store.addListItem('Chicken', 2, list2.id)

    expect(store.getItems()[0].lastQuantity).toBe(2)

    expect(store.getItems().length).toBe(4)
  })

  it('should update list name', () => {
    const name = 'Cooler list no. 1'
    store.updateList(list.id, { name })
    expect(store.getList(list.id).name).toBe(name)
  })

  it('should archive a list', () => {
    store.updateList(list.id, { isArchived: true })
    expect(store.getList(list.id).isArchived).toBe(true)
  })

  it('should remove list item from a list', () => {
    const listItemId = store.getListItems(list.id)[0].id
    store.removeListItem(listItemId)

    expect(store.getListItems(list.id).length).toBe(1)

    const listItem = store.getListItems(list.id)[0]
    const item = store.getItem(listItem.itemId)

    expect(item.name).toBe('Bread')
  })

  it('should increment existing list item quantity', () => {
    store.addListItem('Tomato', 1, list2.id)
    expect(store.getListItemByName(list2.id, 'Tomato').quantity).toBe(3)
  })
})
