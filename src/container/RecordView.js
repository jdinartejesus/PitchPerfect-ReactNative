import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import { Link } from 'react-router-native'
import Navigation from '../components/Navigation'

export default class RecordView extends Component {
  constructor (props) {
    super(props)

    this.state = {
      recording: false
    }

    this.onToggleRecord = this.onToggleRecord.bind(this)
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  onToggleRecord () {
    this.setState({recording: !this.state.recording})

    if (!this.state.recording) {
      this.context.router.push('/effects')
    }
  }

  render () {
    let recordingTextStateUI = () => {
      if (!this.state.recording) {
        return <Text style={styles.recordText} >Tap to Record</Text>
      }
      return <Text style={styles.recordText}>Recording...</Text>
    }
    return (
      <View style={styles.container}>
        <Navigation title='PitchPerfect' />
        <View style={styles.recordWrapper}>
          <TouchableHighlight
            style={styles.recordButton}
            underlayColor='transparent'
            onPress={this.onToggleRecord}
            >
            <Icon name='ios-mic' size={80} color='#5856d6' />
          </TouchableHighlight>
          { recordingTextStateUI() }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  recordWrapper: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  recordButton: {
    margin: 10
  },
  recordText: {
    color: '#5856d6'
  }
})
