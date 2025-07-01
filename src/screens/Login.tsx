import {
  Box,
  Image,
  Text,
  LinearGradient,
  useToast,
  Toast,
  ToastTitle,
  StatusBar,
} from '@gluestack-ui/themed';
import {LinearGradient as RNLinearGradient} from 'react-native-linear-gradient';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import messaging from '@react-native-firebase/messaging';
import {Container} from '../components/Container';
import {colors} from '../constants/colors';
import {
  Alert,
  Platform,
  ScrollView,
  TextInput,
  ToastAndroid,
} from 'react-native';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../utils/responsiveSize';
import {imgIcon} from '../assets/icons';
import PrimaryButton from '../components/Button/PrimaryButton';
import {NavigationString} from '../navigation/navigationStrings';
import useUserLogin from '../hooks/auth/user-login';
import {useEffect, useState} from 'react';
import {number} from 'yup';
import {imagePaths} from '../assets/images';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {OtplessHeadlessModule} from 'otpless-react-native';

const Login = () => {
  const headlessModule = new OtplessHeadlessModule();
  // init
  const toast = useToast();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [loading, setLoading] = useState<boolean>(false);

  // states
  const [userEmail, setUserEmail] = useState('');
  const [mobile, setMobile] = useState<any>();
  // api
  const useUserLoginMutation = useUserLogin();
  const [fcmToken, setFcmToken] = useState<string>('');

  const getFCMToken = async () => {
    let token = await messaging().getToken();
    setFcmToken(token);

    // const playServicesAvailable = await GoogleSignin.hasPlayServices()
    // console.log("playServicesAvailable: ", playServicesAvailable);
  };

  function generateUniqueMobileNumber() {
    // Generate a random number between 1000000000 and 9999999999 (10-digit mobile number format)
    const randomDigits = Math.floor(Math.random() * 9000000000) + 1000000000;

    // Combine with the current timestamp to ensure uniqueness
    const uniqueNumber = `${randomDigits}${Date.now()}`;

    // Ensure that the number is 10 digits long by trimming if necessary
    return uniqueNumber.slice(0, 10); // Trim to 10 digits
  }

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '834214211724-hmjgcgo1pv38s1d7eigcgfltkbdh45se.apps.googleusercontent.com', // From Google Cloud Console
      offlineAccess: true,
    });

    getFCMToken();
  }, []);

  const onLogin = () => {
    // navigation.navigate(NavigationString.VerifyOTP, { userEmail: userEmail })
    const payload = {
      name: 'user',
      mobileNumber: mobile,
      fcmToken: fcmToken,
      // mobileNumber: generateUniqueMobileNumber(),
    };
    console.log(payload)

    useUserLoginMutation.mutate(payload, {
      onSuccess: data => {
        if (data?.data?.success) {
          toast.show({
            placement: 'bottom',
            render: ({id}) => {
              const toastId = 'toast-' + id;
              return (
                <Toast nativeID={toastId} variant="accent" action="success">
                  <ToastTitle>{`${data?.data?.message}`}</ToastTitle>
                </Toast>
              );
            },
          });



          navigation.navigate(NavigationString.VerifyOTP, {
            mobileNumber: mobile,
            sessionId: data?.data?.sessionId||data?.data?.data?.sessionId
          });

        } else {
          toast.show({
            placement: 'bottom',
            render: ({id}) => {
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

  return (
    <Box flex={1} backgroundColor="black">
      <ScrollView>
        <StatusBar backgroundColor={colors.black} />
        <Container
          statusBarStyle="light-content"
          statusBarBackgroundColor={colors.themeRed}
          backgroundColor={colors.black}>
          <LinearGradient
            as={RNLinearGradient}
            colors={[colors.black, colors.black]}
            locations={[0.65, 1]}
            useAngle={true}
            angle={205}
            angleCenter={{x: -0.2, y: 0.1}}
            style={{flex: 1}}>
            <Box
              alignSelf="center"
              mt={moderateScaleVertical(90)}
              justifyContent={'center'}
              alignItems="center"
              alignContent="center">
              <Image
                alt="icon"
                source={imagePaths.loginLogo}
                /*  tintColor={'#fff'} */ width={200}
                height={200}
                resizeMode="cover"
                mb={moderateScale(10)}
              />
              <Text
                fontFamily={'$robotoBold'}
                fontSize={26}
                lineHeight={28}
                color={colors.white}
                alignSelf="center">
                WONBYBID
              </Text>
              <Text
                fontFamily={'$robotoBold'}
                fontSize={26}
                lineHeight={28}
                color={colors.white}
                alignSelf="center"
                mt={5}>
                WHERE EVERY BID COUNTS
              </Text>
            </Box>
            {/* mobile login */}

            <Box
              flexDirection="row"
              alignItems="center"
              // borderRightWidth={1}
              borderColor={colors.gray3}
              bg={colors.black}
              h={moderateScale(50)}
              pl={moderateScale(10)}
              mx={moderateScale(20)}
              borderRadius={moderateScale(5)}
              mt={moderateScaleVertical(60)}>
              {/* <PhoneIcon width={30} fill={colors.gold} /> */}
              <Text color={colors.gold} fontWeight="800" fontSize={18}>
                +91
              </Text>
              <TextInput
                placeholder="Enter your mobile number"
                placeholderTextColor={colors.dimGray}
                value={mobile}
                maxLength={10}
                onChangeText={t => setMobile(t)}
                keyboardType="number-pad"
                autoCapitalize="none"
                style={{
                  backgroundColor: colors.black,
                  color: colors.gold, 
                  fontSize: textScale(14),
                  lineHeight: moderateScale(16),
                  fontFamily: 'Roboto-Medium',
                  flex: 1,
                  borderWidth: 1,
                  borderRightColor: colors.gold,
                  padding: moderateScale(10),
                  borderRadius: moderateScale(8),
                }}
              />
            </Box>
            <PrimaryButton
              buttonText="Login"
              loading={useUserLoginMutation.isPending}
              disabled={useUserLoginMutation.isPending}
              onPress={onLogin}
              loaderColor={colors.white}
              fontSize={20}
              backgroundColor={colors.gold}
              textColor={colors.white}
              height={moderateScale(50)}
              marginHorizontal={moderateScale(20)}
              marginTop={moderateScaleVertical(40)}
            />

            <Box px={14}>
              <Text marginTop={24} color={colors.gold} fontSize={20}>
                Beta Testing
              </Text>
              <Text marginTop={14} color="white" fontSize={14}>
                Enjoy the Beta Testing Phase!
              </Text>
              <Text color="#ccc" fontSize={14} marginTop={5}>
                “If you find any issues, please report them in the Beta Testing
                section.”
              </Text>
            </Box>

            {/* <PrimaryButton buttonText='Login with google' loading={loading} disabled={loading}  loaderColor={colors.themeRed} fontSize={20} backgroundColor={colors.white} textColor={colors.themeRed} height={moderateScale(50)} marginHorizontal={moderateScale(20)} marginTop={moderateScaleVertical(40)} /> */}
            {/* <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={28} color={colors.white} >powered by <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={28} color={colors.black} >WonByBid</Text></Text> */}
          </LinearGradient>
        </Container>
      </ScrollView>
    </Box>
  );
};

export default Login;
