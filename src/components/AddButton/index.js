// @flow

import React from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from '../Icon'
import colours from '../../constants/colours'
import styles from './styles'


type Props = {
  onPress: () => void,
}

export default function AddButton({ onPress }: Props) {

  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Icon name={'add-circle'} size={64} color={colours.mainColour} />
    </TouchableOpacity>
  )
}
