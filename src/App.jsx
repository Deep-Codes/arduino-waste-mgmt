import { useEffect, useState } from 'react';
import './App.css';
import History from './History';

// Check Arduino logs for this
const MODULE_IP = `192.168.43.31`;
// Max Distance before overflow
const MAX_DISTANCE = `30`;

function App() {
  const [distance, setDistance] = useState(null);
  useEffect(() => {
    const intervalID = setInterval(async () => {
      const newDistance = await getHeight();
      setDistance(newDistance);
    }, 2000);
    return () => clearInterval(intervalID);
  }, []);
  const percent = 100 - (distance / MAX_DISTANCE) * 100;
  const time = new Date().toLocaleTimeString();
  return (
    <div className='App'>
      <h1>Waste Level</h1>
      {distance !== null ? (
        <>
          <div className='container'>
            <div className='wrapper'>
              <div className='box' style={{ height: `${percent}%` }}></div>
            </div>
            <div className='dashboard'>
              <h4>Currently at</h4>
              <h1>{percent.toFixed(2)}%</h1>
              <h4>capacity</h4>
              <span className='rule' />
              <h4 className='update'>Last updated {time}</h4>
            </div>
          </div>
          <div className='history'>
            <h2>History</h2>
            <History time={time} distance={distance} percent={percent} />
          </div>
        </>
      ) : null}
    </div>
  );
}

export default App;

export const getHeight = async () => {
  const res = await fetch(`http://${MODULE_IP}/`);
  const json = await res.json();
  return json.distance || 0;
};
