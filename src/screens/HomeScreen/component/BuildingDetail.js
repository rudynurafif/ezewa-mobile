import { useEffect, useState } from 'react'
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Calendar } from 'react-native-calendars'
import { styles } from './BuildingDetail.style'
import { useSelector } from 'react-redux'
import { getBuildingById } from '../../../store/BuildingSlice'
import { BASE_URL } from '../../../utils/constants'

export default function BuildingDetail({ route }) {
  const [visible, setVisible] = useState(false)

  const currentDate = new Date()
  const currentDateString = currentDate.toISOString().split('T')[0]
  const [dateStart, setDateStart] = useState()
  const [date, setDate] = useState()
  const [selected, setSelected] = useState()


  const building = route.params

  const formatPrice = (amount) => {
    const formattedAmount = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(amount)

    return formattedAmount.replace(/\,00$/, '')
  }

  const handleDayPress = (day) => {
    const timestampDay = day.dateString + ' ' + '00:00'
    const timestampStart = new Date(timestampDay).getTime()

    if (timestampStart < currentDate.getTime()) {
      Alert.alert('Invalid Date', 'The rental date shall not be less than or equal to the current date.')
      return
    }

    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    setDate(new Date(timestampStart).toLocaleDateString('en-US', options))
    setSelected(day.dateString)
  }

  const chooseDate = () => {
    if (!date) {
      Alert.alert('Invalid Date', 'Pick a Date')
      return
    }
    setDateStart(date)
    setVisible(!visible)
  }

  const createTransaction = () => {
    
  }

  return (
    <View style={{ flex: 1, paddingTop: 35, borderColor: 'green' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ alignSelf: 'center', borderColor: 'black' }}>
          <Image
            style={styles.image}
            source={{
              uri: BASE_URL + building.buildingImages[0].url,
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
              animationType='slide'
              transparent={true}
              visible={visible}
              onRequestClose={() => {
                setVisible(!visible)
              }}
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

                  <TouchableOpacity
                    style={[
                      styles.pickDateBtn,
                      { backgroundColor: '#6f6f6f', alignItems: 'center', width: '100%' },
                    ]}
                    onPress={chooseDate}
                  >
                    <Text style={{ color: 'white' }}>Choose</Text>
                  </TouchableOpacity>
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

        <TouchableOpacity style={styles.tabBarBtn}>
          <Text style={styles.tabBarText}>Rent</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
