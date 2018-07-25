// @flow

import { observable, action, extendObservable } from 'mobx'
import type { List } from '../types/List'

type DefaultState = {
  lists: List[],
}

export default class RootStore {
  static defaultState: DefaultState = {
    lists: [],
  }

  @observable lists: List[]

  constructor(initialState: DefaultState) {
    extendObservable(this, { ...RootStore.defaultState, ...initialState })
  }

  @action getLists = (): List[] => {
    return this.lists
  }

  @action getActiveLists = (): List[] => {
    return this.lists.filter(list => !list.isArchived)
  }

  @action getArchivedLists = (): List[] => {
    return this.lists.filter(list => list.isArchived)
  }
}
