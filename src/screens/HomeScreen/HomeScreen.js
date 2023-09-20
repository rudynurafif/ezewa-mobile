import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import GridView from '../../shared/components/GridView';
import { homeStyles } from './HomeScreen.style';

export default function HomeScreen() {

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const onChangeSearch = (query) => {
        setSearchQuery(query);
        filterData(query);
    };

    const dummyData = [
        { id: 1, buildingName: 'Green Building', location: 'Jakarta', price: 1000000, available: false },
        { id: 2, buildingName: 'Green Building', location: 'Jakarta', price: 1000000, available: false },
        { id: 3, buildingName: 'Green Building', location: 'Jakarta', price: 1000000, available: false },
        { id: 4, buildingName: 'Green Building', location: 'Jakarta', price: 1000000, available: true },
        { id: 5, buildingName: 'Green Building', location: 'Jakarta', price: 1000000, available: true },
        { id: 6, buildingName: 'Green Building', location: 'Jakarta', price: 1000000, available: true },
        { id: 7, buildingName: 'Green Building', location: 'Jakarta', price: 1000000, available: true },
        { id: 8, buildingName: 'Green Building asda sdas dasdas dasdas dasd asd asd asd', location: 'Jakarta', price: 1000000, available: true },
        { id: 9, buildingName: 'Green Building', location: 'Jakarta', price: 1000000, available: true },
        { id: 10, buildingName: 'Green Building', location: 'Jakarta', price: 1000000, available: true },
        { id: 11, buildingName: 'Green Building', location: 'Jakarta', price: 1000000, available: true },
        { id: 12, buildingName: 'Gedung Merah', location: 'Jakarta', price: 1000000, available: false },
        { id: 13, buildingName: 'Green Building', location: 'Jakarta', price: 1000000, available: true },
        { id: 14, buildingName: 'Green Building', location: 'Jakarta', price: 1000000, available: true },
        { id: 15, buildingName: 'Green Building', location: 'Jakarta', price: 1000000, available: true },
        { id: 16, buildingName: 'Green Building', location: 'Jakarta', price: 1000000, available: true },
        { id: 17, buildingName: 'Green Building', location: 'Jakarta', price: 1000000, available: true },
        { id: 18, buildingName: 'Green Building', location: 'Jakarta', price: 1000000, available: true },
        { id: 19, buildingName: 'Green Building', location: 'Jakarta', price: 1000000, available: true },
        { id: 20, buildingName: 'Green Building', location: 'Jakarta', price: 1000000, available: true },
        { id: 21, buildingName: 'Green Building', location: 'Jakarta', price: 1000000, available: true },
        { id: 22, buildingName: 'Green Building', location: 'Jakarta', price: 1000000, available: true },
        { id: 23, buildingName: 'Green Building', location: 'Jakarta', price: 1000000, available: true },
    ];

    const filterData = (query) => {
        const filtered = dummyData.filter((item) =>
            item.buildingName.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredData(filtered);
    };

    return (
        <View style={homeStyles.container}>
            <View style={homeStyles.header}>
                <Text style={homeStyles.headerTitle}>Ezewa</Text>
            </View>

            <GridView buildings={filteredData.length > 0 ? filteredData : dummyData} />

            <View style={homeStyles.tabBarContainer}>
                <Searchbar
                    placeholder="Search"
                    theme={{
                        colors: {
                            primary: 'white',
                            onSurfaceVariant: 'white',
                            onSurface: 'white'
                        }
                    }}
                    style={{ backgroundColor: '#cbcbcb' }}
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                />
            </View>
        </View>
    )
}
