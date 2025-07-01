import { useState } from 'react';
import { Modal } from 'react-native';
import { Box, CircleIcon, CloseIcon, Icon, InputField, InputIcon, InputSlot, Pressable, Radio, RadioGroup, RadioIndicator, Text } from '@gluestack-ui/themed'

import { Container } from '../components/Container'
import { AppBar } from '../components/AppBar'
import { colors } from '../constants/colors'
import { FilterIcon } from '../components/Icons'
import { moderateScale, moderateScaleVertical } from '../utils/responsiveSize'
import AllWinnersSlider from '../components/WinnerSlider/AllWinnersSlider';
import Body from '../components/Body/Body';
import { deviceHeight } from '../constants/constant';
import { Input } from '@gluestack-ui/themed';
import { SearchIcon } from '@gluestack-ui/themed';
import { RadioIcon } from '@gluestack-ui/themed';
import { RadioLabel } from '@gluestack-ui/themed';

const AllWinners = () => {

  // states
  const [showFilterModel, setShowFilterModel] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('keyword01');

  return (
    <Container statusBarStyle='light-content' statusBarBackgroundColor={colors.themeRed} backgroundColor={'#f1eff2'}>
      <AppBar back title='All Winners' />

      <Box flexDirection='row' alignItems='center' justifyContent='space-between' mt={moderateScaleVertical(15)} mx={moderateScale(15)}>
        <Text fontFamily={'$robotoBold'} fontSize={20} lineHeight={22} color={colors.black} numberOfLines={1}>Top Winners</Text>
        <Box flexDirection='row' alignItems='center' gap={moderateScale(10)}>
          <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={18} color={colors.dimGray} numberOfLines={1}>Filter by Series</Text>
          <Pressable onPress={() => setShowFilterModel(true)}>

            <Box backgroundColor={colors.white} px={moderateScale(14)} py={moderateScaleVertical(4)} borderRadius={moderateScale(15)}>
              <FilterIcon />
            </Box>
          </Pressable>
        </Box>
      </Box>

      <Box display={!!selectedFilter ? 'flex' : 'none'} mx={moderateScale(15)} mt={moderateScaleVertical(8)} bgColor={colors.blueGray} px={moderateScale(10)} py={moderateScaleVertical(5)} w={moderateScale(170)} flexDirection='row' alignItems='center' justifyContent='space-between' gap={moderateScale(4)} borderRadius={moderateScale(20)} borderWidth={1} borderColor={colors.gray4}>
        <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={18} color={colors.black} numberOfLines={1} w={moderateScale(130)} >{selectedFilter}</Text>
        <Pressable onPress={()=> setSelectedFilter('')}>
          <Icon as={CloseIcon} size="sm" color={colors.gray4} />
        </Pressable>
      </Box>
      <Body>
        <Box mt={moderateScaleVertical(10)} gap={10}>

          <AllWinnersSlider dateTitel={'5 August 2024'} data={['01', '02', '03', '04']} />

          <AllWinnersSlider dateTitel={'10 July 2024'} data={['01', '02', '03', '04']} />
        </Box>

      </Body>

      <Modal
        animationType='slide'
        transparent={true}
        visible={showFilterModel}
        onRequestClose={() => setShowFilterModel(false)}>
        <Box flex={1} backgroundColor='rgba(0, 0, 0, 0.5)' >
          <Box backgroundColor={colors.white} borderTopLeftRadius={10} borderTopRightRadius={10} w={'100%'} gap={15} h={moderateScale(640)} marginTop={deviceHeight * 0.22} overflow='hidden'>
            <Box flexDirection='row' justifyContent='space-between' alignItems='center' bgColor={colors.gray10} py={moderateScaleVertical(15)} px={moderateScale(15)}>
              <Pressable onPress={() => setShowFilterModel(false)}>
                <Icon as={CloseIcon} size="lg" color={colors.black} />
              </Pressable>
              <Text fontFamily='$robotoBold' fontSize={16} lineHeight={18} color={colors.black} numberOfLines={1} >Filter</Text>
              <Pressable>
                <Text fontFamily='$robotoBold' fontSize={16} lineHeight={18} color={colors.grayish} numberOfLines={1} >CLEAR</Text>
              </Pressable>
            </Box>

            <Box mx={moderateScale(15)}>
              <Input
                $focus-borderColor={colors.gray3}
              >
                <InputSlot pl="$3">
                  <InputIcon as={SearchIcon} />
                </InputSlot>
                <InputField fontFamily='$robotoMedium' fontSize={14} placeholder="Type match you want to search" placeholderTextColor={colors.placeHolderColor} />
              </Input>
            </Box>

            <Body>
              {
                ['15 mins', '30 mins', '1 hour', '1 day']?.map((item,index) => {
                  return (
                    <Box key={item} borderBottomWidth={1} borderBottomColor={colors.paleGray} mx={moderateScale(20)} py={moderateScaleVertical(10)} flexDirection='row' alignItems='center' justifyContent='space-between'>
                      <Text fontFamily='$robotoMedium' fontSize={14} lineHeight={18} color={colors.gray4} numberOfLines={1} >{item}</Text>

                      <Pressable onPress={() => { setSelectedFilter(item) }} h={moderateScale(20)} w={moderateScale(20)} borderWidth={2} borderRadius={moderateScale(10)} borderColor={colors.gray4} alignItems='center' justifyContent='center'>
                        <Box h={moderateScale(15)} w={moderateScale(15)} borderRadius={moderateScale(10)} bgColor={selectedFilter === item ? colors.themeRed : 'transparent'}>
                        </Box>
                      </Pressable>
                    </Box>
                  )
                })
              }
            </Body>




          </Box>
        </Box>
      </Modal>

    </Container>
  )
}

export default AllWinners