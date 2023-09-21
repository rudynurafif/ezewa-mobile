import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

export default function Loading() {

    const isLoadingUser = useSelector((state) => state.user.loading)
    const isLoadingBuilding = useSelector((state) => state.building.loading)
    const isLoadingTransactionHistory = useSelector((state) => state.transaction.loading)

    return (
        (isLoadingUser || isLoadingBuilding || isLoadingTransactionHistory) && (
            <Modal transparent={true} >
                <View style={styles.modalBackground}>
                    <ActivityIndicator size={100} color="#4b4b4b" />
                </View>
            </Modal>
        )
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
})