import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Share,
  Alert,
  Clipboard,
} from 'react-native';
// import Clipboard from '@react-native-clipboard/clipboard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../constants/colors';
import { AppBar } from '../components/AppBar';

export default function ShareContests() {
  const [contestCode] = useState('FMDJAVATS8');

  const handleCopy = () => {
    Clipboard.setString(contestCode);
    Alert.alert('Copied', 'Contest code copied to clipboard');
  };

  const handleWhatsAppShare = async () => {
    try {
      await Share.share({
        message: `Join this contest using the code: ${contestCode}`,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share');
    }
  };
  return (
    <View style={styles.container}>
        <AppBar left={true}/>
      {/* Header */}
      {/* <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="close" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.matchInfo}>
          <Text style={styles.matchText}>ISTN vs JBJ</Text>
          <Text style={styles.timerText}>3h 22m left</Text>
        </View>
        <Text style={styles.timeBox}>11:37</Text>
      </View> */}
      {/* Image */}
      <Image
        source={require('../assets/images/shares.jpeg')} 
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.shareText}>Share Contest via</Text>

      {/* WhatsApp Share Button */}
      <TouchableOpacity style={styles.whatsappBtn} onPress={handleWhatsAppShare}>
        <Icon name="whatsapp" size={22} color="#fff" />
        <Text style={styles.whatsappText}>WhatsApp</Text>
      </TouchableOpacity>

      {/* Contest Code */}
      <View style={styles.codeBox}>
        <Text style={styles.codeLabel}>Contest Code</Text>
        <View style={styles.codeRow}>
          <Text style={styles.codeText}>{contestCode}</Text>
          <TouchableOpacity onPress={handleCopy} >
            <Icon name="content-copy" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.orText}>or</Text>

      {/* Join Button */}
      <TouchableOpacity style={styles.joinBtn}>
        <Text style={styles.joinText}>Join this Contest</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
      padding: 16,
      alignItems: 'center',
    },
    header: {
      backgroundColor: '#c62828',
      width: '100%',
      paddingTop: 40,
      paddingBottom: 10,
      paddingHorizontal: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    matchInfo: {
      alignItems: 'center',
    },
    matchText: {

      color:colors.white,
      fontSize: 16,
      fontWeight: '600',
    },
    timerText: {

      color:colors.white,
      fontSize: 14,
    },
    timeBox: {
      backgroundColor: '#4caf50',

      color:colors.white,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 6,
      fontSize: 12,
    },
    image: {
      width:"100%",
      height: 200,
      marginVertical: 20,
    },
    shareText: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 12,
    },
    whatsappBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#25D366',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
      marginBottom: 20,
    },
    whatsappText: {
        color:colors.white,
      fontWeight: '600',
      fontSize: 16,
      marginLeft: 8,
    },
    codeBox: {
      borderColor: '#2196f3',
      borderWidth: 1,
      borderStyle: 'dashed',
      borderRadius: 10,
      padding: 14,
      width: '90%',
      marginBottom: 10,
    },
    codeLabel: {
        color:colors.white,

      fontSize: 14,
    },
    codeRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 6,
    },
    codeText: {
      fontSize: 18,
      fontWeight: 'bold',
      color:colors.white

    },
    orText: {
        color:colors.white,
      marginVertical: 16,
      fontWeight: '500',
    },
    joinBtn: {
      borderColor: '#000',
      borderWidth: 1,
      paddingVertical: 12,
      paddingHorizontal: 40,
      borderRadius: 8,
    },
    joinText: {
      fontWeight: '600',
      fontSize: 16,
      color:colors.white
    },
  });
  