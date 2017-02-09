import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

import Sound from 'react-native-sound'
import { AudioUtils } from 'react-native-audio'

export default class EffectsView extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isPlaying: false,
      audioPath: AudioUtils.DocumentDirectoryPath + '/test.aac'
    }

    this.onPlaySoundEffect = this.onPlaySoundEffect.bind(this)
  }

  onPlaySoundEffect () {
    // These timeouts are a hacky workaround for some issues with react-native-sound.
    // See https://github.com/zmxv/react-native-sound/issues/89.
    setTimeout(() => {
      let sound = new Sound(this.state.audioPath, '', (error) => {
        if (error) {
          console.warn('failed to load the sound', error)
        }
      })

      setTimeout(() => {
        sound.play((success) => {
          this.setState({ isPlaying: true })

          if (success) {
            console.warn('successfully finished playing')
          } else {
            console.warn('playback failed due to audio decoding errors')
          }
        })
      }, 100)
    }, 100)
  }

  render () {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.onPlaySoundEffect}>
          <Icon name='ios-play' size={80} color='#5856d6' />
        </TouchableHighlight>
        <Text>Tap to Play</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
