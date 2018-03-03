import React from 'react';


class App extends React.Component {
  addVote = (id) => {
    this.props.store.dispatch({
      type: 'ADD_LIKE',
      data: { id }
    })
  }

  addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    this.props.store.dispatch({
      type: 'NEW_ANECDOTE',
      data: {
        content: content
      }
    })
    event.target.anecdote.value = ''
  }

  sortByVotes = (a, b) => {
    return parseInt(b.votes, 10) - parseInt(a.votes, 10)
  }

  render() {
    const anecdotes = this.props.store.getState()
    anecdotes.sort(this.sortByVotes)
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={e => this.addVote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.addAnecdote}>
          <div><input name="anecdote" /></div>
          <button type="submit">create</button>
        </form>
      </div>
    )
  }
}

export default App
