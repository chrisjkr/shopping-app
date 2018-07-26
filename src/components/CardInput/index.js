// @flow

import React from 'react'
import { Card, Input } from 'native-base'

import styles from './styles'

type Props = {
  onChange: () => void,
}

export default function CardInput({ onChange }: Props) {

  return (
    <Card style={styles.card}>
      <Input placeholder='New item' />
    </Card>
  )
}
