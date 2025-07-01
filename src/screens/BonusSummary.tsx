import { FlatList } from 'react-native'
import { Box, Text } from '@gluestack-ui/themed'

import { Container } from '../components/Container'
import { AppBar } from '../components/AppBar'
import { colors } from '../constants/colors'
import { moderateScale, moderateScaleVertical } from '../utils/responsiveSize'

{/* <Box borderWidth={1} borderColor={colors.gray3} py={moderateScaleVertical(10)} px={moderateScale(10)} borderRadius={moderateScale(5)} gap={moderateScale(5)}> */ }
const TransactionCard = ({ item, index }: { item: any, index: number }) => {
  return (
    <Box backgroundColor="black" py={moderateScaleVertical(5)} marginTop={10} px={moderateScale(10)} borderRadius={moderateScale(5)} borderRightWidth={2} borderLeftWidth={2} borderTopRightRadius={moderateScale(10)} borderBottomRightRadius={moderateScale(10)} borderTopLeftRadius={moderateScale(15)} borderBottomLeftRadius={moderateScale(15)} borderColor="gold" gap={moderateScale(5)}>
      <Box flexDirection='row' alignItems='center' >
        <Text flex={1} fontFamily={'$robotoBold'} fontSize={14} lineHeight={16} color={colors.gray4} numberOfLines={1} >Promo Code</Text>
        <Text flex={1} fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.gray4} numberOfLines={1} >A_Bonus_PC_P1_3</Text>
      </Box>
      <Box flexDirection='row' alignItems='center' >
        <Text flex={1} fontFamily={'$robotoBold'} fontSize={14} lineHeight={16} color={colors.gray4} numberOfLines={1} >Bonus Amount</Text>
        <Text flex={1} fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.gray4} numberOfLines={1} >{'\u20B9'}6.25</Text>
      </Box>
      {/* <Box flexDirection='row' alignItems='center' >
        <Text flex={1} fontFamily={'$robotoBold'} fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} >Instant Cash</Text>
        <Text flex={1} fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.grayish} numberOfLines={1} >{'\u20B9'}0</Text>
      </Box> */}
      <Box flexDirection='row' alignItems='center' >
        <Text flex={1} fontFamily={'$robotoBold'} fontSize={14} lineHeight={16} color={colors.gray4} numberOfLines={1} >Date of Issue</Text>
        <Text flex={1} fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.gray4} numberOfLines={1} >Aug 01,07:47 PM</Text>
      </Box>

      {/* <Box flexDirection='row' alignItems='center' >
        <Text flex={1} fontFamily={'$robotoBold'} fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} >Bonus Amount Released</Text>
        <Text flex={1} fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.grayish} numberOfLines={1} >{'\u20B9'}0</Text>
      </Box> */}

      <Box flexDirection='row' alignItems='center' >
        <Text flex={1} fontFamily={'$robotoBold'} fontSize={14} lineHeight={16} color={colors.gray4} numberOfLines={1} >Expiry Date</Text>
        <Text flex={1} fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.gray4} numberOfLines={1} >Aug 01,07:47 PM</Text>
      </Box>
    </Box >
  )
}

const BonusSummary = () => {
  return (
    <Container statusBarStyle='light-content' statusBarBackgroundColor={colors.themeRed} backgroundColor={colors.black}>
      <AppBar back title='Bonus Summary' />
      <Box flexDirection='row' alignItems='center' justifyContent='space-between' mx={moderateScale(15)} py={moderateScaleVertical(10)} borderBottomColor={colors.gray3} my={moderateScaleVertical(10)}>
        <Text fontFamily={'$robotoBold'} fontSize={18} lineHeight={20} color={colors.Purple} numberOfLines={1} >Bonus Summary</Text>
      </Box>

      <FlatList
        data={['01', '02', '03', '04', '05', '06']}
        renderItem={({ item, index }: { item: any, index: number }) => <TransactionCard key={item} item={item} index={index} />}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        style={{}}
        contentContainerStyle={{ marginHorizontal: moderateScale(15), gap: moderateScale(15), marginTop: moderateScaleVertical(5) }}
      />

    </Container>
  )
}

export default BonusSummary