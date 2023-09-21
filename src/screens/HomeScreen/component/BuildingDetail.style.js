import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    image: {
        height: 300,
        width: 350,
        aspectRatio: 2/1,
    },
    buildingName: {
        fontWeight: 'bold',
        fontSize: 32,
    },
    buildingPrice: {
        fontSize: 24
    },
    buildingLocation: {
        color: '#8e8e8e',
        marginTop: 4,
        marginBottom: 8,
        fontSize: 16
    },
    buildingDesc: {
        color: '#8e8e8e',
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
        paddingHorizontal: 4,
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: '#4b4b4b',
        textAlign: 'center',
        borderRadius: 4,
    },
    tabBarContainer: {
        height: 70,
        backgroundColor: 'white',
        paddingVertical: 8,
        paddingHorizontal: 16,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexDirection: 'row',

        borderTopWidth: 0.8,
        borderTopColor: '#dcdcdc',
    },
    tabBarBtn: {
        backgroundColor: '#999999',
        paddingVertical: 14,
        paddingHorizontal: 40,
        alignSelf: 'center',
        borderRadius: 8,
    },
    tabBarText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
    },
    tabBarDate: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#505050',
        marginBottom: 4
    },
    pickDateBtn: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#6f6f6f',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 24,
    },
    descNPickDate: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingBottom: 8
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        width: '80%',
        height: '55%',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 35,
        alignItems: 'center',

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
})