// @flow

import { Dimensions } from 'react-native'
import { Toast } from 'native-base'

const { height } = Dimensions.get('window')

export default class ToastService {
  static show(params: Object) {
    if (!params.style) params.style = {}
    Toast.show({
      ...params,
      style: {
        marginBottom: height * 0.07,
        left: 10,
        width: '70%',
        ...params.style,
      },
    })
  }
}
