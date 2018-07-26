// @flow

import React, { Component } from 'react'
import type { ObserverScreenProps } from '../types/ObserverScreenProps'
import { RootStore } from '../stores/RootStore'

export default class BaseScreenComponent<Props, State> extends Component<ObserverScreenProps & Props, State> {
  get store(): RootStore {
    return this.props.store
  }

  get navigation() {
    return this.props.navigation
  }
}
