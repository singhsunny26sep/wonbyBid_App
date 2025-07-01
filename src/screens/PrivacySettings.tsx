import { useContext, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Box, Text, Switch } from '@gluestack-ui/themed'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { Container } from '../components/Container'
import { AppBar } from '../components/AppBar'
import { colors } from '../constants/colors'
import Body from '../components/Body/Body'
import { moderateScale, moderateScaleVertical } from '../utils/responsiveSize'
import { LogOutIcon } from '../components/Icons'
import { NavigationString } from '../navigation/navigationStrings'
import { AuthContext } from '../utils/authContext'

const PrivacySettings = () => {
  const authContext: any = useContext(AuthContext);
  // init
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  // states
  const [showFullName, setShowFullName] = useState<boolean>(false)


  // handling logout
  const handleLogout = () => {
    authContext.logout()
    navigation.navigate(NavigationString.Login)
  }

  // render
  return (
    <Container statusBarStyle='light-content' statusBarBackgroundColor={colors.themeRed} backgroundColor={colors.white2}>
      <AppBar back title='Privacy Settings' />

      <Body style={{ marginHorizontal: moderateScale(7) }}>

        <Box my={moderateScaleVertical(15)} gap={10}>
          <Text fontFamily={'$robotoBold'} fontSize={18} lineHeight={20} color={colors.black} numberOfLines={1} >Privacy Permission</Text>

          <Box backgroundColor={colors.white} borderRadius={moderateScale(10)} px={moderateScale(15)} py={moderateScaleVertical(10)} >
            <Box flexDirection='row' alignItems='center' justifyContent='space-between' bgColor={colors.white} w={'100%'} py={10} borderBottomWidth={1} mx={8} borderBottomColor={colors.gray5} alignSelf='center' borderRadius={moderateScale(10)}>
              <Box gap={4} flex={0.9}>
                <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={18} color={colors.black} numberOfLines={1} >Show my full name on profile</Text>
                <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.gray6} numberOfLines={2} >Your full name will be displayed to other people</Text>
              </Box>

              <Switch size="md"
                // onToggle={(i)=>{setShowFullName(!showFullName)}}
                // value={showFullName}
                sx={{ _light: { props: { trackColor: { false: "$backgroundLight300", true: colors.themeRed, }, }, }, }} isDisabled={false} />
            </Box>

            <Box flexDirection='row' alignItems='center' justifyContent='space-between' bgColor={colors.white} w={'100%'} py={10} borderBottomWidth={1} mx={8} borderBottomColor={colors.gray5} alignSelf='center' borderRadius={moderateScale(10)}>
              <Box gap={4} flex={0.9}>
                <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={18} color={colors.black} numberOfLines={1} >Allows others to find my profile</Text>
                <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.gray6} numberOfLines={3} >People can find & follow you by syncing their phone contacts or searching for your username</Text>
              </Box>

              <Switch size="md" sx={{ _light: { props: { trackColor: { false: "$backgroundLight300", true: colors.themeRed, }, }, }, }} isDisabled={false} />
            </Box>

            <Box flexDirection='row' alignItems='center' justifyContent='space-between' bgColor={colors.white} w={'100%'} py={10} mx={8} alignSelf='center' borderRadius={moderateScale(10)}>
              <Box gap={4} flex={0.9}>
                <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={18} color={colors.black} numberOfLines={1} >Allow followers to view my contest activity</Text>
                <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.gray6} numberOfLines={2} >Your friends who have followed you can see your activity on contacts</Text>
              </Box>

              <Switch size="md" sx={{ _light: { props: { trackColor: { false: "$backgroundLight300", true: colors.themeRed, }, }, }, }} isDisabled={false} />
            </Box>

          </Box>
        </Box>

        <Box my={moderateScaleVertical(15)} gap={10}>
          <Text fontFamily={'$robotoBold'} fontSize={18} lineHeight={20} color={colors.black} numberOfLines={1} >Communication Access</Text>

          <Box backgroundColor={colors.white} borderRadius={moderateScale(10)} px={moderateScale(15)} py={moderateScaleVertical(10)} >
            <Box flexDirection='row' alignItems='center' justifyContent='space-between' bgColor={colors.white} w={'100%'} py={10} borderBottomWidth={1} mx={8} borderBottomColor={colors.gray5} alignSelf='center' borderRadius={moderateScale(10)}>
              <Box gap={4} flex={0.9}>
                <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={18} color={colors.black} numberOfLines={1} >SMS</Text>
                <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.gray6} numberOfLines={2} >Allow WonByBid to send SMS</Text>
              </Box>

              <Switch size="md" onToggle={(i) => { setShowFullName(!showFullName) }} value={showFullName} sx={{ _light: { props: { trackColor: { false: "$backgroundLight300", true: colors.themeRed, }, }, }, }} isDisabled={false} />
            </Box>

            <Box flexDirection='row' alignItems='center' justifyContent='space-between' bgColor={colors.white} w={'100%'} py={10} borderBottomWidth={1} mx={8} borderBottomColor={colors.gray5} alignSelf='center' borderRadius={moderateScale(10)}>
              <Box gap={4} flex={0.9}>
                <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={18} color={colors.black} numberOfLines={1} >Phone</Text>
                <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.gray6} numberOfLines={3} >Allow WonByBid to react out to you on your phone</Text>
              </Box>

              <Switch size="md" sx={{ _light: { props: { trackColor: { false: "$backgroundLight300", true: colors.themeRed, }, }, }, }} isDisabled={false} />
            </Box>

            <Box flexDirection='row' alignItems='center' justifyContent='space-between' bgColor={colors.white} w={'100%'} py={10} mx={8} alignSelf='center' borderRadius={moderateScale(10)}>
              <Box gap={4} flex={0.9}>
                <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={18} color={colors.black} numberOfLines={1} >Whatsapp</Text>
                <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.gray6} numberOfLines={2} >Receive WonByBid offers and updates on Whatsapp</Text>
              </Box>

              <Switch size="md" sx={{ _light: { props: { trackColor: { false: "$backgroundLight300", true: colors.themeRed, }, }, }, }} isDisabled={false} />
            </Box>

          </Box>
        </Box>

        <Box my={moderateScaleVertical(15)} gap={10}>
          <Text fontFamily={'$robotoBold'} fontSize={18} lineHeight={20} color={colors.black} numberOfLines={1} >Mesasge Preferences</Text>

          <Box backgroundColor={colors.white} borderRadius={moderateScale(10)} px={moderateScale(15)} py={moderateScaleVertical(10)} >
            <Box flexDirection='row' alignItems='center' justifyContent='space-between' bgColor={colors.white} w={'100%'} py={10} borderBottomWidth={1} mx={8} borderBottomColor={colors.gray5} alignSelf='center' borderRadius={moderateScale(10)}>
              <Box gap={4} flex={0.9}>
                <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={18} color={colors.black} numberOfLines={1} >Special Offers</Text>
                <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.gray6} numberOfLines={2} >Recieve WonbyBid offers and updates on Email</Text>
              </Box>

              <Switch size="md" onToggle={(i) => { setShowFullName(!showFullName) }} value={showFullName} sx={{ _light: { props: { trackColor: { false: "$backgroundLight300", true: colors.themeRed, }, }, }, }} isDisabled={false} />
            </Box>

            <Box flexDirection='row' alignItems='center' justifyContent='space-between' bgColor={colors.white} w={'100%'} py={10} borderBottomWidth={1} mx={8} borderBottomColor={colors.gray5} alignSelf='center' borderRadius={moderateScale(10)}>
              <Box gap={4} flex={0.9}>
                <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={18} color={colors.black} numberOfLines={1} >Newsletters</Text>
                <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.gray6} numberOfLines={3} >Receive WonByBid NewsLetters on Email</Text>
              </Box>

              <Switch size="md" sx={{ _light: { props: { trackColor: { false: "$backgroundLight300", true: colors.themeRed, }, }, }, }} isDisabled={false} />
            </Box>

            <Box flexDirection='row' alignItems='center' justifyContent='space-between' bgColor={colors.white} w={'100%'} py={10} mx={8} alignSelf='center' borderRadius={moderateScale(10)}>
              <Box gap={4} flex={0.9}>
                <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={18} color={colors.black} numberOfLines={1} >Contests</Text>
                <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.gray6} numberOfLines={2} >Receive WonByBid contest updates via SMS and Email</Text>
              </Box>

              <Switch size="md" sx={{ _light: { props: { trackColor: { false: "$backgroundLight300", true: colors.themeRed, }, }, }, }} isDisabled={false} />
            </Box>

          </Box>
        </Box>

        {/* <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate(NavigationString.Login)}> */}
        <TouchableOpacity activeOpacity={0.6} onPress={handleLogout}>
          <Box flexDirection='row' alignItems='center' bgColor={colors.gray10} my={moderateScaleVertical(15)} alignSelf='center' px={moderateScale(15)} py={moderateScaleVertical(10)} gap={moderateScale(10)} borderRadius={moderateScale(10)}>
            <LogOutIcon />
            <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={18} color={colors.black} numberOfLines={1} >Logout</Text>
          </Box>
        </TouchableOpacity>
      </Body>

    </Container>
  )
}

export default PrivacySettings