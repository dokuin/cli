import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'

const Header = () => {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-success">
      <Navbar.Brand href="#">Dokuin.Js</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#features">Template</Nav.Link>
          <Nav.Link href="#pricing">Template</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="#deets">Template</Nav.Link>
          <Nav.Link eventKey={2} href="#memes">
            Template
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header
