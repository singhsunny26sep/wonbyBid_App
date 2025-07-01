import { Box, Image, Spinner, Text, useToast } from '@gluestack-ui/themed'
import { ActivityIndicator, FlatList, TouchableOpacity, View } from 'react-native'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

import { Container } from '../components/Container'
import { AppBar } from '../components/AppBar'
import { colors } from '../constants/colors'
import { moderateScale } from '../utils/responsiveSize'
import useGetBidderList from '../hooks/private/useGetBidderList'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { NavigationString } from '../navigation/navigationStrings'
import { ParamListBase, useNavigation, useRoute } from '@react-navigation/native'
import Loader from '../components/Loader'

const BidderCard = ({ item, index }: any) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  // console.log("item: ", item);

  return (
    <TouchableOpacity onPress={() => navigation.navigate(NavigationString.ContactUserProfile, { userId: item?._id })}>
      <Box flexDirection='row' alignItems='center' justifyContent='space-between' bgColor={colors.black} py={responsiveHeight(1.2)} px={moderateScale(15)}>
        <Box flexDirection='row' alignItems='center' gap={moderateScale(15)}>
          <Box h={moderateScale(40)} w={moderateScale(40)} borderRadius={moderateScale(40)} >
            <Image alt='icon' source={{ uri: 'https://cdn-icons-png.flaticon.com/512/219/219988.png' }} h={'100%'} w={'100%'} resizeMode='contain' />
          </Box>
          <Text fontFamily={'$robotoBold'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} >{item?.name ?? 'N/A'}</Text>
        </Box>
        <Box alignItems='center' justifyContent='center' borderWidth={2} borderColor={colors.white} borderRadius={moderateScale(20)} h={moderateScale(35)} w={moderateScale(90)} >
          <Text fontFamily={'$robotoMedium'} fontSize={16} lineHeight={18} color={colors.white} numberOfLines={1} >{item?.bids} Bids</Text>
        </Box>
      </Box>
    </TouchableOpacity>
  )
}

/* 

http://localhost:5000/api/privatecontest/bidderList/6719f9bf8a916edee7be819a
*/

const BiddersList = () => {
  const route = useRoute()
  const toast = useToast()
  const { contestId }: any = route.params

  const { data, isLoading } = useGetBidderList(contestId)

  // console.log("data: ", data?.data);

  if (isLoading) {
    <Container statusBarStyle='light-content' statusBarBackgroundColor={colors.themeRed} backgroundColor={colors.black}>
      <AppBar back title={'Bidder List'} />
      <Box flex={1} backgroundColor='black' alignItems='center' justifyContent='center'>
      <Loader/>
      </Box>
    </Container>
  }

  return (
    <Container statusBarStyle='light-content' statusBarBackgroundColor={colors.themeRed} backgroundColor={colors.black}>
      <AppBar back title={'Bidder List'} />

      {/* <FlatList
        data={['01', '02', '03', '04', '05', '06', '07', '08']}
        renderItem={({ item, index }: { item: any, index: number }) => <BidderCard key={item} item={item} index={index} />}
        keyExtractor={(item: any) => item}
        style={{ flex: 1, }}
        showsVerticalScrollIndicator={false}

        contentContainerStyle={{ gap: responsiveWidth(1.2), }}
      /> */}
      <FlatList
        data={data?.data?.data?.length as number > 0 ? data?.data?.data : []}
        renderItem={({ item, index }: { item: any, index: number }) => <BidderCard key={index} item={item} index={index} />}
        keyExtractor={(item: any) => item?.userId}
        style={{ flex: 1, }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => {
          if (isLoading) {
            return (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator color={colors.themeRed} size='large' />
              </View>
            )
          }

          return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
              <Text fontFamily={'$robotoMedium'} fontSize={16} lineHeight={18} color={colors.black} numberOfLines={1} > No Bidders Found</Text>

            </View>
          )
        }}

        contentContainerStyle={{ gap: responsiveWidth(1.2), flexGrow: 1 }}
      />
    </Container>
  )
}

export default BiddersList