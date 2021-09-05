import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert, Container } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { Link, useHistory, useLocation } from 'react-router-dom'

const Login = () => {
  const { login } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const emailRef = useRef()
  const passwordRef = useRef()
  const history = useHistory()
  const location = useLocation()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)

      const redirectQueryParam = new URLSearchParams(location.search).get('redirect')
      if (redirectQueryParam) {
        history.push(`/${redirectQueryParam}`)
      } else {
        history.push('/')
      }
    } catch {
      setError('Не получилось войти. Неправильные почта/пароль')
    }

    setLoading(false)
  }

  return (
    <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: '70vh' }}>
      <div className='w-100' style={{ maxWidth: '400px' }}>
        <Card>
          <Card.Body>
            <h2 className='text-center mb-4'>Вход</h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id='email' className='mb-3'>
                <Form.Label>Почта</Form.Label>
                <Form.Control type='email' ref={emailRef} required />
              </Form.Group>
              <Form.Group id='password' className='mb-4'>
                <Form.Label>Пароль</Form.Label>
                <Form.Control type='password' ref={passwordRef} required />
              </Form.Group>
              <Button disabled={loading} className='w-100' type='submit'>
                Войти
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
          Нет аккаунта? <Link to='/signup'>Зарегистрируйтесь</Link>
        </div>
      </div>
    </Container>
  )
}

export default Login