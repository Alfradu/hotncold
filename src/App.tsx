import React, { useState, useCallback, useEffect, useRef } from 'react';
import strangeDevice from './assets/strange-device.png';
import './css/App.css';
import Hitsplat from './hitsplat.tsx';
import { objectives, Level } from './constants.tsx';
import {
  HeadingDistance,
  headingDistanceTo,
  LatitudeLongitude,
  normalizeHeading,
} from 'geolocation-utils';
import { calculateHitSplatLocation, calculateLevel, Coordinate, headingToOrientation } from './utils/utils.tsx';

function App() {
  const initGoal: string = window.sessionStorage.getItem('goal') || '';
  const initGoalLoc: LatitudeLongitude = JSON.parse(
    window.sessionStorage.getItem('goalLoc') || 'null'
  ) || { latitude: 0, longitude: 0 };
  const initHealth: number = parseInt(
    window.sessionStorage.getItem('health') || '78'
  );
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
  const [hitsplatPosition, setHitsplatPosition] = useState<Coordinate>({
    x: 0,
    y: 0,
  });
  const [orbText, setOrbText] = useState<Level>({ feel: "", info: "", distance: 0, style: "" });

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
    if (health == 0 || takingDmg) return;
    setTakingDmg(true);
    setDamage(currDmg);
    setHealth(health - currDmg < 0 ? 0 : health - currDmg);
    setHitsplatPosition(calculateHitSplatLocation())
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: { coords: LatitudeLongitude }) => {
          const headingDist = headingDistanceTo(position.coords, goalLoc);
          setGoalDistance(headingDist);
          setOrbText(calculateLevel(headingDist.distance));
          setTimeout(() => {
            setTakingDmg(false);
          }, 500);
        },
        () => {
          console.log('Unable to retrieve your location');
          setTakingDmg(false);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0
        }
      );
    } else {
      console.log('Unable to retrieve your location');
      setTakingDmg(false);
      return;
    }
  }, [health, takingDmg, goalLoc]);

  const HandleUpdateGoal = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const typedWord = event.target.value.toLowerCase();
      const objective = objectives.find(o => o.goalKeyword === typedWord);
      
      if (!objective) {
        return;
      }

      setGoalLoc({
        latitude: objective.latitude,
        longitude: objective.longitude,
      });
      setGoal(objective.goalKeyword);
    },
    [setGoalLoc, setGoal]
  );

  return (<div id='root' style={{ filter: health === 0 ? 'grayscale(100%)' : '' }}>
    <progress
      className="healthBar"
      id="health"
      value={health}
      max="78" />
    <div className="wrapper">
      <div className='flexItemSmall'>
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
          onChange={(e) => {
            HandleUpdateGoal(e);
            if (objectives.some(o => o.goalKeyword.toLowerCase() === e.target.value.toLowerCase())){
              // if we have typed a goal, blur to disable phone keyword;
              e.target.blur();
            }
          }}            
          />
      </div>
      <button
        type="button"
        style={{ filter: orbText.style + (goal == '' ? ' grayscale(100%)' : '') }}
        className={takingDmg || (orbText.feel && orbText.distance <= 5) ? "flexItemBig deviceBtnShake" : "flexItemBig deviceBtn"}
        disabled={goal == ''}
        onClick={() => !takingDmg && HandleUpdateDamage()}
      >
        <img src={strangeDevice} className="logo" alt="strange device" />
      </button>
      <div className='flexItemBig'>
        <h2 className="info">
          <span className='flexItemSmall'>
            {orbText.feel}
          </span>
          <span className='flexItemSmall'>
            {orbText.info}
          </span>
          <span className='flexItemSmall'>
            {orbText.feel && "The orb pulls " + headingToOrientation(normalizeHeading(goalDistance.heading))}
          </span>
          <span className='flexItemSmall'>
            {orbText.feel && Math.floor(goalDistance.distance) + " meters"}
          </span>
        </h2>
      </div>
    </div>
  </div>);
}

export default App;
