import React, { useEffect, useState } from 'react'
import { GluestackUIProvider, } from "@gluestack-ui/themed"
import { QueryClientProvider } from '@tanstack/react-query'
import { config } from './gluestack-ui.config'

import AppNavigator from './src/navigation'
import { queryClient } from './src/utils/react-query-config'
import { AuthProvider } from './src/utils/authContext'
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, AndroidStyle } from '@notifee/react-native';
// import PushNotification from 'react-native-push-notification';

const App = () => {

  const [fcmToken, setFcmToken] = useState('')
  const [notify, setNotify] = useState(false)

  const getFCMToken = async () => {
    try {
      const token = await messaging().getToken();
      setFcmToken(token);
      console.log(fcmToken, "this is token fcm")
    } catch (error) {
      console.error('Error getting FCM token:', error);
    }
  };

  /* useEffect(() => {
    getFCMToken();

  }, []) */

  // Foreground notification handling
  const handleForegroundNotification = async (remoteMessage) => {
    console.log('📩 Foreground FCM Message:', remoteMessage);

    const image = remoteMessage.notification?.android?.imageUrl || remoteMessage.notification?.image;

    await notifee.displayNotification({
      title: remoteMessage.notification?.title || 'New Notification',
      body: remoteMessage.notification?.body || '',
      android: {
        channelId: '1234',
        smallIcon: 'ic_launcher', // Make sure it's correctly set up in Android
        importance: AndroidImportance.HIGH,
        style: image
          ? { type: AndroidStyle.BIGPICTURE, picture: image }
          : undefined,
      },
    });
  };

  // Background message handler
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('📩 Background FCM Message:', remoteMessage);

    const image = remoteMessage.notification?.android?.imageUrl || remoteMessage.notification?.image;

    await notifee.displayNotification({
      title: remoteMessage.notification?.title || 'New Notification',
      body: remoteMessage.notification?.body || '',
      android: {
        channelId: '1234',
        smallIcon: 'ic_launcher',
        importance: AndroidImportance.HIGH,
        style: image
          ? { type: AndroidStyle.BIGPICTURE, picture: image }
          : undefined,
      },
    });
  });


  useEffect(() => {
    getFCMToken();

    const unsubscribeOnMessage = messaging().onMessage(async (remoteMessage) => {
      await handleForegroundNotification(remoteMessage);
    });

    const unsubscribeTokenRefresh = messaging().onTokenRefresh(async (newToken) => {
      setFcmToken(newToken);
      console.log('🔁 Token refreshed:', newToken);
    });

    // Check for notification that opened the app
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('📬 Initial notification (app opened by tapping):', remoteMessage);
          // Example: navigate based on notification type
          // navigationRef.current?.navigate('NotificationScreen');
        }
      });

    return () => {
      unsubscribeOnMessage();
      unsubscribeTokenRefresh();
    };
  }, []);


  useEffect(() => {
    const unsubscribe = messaging().onTokenRefresh(async newToken => {
      // console.log('FCM token refreshed:', newToken);
      setFcmToken(newToken);
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