import React from 'react'
import { Card } from 'react-bootstrap'
import { deliveryWeights } from '../../../../helper'
import styles from './Weights.module.css'

const Weights = ({ weight, transport, onCardClick }) => {
  return (
    <>
      <h4 className={styles.title}>Вес посылки</h4>
      <div className={styles.container}>
        {deliveryWeights.foot.map((value) => {
          return (
            <Card
              key={value}
              border={weight === value ? 'primary' : 'secondary'}
              body
              className={styles.card}
              onClick={() => onCardClick(value)}>
              до {value} кг
            </Card>
          )
        })}
      </div>
    </>
  )
}

export default Weights
