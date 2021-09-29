import React from 'react'
import { Card } from 'react-bootstrap'
import { deliveryWeights } from '../../../../helper'
import styles from './Weights.module.css'

const Weights = ({ weight, onCardClick }) => {
  return (
    <>
      <h4 className={styles.title}>Товары</h4>
      <div className={styles.container}>
        <ul>
          <li>
            <a href='haha'>Трусики Moony для мальчиков L (9-14 кг) 44 шт</a>
          </li>
          <li>
            <a href='haha'>Зарядное устройство InfinityLab InstantCharger 65W</a>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Weights
