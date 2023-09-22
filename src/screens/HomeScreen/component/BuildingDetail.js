import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState } from 'react'
import {
  Alert,
  Image,
  Linking,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { Calendar } from 'react-native-calendars'
import { useDispatch } from 'react-redux'
import { createTransaction } from '../../../store/TransactionSlice'
import { BASE_URL } from '../../../utils/constants'
import { styles } from './BuildingDetail.style'

export default function BuildingDetail({ route }) {

  const dispatch = useDispatch()

  const currentDate = new Date()
  const currentDateString = currentDate.toISOString().split('T')[0]

  const [visible, setVisible] = useState(false)
  const [dateStart, setDateStart] = useState()
  const [date, setDate] = useState()
  const [selected, setSelected] = useState()
  const [transactionUrl, setTransactionUrl] = useState(null)

  const building = route.params

  const clearTransactionUrl = () => {
    setTransactionUrl(null);
  }

  const formatPrice = (amount) => {
    const formattedPrice = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(amount)

    return formattedPrice.replace(/\,00$/, '')
  }

  const handleDayPress = (day) => {
    const timestampDay = day.dateString + ' ' + '00:00'
    const timestampStart = new Date(timestampDay).getTime()

    if (timestampStart < currentDate.getTime()) {
      Alert.alert('Invalid Date', 'The rental date shall not be less than or equal to the current date.')
      return
    }

    setDate(timestampStart)
    setSelected(day.dateString)
  }

  const chooseDate = () => {
    if (!date) {
      Alert.alert('Invalid Date', 'Pick a Date')
      return
    }

    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    setDateStart(new Date(date).toLocaleDateString('en-US', options))

    setVisible(!visible)
  }

  const onRent = async () => {
    if (!date) {
      Alert.alert('Invalid Date', 'Please Pick a Date to rent')
      return
    }

    if (transactionUrl) {
      try {
        const supported = await Linking.canOpenURL(transactionUrl)

        if (supported) {
          await Linking.openURL(transactionUrl)
        } else {
          Alert.alert(`Don't know hot to open this URL: ${transactionUrl}`)
        }
      } catch (error) {
        console.error(error)
      }
      return
    }

    const customerId = await AsyncStorage.getItem('id')
    const buildingPriceId = building.buildingPriceId

    const newDate = new Date(date)
    const formattedDate = `${newDate.getFullYear()}-${(newDate.getMonth() + 1).toString().padStart(2, '0')}-${newDate.getDate().toString().padStart(2, '0')} 23:59:00`

    const transaction = {
      customerId: customerId,
      orderDetails: [
        {
          buildingPriceId: buildingPriceId,
          dateStart: formattedDate
        }
      ]
    }

    await dispatch(createTransaction(transaction)).then(async (result) => {
      if (result.payload) {
        const url = result.payload.orderMidtransResponse.redirectUrl;

        try {
          const supported = await Linking.canOpenURL(url);

          if (supported) {
            await Linking.openURL(url);

            setTransactionUrl(url)

            setTimeout(clearTransactionUrl, 600000)
          } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
          }
        } catch (error) {
          console.error(error);
        }
      }
    })
  }

  return (
    <View style={{ flex: 1, paddingTop: 35, borderColor: 'green' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ alignSelf: 'center', borderColor: 'black' }}>
          <Image
            style={styles.image}
            source={{
              uri:
                building.buildingImages && building.buildingImages.length > 0
                  ? BASE_URL + building.buildingImages[0].url
                  : 'https://miro.medium.com/v2/resize:fit:640/format:webp/1*X2vJLKG_C3AxLLJWy4YP0w.png',
            }}
          />
        </View>

        <View
          style={{
            flex: 4,
            paddingVertical: 8,
            paddingHorizontal: 16,
          }}
        >
          <Text style={styles.buildingName}>{building.buildingName}</Text>

          <Text style={styles.buildingPrice}>{formatPrice(building.price)}</Text>

          <Text style={styles.buildingLocation}>{building.location}</Text>

          <View style={styles.descNPickDate}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 16 }}>
              Building Description
            </Text>

            <Modal
              animationType='fade'
              transparent={true}
              visible={visible}
              onRequestClose={() => { setVisible(!visible) }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Calendar
                    initialMonth={currentDateString}
                    onDayPress={handleDayPress}
                    markedDates={{
                      [selected]: { selected: true, selectedColor: '#6f6f6f' },
                    }}
                    theme={{
                      backgroundColor: 'white',
                      calendarBackground: 'white',
                    }}
                  />

                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                      style={[
                        styles.pickDateBtn,
                        { backgroundColor: 'white', borderWidth: 0.5, alignItems: 'center', flex: 1, marginRight: 8 },
                      ]}
                      onPress={() => { setVisible(!visible) }}
                    >
                      <Text style={{ color: '#6f6f6f' }}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.pickDateBtn,
                        { backgroundColor: '#6f6f6f', alignItems: 'center', flex: 1 },
                      ]}
                      onPress={() => chooseDate()}
                    >
                      <Text style={{ color: 'white' }}>Choose</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>

            <TouchableOpacity
              style={styles.pickDateBtn}
              onPress={() => setVisible(!visible)}
            >
              <Text>Choose Date</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.buildingDesc}>{building.description}</Text>
        </View>
      </ScrollView>

      <View style={styles.tabBarContainer}>
        <View style={{ flex: 1, paddingRight: 40 }}>
          <Text style={styles.tabBarDate}>{dateStart ? dateStart : ''}</Text>

          {building.available ? (
            <Text style={styles.available}>Available</Text>
          ) : (
            <Text style={styles.notAvailable}>Not Available</Text>
          )}
        </View>

        <TouchableOpacity style={styles.tabBarBtn} onPress={() => onRent()}>
          <Text style={styles.tabBarText}>{transactionUrl ? 'Pay Rent' : 'Rent'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
