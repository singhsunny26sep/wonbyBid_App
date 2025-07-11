import { useContext, useEffect, useState } from 'react'
import { ParamListBase, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { OtpInput } from 'react-native-otp-entry'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { Box, Image, Text, LinearGradient, Pressable, useToast, Toast, ToastTitle } from '@gluestack-ui/themed'
import { LinearGradient as RNLinearGradient } from "react-native-linear-gradient"

import { Container } from '../components/Container'
import { colors } from '../constants/colors'
import { moderateScale, moderateScaleVertical, textScale } from '../utils/responsiveSize'
import { imgIcon } from '../assets/icons'
import PrimaryButton from '../components/Button/PrimaryButton'
import { NavigationString } from '../navigation/navigationStrings'
import useOtpVerifing from '../hooks/auth/otp-verify'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppBar } from '../components/AppBar'
import socketServices from '../utils/socketService'
import { AuthContext } from '../utils/authContext'
import messaging from '@react-native-firebase/messaging';
import axios from 'axios'
import { serverBaseURL } from '../constants/constant'
import useUserLogin from '../hooks/auth/user-login'


const VerifyOTP = () => {
  // init
  const toast = useToast()
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute()
  const authContext: any = useContext(AuthContext);
  const { mobileNumber, sessionId }: any = route.params
  console.log(sessionId, mobileNumber)
  const [fcmToken, setFcmToken] = useState('')
  const [loading, setLoading] = useState(false);
  const [isOtpVerify, setIsOptVerify] = useState(false)
  const [sessionIdResend, setSessionId] = useState()

  // api
  const useOtpVerifingMutation = useOtpVerifing()
  const useUserLoginMutation = useUserLogin();


  // state
  const [otpInput, setOtpInput] = useState<string>('');

  const getFCMToken = async () => {
    try {
      const token = await messaging().getToken();
      setFcmToken(token);
    } catch (error) {
      console.error('Error getting FCM token:', error);
    }
  };

  useEffect(() => {
    getFCMToken();

  }, [])



  const onOTPVerifing = async () => {
    // navigation.navigate(NavigationString.BottomTabBar)
    setLoading(true)
    const payload: any = {
      mobileNumber: mobileNumber,
      // sessionId: sessionId ? sessionId?.Details : sessionIdResend,
      sessionId: sessionId || sessionIdResend,
      otp: Number(otpInput),
      fcmToken: fcmToken
    }

    // console.log(payload)
    const isFirst = await AsyncStorage.getItem('hasSeenIntro')

    useOtpVerifingMutation.mutate(payload, {
      onSuccess: async (data) => {
        if (data?.data?.success) {
          toast.show({
            placement: "bottom",
            render: ({ id }) => {
              const toastId = "toast-" + id
              return (
                <Toast nativeID={toastId} variant="accent" action="success">
                  <ToastTitle>LogIn successfully</ToastTitle>
                </Toast>
              );
            },
          })

          if (!isFirst) {
            navigation.navigate(NavigationString.BottomTabBar)
          }
          // console.log(data?.data,'otp');
          // console.log("result: ", data?.data);

          socketServices.initialzeSocket(data?.data?.data?._id)
          await AsyncStorage.setItem('authState', JSON.stringify(data?.data));
          await authContext.setAuthState({
            profile: data?.data?.data?.profile,
            accessToken: data?.data?.token,
            refreshToken: data?.data?.token,
            expirationTime: Date.now(),
            userId: data?.data?.data?._id,
            authenticated: true,
            fcmToken
          });

          // console.log("data?.data?.data: ", data?.data?.data);

          await AsyncStorage.setItem("userInfo", JSON.stringify(data?.data?.data))
          authContext.setUserInfo({
            userUniqueId: null,
            userId: data?.data?.data?._id,
            userName: data?.data?.data?.name,
            userMobile: data?.data?.data?.mobileNumber,
            useEmail: data?.data?.data?.email,
            profile: data?.data?.data?.profile,
            fcmToken
          })
          setIsOptVerify(true)
        } else {
          toast.show({
            placement: "bottom",
            render: ({ id }) => {
              const toastId = "toast-" + id
              return (
                <Toast nativeID={toastId} variant="accent" action="error">
                  <ToastTitle>{(data?.data?.message || 'Something went wrong, please try again later')}</ToastTitle>
                </Toast>
              );
            },
          })
        }
      },

    })
  }

  const onnResendOtp = () => {
    // navigation.navigate(NavigationString.VerifyOTP, { userEmail: userEmail })
    const payload = {
      mobileNumber: +mobileNumber,
      fcmToken: fcmToken,
      // mobileNumber: generateUniqueMobileNumber(),
    };

    useOtpVerifingMutation.reset()

    useUserLoginMutation.mutate(payload, {
      onSuccess: data => {
        if (data?.data?.success) {
          toast.show({
            placement: 'bottom',
            render: ({ id }) => {
              const toastId = 'toast-' + id;
              return (
                <Toast nativeID={toastId} variant="accent" action="success">
                  <ToastTitle>{`${data?.data?.message}`}</ToastTitle>
                </Toast>
              );
            },
          });
          // console.log(data?.data,'kjkj');
          setSessionId(data?.data?.sessionId || data?.data?.data?.sessionId)
        } else {
          toast.show({
            placement: 'bottom',
            render: ({ id }) => {
              const toastId = 'toast-' + id;
              return (
                <Toast nativeID={toastId} variant="accent" action="error">
                  <ToastTitle>{`${data?.data?.message}`}</ToastTitle>
                </Toast>
              );
            },
          });
        }
      },
    });
  };

  function getMaskedEmail(email: string) {
    const localPart = email.split("@")[0]; // Get the part before '@'
    const domain = email.split("@")[1]; // Get the part after '@'
    const maskedLocalPart = localPart.slice(0, 3); // Extract the first 3 letters
    return `${maskedLocalPart}***@${domain}`;
  }
  const verifyUser = async () => {
    try {
      const authStateString: any = await AsyncStorage.getItem('authState');
      if (!authStateString) {
        setLoading(false);
        return;
      }
      const authState = JSON.parse(authStateString);
      const token = authState?.token;
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await axios.post(`${serverBaseURL}user/login_check`, {}, { headers: { Authorization: token }, });
      if (response.data.success) {
        navigation.navigate(NavigationString.BottomTabBar)
      } else {
        navigation.navigate(NavigationString.UserRefer)
        setLoading(false);
      }
    } catch (error) {
      console.log("Login check error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOtpVerify) {
      verifyUser();
    }
  }, [isOtpVerify]);



  return (
    <Container statusBarStyle='light-content' statusBarBackgroundColor={colors.themeRed} backgroundColor={colors.black}>
      <AppBar back />
      {/* <LinearGradient  colors={[colors.themeRed, black]} locations={[0.65, 1]} useAngle={true} angle={205} angleCenter={{ x: -0.2, y: 0.1 }} style={{ flex: 1 }}> */}

      <Box mx={moderateScale(20)} pt={moderateScaleVertical(10)}>
        <Box gap={moderateScaleVertical(15)} my={moderateScaleVertical(45)}>
          <Text fontFamily={'$robotoBold'} fontSize={24} lineHeight={26} color={colors.white} >Enter the OTP</Text>
          <Text fontFamily={'$robotoRegular'} fontSize={16} lineHeight={18} color={colors.white} >Verify your account using OTP on {mobileNumber}</Text>
        </Box>

        <OtpInput
          numberOfDigits={6}
          onTextChange={(text) => setOtpInput(text)}
          focusColor={colors.white}
          focusStickBlinkingDuration={400}
          theme={{
            pinCodeTextStyle: { color: colors.gold },
            pinCodeContainerStyle: { borderColor: colors.white, },
            containerStyle: {
              // marginHorizontal: responsiveWidth(6),
              // marginVertical: responsiveHeight(8),
            }
          }}
        />

        <Box mt={moderateScaleVertical(35)} gap={moderateScale(15)}>
          <Box flexDirection='row' alignItems='center' alignSelf='center' my={moderateScaleVertical(20)} >
            <Text fontFamily={'$robotoRegular'} fontSize={16} lineHeight={20} color={colors.white} >Didn't receive the OTP ? </Text>
            <Pressable onPress={() => { }}>
              <Text fontFamily={'$robotoBold'} onPress={onnResendOtp} fontSize={16} lineHeight={20} color={colors.gold} >Resend OTP</Text>
            </Pressable>
          </Box>

          <PrimaryButton onPress={onOTPVerifing} loading={useOtpVerifingMutation.isPending && loading}
            disabled={useOtpVerifingMutation.isPending && loading} buttonText='Continue' loaderColor={colors.white}
            backgroundColor={colors.gold} textColor={colors.white} height={moderateScale(50)} />
        </Box>
      </Box>

      {/* </LinearGradient> */}
    </Container>
  )
}

export default VerifyOTP