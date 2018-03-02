import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import counterReducer from './counterReducer'

const store = createStore(counterReducer)

const Statistiikka = () => {
  const state = store.getState()
  const palautteita = state.good + state.ok + state.bad
  if (palautteita === 0) {
    return (
      <div>
        <h2>statistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  const keskiArvo = () => {
    const keskiarvo = (state.good - state.bad) / (state.good + state.bad + state.ok)

    if (keskiarvo < 0) {
      return 0
    }
    return keskiarvo
  }

  const positiivisia = () => {
    const positiivisia = 100 * state.good / (state.good + state.bad + state.ok)
    return positiivisia
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{state.good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{state.ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{state.bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{keskiArvo()}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{positiivisia()}</td>
          </tr>
        </tbody>
      </table>

      <button onClick={e => store.dispatch({ type: 'ZERO' })}>nollaa tilasto</button>
    </div >
  )
}

class App extends React.Component {

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={e => store.dispatch({ type: 'GOOD'})}>hyvä</button>
        <button onClick={e => store.dispatch({ type: 'OK'})}>neutraali</button>
        <button onClick={e => store.dispatch({ type: 'BAD'})}>huono</button>
        <Statistiikka />
      </div>
    )
  }
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
