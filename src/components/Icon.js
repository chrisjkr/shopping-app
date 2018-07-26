// @flow

import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Platform } from 'react-native'

type Props = {
  name: string,
}

export default function Icon({ name, ...props }: Props) {
  const platformIconName = `${Platform.OS === 'ios' ? 'ios' : 'md'}-${name}`;

  return <Ionicons
    {...props}
    name={platformIconName}
  />
}
