import React, { Component } from 'react'
import RecordView from './container/RecordView'
import EffectsView from './container/EffectsView'

import { Navigator, Text, Button } from 'react-native'

export default class App extends Component {
  onLeftButton (route, navigator, index, navState) {
    if (route.name === 'record') {
      return null
    }
    return (
      <Button
        onPress={() => { if (index > 0) { navigator.pop() } }}
        title="Previous"
      />
    )
  }
  onRightButton (route, navigator, index, navState) {
    if (route.name === 'effects') {
      return null
    }

    return (
      <Button
        onPress={() => navigator.push({ name: 'effects' })}
        title="Effects"
      />
    )
  }
  render () {
    return (
      <Navigator
        initialRoute={{
          name: 'record',
          title: 'Pitch Perfect'
        }}
        renderScene={(route, navigator) => {
          switch (route.name) {
            case 'record':
              return <RecordView navigator={navigator} {...route.passProps} />
            case 'effects':
              return <EffectsView navigator={navigator} {...route.passProps} />
            default:
              return <RecordView navigator={navigator} {...route.passProps} />
          }
        }}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={{
              LeftButton: this.onLeftButton,
              RightButton: this.onRightButton,
              Title: (route) => { return <Text>{route.title}</Text> }
            }}
            style={{backgroundColor: '#c7c7cc'}}
          />
        }
        style={{paddingTop: 60}}
      />
    )
  }
}
