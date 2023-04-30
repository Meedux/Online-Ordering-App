import React, { useContext } from 'react'
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component'
import { AppContext } from '../components/Context'
import { Card } from '@rneui/base'


const Orders = () => {
  const tableHead = ['Email', 'Date', 'Total Price', 'Payment Method']
  const { orders, totalPrice } = useContext(AppContext)
  return (
    <>
      <Card style={{ marginTop: 50, }}>
        <Table  borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }} style={{ marginHorizontal: 20, }}>
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
      </Card>
    </>
  )
}

export default Orders