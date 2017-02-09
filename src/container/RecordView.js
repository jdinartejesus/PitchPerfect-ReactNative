import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Platform,
  PermissionsAndroid
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import { Link } from 'react-router-native'

import Sound from 'react-native-sound'
import { AudioRecorder, AudioUtils } from 'react-native-audio'

export default class RecordView extends Component {
  constructor (props) {
    super(props)

    this.state = {
      recording: false,
      stoppedRecording: false,
      audioPath: AudioUtils.DocumentDirectoryPath + '/test.aac',
      hasPermission: undefined,
    }

    this.onToggleRecord = this.onToggleRecord.bind(this)
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentDidMount () {
    this._checkPermission().then((hasPermission) => {
      this.setState({hasPermission})

      if(!hasPermission) {
        return
      }

      this._prepareRecordingSettings(this.state.audioPath)

      AudioRecorder.onProgress = (data) => {
        this.setState({recording: true})
      }

      AudioRecorder.onFinished = (data) => {
        if (Platform.OS === 'ios') {
           // Android callback comes in the form of a promise instead.
          this._finishRecording(data.status === "OK", data.audioFileURL)
        }
      }
    })
  }

  _prepareRecordingSettings (audioPath) {
    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: "Low",
      AudioEncoding: "aac"
    })
  }

  _checkPermission() {
    if (Platform.OS !== 'android') {
      return Promise.resolve(true)
    }

    const rationale = {
      'title': 'Microphone Permission',
      'message': 'AudioExample needs access to your microphone so you can record audio.'
    }

    return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, rationale)
      .then((result) => {
        return (result === true || result === PermissionsAndroid.RESULTS.GRANTED)
    })
  }

  redirectToNextScreen () {
    return this.context.router.push('/effects/')
  }

  onToggleRecord () {
    if (this.state.recording && !this.state.stoppedRecording) {
      console.warn('Stop Recording')
      this.stopRecording()
      return
    }
    
    console.warn('Recording')
    this.startRecording()
  }

  startRecording () {
    if (this.state.recording) {
      console.warn('Already Recording')
      return
    }

    if (!this.state.hasPermission) {
      console.warn('Can\'t record, no permission granted!')
      return
    }

    this.setState({recording: true})

    try {
      AudioRecorder.startRecording()
    } catch (err) {
      console.error(err)
    }
  }

  stopRecording () {
    if (!this.state.recording) {
      console.warn('Can\'t stop, not recording!')
      return
    }

    this.setState({stoppedRecording: true, recording: false})

    try {
      AudioRecorder.stopRecording()
    } catch (error) {
      console.error(error)
    }
  }

  _finishRecording(didSucceed, filePath) {
    this.setState({ stoppedRecording: didSucceed })
    this.redirectToNextScreen()
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
