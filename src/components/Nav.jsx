import { Link } from 'react-router-dom';
import { Navbar, Nav as NavLinks } from 'react-bootstrap';

export const Nav = () => (
  <Navbar bg="primary" variant="dark">
    <Navbar.Brand as={Link} to="/">Coin Wars</Navbar.Brand>
    <NavLinks>
      <NavLinks.Link as={Link} to="/">Home</NavLinks.Link>
      <NavLinks.Link as={Link} to="/help">How to play</NavLinks.Link>
    </NavLinks>
  </Navbar>
)
