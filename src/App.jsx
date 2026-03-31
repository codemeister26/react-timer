import { use, useEffect, useState } from 'react'
import './App.css'

function App() {

  const [isStart, setIsStart] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerId, setTimerId] = useState(0);

  const handleStart = () => {
    setIsStart(true);
    
  }
  const handleReset = () => {
    setIsStart(false);
    resetTimer()
  }
  const handlePause = () => {
    setIsPaused(true);
    clearInterval(timerId);
  }
  const handleResume = () => {
    setIsPaused(true);
    runTimer(seconds, minutes, hours);
  }
  const resetTimer = () => {
    setHours(0);
    setMinutes(0)
    setSeconds(0);
    clearInterval(timerId);
  }
  const handleInput = (e) => {
    console.log(e.target.id , e.target.value);    
    const id = e.target.id;
    const value = parseInt(e.target.value);
    if(id === 'hours'){
      setHours(value);
    }
    else if (id === 'minutes'){
      setMinutes(value);
    }
    else {
      setSeconds(value);
    }
  }
  // console.log(hours, minutes, seconds);

  const runTimer = (sec, min, hr, tid)=> {
    if(sec > 0){
      setSeconds((s)=> s-1);
    }
    else if (sec === 0 && min > 0){
      setMinutes((min)=> min - 1);
      setSeconds(59);
    }
    else {
      setHours((hr) => hr - 1);
      setMinutes(59);
      setSeconds(59);
    }

    if( sec === 0 && min === 0 && hr === 0 ){
      resetTimer();
    }
  }

  useEffect(()=>{
    let tid;
    if(isStart){
    tid = setInterval(()=>{
      runTimer(seconds, minutes, hours, tid);
    }, 1000)

    setTimerId(tid);

    return () => {
      clearInterval(tid);
    }
   }

  }, [isStart, seconds, minutes, hours]);
  

  return (
   <div className="App">
    <h1>Counter Timer</h1>
    {
      !isStart && <div className="input-container">
      <div className="input-box">
        <input type="text" id="hours" placeholder='HH' onChange={(e)=> handleInput(e)} />
        <input type="text" id="minutes" placeholder='MM' onChange={(e)=> handleInput(e)} />
        <input type="text" id="seconds" placeholder='SS' onChange={(e)=> handleInput(e)} />
      </div>
      <button onClick={()=> handleStart()} className="timer-button">Start</button>
    </div>
    }
    
    {
      isStart && <div className="show-container">
      <div className="timer-box">
        <div>{hours < 10 ? `0${hours}` : hours}</div>
        <span>:</span>
        <div>{minutes < 10 ? `0${minutes}` : minutes }</div>
        <span>:</span>
        <div>{seconds < 10 ? `0${seconds}` : seconds}</div>
      </div>
    
    <div className="action-box">
      { !isPaused && <button className="timer-button" onClick={()=> handlePause()}>Pause</button> }
      { isPaused && <button className="timer-button" onClick={()=> handleResume()}>Resume</button> }
      <button className="timer-button" onClick={()=> handleReset()} >Reset</button>
    </div>
    </div>
    }
    

   </div>
  )
}

export default App
