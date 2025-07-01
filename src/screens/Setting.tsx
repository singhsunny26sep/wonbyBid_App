import { Alert, Linking, TouchableOpacity } from 'react-native'
import { AvatarImage, Box, ChevronDownIcon, ChevronRightIcon, Image, ImageBackground, Pressable, Text } from '@gluestack-ui/themed'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ParamListBase, useNavigation } from '@react-navigation/native'

import { Container } from '../components/Container'
import { colors } from '../constants/colors'
import Body from '../components/Body/Body'
import { moderateScale } from '../utils/responsiveSize'
import { AboutUsIcon, AccountDetailsIcon, AcountUser, ApkUpdateIcon, BackIconWhite, HelpSupportIcon, JoinCentestIcon, JoinPrivateContestIcon, LegalIcon, LogOutIcon, LogOutWhite, OpinionSuggestionIcon, RankingCalculationIcon, ResponseIcon, ResponsiblePlayIcon, ShareNewIcons, ShareWhiteIcon, SquareMinusIcon, SquarePlusIcon, TermAndService, UserIcon, WithDrawal, WithdrawalsIcon } from '../components/Icons'
import { AccordionIcon } from '@gluestack-ui/themed'
import { NavigationString } from '../navigation/navigationStrings'
import { responsiveHeight } from 'react-native-responsive-dimensions'
import PrimaryButton from '../components/Button/PrimaryButton'
import { useContext, useState } from 'react'
import { AuthContext } from '../utils/authContext'
import { Modal } from 'react-native'
import { View } from 'react-native'
import { Button } from 'react-native'

const openGoogleForm = async () => {
  const url = 'https://forms.gle/aRh3UX43soSyaGwf6';

  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Error', 'Unable to open the link.');
    }
  } catch (error) {
    console.error('Error opening URL:', error);
    Alert.alert('Error', 'Something went wrong.');
  }
};
const openGoogleForms = async () => {
  const url = 'https://forms.gle/njXf5KA5Hd9zV5Pq5';

  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Error', 'Unable to open the link.');
    }
  } catch (error) {
    console.error('Error opening URL:', error);
    Alert.alert('Error', 'Something went wrong.');
  }
};

