import { useEffect, useState} from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useProfile } from 'hooks/useProfile';

export const LoginForm = () => {
  const { saveProfile, profileInfo, isLogged, updateProfile } = useProfile()
  const history = useHistory();
  const [name, setName] = useState(profileInfo.name || null)
  const [error, setError] = useState()

  useEffect(() => setName(profileInfo.name), [profileInfo])

  const onSubmit = async (e) => {
    e.preventDefault()

    if (name && name.length > 3 && name.length < 30) {

      if (isLogged && profileInfo.name !== name) { // if user already has name and registered
        await updateProfile({ name })
      } else { // if its a new user
        await saveProfile(name)
      }

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
        <Form.Control
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
          value={name || ''}
        />
      </Form.Group>
      <Button type="submit" block>Enter the lobby</Button>
    </Form>
  )
}
