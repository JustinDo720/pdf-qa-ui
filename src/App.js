import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Placeholder from 'react-bootstrap/Placeholder';
import Spinner from 'react-bootstrap/Spinner';
import {useState, useEffect} from 'react'
import axios from 'axios'

function App() {

  const [serverMsg, setServerMsg] = useState([])
  const [baseMicroserviceUrl, setBaseMicroserviceUrl] = useState('http://127.0.0.1:5000')
  const [currMsg, setCurrMsg] = useState('')
  const [loadingMsg, setLoadingMsg] = useState(false)
  // Loading Message is true by default because UseEffect will update after some time intially
  const [newBotMsg, setNewBotMsg] = useState(true)

  const updateMsg = (e)=>{
    setCurrMsg(e.target.value)
  }

  const sendMsg = async (e)=>{
    setLoadingMsg(true)
    setNewBotMsg(true)
    e.preventDefault()

    // Appending the current message to all of the old messages
    // Instead of having two seperate Message Arrays we have one singular with an object
    //
    // Because this is a user input... the sender will be "u"
    setServerMsg((prevMsg)=>[
      ...prevMsg,
      {'sender': 'u', 'msg': currMsg}
    ])

    const question = currMsg
    // Resetting the current message on the form
    setCurrMsg('')


    // After sending the message we send an axios request
    try{
      const req = await axios.post(`${baseMicroserviceUrl}/question`, {'question': question})
      // Turning off our placeholder before sending our msg to the array 
      setNewBotMsg(false)
      setLoadingMsg(false)
      setServerMsg(prev => [...prev, {'sender': 'b', 'msg':req.data.answer}])

      console.log(req.data)
    } catch (err) {
      console.log(err)
    }

  }

  useEffect(()=>{
    document.title = "RAG - Chatbot"
    setTimeout(()=>{
      setNewBotMsg(false)
      setServerMsg([{'sender': 'b', 'msg': "Hello! You could ask me about work hours, project requirements, code of conduct and/or vacation policies."}])
    }, 1500)

  }, [])

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
                {serverMsg.map((m,i) => (
                  <Row key={i} className='mb-2'>
                      {/* Depending on the sender, we put this left or right*/}
                      <Col xs={8} className={m.sender == 'u'? "offset-4":""}>
                          <div className={m.sender == 'b'?"bg-light text-dark rounded p-2 fs-6 text-start": "text-white rounded p-2"}
                                style={m.sender == 'u'? {backgroundColor:"#2f81ea"}:{}}>
                            {m.msg}
                          </div>
                      </Col>
                  </Row>
                ))}
                {/* Placehodler when generating the answer */}
                {newBotMsg?<>
                    <Col md={8} xs={10}>
                        <div className={"bg-light text-dark rounded p-2 fs-6 text-start"}>
                          <Placeholder as="p" animation="glow">
                            <Placeholder xs={12} md={4}/>
                          </Placeholder>
                          <Placeholder as="p" animation="glow">
                            <Placeholder xs={12} md={8}/>
                          </Placeholder>
                        </div>
                    </Col>
                  </>:<>
                </>}
            </Card.Body>
            <Card.Footer>
                {/* Input Form here */}
                  <Form>
                    {/* d-flex keeps everything in one line */}
                    <Form.Group className="d-flex">
                      <Form.Control type="text" placeholder="Type your question..." value={currMsg} onChange={(e)=>updateMsg(e)} readOnly={loadingMsg}/>
                      {loadingMsg?
                        <>
                          <Button style={{backgroundColor: "#2f81ea", border: 'none', borderRadius: '5px'}} 
                                  className="ms-2" disabled>
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />
                          </Button>
                        </>
                      :<>
                        <Button style={{backgroundColor: "#2f81ea", border: 'none', borderRadius: '5px'}} 
                                type="submit" className="ms-2" onClick={sendMsg}>
                          Send
                        </Button>
                      </>}

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
