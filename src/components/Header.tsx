import React from 'react'
import Cookies from 'js-cookie'
import {Container, Nav, Navbar} from "react-bootstrap";

export default function Header() {
  function handleClick() {
    Cookies.remove('jwt')
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#">SellBox</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/room/new">방 추가</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/signup">회원가입</Nav.Link>
            <Nav.Link href="/login">로그인</Nav.Link>
            <Nav.Link onClick={handleClick}>로그아웃</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
