// @flow

import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Platform, TouchableOpacity } from 'react-native'

type Props = {
  name: string,
  onPress?: () => void,
}

export default function Icon({ name, onPress, ...props }: Props) {
  const platformIconName = `${Platform.OS === 'ios' ? 'ios' : 'md'}-${name}`;

  const icon = <Ionicons
    {...props}
    name={platformIconName}
  />

  let component
  if (onPress != null) {
    component = (
      <TouchableOpacity onPress={onPress}>
        {icon}
      </TouchableOpacity>
    )
  } else {
    component = icon
  }

  return component
}
