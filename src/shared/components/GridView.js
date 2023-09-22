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
import { styles } from './GridView.style'

const GridView = ({ buildings }) => {

  const formatPrice = (amount) => {
    const formattedPrice = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(amount)

    return formattedPrice.replace(/\,00$/, '')
  }

  const handleItemPress = (building) => {
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
            uri:
              item.buildingImages && item.buildingImages.length > 0
                ? BASE_URL + item.buildingImages[0].url
                : 'https://miro.medium.com/v2/resize:fit:640/format:webp/1*X2vJLKG_C3AxLLJWy4YP0w.png',
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



export default GridView
