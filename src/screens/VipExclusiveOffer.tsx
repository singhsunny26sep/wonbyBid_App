
import { Container } from '../components/Container'
import { AppBar } from '../components/AppBar'
import { colors } from '../constants/colors'
import { Box, Text } from '@gluestack-ui/themed'
import { CustomerSupportIcon, EditPencilGray6, SmileIcon, TrophtyGray6Icon, UserGray6Icon } from '../components/Icons'
import { moderateScale, moderateScaleVertical } from '../utils/responsiveSize'
import { Image } from '@gluestack-ui/themed'
import { Pressable } from '@gluestack-ui/themed'
import { responsiveHeight } from 'react-native-responsive-dimensions'

const VipExclusiveOffer = () => {
  return (
    <Container statusBarStyle='light-content' statusBarBackgroundColor={colors.themeRed} backgroundColor={colors.white2}>
      <AppBar back title='Layalty Zone' />
      <Box flexDirection='row' alignItems='center' backgroundColor={colors.black} gap={moderateScale(10)} py={moderateScaleVertical(8)} px={moderateScale(11)}>
        <UserGray6Icon />
        <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.gray6} numberOfLines={1} >champlwtn6jc</Text>
        <Box flexDirection='row' alignItems='center' px={moderateScale(10)} py={moderateScaleVertical(1)} borderWidth={1} borderColor={colors.gray6} borderRadius={moderateScale(10)} gap={5}>
          <EditPencilGray6 />
          <Text fontFamily={'$robotoRegular'} fontSize={12} lineHeight={14} color={colors.gray6} numberOfLines={1} >Change name</Text>
        </Box>
      </Box>

      <Box flexDirection='column' gap={15} mt={moderateScaleVertical(15)}>

        <Box flexDirection='row' alignItems='center' alignSelf='center' gap={moderateScale(15)}>
          <Box borderTopWidth={1} borderTopColor={colors.black} w={moderateScale(80)}></Box>
          <Text fontFamily={'$robotoBold'} fontSize={14} lineHeight={16} color={colors.darkViolet} numberOfLines={1} >VIP Exclusive Offer</Text>
          <Box borderTopWidth={1} borderTopColor={colors.black} w={moderateScale(80)}></Box>
        </Box>

        <Box flexDirection='row' alignItems='center' justifyContent='space-between' mx={moderateScale(15)} borderWidth={1} borderColor={colors.gold} bgColor={colors.gold} py={moderateScaleVertical(8)} px={moderateScale(10)} borderRadius={moderateScale(5)}>
          <Box flexDirection='row' alignItems='center' gap={15}>
            <Image alt='icon' source={require('../assets/icons/king.png')} resizeMode='contain' h={moderateScale(30)} w={moderateScale(30)} />
            <Text fontFamily={'$robotoBold'} fontSize={12} lineHeight={16} color={colors.black} numberOfLines={1} >Free Contest Win {'\u20B9'} 1 Lakh</Text>
          </Box>
          <Pressable >
            <Text fontFamily={'$robotoBold'} fontSize={12} lineHeight={16} color={'#278c32'} numberOfLines={1} >Join Now</Text>
          </Pressable>
        </Box>

        <Box flexDirection='row' alignItems='center' justifyContent='space-between' mx={moderateScale(15)} borderWidth={1} borderColor={colors.gold} bgColor={colors.gold} py={moderateScaleVertical(8)} px={moderateScale(10)} borderRadius={moderateScale(5)}>
          <Box flexDirection='row' alignItems='center' gap={15}>
            <Image alt='icon' source={require('../assets/icons/king.png')} resizeMode='contain' h={moderateScale(30)} w={moderateScale(30)} />
            <Text fontFamily={'$robotoBold'} fontSize={12} lineHeight={16} color={colors.black} numberOfLines={1} >Free Contest Win {'\u20B9'} 1 Lakh</Text>
          </Box>
          <Pressable >
            <Text fontFamily={'$robotoBold'} fontSize={12} lineHeight={16} color={'#278c32'} numberOfLines={1} >Join Now</Text>
          </Pressable>
        </Box>
      </Box>


      <Text fontFamily={'$robotoBold'} fontSize={14} lineHeight={16} color={colors.dimGray} numberOfLines={1} px={moderateScale(15)} py={moderateScaleVertical(15)}>Member Privileges</Text>

      <Box backgroundColor={colors.white} mx={moderateScale(15)} py={moderateScaleVertical(15)} px={moderateScale(15)} borderRadius={moderateScale(10)}>
        <Box flexDirection='row' alignItems='center' gap={moderateScale(15)} borderBottomWidth={1} borderBottomColor={colors.gray5} py={moderateScaleVertical(10)}>
          <TrophtyGray6Icon />
          <Box gap={3}>
            <Text fontFamily={'$robotoBold'} fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} >Regular Free Contest</Text>
            <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.gray6} numberOfLines={1} >Win {'\u20B9'}25 Lakh + Prizes Monthly</Text>
          </Box>
        </Box>

        <Box flexDirection='row' alignItems='center' gap={moderateScale(15)} borderBottomWidth={1} borderBottomColor={colors.gray5} py={moderateScaleVertical(10)}>
          <SmileIcon />
          <Box gap={3}>
            <Text fontFamily={'$robotoBold'} fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} >Happy Hour Sundays</Text>
            <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.gray6} numberOfLines={1} >Unlimited Discounts - 1st & 3rd Sunday</Text>
          </Box>
        </Box>

        <Box flexDirection='row' alignItems='center' gap={moderateScale(15)} borderBottomWidth={1} borderBottomColor={colors.gray5} py={moderateScaleVertical(10)}>
          <CustomerSupportIcon />
          <Box gap={3}>
            <Text fontFamily={'$robotoBold'} fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} >24/7 call Support</Text>
            <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.gray6} numberOfLines={1} >Visit Help & Support for Assistance</Text>
          </Box>
        </Box>
      </Box>

    </Container>
  )
}

export default VipExclusiveOffer