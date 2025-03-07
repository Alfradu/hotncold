import React, { useState, useCallback, useEffect, useRef } from 'react';
import strangeDevice from './assets/strange-device.png';
import './css/App.css';
import Hitsplat from './hitsplat.tsx';
import { geoGoal1, geoGoal2, geoTest } from './constants.tsx';
import {
  HeadingDistance,
  headingDistanceTo,
  LatitudeLongitude,
} from 'geolocation-utils';
import Stats from './Stats.tsx';

function App() {
  const initGoal: string = window.sessionStorage.getItem('goal') || '';
  const initGoalLoc: LatitudeLongitude = JSON.parse(
    window.sessionStorage.getItem('goalLoc') || 'null'
  ) || { latitude: 0, longitude: 0 };
  const initHealth: number = parseInt(
    window.sessionStorage.getItem('health') || '78'
  );
  const [geoLocation, setGeoLocation] = useState<LatitudeLongitude>({
    latitude: 0,
    longitude: 0,
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const [goal, setGoal] = useState<string>(''); //goal needs to be set empty here to avoid things with input field
  const [goalLoc, setGoalLoc] = useState<LatitudeLongitude>(initGoalLoc);
  const [goalDistance, setGoalDistance] = useState<HeadingDistance>({
    heading: 0,
    distance: 0,
  });
  const [health, setHealth] = useState<number>(initHealth);
  const [takingDmg, setTakingDmg] = useState<boolean>(false);
  const [damage, setDamage] = useState<number>(0);
  const [hitsplatPosition, setHitsplatPosition] = useState({
    x: 0,
    y: 0,
  });
  const [orbText, setOrbText] = useState('asdasd');

  //todo remove?
  const [testing, setTesting] = useState<boolean>(true);

  useEffect(() => {
    setGoal(initGoal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (inputRef.current && goal != '') {
      inputRef.current.value = goal;
    }
  }, [goal]);

  useEffect(() => {
    window.sessionStorage.setItem('health', health.toString());
    window.sessionStorage.setItem('goal', goal);
    window.sessionStorage.setItem('goalLoc', JSON.stringify(goalLoc));
  }, [health, goal, goalLoc]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (health < 78 && !takingDmg)
        if (health + 10 > 78) setHealth(78);
        else setHealth(health + 10);
    }, 5 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [health, takingDmg]);

  const HandleUpdateDamage = useCallback(() => {
    const currDmg = Math.floor(Math.random() * 10) + 3;
    if (health == 0) return;
    setTakingDmg(true);
    setDamage(currDmg);
    setHealth(health - currDmg < 0 ? 0 : health - currDmg);
    setHitsplatPosition({
      x: Math.random() * 300 + window.innerWidth / 2 - 150,
      y: Math.random() * 300 + window.innerHeight / 2 - 150,
    });
    if (navigator.geolocation && !testing) {
      navigator.geolocation.getCurrentPosition(
        (position: { coords: LatitudeLongitude }) => {
          setGeoLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          const headingDist = headingDistanceTo(position.coords, goalLoc);
          setGoalDistance(headingDist);
        },
        () => console.log('Unable to retrieve your location'),
        { enableHighAccuracy: true }
      );
    } else {
      setGeoLocation({
        latitude: geoTest.latitude,
        longitude: geoTest.longitude,
      });
      const headingDist = headingDistanceTo(geoTest, goalLoc);
      setGoalDistance(headingDist);
    }
    setTimeout(() => {
      setTakingDmg(false);
    }, 500);
  }, [health, goalLoc, testing]);

  const HandleUpdateGoal = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      switch (event.target.value.toLowerCase()) {
        case 'goal1':
          setGoalLoc({
            latitude: geoGoal1.latitude,
            longitude: geoGoal1.longitude,
          });
          setGoal('goal1');
          break;
        case 'goal2':
          setGoalLoc({
            latitude: geoGoal2.latitude,
            longitude: geoGoal2.longitude,
          });
          setGoal('goal2');
          break;
        default:
          setGoalLoc({ latitude: 0, longitude: 0 });
          setGoal('');
      }
    },
    [setGoalLoc, setGoal]
  );

  return (
    <>
      <progress
        className="healthBar"
        id="health"
        value={health}
        max="78"
      ></progress>
      <h2>Strange Device</h2>
      {takingDmg && (
        <Hitsplat
          x={hitsplatPosition.x}
          y={hitsplatPosition.y}
          damage={damage}
        />
      )}
      <input
        className="input"
        placeholder="Calibrate device"
        id="input"
        ref={inputRef}
        onChange={HandleUpdateGoal}
      ></input>
      <button
        className="deviceBtn"
        disabled={goal == ''}
        onClick={() => !takingDmg && HandleUpdateDamage()}
      >
        <img src={strangeDevice} className="logo" alt="strange device" />
      </button>
      <Stats
        geoLocation={geoLocation}
        goalLoc={goalLoc}
        goalDistance={goalDistance}
        testing={testing}
        updateTesting={(testing: boolean) => setTesting(testing)}
      />
      <h2 className="footer">{orbText}</h2>
    </>
  );
}

export default App;
