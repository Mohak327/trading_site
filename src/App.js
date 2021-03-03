import React from 'react'
import logo from './logo.svg'
import './App.css'
import Header from './Header'
import Newsfeed from './Newsfeed'
import Stats from './Stats'

function App () {
  return (
    <div className='App'>
      {/* header */}
      <div className='app__header'>
        <Header />
      </div>
      <div className='app__body'>
        <div className='app__container'>
          <Newsfeed />
          <Stats />
        </div>
      </div>
    </div>
  )
}

export default App
