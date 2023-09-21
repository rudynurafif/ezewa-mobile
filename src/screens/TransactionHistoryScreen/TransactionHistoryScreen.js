import React, { useEffect } from 'react'
import { View, Text, FlatList, StyleSheet, Image } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { getTransactionsHistory } from '../../store/TransactionSlice'
import { BASE_URL } from '../../utils/constants'

const TransactionHistory = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTransactionsHistory())
  }, [])

  const transactions = useSelector((state) => state.transaction.transactions)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transaction History</Text>
      {transactions.length === 0 ? (
        <Text>No transactions available</Text>
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.orderId}
          renderItem={({ item }) => (
            <View style={styles.transactionContainer}>
              <View style={styles.imageContainer}>
                <Image
                  source={{
                    uri:
                      item.buildingImages && item.buildingImages.length > 0
                        ? BASE_URL +
                          item.orderDetails[0].buildingResponse.buildingImages[0].url
                        : 'https://miro.medium.com/v2/resize:fit:640/format:webp/1*X2vJLKG_C3AxLLJWy4YP0w.png',
                  }}
                  style={styles.buildingImage}
                />
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.boldText}>Order ID: {item.orderId}</Text>
                <Text style={styles.boldText}>Transaction Date: {item.transDate}</Text>
                <Text style={styles.boldText}>Status: {item.orderDetails[0].status}</Text>
                <Text style={styles.boldText}>
                  Building Name: {item.orderDetails[0].buildingResponse.buildingName}
                </Text>
                <Text style={styles.boldText}>
                  Price: {item.orderDetails[0].buildingResponse.price}
                </Text>
                <Text style={styles.boldText}>
                  Location: {item.orderDetails[0].buildingResponse.location}
                </Text>
                <Text style={styles.boldText}>
                  Vendor Email: {item.orderDetails[0].buildingResponse.vendor.email}
                </Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 30,
  },
  transactionContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    elevation: 4,
  },
  imageContainer: {
    flex: 1,
    marginRight: 16,
  },
  detailsContainer: {
    flex: 1,
  },
  buildingImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    // elevation: 4,
    marginBottom: 8,
  },
  boldText: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default TransactionHistory
