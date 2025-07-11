import { Box, Image, Spinner, Text } from '@gluestack-ui/themed'
import { ActivityIndicator, FlatList, View } from 'react-native'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

import { Container } from '../components/Container'
import { AppBar } from '../components/AppBar'
import { colors } from '../constants/colors'
import { moderateScale } from '../utils/responsiveSize'
import { useRoute } from '@react-navigation/native'
import useGetUserBidsHome from '../hooks/home/get-user-bids-home'
import { formatAmount } from '../constants/constant'
import { format } from 'date-fns'
import Loader from '../components/Loader'

const BidderCard = ({ item, index }: any) => {
  return (
    <Box flexDirection='row' alignItems='center' justifyContent='space-between' borderRightWidth={1} borderTopRightRadius={moderateScale(10)}
      borderBottomRightRadius={moderateScale(10)}
      borderColor='white' width={"95%"} bgColor={colors.black} py={responsiveHeight(1.5)} px={moderateScale(15)}>
      <Box gap={moderateScale(5)}>
        <Text fontFamily={'$robotoBold'} fontSize={14} lineHeight={16} color={colors.grayish} numberOfLines={1} >{format(new Date(item?.biddingTime), 'hh:mm a')}</Text>
        <Text fontFamily={'$robotoBold'} fontSize={12} lineHeight={16} color={colors.gold} numberOfLines={1} >{item?.bidStatus}</Text>
        {/* <Text fontFamily={'$robotoBold'} fontSize={12} lineHeight={16} color={colors.white} numberOfLines={1} ></Text> */}

      </Box>
      <Box alignItems='center' justifyContent='center' borderRadius={moderateScale(20)} h={moderateScale(35)} w={moderateScale(90)} >
        <Text fontFamily={'$robotoMedium'} fontSize={16} lineHeight={18} color={colors.white} numberOfLines={1} >{formatAmount(item?.bid)}</Text>
      </Box>
    </Box>
  )
}

const YourBidsHome = () => {
  // init
  const route = useRoute()
  const { contestId, slotId }: any = route.params

  // console.log(contestId, 'listt');


  // api
  const { data, isLoading } = useGetUserBidsHome({ contestId: contestId, timeslotId: slotId })

  const sortByBidsDesc = (bidders: any[]) => {
    return [...bidders].sort((a, b) => b.bid - a.bid);
  };

  if (isLoading) {
    return (
      <Container statusBarStyle='light-content' statusBarBackgroundColor={colors.themeRed}>
        <AppBar title='My Bids' back />
        <Box flex={1} backgroundColor='black' justifyContent='center' alignItems='center' >
          {/* <Spinner size={'large'} color={colors.gold} /> */}
          <Loader />
        </Box>
      </Container>
    )
  }
  return (
    <Container statusBarStyle='light-content' statusBarBackgroundColor={colors.themeRed} backgroundColor={colors.black}>
      <AppBar back title={'My Bids'} />

      <FlatList
        data={data?.data?.data?.length as number > 0 ? sortByBidsDesc(data?.data?.data) : []}
        renderItem={({ item, index }: { item: any, index: number }) => <BidderCard key={index} item={item} index={index} />}
        keyExtractor={(item: any) => item?._id}
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
              <Text fontFamily={'$robotoMedium'} fontSize={16} lineHeight={18} color={colors.white} numberOfLines={1} > No Bids Found</Text>
            </View>
          )
        }}

        contentContainerStyle={{ gap: responsiveWidth(1.2), flexGrow: 1 }}
      />
    </Container>
  )
}

export default YourBidsHome