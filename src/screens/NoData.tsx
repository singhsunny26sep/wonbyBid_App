import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors } from '../constants/colors';
import { AppBar } from '../components/AppBar';

// NoData component accepts 'title' prop
export default function NoData({ title }:any) {
  return (
    <View style={styles.container}>
      <AppBar />
      {/* Display title dynamically */}
      <Text style={{ color: 'white' }}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
