import { useState, useCallback } from 'react'
import strangeDevice from './assets/strange-device.png'
import './App.css'
import Hitsplat from './hitsplat.tsx'
import haversineDistanceKM from './utils.tsx'

function App() {
  const geoGoal1 = {
    latitude: 59.8604189,
    longitude: 17.6034489
  }
  const geoGoal2 = {
    latitude: 59.861524,
    longitude: 17.603079
  }
  const [geoLocation, setGeoLocation] = useState({
    latitude: 0,
    longitude: 0
  })

  const [goal, setGoal] = useState({ latitude: 0, longitude: 0 });
  const [goalDistance, setGoalDistance] = useState(0);
  const [health, setHealth] = useState(78);
  const [takingDmg, setTakingDmg] = useState(false);
  const [damage, setDamage] = useState(0);
  const [hitsplatPosition, setHitsplatPosition] = useState({
    x: 0,
    y: 0
  });

  const HandleUpdateDamage = useCallback(() => {
    setTakingDmg(true);
    var currDmg = Math.floor(Math.random() * 10) + 1
    setDamage(currDmg);
    setHealth((health) => health - currDmg);
    setHitsplatPosition({
      x: (Math.random() * 300) + window.innerWidth / 2 - 150,
      y: (Math.random() * 300) + window.innerHeight / 2 - 150
    });
    setTimeout(() => {
      setTakingDmg(false);
    }, 500);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: { coords: { latitude: number; longitude: number; }; }) => {
        setGeoLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
        //TODO: initial haversine calc is wrong?? fix
        setGoalDistance(haversineDistanceKM(position.coords.latitude, position.coords.longitude, goal.latitude, goal.longitude))
      }, () => console.log("Unable to retrieve your location"));
    } else {
      console.log("Geolocation not supported");
    }
  }, [health]);

  const HandleUpdateGoal = useCallback(() => {
    const element = document.getElementById('input') as HTMLInputElement;
    switch (element.value) {
      case ("goal1"):
        setGoal(geoGoal1)
        break;
      case ("goal2"):
        setGoal(geoGoal2)
        break;
      default:
        setGoal({
          latitude: 0,
          longitude: 0
        })
    }
  }, []);

  return (
    <>
      <input id="input" onChange={HandleUpdateGoal}></input>
      <br></br>
      <span>pos Lat {geoLocation.latitude} ,pos Long {geoLocation.longitude}</span>
      <br></br>
      <span>goal Lat {goal.latitude} ,goal Long {goal.longitude}</span>
      <br></br>
      <span>Distance: {goalDistance} m</span>
      <h1>Strange Device</h1>
      {health > 1 && takingDmg && <Hitsplat x={hitsplatPosition.x} y={hitsplatPosition.y} damage={damage} />}
      <progress className="healthBar" id="health" value={health} max="78"></progress>
      <button onClick={() => !takingDmg && HandleUpdateDamage()}>
        <img src={strangeDevice} className="logo" alt="strange device" />
      </button>
    </>
  )
}

export default App
