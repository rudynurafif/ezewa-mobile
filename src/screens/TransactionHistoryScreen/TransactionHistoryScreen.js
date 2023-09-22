import React, { useEffect } from 'react'
import { FlatList, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getTransactionsHistory } from '../../store/TransactionSlice'
import { BASE_URL } from '../../utils/constants'
import AsyncStorage from '@react-native-async-storage/async-storage'

const TransactionHistory = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTransactionsHistory())
  }, [])

  const transactions = useSelector((state) => state.transaction.transactions)

  const onPayRent = async (orderId) => {
    const url = await AsyncStorage.getItem(orderId)

    try {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transaction History</Text>
      {transactions.length === 0 ? (
        <Text>No transactions available</Text>
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.orderId}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.transactionContainer}>
              <View style={styles.imageContainer}>
                <Image
                  source={{
                    uri:
                      item.orderDetails[0].buildingResponse.buildingImages && item.orderDetails[0].buildingResponse.buildingImages.length > 0
                        ? BASE_URL + item.orderDetails[0].buildingResponse.buildingImages[0].url
                        : 'https://miro.medium.com/v2/resize:fit:640/format:webp/1*X2vJLKG_C3AxLLJWy4YP0w.png',
                  }}
                  style={styles.buildingImage}
                />
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.boldText}>Status: {item.orderDetails[0].status}</Text>
                <Text>{item.transDate}</Text>
                <Text>Building Name: {item.orderDetails[0].buildingResponse.buildingName}</Text>
                <Text>Price: {item.orderDetails[0].buildingResponse.price}</Text>
                <Text>Location: {item.orderDetails[0].buildingResponse.location}</Text>
                <Text>Vendor Email: {item.orderDetails[0].buildingResponse.vendor.email}</Text>

                {item.orderDetails[0].status.toLowerCase() === 'pending' ?
                  <TouchableOpacity
                    style={styles.payBtn}
                    onPress={() => onPayRent(item.orderId)}
                  >
                    <Text style={{ color: 'white' }}>Pay Rent</Text>
                  </TouchableOpacity>
                  : null
                }
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
    padding: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 30,
  },
  transactionContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 6,
    margin: 4,
    borderRadius: 8,
    elevation: 4,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  detailsContainer: {
    flex: 1,
    paddingLeft: 8,
    justifyContent: 'flex-start'
  },
  buildingImage: {
    height: 120,
    aspectRatio: 1,
    resizeMode: 'cover',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
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
  payBtn: {
    backgroundColor: '#6f6f6f',
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderWidth: 1,
    borderColor: '#6f6f6f',
    borderRadius: 8,
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
})

export default TransactionHistory
