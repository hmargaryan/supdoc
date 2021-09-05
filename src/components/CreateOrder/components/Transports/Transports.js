import React from 'react'
import { Card } from 'react-bootstrap'
import { deliveryTransports } from '../../../../helper'
import styles from './Transports.module.css'

const Transports = ({ transport, onCardClick }) => {
  return (
    <>
      <h4 className={styles.title}>Вид доставки</h4>
      <div className={styles.container}>
        {deliveryTransports.map(({ id, title }) => {
          return (
            <Card
              key={id}
              border={id === transport ? 'primary' : 'secondary'}
              body
              className={styles.card}
              onClick={() => onCardClick(id)}>
              {title}
            </Card>
          )
        })}
      </div>
    </>
  )
}

export default Transports
