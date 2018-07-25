// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Container,
  Text,
} from 'native-base'


type Props = {

}

type State = {

}

@connect((state, props) => ({

}))
export default class NewItem extends Component<Props, State> {

  render() {
    return (
      <Container>
        <Text>New item</Text>
      </Container>
    )
  }
}
