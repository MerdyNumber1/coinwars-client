import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { history } from 'routes'

export const PlayerLostModal = () => {
  const [show, setShow] = useState(true)

  const handleClose = () => {
    setShow(false)
    history.push('/lobbies')
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>You lost</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
