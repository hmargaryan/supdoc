import React, { useState, useRef } from 'react'
import { Card, Form, Button, Alert, Container } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext';
import { Link, useHistory } from 'react-router-dom'

const Signup = () => {
  const { signup } = useAuth()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Пароли не совпадают')
    }

    if (passwordRef.current.value.length < 6 || passwordConfirmRef.current.value.length < 6) {
      return setError('Минимальная длина пароля – 6 символов')
    }

    try {
      setError('')
      setIsLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      history.push('/')
    } catch {
      setError('Не получилось создать аккаунт')
    }

    setIsLoading(false)
  }

  return (
    <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: '70vh' }}>
      <div className='w-100' style={{ maxWidth: '400px' }}>
        <Card>
          <Card.Body>
            <h2 className='text-center mb-4'>Регистрация</h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id='email' className='mb-3'>
                <Form.Label>Почта</Form.Label>
                <Form.Control type='email' ref={emailRef} required />
              </Form.Group>
              <Form.Group id='password' className='mb-3'>
                <Form.Label>Пароль</Form.Label>
                <Form.Control type='password' ref={passwordRef} required />
              </Form.Group>
              <Form.Group id='password-confirm' className='mb-4'>
                <Form.Label>Подтвердите пароль</Form.Label>
                <Form.Control type='password' ref={passwordConfirmRef} required />
              </Form.Group>
              <Button disabled={isLoading} className='w-100' type='submit'>
                Зарегистрироваться
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
          Уже есть аккаунт? <Link to='/login'>Войдите</Link>
        </div>
      </div>
    </Container>
  )
}

export default Signup
