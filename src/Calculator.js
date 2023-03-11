import React, { useState } from "react";

function Calculator() {
  const [input, setInput] = useState("0");
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("his")) || []
  );

  const allChar = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "+",
    "-",
    "*",
    "%",
    "/",
    ".",
  ];

  function cal(){
     const res = eval(input);
     setInput(res);
     let newHis = history;
     if (newHis.length >= 10) {
       newHis.splice(0, 1);
     }

     setHistory([...newHis, res]);
     localStorage.setItem("his", JSON.stringify([...newHis, res]));
  }

  function handleInput(e) {
    e.stopPropagation();
    console.log(e);
    if (allChar.includes(e.key)) {
      setInput(input + e.key);
    }
    if (e.key ==="Backspace") {
      setInput(input.slice(0, -1));
    }
    if ((e.key==="Enter")) {
        cal();
    }
  }
  function allClear(e) {
    e.stopPropagation();
    console.log("allclear");
    setInput("");
  }

  function clear(e) {
    e.stopPropagation();
    setInput(input.slice(0, -1));
  }

  function calculate(e) {
    e.stopPropagation();
    console.log("calllll")
   cal();
  }

  function handleHistory(index, his) {
    setInput(his);
  }

  function handleButtonInput(e) {
    setInput(input + e.target.innerText);
  }

  function equal(e){
    e.stopPropagation();
    cal();
  }
  return (
    <div className="cal-container">
      <h1>Calculator</h1>
      <div className="cal-body-history">
        {history.map((his, index) => {
          return (
            <div key={index} onClick={() => handleHistory(index, his)}>
              <li>{his}</li>
            </div>
          );
        })}
      </div>
      <div className="cal-body-input">
        <input type="text" value={input} onKeyDown={(e) => handleInput(e)} />
      </div>
      <div className="cal-footer" onClick={handleButtonInput}>
        <div className="all-clear-btn-box">
          <button onClick={allClear}>All Clear</button>
          <button onClick={clear}>Clear</button>
          <button onClick={calculate}>Calculate</button>
          <button>/</button>
        </div>
        <div>
          <button>7</button>
          <button>8</button>
          <button>9</button>
          <button>%</button>
        </div>
        <div>
          <button>4</button>
          <button>5</button>
          <button>6</button>
          <button>x</button>
        </div>
        <div>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>-</button>
        </div>
        <div>
          <button>.</button>
          <button>0</button>
          <button onClick={(e)=>equal(e)}>=</button>
          <button>+</button>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
