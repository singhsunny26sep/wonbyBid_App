
import { AccordionIcon, Box, ChevronRightIcon, Image, Pressable, Spinner, Text, View } from '@gluestack-ui/themed';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { Container } from '../components/Container';
import { colors } from '../constants/colors';
import { moderateScale, moderateScaleVertical } from '../utils/responsiveSize';
import PrimaryButton from '../components/Button/PrimaryButton';
import { shadowStyle } from '../constants/constant';
import { AppBar } from '../components/AppBar';
import { imgIcon } from '../assets/icons';
import { NavigationString } from '../navigation/navigationStrings';
import useGetUserWalletInfo from '../hooks/auth/get-user-wallet-info';
import { ScrollView, TouchableOpacity } from 'react-native';
import { InfoCircleIcon } from '../components/Icons';
import { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { RNSVGLinearGradient } from 'react-native-svg';
import Loader from '../components/Loader';
import NoData from './NoData';


const MyWallet = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [showWidthdrawModal, setShowWidthdrawModal] = useState(false);
  const [load, setLoad] = useState<boolean>(false)
  const { data: walletInfoData, isLoading: walletInfoIsLoading } = useGetUserWalletInfo();


  if (walletInfoIsLoading) {
    return (
      <Container statusBarStyle='light-content' statusBarBackgroundColor={colors.themeRed}>
        <AppBar back title='My Wallet' />
        <Box flex={1} backgroundColor='black' justifyContent='center' alignItems='center'>
          {/* <Spinner size={'large'} color={colors.gold} /> */}
          <Loader />
        </Box>
      </Container>
    );
  }
  // console.log("walletSettingData.........................................",walletSettingData?.data?.data?.selectedBestOfferWaletRecharge)
  // console.log("walletSettingData.........................................")
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <>
      {load ? (<>
        <NoData title="No Data" />
      </>) : (<>

        <Container statusBarStyle='light-content' statusBarBackgroundColor={colors.themeRed}>
          <LinearGradient colors={[colors.black, colors.black]} locations={[0.65, 1]} useAngle angle={205} angleCenter={{ x: -0.2, y: 0.1 }} style={{ flex: 1 }}>
            <AppBar textColor={colors.gold} backgroundColor='transparent' back title='My Wallet' />
            <Box px={moderateScale(15)} py={moderateScaleVertical(25)} flexDirection='row' alignItems='center' justifyContent='space-between'>
              <Box gap={10}>
                <Text fontFamily={'$robotoMedium'} fontSize={14} color={colors.Purple}>Total Balance</Text>
                <Text fontFamily={'$robotoBold'} fontSize={26} color={colors.white}>{'₹'} {walletInfoData?.data?.newBalance?.balance.toFixed(2) ?? 'N/A'}</Text>
                <Pressable onPress={() => navigation.navigate(NavigationString.ViewTransaction)}>
                  <Text fontFamily={'$robotoMedium'} fontSize={12} color={colors.yellow}>View Transaction</Text>
                </Pressable>
              </Box>
              <PrimaryButton buttonText='Add Cash' onPress={() => navigation.navigate(NavigationString.AddCash)} backgroundColor={'#00bd37'} height={moderateScale(42)} width={moderateScale(120)} />
            </Box>
            <Box px={moderateScale(15)} py={moderateScaleVertical(25)} flexDirection='row' alignItems='center' justifyContent='space-between'>
              <Box gap={5}>
                <Text fontFamily={'$robotoMedium'} fontSize={14} color={colors.greenText}>Winning Balance</Text>
                <Text fontFamily={'$robotoBold'} fontSize={22} color={colors.white}>{'₹'} {(+walletInfoData?.data?.newBalance?.winningbalance).toFixed(2) ?? 'N/A'}</Text>
              </Box>
              {walletInfoData?.data?.newBalance?.winningbalance > 0 ? (
                <PrimaryButton buttonText='Withdraw' onPress={() => navigation.navigate(NavigationString.CashWithdraw)} fontSize={14} bgColor={colors.mediumBlue} height={moderateScale(40)} width={moderateScale(120)} />
              ) : (
                <PrimaryButton buttonText='Withdraw' fontSize={14} textColor={colors.gray3} bgColor={'transparent'} borderWidth={2} borderColor={colors.gray3} height={moderateScale(40)} width={moderateScale(120)} />
              )}
            </Box>
            <Box borderRightWidth={1} borderColor='white' borderEndEndRadius={10} my={moderateScaleVertical(15)} borderRadius={moderateScale(8)} style={shadowStyle} w={'92%'} alignSelf='center' overflow='hidden'>
              <Box mx={15} my={15} gap={5}>
                <Box flexDirection='row' justifyContent={'space-between'}>
                  <Text fontFamily={'$robotoBold'} fontSize={16} lineHeight={18} color={colors.Purple} numberOfLines={1} >Bonus Cash</Text>

                  <TouchableOpacity onPress={() => setShowWidthdrawModal(true)} style={{ marginTop: -5 }} >
                    <InfoCircleIcon color={colors.mediumBlue} />
                  </TouchableOpacity>
                </Box>

                <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={16} color={colors.grayish} numberOfLines={1} mt={2} >Use Bonus Cash avail <Text fontFamily={'$poppinsSemiBold'} fontSize={12} lineHeight={16} color={colors.white} fontWeight='800' numberOfLines={1} >flat 10% discount</Text> on all contests</Text>
              </Box>

              <Box flexDirection='row' alignItems='center' justifyContent='space-between' mx={15}>
                <Box flexDirection='row' alignItems='center' gap={4}>
                  <Image alt='icon' source={imgIcon.bCoin} w={moderateScale(18)} h={moderateScale(18)} resizeMode='contain' />
                  <Text fontFamily={'$robotoBold'} fontSize={20} lineHeight={24} color={colors.white} numberOfLines={1} minWidth={moderateScale(15)} maxWidth={moderateScale(90)}>{walletInfoData?.data?.bonusCashInfo?.totalNonExpiredBonusAmount ?? 'N/A'}</Text>
                  <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={14} color={colors.white} numberOfLines={1} textAlign='center'>(1 Bonus Cash = {'\u20B9'} 1 )</Text>
                </Box>

                <AccordionIcon as={ChevronRightIcon} color={colors.gold} size='lg' />
              </Box>
              <Box h={moderateScale(30)} w={'100%'} mt={10} flexDirection='row' alignItems='center' justifyContent='center' gap={moderateScale(5)}>
                <Image alt='icon' source={imgIcon.bCoin} w={moderateScale(14)} h={moderateScale(14)} resizeMode='contain' />
                <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={20} color={colors.white} numberOfLines={1}>{walletInfoData?.data?.bonusCashInfo?.expiringBonusAmount.remainingBonusAmount ?? 'N/A'} <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={20} color={colors.red} numberOfLines={1}>
                  Expiring on  {new Date(walletInfoData?.data?.bonusCashInfo?.expiringBonusAmount.expireBonusAmountDate).getDate()} {months[new Date(walletInfoData?.data?.bonusCashInfo?.expiringBonusAmount.expireBonusAmountDate).getMonth()]} {new Date(walletInfoData?.data?.bonusCashInfo?.expiringBonusAmount.expireBonusAmountDate).toLocaleTimeString()}
                </Text></Text>
              </Box>
            </Box>
            <Pressable onPress={() => navigation.navigate(NavigationString.PrivateContestTransactions)}>
              <Box borderRightWidth={1} borderColor='white' borderEndEndRadius={10} borderRadius={moderateScale(8)} style={shadowStyle} pb={moderateScale(15)} w={'92%'} alignSelf='center' marginVertical={10} my={15}>
                <Box mx={15} my={15} gap={5}>
                  <Text fontFamily={'$robotoBold'} fontSize={16} lineHeight={18} color={colors.greenText} numberOfLines={1} >Private Contest Balance</Text>
                  <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={16} color={colors.grayish} numberOfLines={1} >Earn money by hosting private contest</Text>
                </Box>

                <Box flexDirection='row' alignItems='center' justifyContent='space-between' mx={15}>
                  <Text fontFamily={'$robotoBold'} fontSize={18} lineHeight={20} color={colors.white} numberOfLines={1} textAlign='center'>{'\u20B9'}{walletInfoData?.data?.newBalance?.privateContestAmount}</Text>
                  <AccordionIcon as={ChevronRightIcon} color={colors.gold} size='lg' />
                </Box>
              </Box>
              <Text color={colors.white} fontSize={14} width={"90%"} textAlign='center' alignSelf='center' marginTop={80}>The more bonus cash you have, the more you can play! Win a contest, get real money, and use your bonus cash to play again—keep the fun going!</Text>
            </Pressable>

          </LinearGradient>
        </Container>
      </>)}
    </>
  );
};

export default MyWallet;
