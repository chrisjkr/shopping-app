// @flow

import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Text, Card } from 'native-base'
import formatDistance from 'date-fns/formatDistance'

import styles from './styles'
import type { List } from '../../types/List'
import Icon from '../Icon'
import BaseScreenComponent from '../BaseScreenComponent'

type Props = {
  list: List,
  onPress?: (list: List) => void,
  onArchivePress?: (listId: string) => void,
  onUnarchivePress?: (listId: string) => void,
  onRemovePress?: (listId: string) => void,
}

type State = {
  createdTimeText: string,
}

export default class ListItem extends BaseScreenComponent<Props, State> {
  state = {
    createdTimeText: '',
  }

  createdTimeInterval: *

  componentDidMount() {
    this.refreshCreatedTime()
    this.createdTimeInterval = setInterval(this.refreshCreatedTime, 30 * 1000)
  }

  componentWillUnmount() {
    clearInterval(this.createdTimeInterval)
  }

  refreshCreatedTime = () => {
    const createdTimeText = `${formatDistance(
      this.props.list.createdAt,
      new Date(),
    )} ago`
    this.setState({ createdTimeText })
  }

  render() {
    const { list, onPress, onArchivePress, onUnarchivePress, onRemovePress } = this.props
    return (
      <TouchableOpacity onPress={onPress ? () => onPress(list) : undefined}>
        <Card style={styles.card}>
          <View style={styles.listInfo}>
            <Text style={styles.listName} numberOfLines={1}>{list.name}</Text>
            <Text style={styles.createdTime}>{this.state.createdTimeText}</Text>
          </View>
          {onArchivePress ? (
            <Icon
              name="archive"
              size={28}
              onPress={() => onArchivePress(list.id)}
              style={styles.icon}
            />
          ) : null}
          {onUnarchivePress ? (
            <Icon
              name="list"
              size={28}
              onPress={() => onUnarchivePress(list.id)}
              style={styles.icon}
            />
          ) : null}
          {onRemovePress ? (
            <Icon
              name='trash'
              size={22}
              onPress={() => onRemovePress(list.id)}
              style={styles.icon}
            />
          ) : null}
        </Card>
      </TouchableOpacity>
    )
  }
}
