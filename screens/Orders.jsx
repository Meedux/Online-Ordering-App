import React, { useContext } from 'react'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component'
import { getOrdersById, auth } from '../app/firebase'
import { AppContext } from '../components/Context'


const Orders = () => {
  const tableHead = ['Email', 'Date', 'Total Price', 'Payment Method']
  const { orders, totalPrice } = useContext(AppContext)
  return (
    <>

      <Table  borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }} style={{ marginHorizontal: 20, marginTop: 50 }}>
        <Row  data={tableHead} style={{ height: 60, backgroundColor: '#f1f8ff', textAlign: 'center', fontWeight: 'bold'}}/>
        {
          orders.map((order, index) => (
            <TableWrapper key={index} style={{ flexDirection: 'row' }}>
              <Cell data={order.email} />
              <Cell data={order.date} />
              <Cell data={order.totalPrice} />
              <Cell data={order.paymentMethod} />
            </TableWrapper>
          ))
        }
      </Table>
    </>
  )
}

export default Orders