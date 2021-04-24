import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import { Nav } from 'components/Nav'

const LayoutWrapper = styled(Container)`
  width: 92%;
  max-width: 450px;
  margin: 66px auto;
  height: calc(100vh - 66px * 2);
`;

export const Layout = ({ children }) => (
  <>
    <Nav />
    <LayoutWrapper>{children}</LayoutWrapper>
  </>
)
