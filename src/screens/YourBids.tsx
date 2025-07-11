import { Box, Image, Text, useToast } from '@gluestack-ui/themed'
import { ActivityIndicator, FlatList } from 'react-native'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

import { Container } from '../components/Container'
import { AppBar } from '../components/AppBar'
import { colors } from '../constants/colors'
import { moderateScale } from '../utils/responsiveSize'
import { ParamListBase, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import useGetYourBid from '../hooks/private/useGetYourBid'
import { Spinner } from '@gluestack-ui/themed'
import { View } from 'react-native-animatable'
import { format } from 'date-fns'
import { formatAmount } from '../constants/constant'
import Loader from '../components/Loader'

const BidderCard = ({ item, index }: any) => {
  // console.log("item: ", item);

  return (
    <Box flexDirection='row' alignItems='center' justifyContent='space-between' bgColor={colors.black} py={responsiveHeight(1.5)} px={moderateScale(15)}>
      <Box gap={moderateScale(5)}>
        <Text fontFamily={'$robotoBold'} fontSize={14} lineHeight={16} color={colors.grayish} numberOfLines={1} >{format(new Date(item?.biddingTime), 'hh:mm a')}</Text>
        <Text fontFamily={'$robotoBold'} fontSize={12} lineHeight={16} color={colors.white} numberOfLines={1} >{item?.bidStatus}</Text>
      </Box>
      <Box alignItems='center' justifyContent='center' borderWidth={2} borderColor={colors.gold} borderRadius={moderateScale(20)} h={moderateScale(35)} w={moderateScale(90)} >
        <Text fontFamily={'$robotoMedium'} fontSize={16} lineHeight={18} color={colors.white} numberOfLines={1} >{formatAmount(item?.bid)}</Text>
      </Box>
    </Box>
  )
}

// http://localhost:5000/api/privatecontest/biddingList/6719f9bf8a916edee7be819a

const YourBids = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute()
  const toast = useToast()
  const { contestId }: any = route.params

  // api
  const { data, isLoading } = useGetYourBid(contestId)

  console.log("contestId: ", contestId);

  if (isLoading) {
    <Container statusBarStyle='light-content' statusBarBackgroundColor={colors.themeRed} backgroundColor={colors.white}>
      <AppBar back title={'My Bids'} />
      <Box flex={1} backgroundColor='black' alignItems='center' justifyContent='center'>
        {/* <Spinner size={'large'} color={colors.gold} /> */}
        <Loader />
      </Box>
    </Container>
  }

  console.log("result: ", data?.data); 

  // i am finding this useless in yourbidshome.tsx


  return (
    <Container statusBarStyle='light-content' statusBarBackgroundColor={colors.themeRed} backgroundColor={colors.black}>
      <AppBar back title={'My Bids'} />

      <FlatList
        data={data?.data?.data?.length as number > 0 ? data?.data?.data : []}
        renderItem={({ item, index }: { item: any, index: number }) => <BidderCard key={index} item={item} index={index} />}
        keyExtractor={(item: any) => item?._id}
        style={{ flex: 1, }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => {
          if (isLoading) {
            return (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator color={colors.white} size='large' />
              </View>
            )
          }

          return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
              <Text fontFamily={'$robotoMedium'} fontSize={16} lineHeight={18} color={colors.white} numberOfLines={1} > No Bids Found</Text>

            </View>
          )
        }}

        contentContainerStyle={{ gap: responsiveWidth(1.2), flexGrow: 1 }}
      />
    </Container>
  )
}

export default YourBids