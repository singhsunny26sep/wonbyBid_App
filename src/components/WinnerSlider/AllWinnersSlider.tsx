import { Box, Card, Text } from '@gluestack-ui/themed'

import { moderateScale, moderateScaleVertical } from '../../utils/responsiveSize'
import { colors } from '../../constants/colors'
import { FlatList } from 'react-native';
import { Image } from '@gluestack-ui/themed';
import { imagePaths } from '../../assets/images';

interface Props {
  dateTitel: string;
  data: any;
}

const CardItem = ({ item, index }: { item: any, index: number }) => {
  return (
    <Box bgColor={colors.white} w={moderateScale(350)} h={moderateScale(320)} borderRadius={moderateScale(10)}>
      <Box flexDirection='row' alignItems='center' justifyContent='space-between' px={moderateScale(15)} py={moderateScaleVertical(10)}>
        <Text fontFamily={'$robotoBold'} fontSize={16} lineHeight={18} color={colors.black} numberOfLines={1}>Category Name</Text>
        <Box gap={3}>
          <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.gray4} numberOfLines={1} textAlign='right'>Prize Pool</Text>
          <Text fontFamily={'$robotoBold'} fontSize={16} lineHeight={18} color={colors.black} numberOfLines={1}>{'\u20B9'}12.83 Lakhs</Text>
        </Box>
      </Box>

      {
        ['01', '02', '03']?.map((item: any, index: number) => {
          return (
            <Box key={item} flexDirection='row' alignItems='center' justifyContent='space-between' mx={moderateScale(10)} borderWidth={1} borderColor={colors.brightGray} px={moderateScale(8)} py={moderateScaleVertical(13)} borderRadius={moderateScale(10)} mb={moderateScaleVertical(8)}>
              <Box flexDirection='row' alignItems='center' gap={moderateScale(15)}>

                <Box w={moderateScale(45)} h={moderateScale(45)} borderRadius={moderateScale(30)} overflow="hidden" >
                  <Image alt="icon" source={imagePaths.userIcon} w={'100%'} h={'100%'} resizeMode="contain" />
                </Box>

                <Box>
                  <Text fontFamily={'$robotoBold'} fontSize={16} lineHeight={18} color={colors.black} numberOfLines={1}>alpha87243oh</Text>
                  <Text fontFamily={'$robotoMedium'} fontSize={10} lineHeight={14} color={colors.grayish} numberOfLines={1}>Playing Since 2022</Text>
                  <Text fontFamily={'$robotoMedium'} fontSize={10} lineHeight={14} color={colors.grayish} numberOfLines={1}>West Bengal</Text>
                </Box>

              </Box>

              <Box gap={3}>
                <Text fontFamily={'$robotoBold'} fontSize={16} lineHeight={18} color={colors.black} numberOfLines={1}>{'\u20B9'}93,099</Text>

                {/* <Box>
                    <Text fontFamily={'$robotoBold'} fontSize={16} lineHeight={18} color={colors.black} numberOfLines={1} textAlign='center'></Text>
                    <Image alt="icon" source={imagePaths.bagIcon} w={moderateScale(20)} h={moderateScale(20)} alignSelf='center' resizeMode="contain" />

                  </Box>
             */}

                <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.grayish} numberOfLines={1}>Cash Prize</Text>
              </Box>
            </Box>
          )
        })
      }
    </Box>
  )
}

const AllWinnersSlider = (props: Props) => {
  // init
  const { dateTitel, data } = props
  return (
    <Box>
      <Box flexDirection='row' alignItems='center' alignSelf='center' mb={moderateScaleVertical(10)} mx={moderateScale(15)} gap={moderateScale(15)}>
        <Box borderBottomWidth={1} borderBottomColor={colors.gray3} width={moderateScale(90)}></Box>
        <Box backgroundColor='#928da1' px={moderateScale(15)} py={moderateScaleVertical(2)} borderRadius={moderateScale(10)}>
          <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={18} color={colors.white} numberOfLines={1}>{dateTitel}</Text>
        </Box>
        <Box borderBottomWidth={1} borderBottomColor={colors.gray3} width={moderateScale(90)}></Box>
      </Box>

      <FlatList
        data={data}
        renderItem={({ item, index }: { item: any, index: number }) => <CardItem key={item} item={item} index={index} />}
        keyExtractor={(item): any => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginLeft: moderateScale(15), marginVertical: moderateScaleVertical(10) }}
        contentContainerStyle={{ gap: moderateScale(10) }}
      />
    </Box>
  )
}

export default AllWinnersSlider