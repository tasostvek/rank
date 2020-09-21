import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h1>Rank</h1>
        <div className="input-container">
            <Form inline className="label-input">
              <Form.Group>
                <Form.Label className="email-label">Email Address</Form.Label>
                <Form.Control className="input-field" type="email" placeholder="Enter email"/>
              </Form.Group>
            </Form>
            <Form inline className="label-input">
              <Form.Group>
                <Form.Label className="password-label">Password</Form.Label>
                <Form.Control className="input-field" type="password" placeholder="Enter password"/>
              </Form.Group>
            </Form>
            <Button>Submit</Button>
          </div>
      </header>
    </div>
  );
}

export default App;
