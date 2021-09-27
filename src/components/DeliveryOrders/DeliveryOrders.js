import React, { useState } from 'react'
import emailjs from 'emailjs-com'
import moment from 'moment'
import { orders } from '../../helper'
import { Table, OverlayTrigger, Tooltip, Button, Modal } from 'react-bootstrap'
import { CgClose } from 'react-icons/cg';
import { AiOutlineInfoCircle } from 'react-icons/ai'
import styles from './DeliveryOrders.module.css'

const DeliveryOrders = () => {
  const [preparedOrders, setPreparedOrders] = useState(Object.values(orders).slice(0, 2))
  const [isModalOpened, setIsModalOpened] = useState(false)
  const [currentAddress, setCurrentAddress] = useState({ title: null, address: null, name: null, phone: null })

  const handleAddressClick = (id, address, name = 'Вы', phone = '+7 (495) 948-43-74') => {
    setCurrentAddress({ title: id === 0 ? 'Отправитель' : 'Получатель', address, name, phone })
    setIsModalOpened(true)
  }

  const handleModalClose = () => {
    setIsModalOpened(false)
  }

  const handleCancelOrderButtonClick = (id) => {
    setPreparedOrders((prevState) => prevState.filter((order) => order.id !== id))
  }

  const handleAccepsOrderButtonClick = (id, name) => {
    const orderId = `#${id}${moment().format('DDMMYYYY')}0`
    emailjs.send('gmail', 'template_kby71an', {
      subject: `Договор ${orderId}`,
      id: orderId,
      name,
      date: moment().format('DD/MM/YYYY'),
    }, 'user_vkkmxzaT6YOQkMq7BCTFL')
      .then((result) => {
        console.log(result.text)
      }, (error) => {
        console.log(error.text)
      })
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Заказы</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Номер заказа</th>
            <th>Дата</th>
            <th>Время</th>
            <th>
              Адрес
              <OverlayTrigger
                placement='right'
                overlay={
                  <Tooltip id='tooltip-right' className={styles.tooltip}>
                    Нажмите на адрес, чтобы получить больше информации
                  </Tooltip>
                }
              >
                <AiOutlineInfoCircle className={styles.infoIcon} />
              </OverlayTrigger>
            </th>
            <th>Отправитель</th>
            <th>Вес</th>
            <th>
              Оплата
              <OverlayTrigger
                placement='right'
                overlay={
                  <Tooltip id='tooltip-right' className={styles.tooltip}>
                    Сумма, которую вы получите
                  </Tooltip>
                }
              >
                <AiOutlineInfoCircle className={styles.infoIcon} />
              </OverlayTrigger>
            </th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {preparedOrders.map((order) => {
            return (
              <tr key={order.id} className={styles.tableRow}>
                <td>#{order.id}</td>
                <td>{order.date}</td>
                <td>{order.time}</td>
                <td>
                  <ul>
                    {order.addresses.map((address, index) => {
                      return (
                        <li className={styles.address} onClick={() => handleAddressClick(index, address.address, address.name, address.phone)}>{address.address}</li>
                      )
                    })}
                  </ul>
                </td>
                <td>
                  <ul>
                    <li>{order.name.name}</li>
                    <li>{order.name.email}</li>
                    <li>{order.name.phone}</li>
                  </ul>
                </td>
                <td>до {order.weight} кг</td>
                <td>{(Math.round(order.price.price * 40 / 100))} ₽</td>
                <td>
                  <Button variant='success' onClick={() => handleAccepsOrderButtonClick(order.id, order.name.name)}>Принять</Button>
                </td>
                <td>
                  <Button variant='danger' onClick={() => handleCancelOrderButtonClick(order.id)}>Отклонить</Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
      <Modal show={isModalOpened} onHide={handleModalClose}>
        <Modal.Header>
          <Modal.Title>{currentAddress.address}</Modal.Title>
          <CgClose className={styles.closeModalButton} onClick={handleModalClose} />
        </Modal.Header>
        <Modal.Body>
          <p><strong>Контактное лицо:</strong> {currentAddress.name}</p>
          <p><strong>Телефон:</strong> {currentAddress.phone}</p>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default DeliveryOrders
