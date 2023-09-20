import { useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { styles } from './BuildingDetail.style';

export default function BuildingDetail() {

    const [visible, setVisible] = useState(false);

    const currentDate = new Date()
    const currentDateString = currentDate.toISOString().split('T')[0]
    const [dateStart, setDateStart] = useState()
    const [selected, setSelected] = useState()

    const item = {
        id: 1,
        buildingName: 'Green Building',
        location: 'Jakarta',
        price: 1000000,
        date: '16 September 2023',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan vel semper nulla. \n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum euismod, sapien ut lacinia tincidunt, libero est varius est, eget bibendum lorem elit a libero. Sed nec velit id libero efficitur commodo. Curabitur et tortor ac dui mattis varius. Nulla facilisi. Phasellus id dictum ante. \n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum euismod, sapien ut lacinia tincidunt, libero est varius est, eget bibendum lorem elit a libero. Sed nec velit id libero efficitur commodo. Curabitur et tortor ac dui mattis varius. Nulla facilisi. Phasellus id dictum ante. \n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum euismod, sapien ut lacinia tincidunt, libero est varius est, eget bibendum lorem elit a libero. Sed nec velit id libero efficitur commodo. Curabitur et tortor ac dui mattis varius. Nulla facilisi. Phasellus id dictum ante.',
        available: false
    }

    const formatPrice = (amount) => {
        const formattedAmount = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        }).format(amount);

        return formattedAmount.replace(/\,00$/, '');
    };

    const chooseDate = () => {
        setVisible(!visible)
    }

    const handleDayPress = (day) => {
        const timestampDay = day.dateString + " " + '00:00'
        const timestampStart = new Date(timestampDay).getTime();

        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const dateStart = new Date(timestampStart).toLocaleDateString('en-US', options);

        setSelected(day.dateString)
        setDateStart(dateStart)
    }

    return (
        <View style={{ flex: 1, paddingTop: 35, borderColor: 'green' }}>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ alignSelf: 'center', borderColor: 'black' }}>
                    <Image
                        style={styles.image}
                        source={{
                            uri: 'https://i.pinimg.com/originals/65/f6/69/65f669506ba37049cf41fc4a927db6f6.gif'
                        }}
                    />
                </View>


                <View style={{
                    flex: 4,
                    paddingVertical: 8,
                    paddingHorizontal: 16,

                }}>
                    <Text style={styles.buildingName}>
                        {item.buildingName}
                    </Text>

                    <Text style={styles.buildingPrice}>
                        {formatPrice(item.price)}
                    </Text>

                    <Text style={styles.buildingLocation}>
                        {item.location}
                    </Text>

                    <View style={styles.descNPickDate}>

                        <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 16 }}>
                            Building Description
                        </Text>

                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={visible}
                            onRequestClose={() => { setVisible(!visible) }}>
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>

                                    <Calendar
                                        initialMonth={currentDateString}
                                        onDayPress={handleDayPress}
                                        markedDates={{
                                            [selected]: { selected: true, selectedColor: '#6f6f6f' }
                                        }}
                                        theme={{
                                            backgroundColor: 'white',
                                            calendarBackground: 'white',
                                        }}
                                    />

                                    <TouchableOpacity style={[styles.pickDateBtn, { backgroundColor: '#6f6f6f', alignItems: 'center', width: '100%' }]} onPress={chooseDate}>
                                        <Text style={{ color: 'white' }}>Choose</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>

                        <TouchableOpacity style={styles.pickDateBtn} onPress={() => setVisible(!visible)}>
                            <Text>Choose Date</Text>
                        </TouchableOpacity>

                    </View>

                    <Text style={styles.buildingDesc}>
                        {item.desc}
                    </Text>

                </View>
            </ScrollView>

            <View style={styles.tabBarContainer}>
                <View style={{ flex: 1, paddingRight: 40 }}>
                    <Text style={styles.tabBarDate}>{dateStart ? dateStart : ''}</Text>


                    {item.available ?
                        <Text style={styles.available}>Available</Text>
                        : <Text style={styles.notAvailable}>Not Available</Text>}
                </View>

                <TouchableOpacity style={styles.tabBarBtn}>
                    <Text style={styles.tabBarText}>Rent</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

