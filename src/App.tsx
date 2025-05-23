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
  const [teamSelected, setGoalSelected] = useState<boolean>(initGoal !== '');
  const [activeTick, setActiveTick] = useState<number>(0);
  const [tickUntilHeal, setTickUntilHeal] = useState<number>(10);

  useEffect(() => {
    setGoal(initGoal);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          console.log('asked user for location access');
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (inputRef.current && goal != '') {
      inputRef.current.value = goal;
    }
  }, [goal]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTick(old => {
        if (old === 2) {
          return 1;
        }
        return old + 1;
      })
    }, 600);

    return () => {
      clearInterval(interval);
    };

  }, []);

  useEffect(() => {
    setTickUntilHeal(old => {
      const newTick = old - 1;
      if (newTick < 0) {
        return 9;
      }
      return newTick;
    });

  }, [activeTick]);

  useEffect(() => {
    if (tickUntilHeal === 0) {
      setHealth(old => {
        return old + 10 > 78 ? 78 : old + 10;
      });
    }
  }, [tickUntilHeal]);

  useEffect(() => {
    window.sessionStorage.setItem('health', health.toString());
  }, [health]);

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
          setTimeout(() => {
            setTakingDmg(false);
          }, 500);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0
        }
      );
    } else {
      console.log('Unable to retrieve your location');
      setTimeout(() => {
        setTakingDmg(false);
      }, 500);
      return;
    }
  }, [health, takingDmg, goalLoc]);

  const HandleUpdateGoal = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const typedWord = event.target.value.toLowerCase();
      const objective = objectives.find(o => o.goalKeyword.toLowerCase() === typedWord);

      if (!objective) {
        return;
      }

      setGoalSelected(true);

      setGoalLoc({
        latitude: objective.latitude,
        longitude: objective.longitude,
      });
      setGoal(objective.goalKeyword);

      window.sessionStorage.setItem('goal', objective.goalKeyword);
      window.sessionStorage.setItem('goalLoc', JSON.stringify(goalLoc));
    },
    [goalLoc]
  );

  const Reset = () => {
    setGoal('');
    setGoalSelected(false);
    setOrbText({ feel: "", info: "", distance: 0, style: "" });
    window.sessionStorage.removeItem('goal');
    window.sessionStorage.removeItem('goalLoc');
  }

  const InputOrCurrentTarget = teamSelected ?
    <div style={{ fontSize: 26 }}>
      <span style={{ verticalAlign: 'middle' }}>Calibration: {goal.toUpperCase()}</span>
      <span style={{ verticalAlign: 'middle', marginLeft: 6 }}>
        <span className='resetbutton' onClick={Reset} /></span>
    </div> :
    <input
      className="input"
      placeholder="Calibrate device"
      id="input"
      ref={inputRef}
      onChange={(e) => {
        HandleUpdateGoal(e);
        if (objectives.some(o => o.goalKeyword.toLowerCase() === e.target.value.toLowerCase())) {
          // if we have typed a goal, blur to disable phone keyword;
          e.target.blur();
        }
      }}
    />

  return (<div id='root' style={{ filter: health === 0 ? 'grayscale(100%)' : '' }}>
    <progress
      className="healthBar"
      id="health"
      value={health}
      max="78" />
    <div className="amazingtext">
      <span style={{ opacity: activeTick === 1 ? 1 : 0 }}>1 </span>
      <span style={{ opacity: activeTick === 2 ? 1 : 0 }}>2 </span>
    </div>
    <div className="wrapper">
      <div className='flexItemSmall'>
        <h2 style={{ fontSize: 40 }}>Strange Device</h2>
        {takingDmg && (
          <Hitsplat
            x={hitsplatPosition.x}
            y={hitsplatPosition.y}
            damage={damage}
          />
        )}
        {InputOrCurrentTarget}
      </div>
      <button
        type="button"
        style={{ filter: orbText.style + (goal == '' ? ' grayscale(100%)' : '') }}
        className={takingDmg || (orbText.feel && orbText.distance <= 50) ? "flexItemBig deviceBtnShake" : "flexItemBig deviceBtn"}
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
            {orbText.feel && Math.floor(goalDistance.distance) < 500 && Math.floor(goalDistance.distance) + " meters"}
          </span>
        </h2>
      </div>
    </div>
  </div>);
}

export default App;
