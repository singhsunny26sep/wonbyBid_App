import React, { useState } from 'react';
import { Modal, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Box } from '@gluestack-ui/themed';
import { WebView } from 'react-native-webview';
import Body from '../Body/Body';
import { AppBar } from '../AppBar';

const UPIWebView = ({ visible,paymentLink, onClose,children }) => {
  const [isBonusCheckOpen,setBonusCheck] =useState(false)
  return  (
    <Box backgroundColor='$black' style={styles.container}>
      <Modal visible={visible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          {/* 🔙 Back Button */}
                 <View
  style={{
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: "flex-end",
    paddingHorizontal: 10,
    height:40,
    width:'100%'
  }}
>
  <TouchableOpacity onPress={()=>onClose()} style={styles.backButton}>
    <Text style={styles.backText}>←</Text>
  </TouchableOpacity>

</View>


          {/* Optional Extra Components */}
                <Body style={{marginTop:-10,padding:0}} >
                     
                       <View style={styles.extraComponents}>

            {/* {isBonusCheckOpen&&children } */}
            </View>
             <View style={styles.webviewContainer}>
            {/* <WebView 
              // source={{ uri: 'https://payments.cashfree.com/forms?code=wonbybid' }} 
              // source={{ uri:'https://payments-test.cashfree.com/forms?code=wobybidTest' }} 
              source={{ uri: paymentLink }}
              style={styles.webview}
              startInLoadingState={true}
            /> */}
            
<WebView
  source={{ uri: paymentLink }}
  style={{ flex: 1 }}
  originWhitelist={['*']}
  javaScriptEnabled={true}
  domStorageEnabled={true}
  startInLoadingState={true}
  allowsBackForwardNavigationGestures={true}
  onNavigationStateChange={(navState) => {
    console.log('Navigation State:', navState);
  }}
  onError={(e) => {
    console.error('WebView Error:', e.nativeEvent);
  }}
/>
          </View>
          </Body>

          {/* 🌐 WebView */}
         
        </View>
      </Modal>
    </Box>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'black',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  backButton: {

    padding: 0,
    margin:0,

  },
  backText: {
    fontSize: 35,
    color: '#fff',
  },
  openCalcText: {
    fontSize: 14,
    color: '#fff',
    backgroundColor:'rgba(180, 180, 180, 0.1)',
    paddingHorizontal:6,
    paddingVertical:4,
    borderRadius:2
  },
 extraComponents:{
  marginVertical:50
 },
  webviewContainer: {
    flex: 1,
    marginTop: -50,
  },
  webview: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
});


export default UPIWebView;
