import { Box, Image, Spinner, Text } from '@gluestack-ui/themed'
import { ActivityIndicator, FlatList, TouchableOpacity, View } from 'react-native'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

import { Container } from '../components/Container'
import { AppBar } from '../components/AppBar'
import { colors } from '../constants/colors'
import { moderateScale, scale } from '../utils/responsiveSize'
import { ParamListBase, useNavigation, useRoute } from '@react-navigation/native'
import useGetUserBidsHome from '../hooks/home/get-user-bids-home'
import useGetBidersHome from '../hooks/home/get-bider-home'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { NavigationString } from '../navigation/navigationStrings'
import Loader from '../components/Loader'

const BidderCard = ({ item, index }: any) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <TouchableOpacity /* onPress={() => navigation.navigate(NavigationString.ContactUserProfile, { userId: item?.userId })} */>
      <Box borderRightWidth={1} borderColor='white' borderTopRightRadius={8} borderBottomRightRadius={8} flexDirection='row' alignItems='center' justifyContent='space-between' bgColor={colors.black} py={responsiveHeight(1)} px={moderateScale(15)} width={"90%"} alignSelf='center'>
        <Box flexDirection='row' alignItems='center' gap={moderateScale(15)}>
          <Box h={moderateScale(40)} w={moderateScale(40)} borderRadius={moderateScale(40)} >
            <Image alt='icon' source={{ uri: 'https://cdn-icons-png.flaticon.com/512/219/219988.png' }} h={'100%'} w={'100%'} resizeMode='contain' />
          </Box>
          <Text fontFamily={'$robotoBold'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} >{item?.name ?? 'N/A'}</Text>
        </Box>
        <Box alignItems='center' justifyContent='center' borderColor={colors.white} borderRadius={moderateScale(20)} h={moderateScale(35)} w={moderateScale(90)} >
          <Text fontFamily={'$robotoMedium'} fontSize={16} lineHeight={18} color={colors.gold} numberOfLines={1} >{item?.bidsCount} Bids</Text>
        </Box>
      </Box>
    </TouchableOpacity>
  )
}

const BiddersHomeList = () => {
  // init
  const route = useRoute()
  const { contestId, slotId }: any = route.params

  // api
  const { data, isLoading } = useGetBidersHome({ contestId: contestId, timeslotId: slotId })


  if (isLoading) {
    return (
      <Container statusBarStyle='light-content' statusBarBackgroundColor={colors.themeRed}>
        <AppBar title='Biddesr List' back />
        <Box flex={1} backgroundColor='black' justifyContent='center' alignItems='center' >
          {/* <Spinner size={'large'} color={colors.gold} /> */}
          <Loader />
        </Box>
      </Container>
    )
  }

  const sortByBidsDesc = (bidders: any[]) => {
    return [...bidders].sort((a, b) => b.bidsCount - a.bidsCount);
  };

  return (
    <Container statusBarStyle='light-content' statusBarBackgroundColor={colors.themeRed} backgroundColor={colors.black}>
      <AppBar back title={'Bidders List'} />

      <FlatList
        data={data?.data?.data?.length as number > 0 ? sortByBidsDesc(data?.data?.data) : []}
        renderItem={({ item, index }: { item: any, index: number }) => <BidderCard key={item?.userId} item={item} index={index} />}
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
              <Text fontFamily={'$robotoMedium'} fontSize={16} lineHeight={18} color={colors.white} numberOfLines={1} > No Bidders Found</Text>
            </View>
          )
        }}
        contentContainerStyle={{ gap: responsiveWidth(1.2), flexGrow: 1 }}
      />
    </Container>
  )
}

export default BiddersHomeList