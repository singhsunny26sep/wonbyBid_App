import React, { useEffect, useState } from 'react'
import { GluestackUIProvider, } from "@gluestack-ui/themed"
import { QueryClientProvider } from '@tanstack/react-query'
import { config } from './gluestack-ui.config'

import AppNavigator from './src/navigation'
import { queryClient } from './src/utils/react-query-config'
import { AuthProvider } from './src/utils/authContext'
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

const App = () => {

  const [fcmToken, setFcmToken] = useState('')
  const [notify, setNotify] = useState(false)

  const getFCMToken = async () => {
    try {
      const token = await messaging().getToken();
      setFcmToken(token);
      console.log(fcmToken,"this is token fcm")
    } catch (error) {
      console.error('Error getting FCM token:', error);
    }
  };

  useEffect(() => {
    getFCMToken();

  }, [])


  useEffect(() => {
    const unsubscribe = messaging().onTokenRefresh(async newToken => {
      // console.log('FCM token refreshed:', newToken);
      setFcmToken(newToken);
    });

    return unsubscribe;
  }, []);


  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      if (remoteMessage.notification) {
        console.log("Foreground notification received:", remoteMessage);

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

    return unsubscribe;
  }, []);



  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider config={config}>
        <AuthProvider>
          <AppNavigator />
        </AuthProvider>
      </GluestackUIProvider>
    </QueryClientProvider>
  )
}

export default App