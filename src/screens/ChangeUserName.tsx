import { Box, Input, InputField, Text } from '@gluestack-ui/themed'

import { Container } from '../components/Container'
import { AppBar } from '../components/AppBar'
import { colors } from '../constants/colors'
import { moderateScale, moderateScaleVertical } from '../utils/responsiveSize'
import PrimaryButton from '../components/Button/PrimaryButton'

const ChangeUserName = () => {
  return (
    <Container statusBarStyle='light-content' statusBarBackgroundColor={colors.themeRed} backgroundColor={colors.white}>
      <AppBar back title='' />

      <Box mx={moderateScale(15)} my={moderateScaleVertical(10)} py={moderateScaleVertical(10)} borderBottomWidth={1} borderBottomColor={colors.gray5}>
        <Text fontFamily='$robotoBold' fontSize={20} lineHeight={22} color={colors.black} numberOfLines={1} >Change Username</Text>
      </Box>

      <Box borderWidth={1} borderColor={colors.gray5} mx={moderateScale(15)} borderRadius={moderateScale(10)} overflow='hidden'>
        <Box bgColor={colors.gray3} py={moderateScaleVertical(8)} px={moderateScale(10)}>
          <Text fontFamily='$robotoBold' fontSize={16} lineHeight={18} color={colors.gray2} numberOfLines={1} >Change your username here</Text>
        </Box>

        
        <Text fontFamily='$robotoRegular' fontSize={14} lineHeight={16} color={colors.black} numberOfLines={2} px={moderateScale(15)} pt={moderateScaleVertical(10)}>Username you had requestedfor was not available. To change your username, enter new username below.</Text>
        <Text fontFamily='$robotoBold' fontSize={14} lineHeight={16} color={colors.black} numberOfLines={2} px={moderateScale(15)} py={moderateScaleVertical(10)}>Please note that you can change your username only once.</Text>

        <Text fontFamily='$robotoRegular' fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} textAlign='center'>Old Username :  hero8rq1so5u</Text>
          
        <Box mx={moderateScale(15)} my={moderateScale(15)} gap={moderateScale(10)}>
        <Input
            variant="outline"
            size="md"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
            $focus-borderColor={colors.themeRed}
          >
            <InputField fontFamily='$robotoMedium' fontSize={14} placeholder="New Username" placeholderTextColor={colors.placeHolderColor} />
          </Input>

          <Input
            variant="outline"
            size="md"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
            $focus-borderColor={colors.themeRed}
          >
            <InputField fontFamily='$robotoMedium' fontSize={14} placeholder="Confirm Username" placeholderTextColor={colors.placeHolderColor} />
          </Input>
        </Box>  

        <PrimaryButton buttonText='Submit' backgroundColor={colors.greenText} width={moderateScale(120)} height={moderateScale(35)} marginLeft={moderateScale(15)} marginBottom={moderateScaleVertical(15)}/>
      </Box>

    </Container>
  )
}

export default ChangeUserName