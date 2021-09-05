import React from 'react'
import { Card, Form, Row, Col, Button, Badge } from 'react-bootstrap'
import { CgClose } from 'react-icons/cg';
import styles from './Addresses.module.css'

const Addresses = ({ addresses, variant, onAddAddressButtonClick, onDeleteAddressButtonClick, onAddressInputChange, onNameInputChange, onPhoneInputChange, onTimeInputChange, onDefaultInfoButtonClick, onOptimizeCheckboxChange }) => {
  return (
    <div className={styles.addressesContainer}>
      {Object.values(addresses).map(({ id, address, name, phone, time }, index, array) => {
        return (
          <Card key={id} className={styles.card}>
            <Card.Header as='h5' className={styles.header}>
              {index === 0 ? 'Откуда' : `Куда ${array.length > 2 ? `(${index})` : ''}`}
              {index === 0 && <Badge pill className='bg-primary' style={{ cursor: 'pointer' }} onClick={onDefaultInfoButtonClick}>Выбрать свой адрес</Badge>}
              {index !== 0 && array.length > 2 && <CgClose className={styles.deleteButton} onClick={() => onDeleteAddressButtonClick(id)} />}
            </Card.Header>
            <Card.Body>
              <Form.Group className='mb-3'>
                <Form.Label>Адрес</Form.Label>
                <Form.Control placeholder='ул. Пушкина, дом 1' value={address} onChange={(e) => onAddressInputChange(e, id)} />
              </Form.Group>
              <Row className='mb-3'>
                <Form.Group as={Col}>
                  <Form.Label>Контактное лицо</Form.Label>
                  <Form.Control value={name} onChange={(e) => onNameInputChange(e, id)} />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Телефон</Form.Label>
                  <Form.Control value={phone} onChange={(e) => onPhoneInputChange(e, id)} />
                </Form.Group>
                {variant !== 'asap' && (index !== 0 || variant === 'plan') && (
                  <Form.Group as={Col}>
                    <Form.Label>Время</Form.Label>
                    <Form.Control type='datetime-local' value={time} onChange={(e) => onTimeInputChange(e, id)} />
                  </Form.Group>
                )}
              </Row>
              {index === 0 && address === 'Лесная, 7' && variant === 'asap' && (
                <Card.Text>
                  <strong>
                    Курьер будет через 20 минут
                  </strong>
                </Card.Text>
              )}
            </Card.Body>
          </Card>
        )
      })}
      <Button variant='primary' className={styles.button} onClick={onAddAddressButtonClick}>Добавить +</Button>
      {variant !== 'express' && Object.values(addresses).length > 2 && <Form.Check type='checkbox' label='Оптимизировать маршрут' onChange={onOptimizeCheckboxChange} />}
    </div>
  )
}

export default Addresses
