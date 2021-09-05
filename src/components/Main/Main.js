import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import styles from './Main.module.css'

const Main = () => {
  const { currentUser } = useAuth()
  const history = useHistory()

  const handleButtonClick = () => {
    if (currentUser?.email) {
      history.push('/create-order')
    } else {
      history.push('/login?redirect=create-order')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>СапДок – доставка из рук в руки</h1>
        <p className={styles.subtitle}>Организуем курьерскую доставку документов из точки А в точку Б</p>
        <Button variant='info' onClick={handleButtonClick}>Заказать доставку</Button>
      </div>
    </div>
  )
}

export default Main
