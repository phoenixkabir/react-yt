import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import { BrowserRouter as Router} from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='bg-red-500'>
        kabira react
        <Home/>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App