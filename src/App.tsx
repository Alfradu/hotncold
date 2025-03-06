import { useState, useCallback, useEffect } from 'react'
import strangeDevice from './assets/strange-device.png'
import './css/App.css'
import Hitsplat from './hitsplat.tsx'
import { headingToOrientation } from './utils/utils.tsx'
import { geoGoal1, geoGoal2, geoTest } from './constants.tsx'
import { headingDistanceTo, normalizeHeading } from 'geolocation-utils'

function App() {
  const [geoLocation, setGeoLocation] = useState({
    latitude: 0,
    longitude: 0
  })
  const [testing, setTesting] = useState(true);
  const [goal, setGoal] = useState({ latitude: 0, longitude: 0 });
  const [goalDistance, setGoalDistance] = useState({heading: 0, distance: 0});
  const [health, setHealth] = useState(78);
  const [takingDmg, setTakingDmg] = useState(false);
  const [damage, setDamage] = useState(0);
  const [hitsplatPosition, setHitsplatPosition] = useState({
    x: 0,
    y: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (health < 78 && !takingDmg) 
        if (health +10 > 78) setHealth(78)
        else setHealth(health + 10);
    }, 5 * 1000);
  
    return () => {
      clearInterval(interval);
    };
  }, [health, takingDmg]);

  const HandleUpdateDamage = useCallback(() => {
    var currDmg = Math.floor(Math.random() * 10) + 3;
    if (health == 0) return;
    setTakingDmg(true);
    setDamage(currDmg);
    if (health-currDmg < 0) setHealth(0);
    else setHealth(health-currDmg);
    setHitsplatPosition({
      x: (Math.random() * 300) + window.innerWidth / 2 - 150,
      y: (Math.random() * 300) + window.innerHeight / 2 - 150
    });
    if (navigator.geolocation && !testing) {
      navigator.geolocation.getCurrentPosition((position: { coords: { latitude: number; longitude: number; }; }) => {
        setGeoLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
        const headingDist = headingDistanceTo(position.coords, goal);
        setGoalDistance(headingDist);
      }, () => console.log("Unable to retrieve your location"), { enableHighAccuracy: true } );
    } else {
      setGeoLocation({
        latitude: geoTest.latitude,
        longitude: geoTest.longitude
      });
      const headingDist = headingDistanceTo(geoTest, goal);
      setGoalDistance(headingDist);
    }
    setTimeout(() => {
      setTakingDmg(false);
    }, 500);
  }, [health, goal, testing, geoTest]);

  const HandleUpdateGoal = useCallback(() => {
    const element = document.getElementById('input') as HTMLInputElement;
    switch (element.value.toLowerCase()) {
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
      <h2>Strange Device</h2>
      {takingDmg && <Hitsplat x={hitsplatPosition.x} y={hitsplatPosition.y} damage={damage} />}
      <progress className="healthBar" id="health" value={health} max="78"></progress>
      <button className="deviceBtn" disabled={goal.latitude == 0 && goal.latitude == 0} onClick={() => !takingDmg && HandleUpdateDamage()}>
        <img src={strangeDevice} className="logo" alt="strange device" />
      </button>
      <input type="checkbox" id="testing" name="testing" checked={testing} onChange={() => setTesting(!testing)}></input>
      <input id="input" onChange={HandleUpdateGoal}></input>
      {testing &&
        <><br/><span>pos Lat {geoLocation.latitude} ,pos Long {geoLocation.longitude}</span>
          <br/><span>goal Lat {goal.latitude} ,goal Long {goal.longitude}</span>
          <br/><span>Distance: {Math.floor(goalDistance.distance)} m</span>
          <br/><span>Heading: {headingToOrientation(normalizeHeading(goalDistance.heading))}</span>
          </>
      }
    </>
  )
}

export default App
