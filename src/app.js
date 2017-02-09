import React, { Component } from 'react'
import { NativeRouter as Router, Route, nativeHistory, Switch } from 'react-router-native'

import Navigation from './components/Navigation'
import RecordView from './container/RecordView'
import EffectsView from './container/EffectsView'

export default class App extends Component {
  render () {
    return (
      <Router history={nativeHistory} >
        <Switch>
          <Route exact path='/' component={RecordView} />
          <Route path='/effects' component={EffectsView} />
        </Switch>
      </Router>
    )
  }
}
