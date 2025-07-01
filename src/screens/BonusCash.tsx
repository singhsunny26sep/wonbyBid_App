
import { Box, Image, Text } from '@gluestack-ui/themed'

import { Container } from '../components/Container'
import { colors } from '../constants/colors'
import { imgIcon } from '../assets/icons'
import { AppBar } from '../components/AppBar'
import { moderateScale, moderateScaleVertical } from '../utils/responsiveSize'
import PrimaryButton from '../components/Button/PrimaryButton'
import Body from '../components/Body/Body'
import { imagePaths } from '../assets/images'

const BonusCash = () => {
  return (
    <Container statusBarStyle='light-content' statusBarBackgroundColor={colors.themeRed} backgroundColor={colors.white}>
      <AppBar back title='Bonus Cash' />
      <Body>
        <Box h={moderateScale(30)} bgColor={colors.black} flexDirection='row' alignItems='center' gap={8} justifyContent='center'>
          <Image alt='icon' source={imgIcon.bCoin} w={moderateScale(15)} h={moderateScale(15)} resizeMode='contain' />
          <Text fontFamily={'$$robotoMedium'} fontSize={12} lineHeight={16} color={colors.white} numberOfLines={1} >1 Bonus Cash = {'\u20B9'} 1 *</Text>
        </Box>

        <Box mx={moderateScale(15)} my={moderateScaleVertical(20)}>
          <Text fontFamily={'$poppinsSemiBold'} fontSize={16} lineHeight={18} color={colors.black} numberOfLines={1} >Hey! hero8rq1so5u</Text>
          <Text fontFamily={'$poppinsMedium'} fontSize={12} lineHeight={16} color={colors.grayish} numberOfLines={1} >Let's start earning Bonus Cash</Text>
        </Box>

        <Box mx={moderateScale(15)} gap={5} mb={10}>
          <Text fontFamily={'$poppinsMedium'} fontSize={12} lineHeight={16} color={colors.grayish} numberOfLines={1} >my balance</Text>

          <Text fontFamily={'$poppinsMedium'} fontSize={26} lineHeight={30} color={colors.dimGray} numberOfLines={1} mt={moderateScaleVertical(10)} >00</Text>
          <Box flexDirection='row' alignItems='center' gap={8}>
            <Image alt='icon' source={imgIcon.bCoin} w={moderateScale(18)} h={moderateScale(18)} resizeMode='contain' />
            <Text fontFamily={'$poppinsMedium'} fontSize={12} lineHeight={16} color={colors.grayish} numberOfLines={1} >Bonus Cash</Text>
          </Box>
        </Box>

        <PrimaryButton buttonText='View account details' fontSize={12} backgroundColor={colors.mediumBlue} width={moderateScale(170)} height={moderateScale(30)} alignSelf='flex-end' marginHorizontal={moderateScale(15)} />

        {/* <Image alt='icon' source={imagePaths.bonusCashBanner} w={'100%'} h={moderateScale(200)} resizeMode='contain' /> */}
        {/* 
        <Box mx={15} my={15}>
          <Text fontFamily={'$poppinsSemiBold'} fontSize={16} lineHeight={18} color={colors.black} numberOfLines={1} >Boosters</Text>
          <Text fontFamily={'$poppinsMedium'} fontSize={12} lineHeight={16} color={colors.grayish} numberOfLines={1} >redeem these boosters while joining any eligible contest</Text>
        </Box>

        <Box mx={15} gap={10} flexDirection='row' alignItems='center' mb={10}>
          <Box flex={1} flexDirection='row' h={moderateScale(65)} borderWidth={1} borderColor={colors.gray9} borderRadius={6} overflow='hidden' pr={moderateScale(4)}>
            <Box w={moderateScale(45)} bgColor={'#dbf6ff'} h={'100%'} justifyContent='center'>
              <Box position='absolute' ml={20} bgColor='#abd8e6' borderWidth={2} borderColor={'#7bb4c8'} alignItems='center' justifyContent='center' w={moderateScale(40)} h={moderateScale(40)} borderRadius={moderateScale(20)}>
                <Text fontFamily={'$poppinsSemiBold'} fontSize={20} lineHeight={30} color={colors.black} numberOfLines={1}>2X</Text>
              </Box>
            </Box>
            <Text fontFamily={'$poppinsSemiBold'} fontSize={12} lineHeight={16} color={colors.black} numberOfLines={1} ml={moderateScale(15)} pt={moderateScaleVertical(5)}>2x Booster</Text>
            <Box flexDirection='row' alignItems='center' alignSelf='flex-end' pb={moderateScaleVertical(3)} ml={moderateScale(-15)} gap={2}>
              <Image alt='icon' source={imgIcon.bCoin} w={moderateScale(15)} h={moderateScale(15)} resizeMode='contain' />
              <Text fontFamily={'$poppinsSemiBold'} fontSize={14} lineHeight={20} color={colors.black} numberOfLines={1}>40.00</Text>
            </Box>
          </Box>

          <Box flex={1} flexDirection='row' h={moderateScale(65)} borderWidth={1} borderColor={colors.gray9} borderRadius={6} overflow='hidden' pr={moderateScale(4)}>
            <Box w={moderateScale(45)} bgColor={'#dbf6ff'} h={'100%'} justifyContent='center'>
              <Box position='absolute' ml={20} bgColor='#abd8e6' borderWidth={2} borderColor={'#7bb4c8'} alignItems='center' justifyContent='center' w={moderateScale(40)} h={moderateScale(40)} borderRadius={moderateScale(20)}>
                <Text fontFamily={'$poppinsSemiBold'} fontSize={20} lineHeight={30} color={colors.black} numberOfLines={1}>3X</Text>
              </Box>
            </Box>
            <Text fontFamily={'$poppinsSemiBold'} fontSize={12} lineHeight={16} color={colors.black} numberOfLines={1} ml={moderateScale(15)} pt={moderateScaleVertical(5)}>3x Booster</Text>
            <Box flexDirection='row' alignItems='center' alignSelf='flex-end' pb={moderateScaleVertical(3)} ml={moderateScale(-15)} gap={2}>
              <Image alt='icon' source={imgIcon.bCoin} w={moderateScale(15)} h={moderateScale(15)} resizeMode='contain' />
              <Text fontFamily={'$poppinsSemiBold'} fontSize={14} lineHeight={20} color={colors.black} numberOfLines={1}>60.00</Text>
            </Box>
          </Box>

        </Box> */}

        {/* <Box mx={15} gap={10} flexDirection='row' alignItems='center'>
          <Box flex={1} flexDirection='row' h={moderateScale(65)} borderWidth={1} borderColor={colors.gray9} borderRadius={6} overflow='hidden' pr={moderateScale(4)}>
            <Box w={moderateScale(45)} bgColor={'#dbf6ff'} h={'100%'} justifyContent='center'>
              <Box position='absolute' ml={20} bgColor='#abd8e6' borderWidth={2} borderColor={'#7bb4c8'} alignItems='center' justifyContent='center' w={moderateScale(40)} h={moderateScale(40)} borderRadius={moderateScale(20)}>
                <Text fontFamily={'$poppinsSemiBold'} fontSize={20} lineHeight={30} color={colors.black} numberOfLines={1}>4X</Text>
              </Box>
            </Box>
            <Text fontFamily={'$poppinsSemiBold'} fontSize={12} lineHeight={16} color={colors.black} numberOfLines={1} ml={moderateScale(15)} pt={moderateScaleVertical(5)}>4x Booster</Text>
            <Box flexDirection='row' alignItems='center' alignSelf='flex-end' pb={moderateScaleVertical(3)} ml={moderateScale(-15)} gap={2}>
              <Image alt='icon' source={imgIcon.bCoin} w={moderateScale(15)} h={moderateScale(15)} resizeMode='contain' />
              <Text fontFamily={'$poppinsSemiBold'} fontSize={14} lineHeight={20} color={colors.black} numberOfLines={1}>75.00</Text>
            </Box>
          </Box>

          <Box flex={1} flexDirection='row' h={moderateScale(65)} borderWidth={1} borderColor={colors.gray9} borderRadius={6} overflow='hidden' pr={moderateScale(4)}>
            <Box w={moderateScale(45)} bgColor={'#dbf6ff'} h={'100%'} justifyContent='center'>
              <Box position='absolute' ml={20} bgColor='#abd8e6' borderWidth={2} borderColor={'#7bb4c8'} alignItems='center' justifyContent='center' w={moderateScale(40)} h={moderateScale(40)} borderRadius={moderateScale(20)}>
                <Text fontFamily={'$poppinsSemiBold'} fontSize={20} lineHeight={30} color={colors.black} numberOfLines={1}>5X</Text>
              </Box>
            </Box>
            <Text fontFamily={'$poppinsSemiBold'} fontSize={12} lineHeight={16} color={colors.black} numberOfLines={1} ml={moderateScale(15)} pt={moderateScaleVertical(5)}>5x Booster</Text>
            <Box flexDirection='row' alignItems='center' alignSelf='flex-end' pb={moderateScaleVertical(3)} ml={moderateScale(-15)} gap={2}>
              <Image alt='icon' source={imgIcon.bCoin} w={moderateScale(15)} h={moderateScale(15)} resizeMode='contain' />
              <Text fontFamily={'$poppinsSemiBold'} fontSize={14} lineHeight={20} color={colors.black} numberOfLines={1}>100.00</Text>
            </Box>
          </Box>

        </Box> */}

        {/* <Box mx={15} my={15}>
          <Text fontFamily={'$poppinsSemiBold'} fontSize={16} lineHeight={18} color={colors.black} numberOfLines={1} >VIP Access</Text>
          <Text fontFamily={'$poppinsMedium'} fontSize={12} lineHeight={16} color={colors.grayish} numberOfLines={1} >spend {'\u20B9'} 1500 on contests to get VIP benefits</Text>
        </Box> */}

        {/* <Image alt='icon' source={imagePaths.bonusCashBanner2} w={'100%'} h={moderateScale(115)} resizeMode='contain' /> */}

      </Body>

    </Container>
  )
}

export default BonusCash