import React from 'react'
import { useRouteMatch, useLocation, Link } from 'react-router-dom'
import { Nav } from 'react-bootstrap'
import { JournalText, BarChartLine } from 'react-bootstrap-icons';
import styled from 'styled-components';

export const BattleNav = () => {
  const { url } = useRouteMatch()
  const location = useLocation()

  return (
    <Nav justify variant="tabs" defaultActiveKey={location.pathname}>
      <Nav.Item>
        <Nav.Link as={Link} eventKey={url} to={url}>
          <BattleNavIconWrapper>
            <JournalText />
          </BattleNavIconWrapper>
          Dashboard
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} eventKey={`${url}/top`} to={`${url}/top`}>
          <BattleNavIconWrapper>
            <BarChartLine />
          </BattleNavIconWrapper>
          Top
        </Nav.Link>
      </Nav.Item>
    </Nav>
  )
}

const BattleNavIconWrapper = styled.div`
  display: inline-block;
  margin-right: 5px;
`
