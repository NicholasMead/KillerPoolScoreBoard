import React from 'react';

//import { Card } from './components/card';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  return (
    <div className="App" >
      <Container>
        <Row className="justify-content-center align-items-center" style={{height: "100vh"}}>
          <Col xs="auto">
            <Card className="text-center" border="primary" >
              <Card.Body>
                <Card.Title>Welcome to Killer Pool!</Card.Title>
                <Card.Text>
                  This app is still under construction
            </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
