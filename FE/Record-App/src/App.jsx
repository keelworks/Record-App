import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './component/LoginPage'
import HomePage from './component/HomePage/HomePage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <LoginPage/> */}
      <HomePage/>
    </>
  )
}

export default App
