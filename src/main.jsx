import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
//import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'

import Container from 'react-bootstrap/Container';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <App />
    {/*<Container fluid>
    </Container>*/}
  </StrictMode>,
)
