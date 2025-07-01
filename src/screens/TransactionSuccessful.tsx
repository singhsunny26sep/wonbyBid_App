import { Box } from '@gluestack-ui/themed'

import { Container } from '../components/Container'
import { AppBar } from '../components/AppBar'
import { colors } from '../constants/colors'
import Body from '../components/Body/Body'
import { CircleGreenTick, LikeThumbGreenIcon, WLetterIcon } from '../components/Icons'
import { moderateScale, moderateScaleVertical } from '../utils/responsiveSize'
import { Text } from '@gluestack-ui/themed'
import { shadowStyle } from '../constants/constant'
import { Image } from '@gluestack-ui/themed'
import { imgIcon } from '../assets/icons'
import PrimaryButton from '../components/Button/PrimaryButton'
import { ParamListBase, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { NavigationString } from '../navigation/navigationStrings'
import { useEffect, useRef, useState } from 'react'
import { Animated, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

const TransactionSuccessful = () => {
  // init
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute()
  const { amount, bonus,bonusCashExpireDate }: any = route?.params

  const animatedOpacity = useRef(new Animated.Value(0)).current; // For fade-in
  const animatedTranslateY = useRef(new Animated.Value(-50)).current; // For sliding down
  // 100 rs pe gst 22%
  // gst will be 22%

  // console.log("bonus: ", bonus);
  // console.log("amount: ", amount);


  // State for calculated GST and deposit
  const [depositAmount, setDepositAmount] = useState<any>(0);
  const [gstAmount, setGstAmount] = useState<any>(0);


  useEffect(() => {
    const gstRate = 0.22; // GST rate 22%
    const gst = amount * gstRate;
    const deposit = amount - gst;

    setGstAmount(gst.toFixed(2)); // Round to 2 decimal places
    setDepositAmount(deposit.toFixed(2));
  }, [amount]);


  useEffect(() => {
    // Start the animation when the component mounts
    Animated.parallel([
      Animated.timing(animatedOpacity, {
        toValue: 1, // Fully visible
        duration: 1000, // 1 second
        useNativeDriver: true,
      }),
      Animated.timing(animatedTranslateY, {
        toValue: 0, // Slide to the original position
        duration: 1000, // 1 second
        useNativeDriver: true,
      }),
    ]).start();
  }, [animatedOpacity, animatedTranslateY]);

  // Define reusable animations
  const fadeIn = {
    0: { opacity: 0 },
    1: { opacity: 1 },
  };

  const slideInUp = {
    0: { opacity: 0, translateY: 50 },
    1: { opacity: 1, translateY: 0 },
  };

  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  return (
    <Container statusBarStyle='light-content' statusBarBackgroundColor={colors.themeRed} backgroundColor={colors.black}>
      <AppBar title='Deposited' back />
      <Body>
        <Animatable.View animation={slideInUp} duration={1000}>
          <Box bgColor={colors.black} h={moderateScale(140)} borderRadius={moderateScale(10)} mx={moderateScale(45)} mt={moderateScaleVertical(70)} style={shadowStyle} px={moderateScale(15)}>
            <Animated.View style={[styles.container, { opacity: animatedOpacity, transform: [{ translateY: animatedTranslateY }], },]}>
              <CircleGreenTick width={moderateScale(50)} height={moderateScale(50)} style={styles.tick} />
            </Animated.View>
            <Box alignItems='center' mt={moderateScaleVertical(30)} gap={5}>
              <Text fontFamily={'$robotoBold'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} >Transaction Successful</Text>
              <Text fontFamily={'$robotoBold'} fontSize={20} lineHeight={22} color={colors.white} numberOfLines={1}>{'\u20B9'} {amount}</Text>
            </Box>
            <Box mt={moderateScaleVertical(20)} gap={moderateScaleVertical(8)}>
              <Box flexDirection='row' alignItems='center' justifyContent='space-between'>
                <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={16} color={colors.white} numberOfLines={1} >Deposit Amount</Text>
                <Text fontFamily={'$robotoBold'} fontSize={12} lineHeight={16} color={colors.white} numberOfLines={1}>{'\u20B9'}{depositAmount}</Text>
              </Box>
              <Box flexDirection='row' alignItems='center' justifyContent='space-between'>
                <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={16} color={colors.white} numberOfLines={1} >Govt. GST on Deposit</Text>
                <Text fontFamily={'$robotoBold'} fontSize={12} lineHeight={16} color={colors.white} numberOfLines={1}>{'\u20B9'}{gstAmount}</Text>
              </Box>
            </Box>
          </Box>
        </Animatable.View>
        <Animatable.View animation={fadeIn} delay={500} duration={1000}>
          <Box flexDirection='row' alignItems='center' justifyContent='space-between' bgColor='#ebf9de' py={moderateScaleVertical(10)} mx={moderateScale(50)} zIndex={-10} mt={moderateScaleVertical(-5)} borderRadius={moderateScale(6)} px={moderateScale(10)} style={shadowStyle}>
            <Box flexDirection='row' alignItems='center'>
              <LikeThumbGreenIcon />
              <Text fontFamily={'$robotoBold'} fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} >Bonus Cash</Text>
            </Box>

            <Box flexDirection='row' alignItems='center' >
              <Image alt='icon' source={imgIcon.bCoin} w={moderateScale(16)} h={moderateScale(13)} alignSelf='baseline' resizeMode='contain' />
              <Text fontFamily={'$robotoBold'} fontSize={16} lineHeight={16} color={colors.greenText} numberOfLines={1}> {bonus ? bonus : 0}</Text>
            </Box>
          </Box>
        </Animatable.View>
        <Animatable.View animation={fadeIn} delay={550} duration={1000}>
          <Box flexDirection='row' alignItems='center' justifyContent='space-between' mx={moderateScale(80)}>
            <Box h={moderateScale(35)} borderRightWidth={2} borderRightColor={colors.gray6} style={{ borderStyle: 'dashed' }}>
            </Box>
            <Box h={moderateScale(35)} borderRightWidth={2} borderRightColor={colors.gray6} style={{ borderStyle: 'dashed' }}>
            </Box>
          </Box>
        </Animatable.View>
        <Animatable.View animation="fadeInUp" duration={800} delay={800}>
          <Box bgColor={colors.black} h={moderateScale(120)} borderRightWidth={1} borderEndEndRadius={10} borderLeftWidth={1} marginBottom={24} borderColor='white' borderRadius={moderateScale(10)} mx={moderateScale(45)} style={shadowStyle} px={moderateScale(15)}>
            <Box alignItems='center' mt={moderateScaleVertical(30)} gap={15}>
              <Box flexDirection='row' alignItems='center' gap={5}>
                <Text fontFamily={'$robotoBold'} fontSize={28} lineHeight={30} color={colors.gold} numberOfLines={1}>{'\u20B9'}{(Number(depositAmount)+(bonus ? bonus : 0)).toFixed(2)}</Text>
                {/* <Image alt='icon' source={imgIcon.bCoin} w={moderateScale(24)} h={moderateScale(25)} alignSelf='baseline' resizeMode='contain' /> */}
                {/* <Text fontFamily={'$robotoBold'} fontSize={28} lineHeight={30} color={colors.greenText} numberOfLines={1}>{bonus ? bonus : 0}</Text> */}
              </Box>
              <Text fontFamily={'$robotoBold'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} >worth added to your wallet</Text>
            </Box>

          </Box>
        </Animatable.View>


        <Animatable.View animation="zoomIn" duration={800} delay={1000}>
          <Box bgColor={colors.black} h={moderateScale(85)} mt={moderateScaleVertical(25)} borderRightWidth={1} borderLeftWidth={1} borderColor='white' borderRadius={moderateScale(10)} mx={moderateScale(45)} style={shadowStyle} px={moderateScale(15)} py={moderateScaleVertical(10)} gap={20}>
            <Text fontFamily={'$robotoBold'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} alignSelf='center'>Benefits Unlocked</Text>

            <Box flexDirection='row' alignItems='center' justifyContent='space-between'>
              <Box>
                <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.white} numberOfLines={1}>Bonus Cash</Text>
                <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.orange} numberOfLines={1}>Expiring on  {new Date(bonusCashExpireDate).getDate()} {months[new Date(bonusCashExpireDate).getMonth()]} {new Date(bonusCashExpireDate).toLocaleTimeString()} </Text>
              </Box>

              <Box flexDirection='row' alignItems='center' gap={4} h={moderateScale(25)}>
                <Image alt='icon' source={imgIcon.bCoin} w={moderateScale(13)} h={moderateScale(13)} resizeMode='contain' />
                <Text fontFamily={'$robotoBold'} fontSize={14} lineHeight={22} color={colors.white} numberOfLines={1}> {bonus ? bonus : 0}</Text>
              </Box>

            </Box>

          </Box>
        </Animatable.View>
      </Body>

      <Animatable.View animation="pulse" iterationCount="infinite">
        <PrimaryButton buttonText={`Let's Play`} onPress={() => navigation.navigate(NavigationString.Home)} backgroundColor={colors.greenText} height={moderateScaleVertical(45)} marginHorizontal={moderateScale(20)} marginBottom={moderateScaleVertical(10)} />
      </Animatable.View>
    </Container>
  )
}

export default TransactionSuccessful

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignSelf: 'center',
    top: 0,
    marginTop: moderateScaleVertical(-30),
  },
  tick: {
    // Additional styles for the tick if needed
  },
});