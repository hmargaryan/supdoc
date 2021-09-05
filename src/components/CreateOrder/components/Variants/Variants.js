import React from 'react'
import { deliveryVariants } from '../../../../helper'
import { Row, Card, Col, Badge } from 'react-bootstrap'
import styles from './Variants.module.css'

const Variants = ({ variant, onCardClick }) => {
  return (
    <Row className={styles.row}>
      {[deliveryVariants.map(({ id, title, subtitle, price, description }) => {
        return (
          <Col key={id} lg>
            <Card
              border={id === variant ? 'primary' : 'secondary'}
              className={styles.card}
              onClick={() => onCardClick(id)}>
              <Card.Header>{title}</Card.Header>
              <Card.Body>
                <Card.Title>от {price} ₽ {id === 'express' && <Badge pill className='bg-info'>За адрес</Badge>}</Card.Title>
                <Card.Text>{subtitle}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted" dangerouslySetInnerHTML={{ __html: description }}></small>
              </Card.Footer>
            </Card>
          </Col>
        )
      })]}
    </Row>
  )
}

export default Variants
