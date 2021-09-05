import React, { useState } from 'react'
import { Table, Badge, ListGroup, Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { CgClose } from 'react-icons/cg';
import { BsArrowLeftShort } from 'react-icons/bs';
import { orders } from '../../helper'
import { useParams, Link } from 'react-router-dom';
import styles from './Order.module.css'

const Order = () => {
  const [isModalOpened, setIsModalOpened] = useState(false)
  const [currentAddress, setCurrentAddress] = useState({ title: null, address: null, name: null, phone: null })
  const { id } = useParams()
  const order = orders[id]

  const handleAddressClick = (id, address, name = 'Вы', phone = '+7 (495) 948-43-74') => {
    setCurrentAddress({ title: id === 0 ? 'Отправитель' : 'Получатель', address, name, phone })
    setIsModalOpened(true)
  }

  const handleModalClose = () => {
    setIsModalOpened(false)
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        <div>Заказ #{id} {order.isExpress && <span className={styles.expressLabel}>(экспресс заказ)</span>}</div>
        <Link to='/orders' className={styles.getBackButton}><BsArrowLeftShort /> все заказы</Link>
      </h2>
      <Table bordered striped className={styles.table}>
        <thead>
          <tr>
            <th>Дата</th>
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
            <th>Вес</th>
            <th>Компенсация утери</th>
            <th>Статус</th>
            <th>Цена</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{order.date}</td>
            <td>
              <ul>
                {order.addresses.map((address, index) => {
                  return (
                    <li className={styles.address} onClick={() => handleAddressClick(index, address.address, address.name, address.phone)}>{address.address}</li>
                  )
                })}
              </ul>
            </td>
            <td>до {order.weight} кг</td>
            <td>{order.isSafe ? 'Есть (150 ₽)' : 'Нет'}</td>
            <td>
              <Badge className={`bg-${order.status.bg}`} pill bg={order.status.bg}>{order.status.text}</Badge>
            </td>
            <td>{order.price.price} ₽ ({order.price.type})</td>
          </tr>
        </tbody>
      </Table>
      <h4 className={styles.historyTitle}>История заказа</h4>
      <ListGroup className={styles.orderHistory}>
        {order.history.map((item) => {
          return (
            <ListGroup.Item variant={item.variant}><strong>{item.text}</strong> ({order.date}, {item.time})</ListGroup.Item>
          )
        })}
      </ListGroup>
      {order.status.status === 'accepted' && <Button variant='danger' className={styles.cancleButton}>Отменить заказ</Button>}
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

export default Order
