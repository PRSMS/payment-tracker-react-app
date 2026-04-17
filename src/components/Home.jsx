import { Car, AccountInfo } from './AccountLists.jsx';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

export function Home() {
  return (
    <>
        <Container className="p-3">
            <Card border="info" >
                {/* <Card.Img variant="top" src="https://placeholder.com" /> */}
                <Card.Body>
                    <Card.Title>AccountInfo</Card.Title>
                        <AccountInfo  />
                    {/*<Card.Text></Card.Text>*/}
                    {/*<Button variant="primary">Learn More</Button>*/} 
                </Card.Body>
            </Card>
        </Container>
        
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