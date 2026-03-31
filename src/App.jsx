import { useEffect, useState } from "react";
import "./App.css";
import InputTimer from "./components/InputTimer";
import ShowTimer from "./components/ShowTimer";

function App() {
  const [isStart, setIsStart] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerId, setTimerId] = useState(0);

  const handleStart = () => {
    setIsStart(true);
  };
  const handleReset = () => {
    setIsStart(false);
    resetTimer();
  };
  const handlePause = () => {
    setIsPaused(true);
    clearInterval(timerId);
  };
  const handleResume = () => {
    setIsPaused(true);
    runTimer(seconds, minutes, hours);
  };
  const resetTimer = () => {
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    clearInterval(timerId);
  };
  const handleInput = (e) => {
    console.log(e.target.id, e.target.value);
    const id = e.target.id;
    const value = parseInt(e.target.value);
    if (id === "hours") {
      setHours(value);
    } else if (id === "minutes") {
      setMinutes(value);
    } else {
      setSeconds(value);
    }
  };
  // console.log(hours, minutes, seconds);

  const runTimer = (sec, min, hr, tid) => {
    if (sec > 0) {
      setSeconds((s) => s - 1);
    } else if (sec === 0 && min > 0) {
      setMinutes((min) => min - 1);
      setSeconds(59);
    } else {
      setHours((hr) => hr - 1);
      setMinutes(59);
      setSeconds(59);
    }

    if (sec === 0 && min === 0 && hr === 0) {
      resetTimer();
    }
  };

  useEffect(() => {
    let tid;
    if (isStart) {
      tid = setInterval(() => {
        runTimer(seconds, minutes, hours, tid);
      }, 1000);

      setTimerId(tid);

      return () => {
        clearInterval(tid);
      };
    }
  }, [isStart, seconds, minutes, hours]);

  return (
    <div className="App">
      <h1>Counter Timer</h1>
      {!isStart && (
        <InputTimer handleInput={handleInput} handleStart={handleStart} />
      )}

      {isStart && (
        <ShowTimer
          hours={hours}
          minutes={minutes}
          seconds={seconds}
          isPaused={isPaused}
          handlePause={handlePause}
          handleResume={handleResume}
          handleReset={handleReset}
        />
      )}
    </div>
  );
}

export default App;
