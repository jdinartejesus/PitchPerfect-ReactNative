import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'

export default class Navigation extends Component {
  render () {
    const {
      title
    } = this.props

    return (
      <View style={styles.navigation} >
        <Text>{title}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  navigation: {
    alignItems: 'center',
    backgroundColor: '#c7c7cc',
    flex: 1,
    justifyContent: 'center',
    marginTop: 20,
    maxHeight: 70
  }
})
