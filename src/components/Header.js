import React from 'react'
import { userCheck } from '../helper';
import { useAuth } from '../context/AuthContext'
import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const Header = () => {
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  const handleButtonClick = () => {
    if (currentUser?.email) {
      logout()
    } else {
      history.push('/login')
    }
  }

  return (
    <Navbar bg='primary' variant='dark' collapseOnSelect expand='lg' sticky='top'>
      <Container>
        <Navbar.Brand href='/'>СапДок <Badge className='bg-info'>OZON</Badge></Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            {currentUser?.email !== 'deliveryman@gmail.com' ? (
              <>
                <Nav.Link href={currentUser?.email ? '/create-order' : '/login?redirect=create-order'}>Заказать доставку</Nav.Link>
                {currentUser?.email && <Nav.Link href='/orders'>Мои заказы</Nav.Link>}
              </>
            ) : (
              <Nav.Link href='/delivery-orders'>Заказы <Badge className='bg-danger'>2</Badge></Nav.Link>
            )}
          </Nav>
          <Button variant={userCheck(!!currentUser?.email, 'buttonBg')} onClick={handleButtonClick}>
            {userCheck(!!currentUser?.email, 'buttonText')}
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
