import React, { Component, Fragment } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from'react-router-dom'
import Setup from './Setup';
import Game from './Game';
// const Name  = props => {
//   return <div>{props.name}</div>
// }

// Name.propTypes = {
//   name: PropTypes.string
// }

// Name.defaultProps = {
//   name: 'Nie podales name'
// }




class App extends Component {

  constructor() {
    super()
    this.state = {
      hasStarted: false,
      name: '',
      difficulty: ''
    }

    this.setupGame = this.setupGame.bind(this)
  }

  setupGame(name, difficulty, callback) {
    this.setState({
      name,
      difficulty,
      hasStarted: true
    }, callback)
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route 
            exact
            path='/'
            // component={Setup} 
            render={props => (
              <Setup 
                onSubmit={this.setupGame} 
                history = {props.history}
              />
            )}
          />
          <Route
            exact
            path='/game'
            render={props => (
            <Game 
              hasStarted={this.state.hasStarted}
              history={props.history} 
              username={this.state.name}
              difficulty={this.state.difficulty}
            />
          )}
          />
          <Route 
            render ={() => <p>404 page not found</p>}
          />
        </Switch>
      </BrowserRouter>

    );
  }
}

export default App;
