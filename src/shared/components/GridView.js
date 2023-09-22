import { useNavigation } from '@react-navigation/native'
import React from 'react'
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { onNavigate } from '../../navigation/RootNavigation'
import PATH from '../../navigation/NavigationPath'
import { BASE_URL } from '../../utils/constants'

const GridView = ({ buildings }) => {
  // const navigation = useNavigation()

  const formatPrice = (amount) => {
    const formattedAmount = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(amount)

    return formattedAmount.replace(/\,00$/, '')
  }

  const handleItemPress = (building) => {
    console.log('Item Pressed:', building)
    onNavigate({
      routeName: PATH.BUILDING_DETAIL,
      isReplace: false,
      params: building,
    })
  }

  const renderItem = ({ item }) => (
    <TouchableWithoutFeedback onPress={() => handleItemPress(item)}>
      <View style={styles.item}>
        <Image
          style={styles.image}
          source={{
            uri: BASE_URL + item.buildingImages[0].url,
          }}
        />

        <View style={{ flex: 1, paddingTop: 8 }}>
          <Text style={styles.buildingName}>{item.buildingName}</Text>

          <Text>{formatPrice(item.price)}</Text>

          <Text style={{ color: '#ababab', marginBottom: 8 }}>{item.location}</Text>

          {item.available ? (
            <Text style={styles.available}>Available</Text>
          ) : (
            <Text style={styles.notAvailable}>Not Available</Text>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  )

  const renderEmptyComponent = () => (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Image
        style={styles.noBuilding}
        source={require('../assets/undraw_Building_re_xfcm.png')}
      />
      <Text style={{ fontWeight: 'bold', fontSize: 24, color: '#999999' }}>
        No Buildings Available
      </Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={buildings}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        keyExtractor={(item) => item.buildingId.toString()}
        ListEmptyComponent={renderEmptyComponent}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: 'white',
    padding: 8,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  row: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  image: {
    height: 150,
    alignSelf: 'center',
    borderRadius: 4,
    aspectRatio: 1,
  },
  noBuilding: {
    height: 250,
    aspectRatio: 1,
  },
  loadingView: {
    flexDirection: 'row',
    backgroundColor: '#4b4b4b',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'center',
    marginVertical: 8,
  },
  loadingText: {
    fontWeight: 'bold',
    color: 'white',
    marginRight: 8,
  },
  buildingName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  available: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'white',
    paddingVertical: 2,
    paddingHorizontal: 4,
    backgroundColor: '#4b4b4b',
    textAlign: 'center',
    borderRadius: 4,
  },
  notAvailable: {
    color: '#4b4b4b',
    fontWeight: 'bold',
    fontSize: 14,
    paddingVertical: 2,
    paddingHorizontal: 2,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#4b4b4b',
    textAlign: 'center',
    borderRadius: 4,
  },
})

export default GridView
