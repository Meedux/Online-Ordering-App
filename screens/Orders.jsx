import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, RefreshControl, ScrollView } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { AppContext } from '../components/Context';
import { Card } from '@rneui/base';
import { getOrdersById } from '../app/firebase';


const Orders = () => {
  const { orders, totalPrice, id, setOrders, setPrice } = useContext(AppContext);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);

    getOrdersById(id, setOrders, setPrice);

    setRefreshing(false);

  };

  

  const tableHead = ['Payment Method', 'Tracking Number', 'Total Price', 'Status'];
  const tableData = orders.map((order) => [
    order.payment_method,
    order.trackingNumber,
    order.total_price,
    order.status,
  ]);

  return (
    <ScrollView  refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/> }>
      <Card style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Your Orders</Text>
        </View>
        <Table borderStyle={styles.tableBorder}>
          <Row
            data={tableHead}
            style={styles.tableHead}
          />
          <Rows data={tableData} style={styles.tableRowText} />
        </Table>

      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
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
    flexDirection: 'column',
    justifyContent: 'center',
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
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tableHeadText: {
    
  },
  tableRowText: {
    textAlign: 'center',
  },
});

export default Orders;
