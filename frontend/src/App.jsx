import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



function App() {
  const [showBox,setShowBox ] = useState(false);

  useEffect(() => {
    //login box appear soon
    setTimeout(()=> setShowBox(true),1000);
  }, []); // [] empty array it'll only appear once.

  return (
     <div className='background'>
      {
        showBox && (
          <div className='auth popup'>
            <h2>login</h2>
            <form action="form">
        <input type="email" placeholder='enter email' required/>
        <input type="password" placeholder='create Password' required />
        <button>Login</button>
       </form>
       
          </div>
        )
      }
     </div>
   
  )
}

export default App
