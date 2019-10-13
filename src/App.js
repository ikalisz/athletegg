import React, {useState} from 'react';
import './App.css';
import axios from 'axios'

function App() {
  const [player, setPlayer] = useState()
  function getAxios() {
    axios.get('/getPlayer').then((res) => {
      console.log(res.data)
    })
  }
  return (
    <div>
      <form>
        <input onChange={e => setPlayer(e.target.value)}></input>
      </form>
      <button onClick={getAxios}>Click Me</button>
    </div>
  )
}

export default App;