const Setting = () => {

  const authContext: any = useContext(AuthContext);
  // init
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { userInfo }: any = useContext(AuthContext);
  const [isModalVisible, setModalVisible] = useState(false);
  // states
  const [showAccountOptions, setShowAccountOptions] = useState(false);
  const [showWithdrawalOptions, setShowWithdrawalOptions] = useState(false);
  const handleLogout = () => {
    authContext.logout()
    setModalVisible(false)
    navigation.navigate(NavigationString.Login)
  }
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <Container statusBarStyle='light-content' statusBarBackgroundColor={colors.themeRed} backgroundColor={colors.black}>

      <Box h={moderateScale(70)} w={'100%'} bgColor={colors.themeRed} flexDirection='row' alignItems='center' px={15} gap={20}>
        <Pressable onPress={() => navigation.goBack()}>
          <BackIconWhite />
        </Pressable>

        <Box flexDirection='row' alignItems='center' gap={10}>
          <Box h={moderateScale(35)} w={moderateScale(35)} borderRadius={moderateScale(40)} >
            {/* <Image alt='icon' source={{ uri: 'https://cdn-icons-png.flaticon.com/512/219/219988.png' }} h={'100%'} w={'100%'} resizeMode='contain' /> */}
            <AvatarImage source={{ uri: userInfo?.profile ? userInfo?.profile : 'https://cdn-icons-png.flaticon.com/512/219/219988.png' }} alt='profile image' />
          </Box>
          <Pressable flex={0.8} onPress={() => { navigation.navigate(NavigationString.Profile) }}>
            <Box gap={2} >
              <Box flexDirection='row' alignItems='center'>
                <Text fontFamily={'$poppinsSemiBold'} fontSize={12} lineHeight={16} color={colors.white} numberOfLines={1} >{userInfo?.userName} </Text>
                <AccordionIcon as={ChevronRightIcon} color={colors.white} />
              </Box>
              <Text fontFamily={'$robotoRegular'} fontSize={12} lineHeight={14} color={colors.gray5} >View Profile</Text>
            </Box>
          </Pressable>
        </Box>
      </Box>
      <Body >
        <Box w={'100%'} bgColor={colors.black} borderTopRightRadius={10} borderTopLeftRadius={10} overflow='hidden'>
          {/* <Box w={'92%'} h={moderateScale(180)} mx={15} mt={15} borderRadius={15} overflow='hidden' borderWidth={1}>
            <ImageBackground alt='icon' source={require('../assets/icons/premiumcard.jpg')} w={'100%'} h={'100%'} resizeMode='cover'>
              <Box flexDirection='row' alignItems='center' gap={15} px={15} mt={moderateScale(12)}>
                <Image alt='icon' source={require('../assets/icons/king.png')} resizeMode='contain' h={moderateScale(40)} w={moderateScale(40)} />
                <Text fontFamily={'$poppinsSemiBold'} fontSize={14} lineHeight={18} color={colors.white} numberOfLines={1} >Play for <Text fontFamily={'$poppinsSemiBold'} fontSize={12} lineHeight={16} color={colors.gold}>{'\u20B9'} 1500</Text> more to become VIP </Text>
              </Box>

              <Box flexDirection='row' alignItems='center' alignSelf='center' gap={moderateScale(15)} mt={responsiveHeight(7)}>
                <Box borderTopWidth={1} borderTopColor={colors.gold} w={moderateScale(80)}></Box>
                <Text fontFamily={'$poppinsSemiBold'} fontSize={12} lineHeight={16} color={colors.gold} numberOfLines={1} >VIP Exclusive Offer</Text>
                <Box borderTopWidth={1} borderTopColor={colors.gold} w={moderateScale(80)}></Box>
              </Box>

              <Box flexDirection='row' alignItems='center' justifyContent='space-between' mx={20} mt={moderateScale(7)} borderWidth={1} borderColor={colors.gold} py={5} px={moderateScale(6)} borderRadius={moderateScale(5)}>
                <Box flexDirection='row' alignItems='center' gap={15}>
                  <Image alt='icon' source={require('../assets/icons/king.png')} resizeMode='contain' h={moderateScale(30)} w={moderateScale(30)} />
                  <Text fontFamily={'$poppinsMedium'} fontSize={12} lineHeight={16} color={colors.gold} numberOfLines={1} >Free Contest Win {'\u20B9'} 1 Lakh</Text>
                </Box>
                <Pressable onPress={() => navigation.navigate(NavigationString.VipExclusiveOffer)}>
                  <Text fontFamily={'$poppinsSemiBold'} fontSize={12} lineHeight={16} color={'#278c32'} numberOfLines={1} >Join Now</Text>
                </Pressable>
              </Box>
            </ImageBackground>
          </Box> */}

          <TouchableOpacity onPress={() => setShowAccountOptions(!showAccountOptions)} activeOpacity={0.6}>
            <Box flexDirection='row' alignItems='center' justifyContent='space-between' px={7} py={15} mx={8} borderBottomColor={colors.black}>
              <Box flexDirection='row' alignItems='center' gap={moderateScale(25)}>
                {/* <AccountDetailsIcon /> */}
                <AcountUser color={colors.white} />
                <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} >Account Details</Text>
              </Box>
              {/* <AccordionIcon as={showAccountOptions ? ChevronDownIcon : ChevronRightIcon} color={colors.white} size='lg' /> */}
              {showAccountOptions ? <SquareMinusIcon /> : <SquarePlusIcon />}
            </Box>
          </TouchableOpacity>

          <Box display={showAccountOptions ? 'flex' : 'none'}>
            <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate(NavigationString.MyAccount)}>
              <Box flexDirection='row' alignItems='center' justifyContent='space-between' px={7} py={15} mx={8}>
                <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} pl={moderateScale(50)}>My Account</Text>
                <AccordionIcon as={ChevronRightIcon} color={colors.gold} size='lg' />
              </Box>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate(NavigationString.ViewTransaction)}>
              <Box flexDirection='row' alignItems='center' justifyContent='space-between' px={7} py={15} mx={8}>
                <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} pl={moderateScale(50)}>View Transactions</Text>
                <AccordionIcon as={ChevronRightIcon} color={colors.gold} size='lg' />
              </Box>
            </TouchableOpacity>

            {/* <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate(NavigationString.BonusSummary)}>
              <Box flexDirection='row' alignItems='center' justifyContent='space-between' px={7} py={15} mx={8}>
                <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} pl={moderateScale(50)}>Bonus Summary</Text>
                <AccordionIcon as={ChevronRightIcon} color={colors.gold} size='lg' />
              </Box>
            </TouchableOpacity> */}

            {/* <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate(NavigationString.PrivateContestTransactions)}>
              <Box flexDirection='row' alignItems='center' justifyContent='space-between' px={7} py={15} mx={8}>
                <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} pl={moderateScale(50)}>Private Contest Transaction</Text>
                <AccordionIcon as={ChevronRightIcon} color={colors.gold} size='lg' />
              </Box>
            </TouchableOpacity> */}
          </Box>

          {/* <TouchableOpacity onPress={() => navigation.navigate(NavigationString.BonusCash)} activeOpacity={0.6}>
            <Box flexDirection='row' alignItems='center' justifyContent='space-between' px={7} py={15}  mx={8} borderBottomColor={colors.gray5}>
              <Box flexDirection='row' alignItems='center' gap={moderateScale(25)}>
                <UserIcon />
                <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} >Bonus Cash</Text>
              </Box>
              <AccordionIcon as={ChevronRightIcon} color={colors.gold} size='lg' />
            </Box>
          </TouchableOpacity> */}

          <TouchableOpacity onPress={() => navigation.navigate(NavigationString.CashWithdraw)} activeOpacity={0.6}>
            <Box flexDirection='row' alignItems='center' justifyContent='space-between' px={7} py={15} mx={8} borderBottomColor={colors.gray5}>
              <Box flexDirection='row' alignItems='center' gap={moderateScale(25)}>
                {/* <WithdrawalsIcon /> */}
                <WithDrawal color={colors.white} />
                <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} >Withdrawal</Text>
              </Box>
              {/* {showWithdrawalOptions ? <SquareMinusIcon /> : <SquarePlusIcon />} */}
            </Box>
          </TouchableOpacity>

          <Box display={showWithdrawalOptions ? 'flex' : 'none'}>
            {/* <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate(NavigationString.CashWithdraw)}>
              <Box flexDirection='row' alignItems='center' justifyContent='space-between' px={7} py={15} mx={8}>
                <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} pl={moderateScale(50)}>Request Withdrawals</Text>
                <AccordionIcon as={ChevronRightIcon} color={colors.gold} size='lg' />
              </Box>
            </TouchableOpacity> */}

            {/* <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate(NavigationString.WithdrawalHistory)}>
              <Box flexDirection='row' alignItems='center' justifyContent='space-between' px={7} py={15} mx={8}>
                <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} pl={moderateScale(50)}>Withdrawals History</Text>
                <AccordionIcon as={ChevronRightIcon} color={colors.gold} size='lg' />
              </Box>
            </TouchableOpacity> */}
          </Box>
          <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate(NavigationString.JoinPrivateContest)}>
            <Box flexDirection='row' alignItems='center' justifyContent='space-between' px={7} py={15} mx={8} borderBottomColor={colors.gray5}>
              <Box flexDirection='row' alignItems='center' gap={moderateScale(25)}>
                {/* <JoinPrivateContestIcon /> */}
                <JoinCentestIcon color={colors.white} />
                <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} >Join Private Contest</Text>
              </Box>
              <AccordionIcon as={ChevronRightIcon} color={colors.gold} size='lg' />
            </Box>
          </TouchableOpacity>
          <TouchableOpacity onPress={(() => { navigation.navigate("HowToPlay") })} activeOpacity={0.6}>
            <Box flexDirection='row' alignItems='center' justifyContent='space-between' px={7} py={15} mx={8} borderBottomColor={colors.gray5}>
              <Box flexDirection='row' alignItems='center' gap={moderateScale(25)}>
                <RankingCalculationIcon />
                <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} >How to Play</Text>
              </Box>
              <AccordionIcon as={ChevronRightIcon} color={colors.gold} size='lg' />
            </Box>
          </TouchableOpacity>

          <TouchableOpacity onPress={openGoogleForm} activeOpacity={0.6}>
            <Box flexDirection='row' alignItems='center' justifyContent='space-between' px={7} py={15} mx={8} borderBottomColor={colors.gray5}>
              <Box flexDirection='row' alignItems='center' gap={moderateScale(25)}>
                <OpinionSuggestionIcon />
                <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} >Opinion and Suggestion</Text>
              </Box>
              <AccordionIcon as={ChevronRightIcon} color={colors.gold} size='lg' />
            </Box>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={openGoogleForms} activeOpacity={0.6}>
            <Box flexDirection='row' alignItems='center' justifyContent='space-between' px={7} py={15} mx={8} borderBottomColor={colors.gray5}>
              <Box flexDirection='row' alignItems='center' gap={moderateScale(25)}>
                <OpinionSuggestionIcon />
                <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.gold} numberOfLines={1} >Beta Testing</Text>
              </Box>
              <AccordionIcon as={ChevronRightIcon} color={colors.gold} size='lg' />
            </Box>
          </TouchableOpacity>


          <TouchableOpacity onPress={() => navigation.navigate(NavigationString.ReferEarn)} activeOpacity={0.6}>
            <Box flexDirection='row' alignItems='center' justifyContent='space-between' px={7} py={15} mx={8} borderBottomColor={colors.gray5}>
              <Box flexDirection='row' alignItems='center' gap={moderateScale(25)}>
                {/* <ShareWhiteIcon color={colors.black} /> */}
                <ShareNewIcons color={colors.white} />

                <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} >Share & Earn</Text>
              </Box>
              <AccordionIcon as={ChevronRightIcon} color={colors.gold} size='lg' />
            </Box>
          </TouchableOpacity>

          <TouchableOpacity onPress={(() => { navigation.navigate("HelpSupport") })} activeOpacity={0.6}>
            <Box flexDirection='row' alignItems='center' justifyContent='space-between' px={7} py={15} mx={8} borderBottomColor={colors.gray5}>
              <Box flexDirection='row' alignItems='center' gap={moderateScale(25)}>
                <HelpSupportIcon color={colors.white} />
                <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} >Help & Support</Text>
              </Box>
              <AccordionIcon as={ChevronRightIcon} color={colors.gold} size='lg' />
            </Box>
          </TouchableOpacity>

          <TouchableOpacity onPress={(() => { navigation.navigate("Legality") })} activeOpacity={0.6}>
            <Box flexDirection='row' alignItems='center' justifyContent='space-between' px={7} py={15} mx={8} borderBottomColor={colors.gray5}>
              <Box flexDirection='row' alignItems='center' gap={moderateScale(25)}>
                <LegalIcon color={colors.white} />
                <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} >Legality</Text>
              </Box>
              <AccordionIcon as={ChevronRightIcon} color={colors.gold} size='lg' />
            </Box>
          </TouchableOpacity>

          <TouchableOpacity onPress={(() => { navigation.navigate("TermsAndConditions") })} activeOpacity={0.6}>
            <Box flexDirection='row' alignItems='center' justifyContent='space-between' px={7} py={15} mx={8} borderBottomColor={colors.gray5}>
              <Box flexDirection='row' alignItems='center' gap={moderateScale(25)}>
                <TermAndService color={colors.white} />
                <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} >Terms of Service</Text>
              </Box>
              <AccordionIcon as={ChevronRightIcon} color={colors.gold} size='lg' />
            </Box>
          </TouchableOpacity>

          <TouchableOpacity onPress={(() => { navigation.navigate("ResponsiblePlay") })} activeOpacity={0.6}>
            <Box flexDirection='row' alignItems='center' justifyContent='space-between' px={7} py={15} mx={8} borderBottomColor={colors.gray5}>
              <Box flexDirection='row' alignItems='center' gap={moderateScale(25)}>
                <ResponseIcon color={colors.white} />
                <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} >Responsible Play</Text>
              </Box>
              <AccordionIcon as={ChevronRightIcon} color={colors.gold} size='lg' />
            </Box>
          </TouchableOpacity>

          <TouchableOpacity onPress={(() => { navigation.navigate("About") })} activeOpacity={0.6}>
            <Box flexDirection='row' alignItems='center' justifyContent='space-between' px={7} py={15} mx={8} borderBottomColor={colors.gray5}>
              <Box flexDirection='row' alignItems='center' gap={moderateScale(25)}>
                <AboutUsIcon color={colors.white} />
                <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} >About Us</Text>
              </Box>
              <AccordionIcon as={ChevronRightIcon} color={colors.gold} size='lg' />
            </Box>
          </TouchableOpacity>
          <TouchableOpacity onPress={(() => { navigation.navigate("PrivacyPolicy") })} activeOpacity={0.6}>
            <Box flexDirection='row' alignItems='center' justifyContent='space-between' px={7} py={15} mx={8} borderBottomColor={colors.gray5}>
              <Box flexDirection='row' alignItems='center' gap={moderateScale(25)}>
                <AboutUsIcon color={colors.white} />
                <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} >Privacy Policy</Text>
              </Box>
              <AccordionIcon as={ChevronRightIcon} color={colors.gold} size='lg' />
            </Box>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.6}>
            <Box flexDirection='row' alignItems='center' justifyContent='space-between' px={7} py={15} mx={8} borderBottomColor={colors.gray5}>
              <Box flexDirection='row' alignItems='center' gap={moderateScale(25)}>
                <ApkUpdateIcon color={colors.white} />
                <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} >Apk Version 1.0 </Text>
              </Box>
              <AccordionIcon as={ChevronRightIcon} color={colors.gold} size='lg' />
            </Box>
          </TouchableOpacity>

          {/* <TouchableOpacity activeOpacity={0.6} onPress={handleLogout}>
            <Box flexDirection='row' alignItems='center' justifyContent='space-between' px={7} py={15} mx={8} borderBottomColor={colors.gray5}>
              <Box flexDirection='row' alignItems='center' gap={moderateScale(25)}>
                <LogOutWhite color={colors.white} />
                <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} >Log Out</Text>
              </Box>
              <AccordionIcon as={ChevronRightIcon} color={colors.gold} size='lg' />
            </Box>
          </TouchableOpacity> */}
          <TouchableOpacity activeOpacity={0.6} onPress={toggleModal}>
            <Box flexDirection="row" alignItems="center" justifyContent="space-between" px={7} py={15} mx={8} borderBottomColor={colors.gray5}>
              <Box flexDirection="row" alignItems="center" gap={moderateScale(25)}>
                <LogOutWhite color={colors.white} />
                <Text fontFamily="$robotoRegular" fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1}>Log Out</Text>
              </Box>
              <ChevronRightIcon color={colors.gold} size="lg" />
            </Box>
          </TouchableOpacity>
          <Modal transparent={true} visible={isModalVisible} animationType="fade">
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(95, 66, 66, 0.1)',
            }}>
              <View style={{
                backgroundColor: 'black',
                padding: 20,
                borderRadius: 10,
                width: '80%',
                alignItems: 'center',
                justifyContent: "center"

                
              }}>
                <Text fontSize={18} fontWeight="bold" mb={4} color='white' textAlign="center">Are you sure you want to logout?</Text>
                <Box flexDirection="row" marginTop={40} justifyContent="space-between" width="100%">
                  <TouchableOpacity style={{ backgroundColor: colors.red, padding: 10, borderRadius: 10 }} onPress={handleLogout}>
                    <Text style={{ color: colors.white }}>Confirm</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ backgroundColor: colors.gold, padding: 10, borderRadius: 10 }} onPress={toggleModal}>
                    <Text style={{ color: colors.white }}>Cancel</Text>
                  </TouchableOpacity>
                  {/* <Button variant="outline" colorScheme="gray" flex={1} onPress={toggleModal}>Cancel</Button>
              <Button colorScheme="red" flex={1} ml={3} onPress={handleLogout}>Confirm</Button> */}
                </Box>
              </View>
            </View>
          </Modal>
        </Box>
      </Body>

    </Container >
  )
}

export default Setting