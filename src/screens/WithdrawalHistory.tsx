import { Box, Image, Text } from '@gluestack-ui/themed'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { Container } from '../components/Container'
import { AppBar } from '../components/AppBar'
import { colors } from '../constants/colors'
import { moderateScale, moderateScaleVertical } from '../utils/responsiveSize'
import { imgIcon } from '../assets/icons'
import PrimaryButton from '../components/Button/PrimaryButton'
import { NavigationString } from '../navigation/navigationStrings'
import * as Animatable from 'react-native-animatable';

const WithdrawalHistory = () => {
  // init 
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <Container statusBarStyle='light-content' statusBarBackgroundColor={colors.themeRed} backgroundColor={colors.white1}>
      <AppBar back title='Withdrawal History' />

      <Box mx={moderateScale(15)} py={moderateScaleVertical(10)} borderBottomWidth={1} borderBottomColor={colors.gray3} mt={moderateScaleVertical(10)}>
        <Text fontFamily={'$robotoBold'} fontSize={18} lineHeight={20} color={colors.black} numberOfLines={1} >Withdrawal Status</Text>
      </Box>

      <Box alignItems='center' gap={moderateScale(15)} mt={moderateScaleVertical(40)}>
        {/* <Image alt='icon' source={imgIcon.withdrawal} resizeMode='contain' w={moderateScale(55)} h={moderateScale(55)} /> */}
        <Animatable.Image
          animation="pulse"
          iterationCount="infinite" // Makes the animation loop infinitely
          easing="ease-in-out" // Specifies the easing
          source={imgIcon.withdrawal} // Replace with your image path
          style={{ width: moderateScale(55), height: moderateScale(55) }}
          resizeMode="contain"
        />

        <Box alignItems='center' gap={10}>
          <Text fontFamily={'$robotoBold'} fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} >Currently, you have no withdrawal request placed.</Text>
          <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.grayish} numberOfLines={2} textAlign='center' w={moderateScale(320)}>You can track the progress of your cash withdrawal requests here and also view details of completed requests from past.</Text>
        </Box>

        <PrimaryButton onPress={() => navigation.navigate(NavigationString.CashWithdraw)} buttonText='Place Request' backgroundColor={'rgb(130,170,22)'} height={moderateScale(30)} width={moderateScale(150)} alignSelf='center' marginBottom={moderateScaleVertical(10)} />
      </Box>


    </Container>
  )
}

export default WithdrawalHistory