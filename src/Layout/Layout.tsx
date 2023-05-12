import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink, Outlet } from 'react-router-dom';

import styles from './Layout.module.css';

export default function Layout() {
  return (
    <>
      <header>
        <Navbar bg='light' expand='md' sticky='top'>
          <Container fluid>
            <Navbar.Brand to='/' as={NavLink}>
              Star Wars
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='me-auto'>
                <Nav.Link to='/' as={NavLink}>
                  Heroes
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      <main className={styles.content}>
        <Outlet />
      </main>
    </>
  );
}
