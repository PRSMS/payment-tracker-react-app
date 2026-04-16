import { Car, AccountInfo } from './AccountLists.jsx';
import { AccountDetails } from './AccountDetails.jsx';

export function Home() {
  return (
    <>
        <h1>Home Page</h1>
        <AccountInfo  />
        <AccountDetails accountId="-Opl_LQBNRRrl5lGtKUo" />
        
        {/* 
            <div className="App">
            <h1>Hello World!</h1>
            </div>
            <Car color="red" brand="Toyota" model="Corolla" />
        */}
            {/*<button onClick={handleClick}>Click Me</button>*/}
    </>
    );
}