import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import Video from 'react-native-video';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NavigationString } from '../navigation/navigationStrings';

const { width, height } = Dimensions.get('window');

const IntroVideoScreen = () => {
  const navigation = useNavigation<any>();
  const [paused, setPaused] = useState(false);

  const handleSkip = async () => {
    setPaused(true);
    await AsyncStorage.setItem('hasSeenIntro', 'true');
    navigation.navigate(NavigationString.Login);
  };

  const handleEnd = async () => {
    await AsyncStorage.setItem('hasSeenIntro', 'true');
    navigation.navigate(NavigationString.Login);
  };

  return (
    <View style={styles.container}>
      {/* Transparent margins */}
      <View style={styles.overlayTop} />
      <View style={styles.middleRow}>
        <View style={styles.overlaySide} />

        {/* Video container */}
        <View style={styles.videoWrapper}>
          <Video
            source={require('../assets/video/video.mp4')}
            style={styles.video}
            resizeMode="cover"
            onEnd={handleEnd}
            paused={paused}
            muted={false}
            repeat={false}
            controls={false}
          />
        </View>

        <View style={styles.overlaySide} />
      </View>
      <View style={styles.overlayBottom} />

      {/* Skip button */}
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  overlayTop: {
    flex: 0.25,
    backgroundColor: 'transparent',
  },
  overlayBottom: {
    flex: 0.25,
    backgroundColor: 'transparent',
  },
  middleRow: {
    flex: 0.5,
    flexDirection: 'row',
  },
  overlaySide: {
    flex: 0.2,
    backgroundColor: 'transparent',
  },
  videoWrapper: {
    flex: 0.6,
    overflow: 'hidden',
    borderRadius: 10,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  skipButton: {
    position: 'absolute',
    top: 45,
    right: 25,
    backgroundColor: 'rgba(255,255,255,0.7)',
    padding: 10,
    borderRadius: 5,
    zIndex: 10,
  },
  skipText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default IntroVideoScreen;
