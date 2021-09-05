import React from 'react'
import { InputGroup, FormControl } from 'react-bootstrap'
import styles from './Safety.module.css'

const Safety = ({ safetyAmount, plus, variant, onChange }) => {
  return (
    <>
      <h4 className={styles.title}>Компенсация потери</h4>
      {variant !== 'express' && (
        <div className={styles.container}>
          <InputGroup className='mb-3' style={{ width: 'unset', marginRight: '10px' }}>
            <FormControl
              type='number'
              placeholder='Ценность посылки'
              value={safetyAmount}
              onChange={onChange}
            />
            <InputGroup.Text>₽</InputGroup.Text>
          </InputGroup>
          <p>плюс <strong>{!isNaN(plus) ? plus : 0} ₽</strong> к заказу</p>
        </div>
      )}
      {variant === 'express' ? (
        <p className={styles.description}>В финальную стоимость заказа включены 25 ₽ за эту услугу <br /> Компенсируем до 50 000 ₽</p>
      ) : (
        <p className={styles.description}>Компенсируем потерю отправлений. <br /> Максимальная компенсация — 50 000 ₽</p>
      )}
    </>
  )
}

export default Safety
