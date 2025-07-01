import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

const tableHead = ['User', 'Bid', 'Bid', 'Bid'];
const tableData = [
    ['Sai', '100', '99', '98'],
    ['Priya', '100', '97', '96'],
    ['Neha', '97', '95', '94'],
];

const tableHead2 = ['Bid', 'Bid', 'User', 'Unique or Not', 'Feedback'];
const tableData2 = [
    ['100', '100', 'Sai, Priya', 'Not Unique', 'Highest but not Unique'],
    ['99', '', 'Sai', 'Unique', 'Highest and Unique'],
];

const TableComponent = () => {
    return (
        <View style={styles.container}>
            {/* First Table */}
            <View style={styles.table}>
                <View style={[styles.row, styles.header]}>
                    {tableHead.map((head, index) => (
                        <Text key={index} style={styles.cell}>{head}</Text>
                    ))}
                </View>
                <FlatList
                    data={tableData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.row}>
                            {item.map((cell, index) => (
                                <Text key={index} style={styles.cells}>{cell}</Text>
                            ))}
                        </View>
                    )}
                />
            </View>

            {/* Second Table */}
            <View style={styles.table}>
                <View style={[styles.row, styles.header]}>
                    {tableHead2.map((head, index) => (
                        <Text key={index} style={styles.cell}>{head}</Text>
                    ))}
                </View>
                <FlatList
                    data={tableData2}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.row}>
                            {item.map((cell, index) => (
                                <Text key={index} style={styles.cells}>{cell}</Text>
                            ))}
                        </View>
                    )}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 20,
    },
    table: {
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 10,
    },
    header: {
        backgroundColor: colors.gold,
    },
    cell: {
        flex: 1,
        textAlign: 'center',
        fontSize: 16,
        color: colors.black,
    },
    cells: {
        flex: 1,
        textAlign: 'center',
        fontSize: 16,
        color: colors.white,
    }
});

export default TableComponent;