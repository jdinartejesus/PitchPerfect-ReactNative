import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native'

import Navigation from '../components/Navigation'
import {Grid, Row, Col} from 'react-native-elements';

export default class EffectsView extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Navigation title='PitchPerfect' />
        <Grid>
          <Row>
            <Col>
              <TouchableHighlight>
                <Text>Sound Effect 1</Text>
              </TouchableHighlight>
            </Col>
            <Col>
              <TouchableHighlight>
                <Text>Sound Effect 2</Text>
              </TouchableHighlight>
            </Col>
          </Row>
          <Row>
            <Col>
              <TouchableHighlight>
                <Text>Sound Effect 3</Text>
              </TouchableHighlight>
            </Col>
            <Col>
              <TouchableHighlight>
                <Text>Sound Effect 4</Text>
              </TouchableHighlight>
            </Col>
          </Row>
          <Row>
            <Col>
              <TouchableHighlight>
                <Text>Sound Effect 5</Text>
              </TouchableHighlight>
            </Col>
            <Col>
              <TouchableHighlight>
                <Text>Sound Effect 6</Text>
              </TouchableHighlight>
            </Col>
          </Row>
          <Row>
            <TouchableHighlight>
              <Text>Pause</Text>
            </TouchableHighlight>
          </Row>
        </Grid>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
