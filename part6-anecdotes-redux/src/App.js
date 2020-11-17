import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import AnecdoteFilter from './components/AnecdoteFilter'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
			<Notification />
			<AnecdoteForm />
			<AnecdoteFilter />
			<AnecdoteList />
    </div>
  )
}

export default App