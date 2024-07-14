import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(Number(localStorage.getItem("count")))
  useEffect(     ()=>{
     localStorage.setItem("count",count)
  },  [count])
  return (
    <>
      <div className='App'>
        hello babar

      <button onClick={()=> setCount((count)=> count + 1)}>
        count is {count}
      </button>



      </div>
      
    </>
  )
}

export default App
