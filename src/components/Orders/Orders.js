import React from 'react'
import { orders, formatWord } from '../../helper'
import { Table, Badge } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import styles from './Orders.module.css'

const Orders = () => {
  const history = useHistory()

  const handleOrderClick = (id) => {
    history.push(`/order/${id}`)
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Мои заказы</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Номер заказа</th>
            <th>Дата</th>
            <th>Адрес</th>
            <th>Статус</th>
            <th>Цена</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(orders).map((order) => {
            return (
              <tr key={order.id} className={styles.tableRow} onClick={() => handleOrderClick(order.id)}>
                <td>#{order.id}</td>
                <td>{order.date}</td>
                <td>{order.addresses[0].address} - {order.addresses[1].address} {order.addresses.length > 2 && `– еще ${order.addresses.length - 2} ${formatWord(order.addresses.length - 2, ['адрес', 'адреса', 'адресов'])} `}</td>
                <td>
                  <Badge className={`bg-${order.status.bg}`} pill bg={order.status.bg}>{order.status.text}</Badge>
                </td>
                <td>{order.price.price} ₽</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

export default Orders
