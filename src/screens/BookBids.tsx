import { Box, Text } from '@gluestack-ui/themed'
import { moderateScale, moderateScaleVertical } from '../utils/responsiveSize'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { Container } from '../components/Container'
import { AppBar } from '../components/AppBar'
import { colors } from '../constants/colors'
import Body from '../components/Body/Body'
import PrimaryButton from '../components/Button/PrimaryButton'
import InputText from '../components/TextInput/InputText'
import { NavigationString } from '../navigation/navigationStrings'

const BookBids = () => {
  // init
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <Container statusBarStyle='light-content' statusBarBackgroundColor={colors.themeRed} backgroundColor={colors.black}>
      <AppBar back title={`${'\u20B9'} 10,000 CASH`} />

      <Body>
        <Box bgColor={'#0984e3'} mt={moderateScaleVertical(25)} mx={moderateScale(15)} py={moderateScaleVertical(15)} borderRadius={moderateScale(10)} gap={moderateScale(15)}>
          <Text fontFamily={'$robotoBold'} fontSize={18} lineHeight={20} color={colors.white} numberOfLines={1} textAlign='center'>Contest ends in</Text>
          <Text fontFamily={'$robotoBold'} fontSize={24} lineHeight={26} color={colors.white} numberOfLines={1} textAlign='center'>09:59:52</Text>
        </Box>

        <Box flexDirection='row' alignItems='center' justifyContent='space-between' mx={moderateScale(15)} my={moderateScaleVertical(20)}>
          <PrimaryButton buttonText='8 Bidders' onPress={() => { navigation.navigate(NavigationString.BiddersList) }} fontSize={18} backgroundColor={'transparent'} textColor={colors.themeRed} borderWidth={2} borderColor={colors.themeRed} borderRadius={moderateScale(20)} height={moderateScale(40)} width={moderateScale(120)} />
          <Text fontFamily={'$robotoMedium'} fontSize={16} lineHeight={18} color={colors.black} numberOfLines={1} flex={1} textAlign='center'>Bid for 1 coin</Text>
          <PrimaryButton buttonText='My Bids' onPress={()=> navigation.navigate(NavigationString.YourBids)} fontSize={18} backgroundColor={'transparent'} textColor={colors.themeRed} borderWidth={2} borderColor={colors.themeRed} borderRadius={moderateScale(20)} height={moderateScale(40)} width={moderateScale(120)} />
        </Box>

        <Box mx={moderateScale(15)} gap={moderateScale(20)}>

          <InputText
            label={`Bid between ${'\u20B9'}50.00 - ${'\u20B9'}99.99`}
            textInputProps={{
              placeholder: 'eg. 1.00'
            }}
          />

          <Text fontFamily={'$robotoMedium'} fontSize={16} lineHeight={18} color={colors.themeRed} numberOfLines={1} textAlign='center'>Gowtham is currently winning..</Text>

          <PrimaryButton buttonText='Submit Bid' />
        </Box>

        <Box mx={moderateScale(15)} my={moderateScaleVertical(20)}>
          <Text fontFamily={'$robotoMedium'} fontSize={18} lineHeight={20} color={colors.themeRed} numberOfLines={1}>TIP: Here's a secret!!</Text>

          <Box borderWidth={1} borderColor={colors.grayish} px={moderateScale(15)} py={moderateScaleVertical(15)} marginTop={moderateScaleVertical(15)} borderRadius={moderateScale(10)} gap={10}>
            <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.themeRed} numberOfLines={1}>Use the 'Bid Range' feature.</Text>
            <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={16} color={colors.black} numberOfLines={3}>by using it you can place multiple bid at a time. For example: You can bid from 9.00 to 9.70 at a single time using that feature.</Text>
          </Box>
        </Box>
      </Body>
    </Container>
  )
}

export default BookBids