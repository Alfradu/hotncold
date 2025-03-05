import { useState, useCallback } from 'react'
import strangeDevice from './assets/strange-device.png'
import './App.css'
import Hitsplat from './hitsplat.tsx'

function App() {
  const [health, setHealth] = useState(78);
  const [takingDmg, setTakingDmg] = useState(false);
  const [damage, setDamage] = useState(0);
  const [hitsplatPosition, setHitsplatPosition] = useState({
    x: 0,
    y: 0
  });

  const HandleUpdateDamage = useCallback(() => {
    setTakingDmg(true);    
    var currDmg = Math.floor(Math.random() * 10)+1
    setDamage(currDmg);
    setHealth((health) => health - currDmg);
    setHitsplatPosition({
      x: (Math.random() * 300)+window.innerWidth/2-150,
      y: (Math.random() * 300)+window.innerHeight/2-150
    });
    setTimeout(() => {
      setTakingDmg(false);
    }, 500);
  },[health]);

  return (
    <>
      <h1>Strange Device</h1>
      {health > 1 && takingDmg && <Hitsplat x={hitsplatPosition.x} y={hitsplatPosition.y} damage={damage} /> }
      <progress className="healthBar" id="health" value={health} max="78"></progress>
        <button onClick={() => !takingDmg && HandleUpdateDamage()}>
          <img src={strangeDevice} className="logo" alt="strange device" />
        </button>
    </>
  )
}

export default App
