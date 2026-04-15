import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { getAllAccounts } from './lib/FirebaseAPICall.js';
import { Car, AccountInfo } from './components/AccountLists.jsx';

function App() {
  const [count, setCount] = useState(0);
  const [accountLists, setAccountLists] = useState([]);

  const handleClick = () => {
    getAllAccounts().then((message) => {
      console.log('Accounts retrieved successfully:', message);
      setAccountLists(message);
    }).catch((error) => {
      console.error('Error fetching accounts:', error);
    });
  };

  return (
    <>
    {/* 
      <div className="App">
        <h1>Hello World!</h1>
      </div>
      <Car color="red" brand="Toyota" model="Corolla" />
    */}
      <button onClick={handleClick}>Click Me</button>
      <AccountInfo accountLists={accountLists} />
    </>
  )
}

export default App
