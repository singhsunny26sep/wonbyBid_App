import { useContext, useEffect, useState } from 'react'
import { Box, FlatList, Pressable, Text } from '@gluestack-ui/themed'
import { Image } from '@gluestack-ui/themed'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Carousel from "pinar";
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

import { Container } from '../components/Container'
import { colors } from '../constants/colors'
import { moderateScale } from '../utils/responsiveSize'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { HamburgerIcon, WalletIcon } from '../components/Icons'
import SportCard from '../components/SportCard/SportCard'
import { NavigationString } from '../navigation/navigationStrings'
import socketServices from '../utils/socketService'
import { AuthContext } from '../utils/authContext'
import useGetUserWalletInfo from '../hooks/auth/get-user-wallet-info'

const MyMatches = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const authContext: any = useContext(AuthContext);
  const { data: walletInfoData, isLoading: walletInfoIsLoading } = useGetUserWalletInfo();
  // useStates
  const [selectedOption, setSelectedOption] = useState('live');
  const [upcomingContest, setUpcomingContest] = useState([])
  const [liveContest, setliveContest] = useState([])
  const [winningContest, setWinningContest] = useState([])
  useFocusEffect(
    useCallback(() => {
      const fetch = async () => {
        await emitContestCategory(authContext?.authState?.userId);
      };

      fetch();

      socketServices.on('mycontest-live-category', (data: any) => {
        console.log(data)
        setliveContest(data);
      });

      socketServices.on('mycontest-upcoming-category', (data: any) => {
        setUpcomingContest(data);
      });

      socketServices.on('mycontest-expired-category', (data: any) => {
        setWinningContest(data);
      });

      return () => {
        socketServices.removeListener('mycontest-live-category');
        socketServices.removeListener('mycontest-upcoming-category');
        socketServices.removeListener('mycontest-expired-category');
      };
    }, [authContext?.authState?.userId]) // Dependencies to re-run effect when userId changes
  );



  const emitContestCategory = (userId: string) => {
    // console.log('Emitting my-contestcategory event with userId:', userId);
    socketServices.emit('my-contestcategory', { userId: userId });
  };

  const sortByDateDesc = (data: any[], dateKey: string) => {
    return [...data].sort((a, b) => new Date(b[dateKey]).getTime() - new Date(a[dateKey]).getTime());
  };

  return (
    <Container statusBarStyle='light-content' statusBarBackgroundColor={colors.themeRed} backgroundColor='black'>

      <Box flexDirection='row' alignItems='center' justifyContent='space-between' bgColor={colors.themeRed} px={20} h={moderateScale(70)}>
        <Box flexDirection='row' alignItems='center' gap={10}>
          <Pressable onPress={() => navigation.navigate(NavigationString.Setting)}>
            <Box h={moderateScale(35)} w={moderateScale(35)} borderRadius={moderateScale(40)} >
              <Image alt='icon' source={{ uri: 'https://cdn-icons-png.flaticon.com/512/219/219988.png' }} h={'100%'} w={'100%'} resizeMode='contain' />
            </Box>
            <Box position='absolute' bgColor={colors.lightGrey} alignItems='center' justifyContent='center' borderRadius={10} w={moderateScale(20)} h={moderateScale(20)} bottom={0} left={0} ml={-6} mt={10}>
              <HamburgerIcon />
            </Box>
          </Pressable>
          <Text fontFamily={'$poppinsSemiBold'} fontSize={16} lineHeight={18} color={colors.gold} numberOfLines={1} >WonByBid</Text>
        </Box>
        <Box></Box>
        <Pressable onPress={() => navigation.navigate(NavigationString.MyWallet)}>
          <Box flexDirection='row' alignItems='center' py={8} px={7} borderRadius={10} gap={10}>
            <WalletIcon />
            <Text fontFamily={'$poppinsMedium'} fontSize={12} lineHeight={16} color={colors.white} numberOfLines={1} >{'₹'} {walletInfoData?.data?.newBalance?.balance.toFixed(2) ?? '0'}</Text>
          </Box>
        </Pressable>
      </Box>
      <Box flexDirection='row' alignItems='center' gap={10} px={moderateScale(15)} position='absolute' mt={responsiveHeight(9)} bgColor={colors.black} borderTopLeftRadius={10} borderTopRightRadius={10}>
        <Pressable onPress={() => setSelectedOption('upcoming')} flex={1}>
          <Box alignItems='center' justifyContent='center' py={15} borderBottomWidth={selectedOption === 'upcoming' ? 3 : 0} borderBottomColor={colors.gold}>
            <Text fontFamily={selectedOption === 'upcoming' ? '$poppinsSemiBold' : '$poppinsMedium'} fontSize={14} lineHeight={16} color={selectedOption === 'upcoming' ? colors.gold : colors.white} numberOfLines={1} >Upcoming</Text>
          </Box>
        </Pressable >
        <Pressable onPress={() => setSelectedOption('live')} flex={1} >
          <Box alignItems='center' justifyContent='center' py={15} borderBottomWidth={selectedOption === 'live' ? 3 : 0} borderBottomColor={colors.gold}>
            <Text fontFamily={selectedOption === 'live' ? '$poppinsSemiBold' : '$poppinsMedium'} fontSize={14} lineHeight={16} color={selectedOption === 'live' ? colors.gold : colors.white} numberOfLines={1} >Live</Text>
          </Box>
        </Pressable >
        <Pressable onPress={() => setSelectedOption('winnings ')} flex={1} >
          <Box alignItems='center' justifyContent='center' py={15} borderBottomWidth={selectedOption === 'winnings ' ? 3 : 0} borderBottomColor={colors.gold}>
            <Text fontFamily={selectedOption === 'winnings ' ? '$poppinsSemiBold' : '$poppinsMedium'} fontSize={14} lineHeight={16} color={selectedOption === 'winnings ' ? colors.gold : colors.white} numberOfLines={1} >Winnings </Text>
          </Box>
        </Pressable >
      </Box>

      {selectedOption === 'live' ? (
        <FlatList
          data={liveContest?.length > 0 ? liveContest : []}
          renderItem={({ item, index }: { item: any, index: number }) => <SportCard key={item} item={item} index={index} cardShadowColor={'#0984e3'} onPress={() => {
            navigation.navigate(NavigationString.MyContestList, { cardFrom: 'live', categoryName: item?.title, catId: item?.categorieId, type: 'myMatches' })
          }} cardFrom={'live'} />}
          keyExtractor={(item: any) => item?._id}
          style={{ flex: 1, marginTop: responsiveHeight(8) }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => {
            return (
              <Box flex={1} justifyContent='center' alignItems='center'>
                <Text fontSize={18} color={colors.gold} lineHeight={22} fontFamily='$poppinsSemiBold'>No Contest Found</Text>
              </Box>
            )
          }}
          contentContainerStyle={{ gap: responsiveWidth(5), marginHorizontal: responsiveWidth(4), flexGrow: 1 }}
        />
      ) : selectedOption === 'upcoming' ? (
        <FlatList
          data={upcomingContest?.length > 0 ? upcomingContest : []}
          renderItem={({ item, index }: { item: any, index: number }) => <SportCard key={item?._id} item={item} index={index} cardShadowColor={'#74b9ff'} onPress={() => {
            navigation.navigate(NavigationString.MyContestList, { cardFrom: 'upcoming', categoryName: item?.title, catId: item?.categorieId, type: 'myMatches' })
          }} cardFrom={'upcoming'} />}
          keyExtractor={(item: any) => item?._id}
          style={{ flex: 1, marginTop: responsiveHeight(8) }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => {
            return (
              <Box flex={1} justifyContent='center' alignItems='center'>
                <Text fontSize={18} color={colors.gold} lineHeight={22} fontFamily='$poppinsSemiBold'>No Contest Found</Text>
              </Box>
            )
          }}
          contentContainerStyle={{ gap: responsiveWidth(4), marginHorizontal: responsiveWidth(4), flexGrow: 1 }}
        />
      ) : (
        <FlatList
          data={winningContest?.length > 0 ? sortByDateDesc(winningContest, 'endTime') : []}
          renderItem={({ item, index }: { item: any, index: number }) => <SportCard key={item} item={item} index={index} cardShadowColor={'#54a0ff'}
            onPress={() => {
              navigation.navigate(NavigationString.MyContestList, { cardFrom: 'wining', categoryName: item?.title, catId: item?.categorieId, type: 'myMatches' })
            }}
            cardFrom={'wining'} />
          }
          keyExtractor={(item: any) => item?._id}
          style={{ flex: 1, marginTop: responsiveHeight(8) }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => {
            return (
              <Box flex={1} justifyContent='center' alignItems='center'>
                <Text fontSize={18} color={colors.gold} lineHeight={22} fontFamily='$poppinsSemiBold'>No Contest Found</Text>
              </Box>
            )
          }}
          contentContainerStyle={{ gap: responsiveWidth(5), marginHorizontal: responsiveWidth(4), flexGrow: 1 }}
        />
      )
      }
    </Container>
  )
}

