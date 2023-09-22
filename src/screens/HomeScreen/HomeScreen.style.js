import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 35,
    },
    header: {
        height: 60,
        paddingVertical: 8,
        paddingHorizontal: 16,
        justifyContent: 'space-between',
        alignItems: 'baseline',
        flexDirection: 'row',
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: 24,
    },
    tabBarContainer: {
        backgroundColor: 'white',
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    centeredView: {
        flex: 1,
        marginTop: 15,
        marginRight: 16,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    modalView: {
        width: 240,
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        alignItems: 'flex-start',

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalItem: {
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingVertical: 12,
        alignItems: 'center',
        width: '100%'
    }
})

