import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Platform
} from 'react-native'

import Sound from 'react-native-sound'
import { Grid, Row, Col } from 'react-native-elements'

export default class EffectsView extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isPlaying: false,
      isLoaded: false
    }

    this.sound = null
    this.onPlaySound = this.onPlaySound.bind(this)
    this.onStopSound = this.onStopSound.bind(this)
  }

  componentDidMount () {
    if (!this.props.audioPath) {
      return
    }

    const PathWithoutProtocol = this.props.audioPath.replace(/.*?:\/\//g, '')
    this.sound = new Sound(PathWithoutProtocol, '', (error) => {
      if (error) {
        console.warn('failed to load the sound', error)
      }

      let isloaded = this.sound.isLoaded()
      this.setState({isloaded: isloaded})
    })
  }

  onHandleEffects (name) {
    switch (name) {
      case 'snail':
        this.sound.setSpeed(0.5)
        this.onPlaySound()
        break
      case 'rabbit':
        this.sound.setSpeed(2)
        this.onPlaySound()
        break
      case 'chipmunk':
      case 'vader':
      case 'echo':
      case 'reverb':
        break
    }
  }

  onPlaySound () {
    if (this.state.isPlaying) {
      console.warn('Sounds is already being played')
      return
    }

    this.setState({ isPlaying: true })
    this.sound.play((success) => {
      if (!success) {
        this.setState({ isPlaying: false })
        console.warn('playback failed due to audio decoding errors')
      }

      this.setState({ isPlaying: false })
      console.warn('successfully finished playing')
    })
  }

  onStopSound () {
    if (!this.state.isPlaying) {
      return
    }

    this.setState({ isPlaying: false })
    this.sound.stop()
  }

  render () {
    let buttonIconDesactive = this.state.isPlaying ? styles.buttonIcon : styles.buttonIconDesactive
    return (
      <View style={styles.container}>
        <Grid>
          <Col>
            <Row>
              <TouchableHighlight
                onPress={this.onHandleEffects.bind(this, 'snail')}
                style={styles.buttonIcon}>
                <Image
                  source={require('../assets/images/snail.png')}
                  style={styles.icon}
                />
              </TouchableHighlight>
            </Row>
          </Col>
          <Col>
            <Row>
              <TouchableHighlight
                onPress={this.onHandleEffects.bind(this, 'rabbit')}
                style={styles.buttonIcon}>
                <Image
                  source={require('../assets/images/rabbit.png')}
                  style={styles.icon}
                />
              </TouchableHighlight>
            </Row>
          </Col>
        </Grid>
        <TouchableHighlight
          onPress={this.onStopSound}
          style={buttonIconDesactive}>
          <Image
            source={require('../assets/images/stopButton.png')}
            style={styles.icon}
          />
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonIcon: {
    flex: 1,
    opacity: 1
  },
  buttonIconDesactive: {
    flex: 1,
    opacity: 0.5
  },
  icon: {
    flex: 1,
    maxWidth: 80,
    maxHeight: 80,
    alignSelf: 'center',
    margin: 10
  }
})
