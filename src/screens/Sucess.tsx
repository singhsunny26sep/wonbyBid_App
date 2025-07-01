import {Box} from '@gluestack-ui/themed';

import {Container} from '../components/Container';
import {AppBar} from '../components/AppBar';
import {colors} from '../constants/colors';
import Body from '../components/Body/Body';
import {
  CircleGreenTick,
  LikeThumbGreenIcon,
  WLetterIcon,
} from '../components/Icons';
import {moderateScale, moderateScaleVertical} from '../utils/responsiveSize';
import {Text} from '@gluestack-ui/themed';
import {shadowStyle} from '../constants/constant';
import {Image} from '@gluestack-ui/themed';
import {imgIcon} from '../assets/icons';
import PrimaryButton from '../components/Button/PrimaryButton';
import {ParamListBase, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {NavigationString} from '../navigation/navigationStrings';
import {useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';



const SucessScreen = () => {
  // init
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute();
  const {amount=0, bonus=0, bonusCashExpireDate}: any = route?.params;

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
    0: {opacity: 0},
    1: {opacity: 1},
  };

  const slideInUp = {
    0: {opacity: 0, translateY: 50},
    1: {opacity: 1, translateY: 0},
  };

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return (
    <Container
      statusBarStyle="light-content"
      statusBarBackgroundColor={colors.themeRed}
      backgroundColor={colors.black}>
      <AppBar title="Deposited" back />
      <Body>
        <Animatable.View animation={slideInUp} duration={1000}>
          <Box
            bgColor={colors.black}
            h={moderateScale(140)}
            borderRadius={moderateScale(10)}
            mx={moderateScale(45)}
            mt={moderateScaleVertical(70)}
            style={shadowStyle}
            pt={moderateScaleVertical(45)}
            px={moderateScale(15)}>

            <Animated.View
            
              style={[
                styles.container,
                {
                  opacity: animatedOpacity,
                  transform: [{translateY: animatedTranslateY}],
                  paddingTop:40
                },
              ]}>
              <CircleGreenTick
                width={moderateScale(50)}
                height={moderateScale(50)}
                style={styles.tick}
              />
            </Animated.View>
            <Box alignItems="center" justifyContent="center" mt={moderateScaleVertical(30)} gap={5}>
              <Text
                fontFamily={'$robotoBold'}
                fontSize={14}
                lineHeight={16}
                color={colors.white}
                marginTop={15}
                numberOfLines={1}>
                Transaction Successful
              </Text>
              <Text
                fontFamily={'$robotoBold'}
                fontSize={20}
                marginTop={15}
                lineHeight={22}
                color={colors.white}
                numberOfLines={1}>
                {'\u20B9'} {amount}
              </Text>
            </Box>
        
          </Box>
        </Animatable.View>


        <Text px={10} fontSize={14} color={colors.gray8}               marginTop={50}        >
          Withdrawal times may vary, sometimes a withdrawal may take up to 24
          hours.
        </Text>
      </Body>

      <Animatable.View animation="pulse" iterationCount="infinite">
        <PrimaryButton
          buttonText={`Let's Play`}
          onPress={() => navigation.navigate(NavigationString.Home)}
          backgroundColor={colors.greenText}
          height={moderateScaleVertical(45)}
          marginHorizontal={moderateScale(20)}
          marginBottom={moderateScaleVertical(10)}
        />
      </Animatable.View>
    </Container>
  );
};

export default SucessScreen;

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
