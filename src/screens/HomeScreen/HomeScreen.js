import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { Searchbar } from 'react-native-paper'
import GridView from '../../shared/components/GridView'
import { homeStyles } from './HomeScreen.style'
import { getBuildings } from '../../store/BuildingSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredData, setFilteredData] = useState([])

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

  return (
    <View style={homeStyles.container}>
      <View style={homeStyles.header}>
        <Text style={homeStyles.headerTitle}>Ezewa</Text>
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
