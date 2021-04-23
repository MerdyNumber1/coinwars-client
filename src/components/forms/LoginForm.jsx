import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useUser } from 'hooks/useUser';

export const LoginForm = () => {
  const { saveUser } = useUser()
  const history = useHistory();
  const [name, setName] = useState()
  const [error, setError] = useState()

  const onSubmit = (e) => {
    e.preventDefault()

    if (name && name.length > 3 && name.length < 30) {
      saveUser(name)
      history.push('/lobbies')
    } else {
      setError('Enter your name correctly')
    }
  }

  return (
    <Form onSubmit={onSubmit}>
      {error && <Alert variant="danger" dismissible>{error}</Alert>}
      <Form.Group>
        <Form.Label>Your name:</Form.Label>
        <Form.Control placeholder="Enter your name" onChange={(e) => setName(e.target.value)}/>
      </Form.Group>
      <Button type="submit" block>Enter the lobby</Button>
    </Form>
  )
}
