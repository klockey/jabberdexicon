import React, { Component } from 'react'
import List from './List'

class App extends Component {
  state = {
    items: []
  }

  requestItem (item) {
    // the URL to "get" todo items
    const url = `https://one-list-api.herokuapp.com/items?access_token=${item}`
    // make an AJAX request to that URL
    window.fetch(url)
      // fetch returns a promsise, which yeilds the "response", we call it 'r'
      // The response has a method json(), that returns another promise
      .then(r => r.json())
      // then JSON is done parsing, the promise will yeild the "data"
      .then(data => {
        // use the data as the state for our items
        this.setState({
          items: data
        })
      })
  }

  _submit = (event) => {
    event.preventDefault()
    const input = this.refs.todoText
    this.requestItem(input.value)
    input.value = ''
  }

  render () {
    return <div className='App'>
      <header />
      <main>
        <List
          items={this.state.items}
          toggleComplete={this.toggleComplete} />
        <form onSubmit={this._submit}>
          <input type='text' ref='todoText' />
        </form>
      </main>
      <footer />
    </div>
  }
}

export default App
