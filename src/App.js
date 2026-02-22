import {
  useState,
  useRef
} from "react";
import "./App.css";
import Bomb from './Bomb.js';

function App() {
  const inputRef = useRef(null);
  const resultRef = useRef(null);
  const [result, setResult] = useState(0);
  const [clear, setClear] = useState(true);
  const [diffused, setDiffused] = useState(false);

  function plus(e) {
    // Note: dont want to submit and refresh the page so prevent default
    // All form buttons (except for type="button[not sure about reset]") will try to submit the form and refresh the page
    e.preventDefault();

    // Note: save a snapshot of value since we are resetting input.
    // since setState will not run immideately, the reset input will be used for result calc otherwise.
    const val = inputRef.current.value;
    
    setResult((result) => result + Number(val ?? 0));
    if(clear) {
      resetInput(e);
    }
  };

  function minus(e) {
    e.preventDefault();
    const val = inputRef.current.value;
    setResult(result - Number(val ?? 0));
    if(clear) {
      resetInput(e);
    }
  };

  function times(e) {
    e.preventDefault();
    const val = inputRef.current.value;
    setResult(result * Number(val ?? 0))
    if(clear) {
      resetInput(e);
    }
  };

  function divide(e) {
    e.preventDefault();
    const val = inputRef.current.value;
    console.log(val);
    if (!val || val === '' || val === 0) {
      alert("Dividing by zero !! ♾️");
      setResult(1 / 0)
    } else {
      setResult(result / Number(val))
    }
    if(clear) {
      resetInput(e);
    }
  };

  function resetInput(e) {
    e?.preventDefault();
    inputRef.current.value = null;
  };

  function resetResult(e, diffused) {
    e?.preventDefault();
    setResult(0);
    setDiffused(!!diffused);
  };

  function AC(e) {
    e.preventDefault();
    resetInput();
    resetResult();
  };

  return (
    <div className="App">
      <div>
        <h1>{diffused ? '🎉': ''} Simple Working Calculator {diffused ? '🎉': '🧮'}</h1>
      </div>
      <div className="parent">
        <form>
          <div className="item">
            <label>
              <input disabled={result === Infinity} onChange={(e) => setClear(e.target.checked)} checked={clear} type="checkbox"></input> Clear input after operation
            </label>
          </div>

          <div className="item">
            <input pattern="[0-9]" type="number" placeholder="0" ref={inputRef} />
            <button disabled={result === Infinity} className="action-button" onClick={resetInput}>C</button>
            <button disabled={result === Infinity} className="action-button" onClick={AC}>AC</button>
          </div>

          <div className="item">
            <button disabled={result === Infinity} onClick={plus}>add</button>
            <button disabled={result === Infinity} onClick={minus}>subtract</button>
            <button disabled={result === Infinity} onClick={times}>multiply</button>
            <button disabled={result === Infinity} onClick={divide}>divide</button>
          </div>

          <div className="item">
            <span className="result" ref={resultRef}>{result}</span>
            <button disabled={result === Infinity || !result} className="action-button" onClick={resetResult}>Reset</button>
          </div>
        </form>

        <div className="item">
          {result === Infinity ? <Bomb diffused={resetResult} correctWire={Math.floor(Math.random() * 4)} />: ''}
        </div>

      </div>
    </div>
  );
}

export default App; 
