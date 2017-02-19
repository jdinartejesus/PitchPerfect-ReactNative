import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

import Sound from 'react-native-sound'
import { AudioUtils } from 'react-native-audio'

import { Grid, Row, Col } from 'react-native-elements';

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
        <Grid>
          <Col>
            <Row>
              <TouchableHighlight>
                <Image
                  source={require('../assets/images/rabbit.png')}
                  style={{width: 100, height: 100}}
                />
              </TouchableHighlight>
            </Row>
          </Col>
          <Col>
            <Row>
              <TouchableHighlight>
                <Image
                  source={require('../assets/images/snail.png')}
                  style={{width: 100, height: 100}}
                />
              </TouchableHighlight>
            </Row>
          </Col>
        </Grid>
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
