import React from 'react'
import { Card } from 'react-bootstrap'
import { paymentMethods } from '../../../../helper'
import styles from './PaymentMethod.module.css'

const PaymentMethod = ({ paymentMethod, onCardClick }) => {
  return (
    <>
      <h4 className={styles.title}>Способ оплаты</h4>
      <div className={styles.container}>
        {paymentMethods.map(({ id, title }) => {
          return (
            <Card
              key={id}
              border={id === paymentMethod ? 'primary' : 'secondary'}
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

export default PaymentMethod
