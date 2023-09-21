import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 35,
    },
    header: {
        flexDirection: "row",
        height: 60,
        padding: 8,
        justifyContent: 'space-between',
        alignItems: 'baseline',
        paddingHorizontal: 20

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
})

