import { Box, Image, LinearGradient } from '@gluestack-ui/themed'
import { LinearGradient as RNLinearGradient } from "react-native-linear-gradient"
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Container } from '../components/Container'
import { colors } from '../constants/colors'
import { moderateScale, moderateScaleVertical } from '../utils/responsiveSize'
import { imgIcon } from '../assets/icons'
import { Text } from '@gluestack-ui/themed'
import { useContext, useEffect, useState } from 'react'
import { NavigationString } from '../navigation/navigationStrings'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthContext } from '../utils/authContext'
import socketServices from '../utils/socketService'
import { imagePaths } from '../assets/images'
import { PermissionsAndroid, Platform } from 'react-native'
import messaging from '@react-native-firebase/messaging';
import { check, PERMISSIONS, request, requestNotifications, RESULTS } from 'react-native-permissions'
import { Alert } from 'react-native'
import * as Animatable from 'react-native-animatable';

const Splash = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const authContext: any = useContext(AuthContext);
  const [permissionStatus, setPermissionStatus] = useState<string>('Unknown');
  var loginstatus = false;

  useEffect(() => {
    // checkPermission()
    setTimeout(() => {
      // navigation.navigate(NavigationString.Login)
      authLoad()
    }, 1500);

  }, [])

  async function authLoad() {

    const isFirst = await AsyncStorage.getItem('hasSeenIntro')
    console.log("isFirst: ", isFirst);
    // navigation.navigate(NavigationString.IntroVideoScreen)
    if (isFirst) {


      // console.log('APP aload splash',)
      // AsyncStorage.clear()
      let authData = authContext?.authState
      let userData = authContext?.userInfo
      const authStateString: any = await AsyncStorage.getItem('authState');
      const userInfo: any = await AsyncStorage.getItem('userInfo');
      const authSaveDataJson = JSON.parse(authStateString)
      const userInfoData = JSON.parse(userInfo)
      if (authSaveDataJson) {
        loginstatus = true
        await authContext.setAuthState({
          accessToken: authSaveDataJson?.token,
          refreshToken: authSaveDataJson?.token,
          expirationTime: Date.now(),
          userId: authSaveDataJson?.data?._id,
          authenticated: true,
        });
        await authContext.setUserInfo({
          userUniqueId: null,
          userId: userInfoData?._id,
          userName: userInfoData?.name,
          userMobile: userInfoData?.mobile,
          useEmail: userInfoData?.email,
          profile: userInfoData?.profile,
        })
        checkPermission()
        socketServices.initialzeSocket(authSaveDataJson?.data?._id)
        navigation?.navigate(NavigationString.BottomTabBar)
      } else {
        console.log('No tokeninfo from memoery')
        navigation.navigate(NavigationString.Login)
      }
    } else {
      navigation.navigate(NavigationString.IntroVideoScreen)
      await AsyncStorage.setItem("isFirst", "true")
    }
  }
  const checkPermission = async () => {
    try {
      // Request notification permission
      const { status: notificationStatus } = await requestNotifications(['alert', 'badge', 'sound']);

      if (notificationStatus !== 'granted') {
        Alert.alert(
          'Notification Permission Denied',
          'Please enable notifications to use this feature.',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Enable', // If user presses Enable, re-request permission
              onPress: () => requestPermission(),
            },
          ]
        );
      } else {
        setPermissionStatus(notificationStatus);
      }

      // Check camera and gallery permissions
      if (Platform.OS === 'android') {
        const cameraPermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'We need access to your camera to capture photos.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );

        const galleryPermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'We need access to your photo library to upload images.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );

        if (
          cameraPermission !== PermissionsAndroid.RESULTS.GRANTED ||
          galleryPermission !== PermissionsAndroid.RESULTS.GRANTED
        ) {
          // Alert.alert(
          //   'Permission Denied',
          //   'Camera and Storage permissions are required to use this feature.'
          // );
        }
      } else {
        // iOS permissions
        const cameraStatus = await check(PERMISSIONS.IOS.CAMERA);
        const galleryStatus = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);

        if (cameraStatus !== RESULTS.GRANTED) {
          const cameraRequest = await request(PERMISSIONS.IOS.CAMERA);
          if (cameraRequest !== RESULTS.GRANTED) {
            Alert.alert('Permission Denied', 'Camera access is required.');
          }
        }

        if (galleryStatus !== RESULTS.GRANTED) {
          const galleryRequest = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
          if (galleryRequest !== RESULTS.GRANTED) {
            Alert.alert('Permission Denied', 'Photo Library access is required.');
          }
        }
      }
    } catch (error) {
      console.error('Error checking permissions:', error);
    }
  };

  const requestPermission = async () => {
    try {
      // Re-request notification permission
      const { status: notificationStatus } = await requestNotifications(['alert', 'badge', 'sound']);
      if (notificationStatus !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'You can enable notifications in settings later.'
        );
        return;
      }

      // Re-request camera and gallery permissions
      if (Platform.OS === 'android') {
        const cameraPermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA
        );
        const galleryPermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        );

        if (
          cameraPermission !== PermissionsAndroid.RESULTS.GRANTED ||
          galleryPermission !== PermissionsAndroid.RESULTS.GRANTED
        ) {
          // Alert.alert(
          //   'Permission Denied',
          //   'Camera and Storage permissions are required to use this feature.'
          // );
        }
      } else {
        const cameraRequest = await request(PERMISSIONS.IOS.CAMERA);
        const galleryRequest = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);

        if (cameraRequest !== RESULTS.GRANTED || galleryRequest !== RESULTS.GRANTED) {
          Alert.alert('Permission Denied', 'Camera and Photo Library access are required.');
        }
      }
    } catch (error) {
      console.error('Error requesting permissions:', error);
    }
  };

  return (
    <Container statusBarStyle="light-content" statusBarBackgroundColor={colors.themeRed} backgroundColor={colors.white}>
      <LinearGradient as={RNLinearGradient} colors={[colors.black, colors.black]} locations={[0.65, 1]} useAngle={true} angle={205} angleCenter={{ x: -0.2, y: 0.1 }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}      >
        <Box alignSelf="center" justifyContent="center" alignItems="center" alignContent="center">
          {/* Logo Animation */}
          <Animatable.View animation="zoomIn" duration={1300}>
            <Image alt="icon" source={imagePaths.loginLogo} height={200} width={200} resizeMode="cover" mb={10} />
          </Animatable.View>

          <Animatable.Text animation="fadeInUpBig" delay={800} duration={1000} style={{ fontFamily: '$robotoBold', fontSize: 26, lineHeight: 28, color: colors.white, textAlign: 'center', }}>
            <Text fontFamily={'$robotoBold'} fontSize={26} lineHeight={28} color={colors.white} alignSelf='center' >WONBYBID</Text>
          </Animatable.Text>

          <Animatable.Text animation="fadeInUpBig" delay={900} duration={1200} style={{ fontFamily: '$robotoBold', fontSize: 26, lineHeight: 28, color: colors.white, textAlign: 'center', }}>
            <Text fontFamily={'$robotoBold'} fontSize={26} lineHeight={28} color={colors.white} alignSelf='center' >WHERE EVERY BID COUNTS</Text>
          </Animatable.Text>
        </Box>
      </LinearGradient>
    </Container>

  )
}

export default Splash
{/* <Container statusBarStyle='light-content' statusBarBackgroundColor={colors.themeRed} backgroundColor={colors.white}>
      <LinearGradient as={RNLinearGradient} colors={[colors.themeRed, '#600000']} locations={[0.65, 1]} useAngle={true} angle={205} angleCenter={{ x: -0.2, y: 0.1 }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>


        <Box alignSelf='center' justifyContent={'center'} alignItems='center' alignContent='center'>
          <Animatable.Image animation="lightSpeedIn" duration={1300}>

            <Image alt='icon' source={imagePaths.loginLogo} w={moderateScale(110)} h={moderateScale(110)} resizeMode='contain' mb={10} />
          </Animatable.Image>
          <Text fontFamily={'$robotoBold'} fontSize={26} lineHeight={28} color={colors.white} alignSelf='center' >WONBYBID</Text>
          <Text fontFamily={'$robotoBold'} fontSize={26} lineHeight={28} color={colors.white} alignSelf='center' >WHERE EVERY BID COUNTS</Text>
        </Box>
      </LinearGradient>
    </Container> */}