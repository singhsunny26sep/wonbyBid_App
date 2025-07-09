import React from 'react'
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Box, Image, Pressable, Text } from '@gluestack-ui/themed';
import { ParamListBase, useNavigation } from '@react-navigation/native';

import { StackRoute } from '../navigationRoutes';
import { NavigationString } from '../navigationStrings';
import { colors } from '../../constants/colors';
import { moderateScale } from '../../utils/responsiveSize';

const Header = () => {

  // init
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <Box flex={1} flexDirection='row' alignItems='center' justifyContent='space-between' mr={40} >
      <Pressable onPress={() => navigation.navigate(NavigationString.Setting)}>
        <Box h={moderateScale(35)} w={moderateScale(35)} borderRadius={moderateScale(40)} >
          <Image alt='icon' source={{ uri: 'https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png' }} h={'100%'} w={'100%'} resizeMode='contain' />
        </Box>
      </Pressable>

      <Box></Box>
      <Text color={colors.white}>Add</Text>
    </Box>
  )
}

const MainNavigation = () => {
  // init
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, }} initialRouteName={NavigationString.Splash}>
      <Stack.Screen name={NavigationString.Splash} component={StackRoute.Splash} />
      <Stack.Screen name={NavigationString.Login} component={StackRoute.Login} />
      <Stack.Screen name={NavigationString.VerifyOTP} component={StackRoute.VerifyOTP} />
      <Stack.Screen name={NavigationString.BottomTabBar} component={StackRoute.BottomTabStack} />
      <Stack.Screen name={NavigationString.Setting} component={StackRoute.Setting} />
      <Stack.Screen name={NavigationString.UserRefer} component={StackRoute.UserRefer} />

      {/* <Stack.Screen name={NavigationString.Home} component={StackRoute.Home} /> */}
      <Stack.Screen name={NavigationString.HomeContestList} component={StackRoute.HomeContestList} />
      <Stack.Screen name={NavigationString.BonusCash} component={StackRoute.BonusCash} />
      <Stack.Screen name={NavigationString.MyWallet} component={StackRoute.MyWallet} />
      <Stack.Screen name={NavigationString.ReferEarn} component={StackRoute.ReferEarn} />
      <Stack.Screen name={NavigationString.CreatePrivateContest} component={StackRoute.CreatePrivateContest} />
      <Stack.Screen name={NavigationString.JoinPrivateContest} component={StackRoute.JoinPrivateContest} />
      <Stack.Screen name={NavigationString.PrivateContestParticipate} component={StackRoute.PrivateContestParticipate} />
      <Stack.Screen name={NavigationString.ContestList} component={StackRoute.ContestList} />
      <Stack.Screen name={NavigationString.ViewContest} component={StackRoute.ViewContest} />
      <Stack.Screen name={NavigationString.BookBids} component={StackRoute.BookBids} />
      <Stack.Screen name={NavigationString.BiddersList} component={StackRoute.BiddersList} />
      <Stack.Screen name={NavigationString.YourBids} component={StackRoute.YourBids} />
      <Stack.Screen name={NavigationString.MyAccount} component={StackRoute.MyAccount} />
      <Stack.Screen name={NavigationString.AccountOverView} component={StackRoute.AccountOverView} />
      <Stack.Screen name={NavigationString.Winners} component={StackRoute.Winners} />
      <Stack.Screen name={NavigationString.AllWinners} component={StackRoute.AllWinners} />
      <Stack.Screen name={NavigationString.AddAddressDetails} component={StackRoute.AddAddressDetails} />
      <Stack.Screen name={NavigationString.ChangeUserName} component={StackRoute.ChangeUserName} />
      <Stack.Screen name={NavigationString.AddEmailAddress} component={StackRoute.AddEmailAddress} />
      <Stack.Screen name={NavigationString.KYCVerification} component={StackRoute.KYCVerification} />
      <Stack.Screen name={NavigationString.CashWithdraw} component={StackRoute.CashWithdraw} />
      <Stack.Screen name={NavigationString.ViewTransaction} component={StackRoute.ViewTransaction} />
      <Stack.Screen name={NavigationString.BonusSummary} component={StackRoute.BonusSummary} />
      <Stack.Screen name={NavigationString.PrivateContestTransactions} component={StackRoute.PrivateContestTransactions} />
      <Stack.Screen name={NavigationString.WithdrawalHistory} component={StackRoute.WithdrawalHistory} />
      <Stack.Screen name={NavigationString.AddCash} component={StackRoute.AddCash} />
      <Stack.Screen name={NavigationString.VipExclusiveOffer} component={StackRoute.VipExclusiveOffer} />
      <Stack.Screen name={NavigationString.TransactionSuccessful} component={StackRoute.TransactionSuccessful} />
      <Stack.Screen name={NavigationString.PrivacySettings} component={StackRoute.PrivacySettings} />
      <Stack.Screen name={NavigationString.BankVerification} component={StackRoute.BankVerification} />
      <Stack.Screen name={NavigationString.PrivateContestList} component={StackRoute.PrivateContestList} />
      <Stack.Screen name={NavigationString.PrivateViewContest} component={StackRoute.PrivateViewContest} />
      <Stack.Screen name={NavigationString.ViewHomeContest} component={StackRoute.ViewHomeContest} />
      <Stack.Screen name={NavigationString.BookHomeBids} component={StackRoute.BookHomeBids} />
      <Stack.Screen name={NavigationString.BookPrivateBids} component={StackRoute.BookPrivateBids} />
      <Stack.Screen name={NavigationString.BiddersHomeList} component={StackRoute.BiddersHomeList} />
      <Stack.Screen name={NavigationString.YourBidsHome} component={StackRoute.YourBidsHome} />
      <Stack.Screen name={NavigationString.MyContestList} component={StackRoute.MyContestList} />
      <Stack.Screen name={NavigationString.ContactUserProfile} component={StackRoute.ContactUserProfile} />
      <Stack.Screen name={NavigationString.Notification} component={StackRoute.Notification} />
      <Stack.Screen name={NavigationString.UpdateProfile} component={StackRoute.UpdateProfile} />
      <Stack.Screen name={NavigationString.PdfView} component={StackRoute.PdfView} />
      <Stack.Screen name={NavigationString.Profile} component={StackRoute.Profile} />
      <Stack.Screen name={NavigationString.PrivacyPolicy} component={StackRoute.PrivacyPolicy} />
      <Stack.Screen name={NavigationString.TermsAndConditions} component={StackRoute.TermsAndConditions} />
      <Stack.Screen name={NavigationString.Legality} component={StackRoute.Legality} />
      <Stack.Screen name={NavigationString.About} component={StackRoute.About} />
      <Stack.Screen name={NavigationString.HelpSupport} component={StackRoute.HelpSupport} />
      <Stack.Screen name={NavigationString.Chat} component={StackRoute.Chat} />
      <Stack.Screen name={NavigationString.HowToPlay} component={StackRoute.HowToPlay} />
      <Stack.Screen name={NavigationString.ResponsiblePlay} component={StackRoute.ResponsiblePlay} />
      <Stack.Screen name={NavigationString.Tds} component={StackRoute.Tds} />
      <Stack.Screen name={NavigationString.Gst} component={StackRoute.Gst} />
      <Stack.Screen name={NavigationString.SucessScreen} component={StackRoute.SucessScreen} />
      <Stack.Screen name={NavigationString.ShareContests} component={StackRoute.ShareContests} />
      <Stack.Screen name={NavigationString.CashFreeWebView} component={StackRoute.CashFreeWebView} />
      <Stack.Screen name={NavigationString.PaymentScreen} component={StackRoute.PaymentScreen} />
      <Stack.Screen name={NavigationString.IntroVideoScreen} component={StackRoute.IntroVideoScreen} />










    </Stack.Navigator>
  )
}

export default MainNavigation