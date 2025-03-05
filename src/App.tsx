import { useState } from 'react'
import strangeDevice from './assets/strange-device.png'
import hitSplat from './assets/hitsplat.png'
import './App.css'

function App() {
  const [health, setHealth] = useState(10)

  return (
    <>
      <h1>Strange Device</h1>
      <progress id="health" value={health} max="10"></progress>
      <img src={hitSplat} />
        <button onClick={() => setHealth((health) => health - 1)}>
          <img src={strangeDevice} className="logo" alt="Vite logo" />

        </button>
    </>
  )
}

export default App