export default MyMatches


{/* {
        selectedOption === 'live' ? (
          <FlatList
            data={['01', '02', '03', '04', '05', '06', '07', '08']}
            renderItem={({ item, index }: { item: any, index: number }) => <SportCard key={item} item={item} index={index} cardShadowColor={'#0984e3'} onPress={() => navigation.navigate(NavigationString.ContestList, { cardFrom: 'mylive' })} cardFrom={'mylive'} />}
            keyExtractor={(item: any) => item}
            style={{ flex: 1, marginTop: responsiveHeight(7) }}
            showsVerticalScrollIndicator={false}
            // ListHeaderComponent={() => {
            //   return (
            //     <Box h={moderateScale(140)} w={'100%'} borderRadius={10} overflow='hidden' my={5} alignSelf='center' >
            //       <Carousel style={{ width: '100%', height: '100%', alignSelf: 'center' }} showsControls={false} loop={true} autoplay={true} autoplayInterval={1500} activeDotStyle={{ width: responsiveWidth(2), height: responsiveHeight(1), backgroundColor: colors.themeRed, borderRadius: responsiveHeight(1) }} dotStyle={{ width: responsiveWidth(2), height: responsiveHeight(1), backgroundColor: colors.gray6, borderRadius: responsiveHeight(1) }} dotsContainerStyle={{ flexDirection: 'row', alignItems: 'center', gap: responsiveWidth(1.5), alignSelf: 'center', marginTop: responsiveHeight(-1) }}>
            //         {['1', '2', '3'].map(img => <Image alt='SilderIcon' source={{ uri: 'https://connect-assets.prosple.com/cdn/ff/b0dwUHpxcYI5Dogv6bws-fLXbK3PqUMrYV4kdVoFncE/1633950314/public/styles/scale_and_crop_center_890x320/public/2021-10/Banner-Dream11-1786x642-2021.jpg?itok=eRzMjlSe' }} key={img} w={'100%'} h={'90%'} resizeMode='cover' alignSelf='center' borderRadius={10} />)}
            //       </Carousel>
            //     </Box>
            //   )
            // }}
            contentContainerStyle={{ gap: responsiveWidth(5), marginHorizontal: responsiveWidth(4) }}
          />
        ) : selectedOption === 'upcoming' ? (
          <FlatList
            data={['01', '02', '03', '04', '05', '06', '07', '08']}
            renderItem={({ item, index }: { item: any, index: number }) => <SportCard key={item} item={item} index={index} cardShadowColor={'#74b9ff'} onPress={() => navigation.navigate(NavigationString.ContestList, { cardFrom: 'myupcoming' })} />}
            keyExtractor={(item: any) => item}
            style={{ flex: 1, marginTop: responsiveHeight(7) }}
            showsVerticalScrollIndicator={false}
            // ListHeaderComponent={() => {
            //   return (
            //     <Box h={moderateScale(140)} w={'100%'} borderRadius={10} overflow='hidden' my={5} alignSelf='center' >
            //       <Carousel style={{ width: '100%', height: '100%', alignSelf: 'center' }} showsControls={false} loop={true} autoplay={true} autoplayInterval={1500} activeDotStyle={{ width: responsiveWidth(2), height: responsiveHeight(1), backgroundColor: colors.themeRed, borderRadius: responsiveHeight(1) }} dotStyle={{ width: responsiveWidth(2), height: responsiveHeight(1), backgroundColor: colors.gray6, borderRadius: responsiveHeight(1) }} dotsContainerStyle={{ flexDirection: 'row', alignItems: 'center', gap: responsiveWidth(1.5), alignSelf: 'center', marginTop: responsiveHeight(-1) }}>
            //         {['1', '2', '3'].map(img => <Image alt='SilderIcon' source={{ uri: 'https://connect-assets.prosple.com/cdn/ff/b0dwUHpxcYI5Dogv6bws-fLXbK3PqUMrYV4kdVoFncE/1633950314/public/styles/scale_and_crop_center_890x320/public/2021-10/Banner-Dream11-1786x642-2021.jpg?itok=eRzMjlSe' }} key={img} w={'100%'} h={'90%'} resizeMode='cover' alignSelf='center' borderRadius={10} />)}
            //       </Carousel>
            //     </Box>
            //   )
            // }}
            contentContainerStyle={{ gap: responsiveWidth(5), marginHorizontal: responsiveWidth(4) }}
          />
        ) : (
          <FlatList
            data={['01', '02', '03', '04', '05', '06', '07', '08']}
            renderItem={({ item, index }: { item: any, index: number }) => <SportCard key={item} item={item} index={index} cardShadowColor={'#54a0ff'} onPress={() => navigation.navigate(NavigationString.ContestList, { cardFrom: 'mywinnings' })} cardFrom={'mywinnings'} />}
            keyExtractor={(item: any) => item}
            style={{ flex: 1, marginTop: responsiveHeight(7) }}
            showsVerticalScrollIndicator={false}
            // ListHeaderComponent={() => {
            //   return (
            //     <Box h={moderateScale(140)} w={'100%'} borderRadius={10} overflow='hidden' my={5} alignSelf='center' >
            //       <Carousel style={{ width: '100%', height: '100%', alignSelf: 'center' }} showsControls={false} loop={true} autoplay={true} autoplayInterval={1500} activeDotStyle={{ width: responsiveWidth(2), height: responsiveHeight(1), backgroundColor: colors.themeRed, borderRadius: responsiveHeight(1) }} dotStyle={{ width: responsiveWidth(2), height: responsiveHeight(1), backgroundColor: colors.gray6, borderRadius: responsiveHeight(1) }} dotsContainerStyle={{ flexDirection: 'row', alignItems: 'center', gap: responsiveWidth(1.5), alignSelf: 'center', marginTop: responsiveHeight(-1) }}>
            //         {['1', '2', '3'].map(img => <Image alt='SilderIcon' source={{ uri: 'https://connect-assets.prosple.com/cdn/ff/b0dwUHpxcYI5Dogv6bws-fLXbK3PqUMrYV4kdVoFncE/1633950314/public/styles/scale_and_crop_center_890x320/public/2021-10/Banner-Dream11-1786x642-2021.jpg?itok=eRzMjlSe' }} key={img} w={'100%'} h={'90%'} resizeMode='cover' alignSelf='center' borderRadius={10} />)}
            //       </Carousel>
            //     </Box>
            //   )
            // }}
            contentContainerStyle={{ gap: responsiveWidth(5), marginHorizontal: responsiveWidth(4) }}
          />
        )
      } */}