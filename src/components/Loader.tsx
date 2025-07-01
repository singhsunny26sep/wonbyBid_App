import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'
import { colors } from '../constants/colors'

export default function Loader() {
  return (
    <View style={styles.container}>
      <FastImage
        source={require('../assets/images/hammer1.gif')}
        style={styles.loader}
        resizeMode={FastImage.resizeMode.contain}
      />
      {/* <Text style={styles.text}>Loading...</Text> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  loader: {
    width: 110,
    height: 110,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
    color:colors.gold,
  },
})
