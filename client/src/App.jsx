import { useState } from 'react'
import './App.css'
import UpcomingMatches from './components/Matches'

function App() {
  const [count, setCount] = useState(0)


  return (
    <>
      <UpcomingMatches/>
    </>
  )
}

export default App
