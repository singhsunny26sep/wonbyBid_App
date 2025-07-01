/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

// Create notification channel
PushNotification.createChannel(
  {
    channelId: '1234', // ID for the channel
    channelName: 'My Notification Channel', // Name of the channel
    channelDescription: 'A channel to categorize my notifications', // Optional description
    soundName: 'default', // Default sound
    importance: 4, // 4: High importance
    vibrate: true, // Vibration setting
    priority: "high",  // to ensure it pops up immediately
  },
  (created) => console.log(`createChannel returned '${created}'`) // log channel creation status
);

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  if (remoteMessage.notification) {
    console.log("Background notification received:", remoteMessage);
    PushNotification.localNotification({
      channelId: '1234',
      title: remoteMessage.notification?.title || 'Default Title',
      message: remoteMessage.notification?.body || 'This is the default notification description.',
      bigPictureUrl: remoteMessage.notification?.imageUrl,
      priority: "high",
      importance: "high",
      playSound: true,
      soundName: 'default',
    });
  }
});




// Handle notifications that opened the app
messaging().getInitialNotification(async remoteMessage => {
  console.log("removetmessage: ", remoteMessage);
  if (remoteMessage) {
    // console.log('Notification caused app to open from quit state:', remoteMessage);
  }
});


AppRegistry.registerComponent(appName, () => App);
