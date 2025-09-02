import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useState, useEffect} from 'react'

function App() {

  const [botMsg, setBotMsg] = useState(["Hello! You could ask me about work hours, project requirements, code of conduct and/or vaction policies."])
  const [userMsg, setUserMsg] = useState([])
  const [currMsg, setCurrMsg] = useState('')

  const updateMsg = (e)=>{
    setCurrMsg(e.target.value)
  }

  const sendMsg = (e)=>{
    e.preventDefault()

    // Appending the current message to all of the old messages
    setUserMsg((prevMsg)=>[
      ...prevMsg,
      currMsg
    ])

    // Resetting the current message 
    setCurrMsg('')
  }

  return <>
    <Container>
      <Row className='justify-content-md-center'>
        <Col md={8}>
          <Card
            bg="light"
            key="light"
            text='dark'
            className="mt-5 mb-2"
          >
            <Card.Header>Company Chatbot</Card.Header>
            <Card.Body style={{height: '400px', overflowY: 'auto', background: "#a6abbd"}}>
              {/* Bot Messages Here */}
              {botMsg.length > 0 ? 
                <>
                  {botMsg.map((m,i)=>(
                    <Row key={i} className='mb-2'>
                      <Col xs={8}>
                        <div className="bg-light text-dark rounded p-2 fs-6 text-start">
                          {m}
                        </div>
                      </Col>
                    </Row>
                  ))}
                </>
              :<></>}
              {/* User Messages Here */}
              {userMsg.length > 0 ? 
                <>
                  {userMsg.map((m,i)=>(
                    <Row key={i} className='mb-2'>
                      <Col xs={8} className='offset-4'>
                        <div className="text-white rounded p-2" style={{backgroundColor:"#2f81ea"}}>
                          {m}
                        </div>
                      </Col>
                    </Row>
                  ))}
                </>
              :<></>}
            </Card.Body>
            <Card.Footer>
                {/* Input Form here */}
                  <Form>
                    {/* d-flex keeps everything in one line */}
                    <Form.Group className="d-flex">
                      <Form.Control type="text" placeholder="Type your question..." value={currMsg} onChange={(e)=>updateMsg(e)}/>
                      <Button style={{backgroundColor: "#2f81ea", border: 'none', borderRadius: '5px'}} 
                              type="submit" className="ms-2" onClick={sendMsg}>
                        Send
                      </Button>
                    </Form.Group>
                  </Form>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  </>
}

export default App;
