// IntroVideoScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import Video from 'react-native-video';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NavigationString } from '../navigation/navigationStrings';

const { width, height } = Dimensions.get('window');

const IntroVideoScreen = () => {
  const navigation = useNavigation<any>();
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const [paused, setPaused] = useState(false); // <-- control pause

  const handleSkip = async () => {
    setPaused(true); // Pause the video
    await AsyncStorage.setItem('hasSeenIntro', 'true');
    navigation.navigate(NavigationString.Login) // Navigate to Home or Login
  };

  const handleEnd = async () => {
    setIsVideoEnded(true);
    await AsyncStorage.setItem('hasSeenIntro', 'true');
    navigation.navigate(NavigationString.Login)
  };

  return (
    <View style={styles.container}>
      <Video
        source={require('../assets/video/video.mp4')} // your local video
        style={styles.backgroundVideo}
        resizeMode="cover"
        onEnd={handleEnd}
        muted={false}
        repeat={false}
        paused={paused} // <-- bind here
        controls={false}
      />
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundVideo: {
    width,
    height,
    position: 'absolute',
  },
  skipButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(255,255,255,0.7)',
    padding: 10,
    borderRadius: 5,
  },
  skipText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default IntroVideoScreen;
