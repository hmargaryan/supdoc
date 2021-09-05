import React, { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import 'js-snackbar/snackbar.css';
import { show, ACTION_TYPE } from 'js-snackbar';
import { Toast, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Variant from './components/Variants/Variants'
import Transports from './components/Transports/Transports'
import Weights from './components/Weights/Weights'
import Addresses from './components/Addresses/Addresses'
import Safety from './components/Safety/Safety'
import PaymentMethod from './components/PaymentMethod/PaymentMethod'
import styles from './CreateOrder.module.css'

const CreateOrder = () => {
  const [variant, setVariant] = useState('asap')
  const [transport, setTransport] = useState('foot')
  const [weight, setWeight] = useState('1')
  const [addresses, setAddresses] = useState({
    from: { id: 'from', address: '', phone: '', name: '', time: '' },
    to: { id: 'to', address: '', phone: '', name: '', time: '' }
  })
  const [safetyAmount, setSafetyAmount] = useState()
  const [paymentMethod, setPaymentMethod] = useState('cash')
  const [price, setPrice] = useState({ variant: 100, transport: 250, weight: 100, addresses: 0, time: 0 })

  useEffect(() => {
    setPrice((prevState) => ({ ...prevState, addresses: (variant === 'express' ? 300 : 100) * Object.values(addresses).filter((address) => address.address).length }))
    setPrice((prevState) => ({ ...prevState, time: 100 * Object.values(addresses).filter((address) => address.time).length }))

    if (addresses.from.address === 'Лесная, 7' && addresses.to?.address === 'Лесная, 27' && transport === 'car') {
      setTransport('foot')
      setPrice((prevState) => ({ ...prevState, transport: 250 }))
      show({
        text: 'Адреса находятся рядом. Вид доставки поменялся',
        pos: 'top-right',
        customClass: 'custom-class',
        backgroundColor: '#0dcaf0'
      });
    }
  }, [addresses, variant])

  const handleVariantCardClick = (id) => {
    setVariant(id)
    switch (id) {
      case 'asap':
      case 'plan':
        setPrice((prevState) => ({ ...prevState, variant: 100 }))
        break
      case 'express':
        setPrice((prevState) => ({ ...prevState, variant: 300 * (Object.values(addresses).length - 1) }))
        break
      default:
        setPrice((prevState) => ({ ...prevState, variant: 100 }))
    }
  }

  const handleTransportCardClick = (id) => {
    switch (id) {
      case 'foot':
        setPrice((prevState) => ({ ...prevState, transport: 250 }))
        break
      case 'car':
        setPrice((prevState) => ({ ...prevState, transport: 500 }))
        break
      default:
        setPrice((prevState) => ({ ...prevState, transport: 250 }))
        break
    }

    setTransport(id)
  }

  const handleWeightCardClick = (id) => {
    setWeight(id)
    setPrice((prevState) => ({ ...prevState, weight: +id * 25 }))
  }

  const handleSafetyAmountChange = (e) => {
    const value = e.target.value

    if (value === '') {
      setSafetyAmount('')
    } else {
      if (!isNaN(+value)) {
        if (+value < 0) {
          setSafetyAmount('0')
        } else if (+value > 50000) {
          setSafetyAmount('50000')
        } else {
          setSafetyAmount(+value)
        }
      }
    }
  }

  const handlePaymentMethodCardClick = (id) => {
    setPaymentMethod(id)
  }

  const handleAddAddressButtonClick = () => {
    const id = nanoid();
    setAddresses((prevState) => ({ ...prevState, [id]: { id, address: '', phone: '', name: '', time: '' } }))
  }

  const handleDeleteAddressButtonClick = (id) => {
    setAddresses((prevState) => {
      const { [id]: addressToDelete, ...newAddresses } = prevState
      return newAddresses
    })
  }

  const handleAddressInputChange = (e, id) => {
    setAddresses((prevState) => ({ ...prevState, [id]: { ...prevState[id], address: e.target.value } }))
  }

  const handleNameInputChange = (e, id) => {
    setAddresses((prevState) => ({ ...prevState, [id]: { ...prevState[id], name: e.target.value } }))
  }

  const handlePhoneInputChange = (e, id) => {
    setAddresses((prevState) => ({ ...prevState, [id]: { ...prevState[id], phone: e.target.value } }))
  }

  const handleTimeInputChange = (e, id) => {
    setAddresses((prevState) => ({ ...prevState, [id]: { ...prevState[id], time: e.target.value } }))
  }

  const handleSetDefaultInfo = () => {
    setAddresses((prevState) => ({ ...prevState, from: { ...prevState.from, address: 'Лесная, 7', name: 'Гамлет Маргарян', phone: '+7 (800) 555-35-35' } }))
  }

  const handleOptimizeCheckboxChange = (e) => {
    setAddresses((prevState) => {
      const from = { ...prevState.from }
      const to = { ...prevState.to }
      return { ...prevState, to: from, from: to }
    })
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Заказать доставку</h2>
      <Toast className={styles.toast}>
        <Toast.Header closeButton={false}>
          <strong className='me-auto'>Итого:</strong>
        </Toast.Header>
        <Toast.Body>{price.variant + price.transport + price.weight + price.addresses + price.time + (!isNaN(Math.ceil(+safetyAmount * 0.5 / 100)) ? Math.ceil(+safetyAmount * 0.5 / 100) : 0) + (variant === 'express' ? 25 : 0)} ₽</Toast.Body>
      </Toast>
      <Variant variant={variant} onCardClick={handleVariantCardClick} />
      {variant !== 'express' && <Transports transport={transport} onCardClick={handleTransportCardClick} />}
      {variant !== 'express' && <Weights weight={weight} transport={transport} onCardClick={handleWeightCardClick} />}
      <Addresses
        addresses={addresses}
        variant={variant}
        onAddAddressButtonClick={handleAddAddressButtonClick}
        onDeleteAddressButtonClick={handleDeleteAddressButtonClick}
        onAddressInputChange={handleAddressInputChange}
        onNameInputChange={handleNameInputChange}
        onPhoneInputChange={handlePhoneInputChange}
        onTimeInputChange={handleTimeInputChange}
        onDefaultInfoButtonClick={handleSetDefaultInfo}
        onOptimizeCheckboxChange={handleOptimizeCheckboxChange}
      />
      <Safety safetyAmount={safetyAmount} plus={Math.ceil(+safetyAmount * 0.5 / 100)} variant={variant} onChange={handleSafetyAmountChange} />
      <PaymentMethod paymentMethod={paymentMethod} onCardClick={handlePaymentMethodCardClick} />
      <div className={styles.order}>
        <h4 className={styles.orderTitle}>Итого к оплате: {price.variant + price.transport + price.weight + price.addresses + price.time + (!isNaN(Math.ceil(+safetyAmount * 0.5 / 100)) ? Math.ceil(+safetyAmount * 0.5 / 100) : 0) + (variant === 'express' ? 25 : 0)}</h4>
        <Button variant='info' className={styles.orderButton}>Заказать доставку</Button>
        <p>Письмо с информацией по заказу придет на ваш e-mail</p>
        <p>Вы можете проследить за вашим заказом во вкладке <Link to='/orders'>Мои заказы</Link></p>
      </div>
    </div>
  )
}

export default CreateOrder
