import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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