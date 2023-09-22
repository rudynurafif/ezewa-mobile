import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Searchbar } from 'react-native-paper'
import GridView from '../../shared/components/GridView'
import { homeStyles } from './HomeScreen.style'
import { getBuildings } from '../../store/BuildingSlice'
import { useDispatch, useSelector } from 'react-redux'
import { onNavigate } from '../../navigation/RootNavigation'
import { Entypo, FontAwesome, Ionicons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons'
import PATH from '../../navigation/NavigationPath'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Modal } from 'react-native'

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [modalAccount, setModalAccount] = useState(false);

  const dispatch = useDispatch()

  const onChangeSearch = (query) => {
    setSearchQuery(query)
    filterData(query)
  }

  const filterData = (query) => {
    const filtered = buildings.filter((item) =>
      item.buildingName.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredData(filtered)
  }
  useEffect(() => {
    dispatch(getBuildings())
  }, [])

  const buildings = useSelector((state) => state.building.buildings)

  const onLogout = async () => {
    const token = await AsyncStorage.removeItem('token')
    if (!token) {
      onNavigate({
        routeName: PATH.LANDING,
        isReplace: true
      })
    }
  }

  const onMovetoTransactionHistory = async () => {
    setModalAccount(!modalAccount);
    onNavigate({
      routeName: PATH.TRANSACTIONS_HISTORY,
      isReplace: false
    })
  }

  const openModal = () => {
    setModalAccount(!modalAccount);
  };

  const closeModal = () => {
    setModalAccount(!modalAccount);
  };

  return (
    <View style={homeStyles.container}>
      <View style={homeStyles.header}>
        <Text style={homeStyles.headerTitle}>Ezewa</Text>
        <TouchableOpacity onPress={() => openModal()}>
          <Entypo name="dots-three-vertical" size={20} color="#4b4b4b" style={{ paddingLeft: 16, paddingRight: 6, paddingVertical: 4 }} />
        </TouchableOpacity>

        <Modal
          animationType='fade'
          transparent={true}
          visible={modalAccount}
          onRequestClose={closeModal}
        >
          <TouchableOpacity
            style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
            onPress={() => closeModal()}
          >
            <View style={homeStyles.centeredView}>
              <View style={homeStyles.modalView}>
                <TouchableOpacity onPress={() => onMovetoTransactionHistory()} style={homeStyles.modalItem}>
                  <FontAwesome name="list-alt" size={18} color="black" style={{ paddingRight: 8 }} />
                  <Text style={{ fontSize: 16 }}>Transaction History</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onLogout()} style={homeStyles.modalItem}>
                  <SimpleLineIcons name="logout" size={18} color="black" style={{ paddingRight: 8 }} />
                  <Text style={{ fontSize: 16 }}>Logout</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>

      <GridView buildings={filteredData.length > 0 ? filteredData : buildings} />

      <View style={homeStyles.tabBarContainer}>
        <Searchbar
          placeholder='Search'
          theme={{
            colors: {
              primary: 'white',
              onSurfaceVariant: 'white',
              onSurface: 'white',
            },
          }}
          style={{ backgroundColor: '#cbcbcb' }}
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </View>
    </View>
  )
}
