import React, { Component } from 'react'
import { StyleSheet, View, TouchableHighlight, Image } from 'react-native'

import { default as Sound } from 'react-native-sound'
import { Grid, Row, Col } from 'react-native-elements'

import ModalWarning from '../components/modalWarning'

export default class EffectsView extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isPlaying: false,
      isLoaded: false,
      modal: false
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
    })
    // TODO: check when this is set true on lib
    // let isLoaded = this.sound.isLoaded()
    // this.setState({ isLoaded })
  }

  onHandleEffects (name) {
    if (!this.props.audioPath) {
      return
    }

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
      this.setState({ modal: true })
      console.warn('Sounds is already being played')
      return
    }

    this.sound.setVolume(1.0)
    this.setState({ isPlaying: true })
    this.sound.play((success) => {
      if (!success) {
        this.setState({ isPlaying: false, modal: true })
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
    const { isPlaying, isLoaded } = this.state
    let buttonStopIconDesactive = isPlaying ? styles.buttonIcon : styles.buttonIconDesactive
    let buttonIconDesactive = isLoaded ? styles.buttonIcon : styles.buttonIconDesactive
    return (
      <View style={styles.container}>
        <Grid>
          <Col>
            <Row>
              <TouchableHighlight
                onPress={this.onHandleEffects.bind(this, 'snail')}
                style={buttonIconDesactive}

                >
                <Image
                  source={require('../assets/images/snail.png')}
                  style={styles.icon}
                />
              </TouchableHighlight>
            </Row>
            <Row>
              <TouchableHighlight
                onPress={this.onHandleEffects.bind(this, 'rabbit')}
                style={buttonIconDesactive}>
                <Image
                  source={require('../assets/images/vader.png')}
                  style={styles.icon}
                />
              </TouchableHighlight>
            </Row>
            <Row>
              <TouchableHighlight
                onPress={this.onHandleEffects.bind(this, 'rabbit')}
                style={buttonIconDesactive}>
                <Image
                  source={require('../assets/images/reverb.png')}
                  style={styles.icon}
                />
              </TouchableHighlight>
            </Row>
          </Col>
          <Col>
            <Row>
              <TouchableHighlight
                onPress={this.onHandleEffects.bind(this, 'rabbit')}
                style={buttonIconDesactive}>
                <Image
                  source={require('../assets/images/rabbit.png')}
                  style={styles.icon}
                />
              </TouchableHighlight>
            </Row>
            <Row>
              <TouchableHighlight
                onPress={this.onHandleEffects.bind(this, 'rabbit')}
                style={buttonIconDesactive}>
                <Image
                  source={require('../assets/images/chipmunk.png')}
                  style={styles.icon}
                />
              </TouchableHighlight>
            </Row>
            <Row>
              <TouchableHighlight
                onPress={this.onHandleEffects.bind(this, 'rabbit')}
                style={buttonIconDesactive}>
                <Image
                  source={require('../assets/images/echo.png')}
                  style={styles.icon}
                />
              </TouchableHighlight>
            </Row>
          </Col>
        </Grid>
        <View style={styles.stopButtonView}>
          <TouchableHighlight
            onPress={this.onStopSound}
            style={buttonStopIconDesactive}>
            <Image
              source={require('../assets/images/stopButton.png')}
              style={styles.stopButtonIcon}
            />
          </TouchableHighlight>
        </View>
        <ModalWarning message="Hello World" visible={this.state.modal} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonIcon: {
    flex: 1,
    opacity: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonIconDesactive: {
    flex: 1,
    opacity: 0.5
  },
  icon: {
    flex: 1,
    maxWidth: 100,
    maxHeight: 100,
    alignSelf: 'center',
    margin: 10
  },
  stopButtonView: {
    maxHeight: 100,
    margin: 10,
    position: 'relative',
    bottom: 0,
    left: 0,
    right: 0
  },
  stopButtonIcon: {
    flex: 1,
    maxWidth: 80,
    maxHeight: 80,
    alignSelf: 'center',
    margin: 10
  }
})
