// @flow

import BaseScreenComponent from './BaseScreenComponent'

export default class FormScreenComponent<Props, State> extends BaseScreenComponent<Props, State> {
  handleInputChange = (key: string) => {
    return (value: any) => {
      this.setState({ [key]: value })
    }
  }
}
