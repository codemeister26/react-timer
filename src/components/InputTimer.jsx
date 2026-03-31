const InputTimer = ({handleInput, handleStart}) => {
    return(
        <div className="input-container">
      <div className="input-box">
        <input type="text" id="hours" placeholder='HH' maxLength={2} onChange={(e)=> handleInput(e)} />
        <input type="text" id="minutes" placeholder='MM' maxLength={2} onChange={(e)=> handleInput(e)} />
        <input type="text" id="seconds" placeholder='SS' maxLength={2} onChange={(e)=> handleInput(e)} />
      </div>
      <button onClick={()=> handleStart()} className="timer-button">Start</button>
    </div>
    )
}

export default InputTimer