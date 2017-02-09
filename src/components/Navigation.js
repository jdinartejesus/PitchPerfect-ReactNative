import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native'

import {Grid, Col} from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'

// TODO: Replace with StatusBar
export default class Navigation extends Component {
  render () {
    const {
      title
    } = this.props

    const navStyle = {
      navTitle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      navButtonsBack: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        margin: 10
      },
      navButtonsNext: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        margin: 10
      }
    }

    return (
      <View style={styles.navigation} >
        <Grid>
          <Col style={navStyle.navButtonsBack}>
            <TouchableHighlight >
              <Icon name='ios-arrow-back' size={20} color='#5856d6' />
            </TouchableHighlight>
          </Col>
          <Col style={navStyle.navTitle}>
            <Text>{title}</Text>
          </Col>
          <Col style={navStyle.navButtonsNext}>
            <TouchableHighlight >
              <Icon name='ios-arrow-forward' size={20} color='#5856d6' />
            </TouchableHighlight>
          </Col>
        </Grid>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  navigation: {
    backgroundColor: '#c7c7cc',
    flex: 1,
    marginTop: 20,
    maxHeight: 70
  }
})
