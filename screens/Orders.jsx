import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { AppContext } from '../components/Context';
import { Card } from '@rneui/base';

const Orders = () => {
  const { orders, totalPrice } = useContext(AppContext);

  const tableHead = ['Date', 'Total Price', 'Payment Method', 'Status'];
  const tableData = orders.map((order) => [
    order.date,
    order.totalPrice,
    order.paymentMethod,
    order.status,
  ]);

  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Your Orders</Text>
        <Text style={styles.totalPriceText}>Total Price: ${totalPrice}</Text>
      </View>
      <Table borderStyle={styles.tableBorder}>
        <Row
          data={tableHead}
          style={styles.tableHead}
          textStyle={styles.tableHeadText}
        />
        <Rows data={tableData} textStyle={styles.tableRowText} />
      </Table>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  totalPriceText: {
    fontSize: 18,
  },
  tableBorder: {
    borderWidth: 2,
    borderColor: 'black',
  },
  tableHead: {
    height: 60,
    backgroundColor: '#f1f8ff',
  },
  tableHeadText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tableRowText: {
    textAlign: 'center',
  },
});

export default Orders;
