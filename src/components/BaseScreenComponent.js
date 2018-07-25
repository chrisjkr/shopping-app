// @flow

import React, { Component } from 'react'
import type { ObserverScreenProps } from '../types/ObserverScreenProps'
import RootStore from '../stores/RootStore'

export default class BaseScreenComponent<Props> extends Component<ObserverScreenProps & Props> {
  get store(): RootStore {
    return this.props.store
  }
}
