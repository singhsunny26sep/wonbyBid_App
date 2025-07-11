import { Box, Image, ImageBackground, Pressable, Text } from '@gluestack-ui/themed'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import Carousel from "pinar";

import { Container } from '../components/Container'
import { colors } from '../constants/colors'
import { moderateScale } from '../utils/responsiveSize'
import { CircketColorIcon, CircleGoldenTick, CopyIcon, ThreeDotsGray, ThreeDotsIcon, WhatsappIcon } from '../components/Icons'
import PrimaryButton from '../components/Button/PrimaryButton'
import { ScrollView, StyleSheet, View } from 'react-native';
import { Dimensions } from 'react-native';
import { useState } from 'react';
import { shadowStyle } from '../constants/constant';
import Body from '../components/Body/Body';
import { AppBar } from '../components/AppBar';
import Share, { Social } from 'react-native-share';
import useUserReferal from '../hooks/auth/get-referal-user';
import { Clipboard, ToastAndroid } from 'react-native';

const ReferEarn = () => {

  const wWidht = Dimensions.get('screen').width;
  const wHeight = Dimensions.get('screen').height;
  const { data: referalData, isLoading: profileIsLoading } = useUserReferal()

  const [sliderImgActive, setSliderImgActive] = useState(0)

  const onChangeSliderImg = (nativeEvent: any) => {

    if (nativeEvent) {
      const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
      if (slide != sliderImgActive) {
        setSliderImgActive(slide)
      }
    }
  }

  /* const shareMessageOnWhatsapp = async () => {
    try {
      const options = {
        message: 'Hello! This is from WonByBid.',
        social: Share.Social.WHATSAPP,
        URL: "https://www.wonbybid.com/"
      };
      await Share.shareSingle(options);
    } catch (error) {
      console.error('Error sharing via WhatsApp:', error);
    }
  }; */
  const shareMessageOnWhatsapp = async () => {
    try {
      const options = {
        message: 'Hello! This is from WonByBid. url: https://www.wonbybid.com/', // The main message
        social: Share.Social.WHATSAPP, // WhatsApp-specific sharing
        URL: "https://www.wonbybid.com/" // The website URL
      };
      await Share.shareSingle(options);
    } catch (error) {
      console.error('Error sharing via WhatsApp:', error);
    }
  };


  /*  const shareRefer = async () => {
     try {
       const options = {
         title: 'Share via',
         message: 'Hello! This is from WonByBid.',
         URL: 'https://www.wonbybid.com/',
       };
       await Share.open(options); // Show popup with all available apps
     } catch (error) {
       console.error('Error sharing content:', error);
     }
   }; */
  const shareRefer = async () => {
    try {
      const options = {
        title: 'Share via', // Title for the share dialog
        message: 'Hello! This is from WonByBid. url: https://www.wonbybid.com/', // The main message
        URL: 'https://www.wonbybid.com/' // The website URL
      };
      await Share.open(options); // Open the share dialog
    } catch (error) {
      console.error('Error sharing content:', error);
    }
  };

  const handleCopyToClipboard = (code) => {
    Clipboard.setString(code);
    ToastAndroid.show('Referral Code Copied!', ToastAndroid.SHORT)
  }

  return (
    <Container statusBarStyle='light-content' statusBarBackgroundColor={colors.black} >
      <AppBar back backgroundColor={colors.black} title='Refer & Earn' />
      <Body>
        <Box w={'100%'} overflow='hidden' backgroundColor={colors.black} style={shadowStyle}>
          <Box w={'100%'} borderBottomLeftRadius={moderateScale(20)} borderBottomRightRadius={moderateScale(20)} overflow='hidden' >
            <ImageBackground alt='icon' source={require('../assets/icons/share.jpeg')} w={'100%'} h={300}>
              <View style={{ width: wWidht * 0.9, height: wHeight * 0.15, alignSelf: 'center', marginHorizontal: responsiveWidth(5), borderColor: '#E3DBDB', borderRadius: responsiveWidth(5), marginTop: responsiveHeight(4), }} >
              </View>
            </ImageBackground>
          </Box>

        </Box>
        <Box backgroundColor='black'>
          <Box marginTop={14} flexDirection='row' alignSelf='center' backgroundColor={colors.black} gap={moderateScale(20)}>
            <PrimaryButton alignSelf='center' backgroundColor={colors.greenText} buttonText='Invite via Whatsapp' height={moderateScale(45)} onPress={shareMessageOnWhatsapp} />

            <Pressable onPress={shareRefer}>
              <Box borderWidth={1} borderColor={colors.greenText} py={responsiveHeight(1)} px={moderateScale(7)} borderRadius={moderateScale(5)}>
                <ThreeDotsGray />
              </Box>
            </Pressable>
          </Box>


          <Box flexDirection="row" justifyContent="center" alignItems="center" style={{ marginTop: 10 }} gap={moderateScale(5)}>
            <Pressable onPress={() => handleCopyToClipboard(referalData?.data?.referalCode)} style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]} >
              <Box flexDirection="row" alignItems="center" borderWidth={1} borderColor={colors.grayish} padding={10} borderRadius={8}>
                <Text fontSize={18} color={colors.grayish} textAlign="center">{referalData?.data?.referalCode}</Text>
                <CopyIcon color={colors.grayish} style={{ marginLeft: 8 }} />
              </Box>
            </Pressable>
          </Box>
          <Box bgColor={'#fafafa'} h={responsiveHeight(6)} mx={moderateScale(20)} borderRadius={moderateScale(8)} flexDirection='row' alignItems='center' justifyContent='space-between' px={moderateScale(20)} marginTop={responsiveHeight(2.5)}>


            <Box flexDirection='row' alignItems='center' gap={moderateScale(5)}>
              <CircleGoldenTick />
              <Text fontFamily={'$poppinsMedium'} fontSize={14} lineHeight={16} color={colors.grayish} numberOfLines={1} >Earned Rewards</Text>
            </Box>

            {/* <Text fontFamily={'$poppinsBold'} fontSize={20} lineHeight={22} color={colors.black} numberOfLines={1}  >{'\u20B9'} 0</Text> */}
            <Text fontFamily={'$robotoBold'} fontSize={20} lineHeight={22} color={colors.black} numberOfLines={1}  >{'\u20B9'}
              {referalData?.data?.referedUserdata?.reduce((crr: any, el: any) => crr + el.creditRewardAmount, 0)}
            </Text>
          </Box>

          <Box backgroundColor={colors.black}>
            <Text fontFamily={'$poppinsSemiBold'} fontSize={16} lineHeight={18} color={colors.white} numberOfLines={1} alignSelf='center' mt={responsiveHeight(3)} fontWeight='700'>How it Works</Text>

            <Text fontFamily={'$poppinsMedium'} fontSize={13} lineHeight={18} color={colors.white} numberOfLines={3} textAlign='center' alignSelf='center' w={moderateScale(320)} mt={responsiveHeight(1)} fontWeight='200' >“Refer friends and get 10% of their recharge instantly, up to <Text fontFamily={'$robotoBold'} fontSize={14} lineHeight={20} color={colors.white} numberOfLines={1}>{'\u20B9'}</Text>100! The more they recharge,</Text>
            <Text fontFamily={'$poppinsMedium'} fontSize={13} lineHeight={18} color={colors.white} numberOfLines={3} textAlign='center' alignSelf='center' w={moderateScale(320)} fontWeight='200' >the more you earn—and you can withdraw your rewards anytime!”</Text>
            {/* <Text fontFamily={'$poppinsMedium'} fontSize={13} lineHeight={18} color={colors.white} numberOfLines={3} textAlign='center' alignSelf='center' w={moderateScale(320)} mt={responsiveHeight(1)} fontWeight='200' >“Refer friends and get 10% of their recharge instantly, up to ₹100! The more they recharge, the more you earn—and you can withdraw your rewards anytime!”</Text> */}
            <Image alt='icon' source={require('../assets/icons/refericons.png')} w={'100%'} h={moderateScale(70)} mt={responsiveHeight(4)} />

            <Box flexDirection='row' alignItems='center' alignSelf='center' gap={moderateScale(25)} mt={responsiveHeight(1.5)}>
              <Text fontFamily={'$poppinsRegular'} fontSize={12} lineHeight={14} color={colors.gray6} numberOfLines={2} textAlign='center' flex={0.25}>Invite Your Friends</Text>
              <Text fontFamily={'$poppinsRegular'} fontSize={12} lineHeight={14} color={colors.gray6} numberOfLines={2} textAlign='center' flex={0.24}>Friends Join & Play</Text>
              <Text fontFamily={'$poppinsRegular'} fontSize={12} lineHeight={14} color={colors.gray6} numberOfLines={2} textAlign='center' flex={0.26}>You Earn Rewards</Text>

            </Box>

            <Text fontFamily={'$poppinsSemiBold'} fontSize={16} lineHeight={18} color={colors.gold} numberOfLines={1} ml={moderateScale(18)} my={responsiveHeight(2.5)}>Invited Friends ({referalData?.data?.referedUserdata?.length})</Text>

            {
              referalData?.data?.referedUserdata?.map((el: any, i: any) =>
                <Box flexDirection='row' alignItems='center' justifyContent='space-between' h={moderateScale(70)} borderWidth={0.5} borderColor='white' mb={responsiveHeight(1)} mx={moderateScale(15)} bgColor={colors.black} borderRadius={moderateScale(10)} px={moderateScale(15)}>
                  <Box flexDirection='row' alignItems='center' gap={moderateScale(10)}>
                    <Box h={moderateScale(35)} w={moderateScale(35)} borderRadius={moderateScale(40)} >
                      <Image alt='icon' source={{ uri: 'https://cdn-icons-png.flaticon.com/512/219/219988.png' }} h={'100%'} w={'100%'} resizeMode='contain' />
                    </Box>
                    <Box>
                      <Text fontFamily={'$poppinsSemiBold'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} >{el.refereeDetails.name}</Text>
                      {/* <Text fontFamily={'$poppinsMedium'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} >{el.refereeDetails.mobileNumber}</Text> */}
                    </Box>
                  </Box>

                  <Box>
                    {/* <Text fontFamily={'$poppinsBold'} fontSize={16} lineHeight={18} color={colors.white} numberOfLines={1}  >{'\u20B9'} 0 / {'\u20B9'} 100</Text> */}
                    <Text fontFamily={'$robotoBold'} fontSize={14} lineHeight={20} color={colors.white} numberOfLines={1}>{'\u20B9'} {el.creditRewardAmount} / {'\u20B9'} {el.rewardAmount}</Text>
                  </Box>

                </Box>
              )
            }

          </Box>
        </Box>
      </Body>



    </Container>
  )
}

export default ReferEarn

const localStyles = StyleSheet.create({
  wrapDot: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',

  },
  dotActive: {
    margin: responsiveWidth(0.5),
    color: colors.themeRed,
    fontSize: responsiveFontSize(2.5)

  },
  dot: {
    margin: responsiveWidth(0.5),
    color: '#ECE9E9',
    fontSize: responsiveFontSize(2.5)

  },
})