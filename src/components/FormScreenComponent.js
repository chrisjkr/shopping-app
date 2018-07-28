// @flow

import BaseScreenComponent from './BaseScreenComponent'
import { Dimensions } from 'react-native'

const { height } = Dimensions.get('window')

export default class FormScreenComponent<Props, State> extends BaseScreenComponent<Props, State> {
  toastStyle = {
    marginBottom: height * 0.15,
    width: '100%',
  }

  handleInputChange = (key: string) => {
    return (value: any) => {
      this.setState({ [key]: value })
    }
  }
}
