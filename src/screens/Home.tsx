import React, { useContext, useEffect, useState } from 'react';
import { Linking } from 'react-native';

import {
  AvatarImage,
  BellIcon,
  Box,
  FlatList,
  Icon,
  Pressable,
  Spinner,
  Text,
} from '@gluestack-ui/themed';
import { Image } from '@gluestack-ui/themed';
import {
  ParamListBase,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Carousel from 'pinar';

import { Container } from '../components/Container';
import { colors } from '../constants/colors';
import { moderateScale, moderateScaleVertical } from '../utils/responsiveSize';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { HamburgerIcon, WalletIcon, WinnerIcon } from '../components/Icons';
import SportCard from '../components/SportCard/SportCard';
import { NavigationString } from '../navigation/navigationStrings';
import { imagePaths } from '../assets/images';

import { GET_ALL_CATEGORY_HOME } from '../types/home/response-type';
import useGetAllCategory from '../hooks/home/get-all-category';
import HomeSportCard from '../components/SportCard/HomeSportCard';
import { AuthContext } from '../utils/authContext';
import socketServices from '../utils/socketService';
import { TouchableOpacity } from 'react-native';
import { getMessaging } from '@react-native-firebase/messaging';
import { SwipeGesture } from 'react-native-swipe-gesture-handler';
import { Alert } from 'react-native';
import { BackHandler } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import useGetUserWalletInfo from '../hooks/auth/get-user-wallet-info';
import Loader from '../components/Loader';

interface GET_CATEGORY {
  _id: string;
  title: string;
  duration: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  status: string;
}

const Home = () => {
  // init
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { authContext, userInfo }: any = useContext(AuthContext);
  const { data: walletInfoData, isLoading, isLoading: walletInfoIsLoading, } = useGetUserWalletInfo();
  const [load, setLoad] = useState<boolean>();
  // states
  const [selectedOption, setSelectedOption] = useState('live');
  const [contests, setContests] = useState({
    _id: '',
    live: [],
    upcoming: [],
    wining: [],
  });
  const [banner, setBanner] = useState([])

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        // Alert message (optional)

        return true; // Prevent back action
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, []),
  );

  useEffect(() => {
    socketServices.on('get-main-contest-data', (data: any) => {
      // console.log(" ============================= useEffect ============================= ");
      // console.log("data: ", data?.contest);
      setContests(prevContests => ({
        ...prevContests,
        ...data[0],
      }));
    });

    socketServices.on('get-main-contest-banner', (data: any) => {
      setBanner(data);
    });

    return () => {
      socketServices.removeListener('get-main-contest-data');
      socketServices.removeListener('get-main-contest-banner');
    };
  }, []);

  // if any of the contest length will be than loading will be off
  if (!(contests?.live.length || contests.upcoming.length || contests.wining.length)) {
    return (
      <>
        <Container statusBarStyle="light-content" statusBarBackgroundColor={colors.black} backgroundColor="black">
          <Box flexDirection="row" alignItems="center" justifyContent="space-between" px={moderateScale(20)} h={moderateScale(70)}>
            <Box flexDirection="row" alignItems="center" gap={10}>
              <Pressable onPress={() => navigation.navigate(NavigationString.Setting)}>
                <Box h={moderateScale(35)} w={moderateScale(35)} borderRadius={moderateScale(40)}>
                  <AvatarImage source={{ uri: userInfo?.profile ? userInfo?.profile : 'https://cdn-icons-png.flaticon.com/512/219/219988.png', }} alt="profile image" />
                </Box>
                <Box position="absolute" bgColor="black" alignItems="center" justifyContent="center" borderRadius={10} w={moderateScale(20)} h={moderateScale(20)} bottom={0} left={0} ml={-6} mt={10}>
                  <HamburgerIcon />
                </Box>
              </Pressable>
              <Text fontFamily={'$poppinsSemiBold'} fontSize={16} lineHeight={18} color={colors.white} numberOfLines={1}>WonByBid</Text>
            </Box>
            <Box></Box>
            <Box flexDirection="row" alignItems="center" gap={moderateScale(10)}>
              <Pressable onPress={() => navigation.navigate(NavigationString.Notification)} android_ripple={{ color: 'rgba(255, 215, 0, 0.4)', borderless: false, }}>
                <Box flexDirection="row" alignItems="center" py={8} px={7} borderRadius={10} gap={10}>
                  <Icon as={BellIcon} color={colors.white} w="$5" h="$5" />
                </Box>
              </Pressable>
              <Pressable onPress={() => navigation.navigate(NavigationString.Winners)}>
                <Box flexDirection="row" alignItems="center" py={8} px={7} borderRadius={10} gap={10}>
                  <WinnerIcon />
                </Box>
              </Pressable>
              <Pressable onPress={() => navigation.navigate(NavigationString.MyWallet)}>
                <Box flexDirection="row" alignItems="center" py={8} px={7} borderRadius={10} gap={10}>
                  <WalletIcon />
                  <Text fontFamily={'$poppinsMedium'} fontSize={12} lineHeight={16} color={colors.white} numberOfLines={1}>{'₹'}{' '}{walletInfoData?.data?.newBalance?.balance.toFixed(2) ?? '0'}</Text>
                </Box>
              </Pressable>
            </Box>
          </Box>
          <Box flex={1} justifyContent="center " alignItems="center">
            <Loader />
          </Box>
        </Container>
      </>
    );
  }
  // console.log("selectedOption: ", selectedOption);
  // swaping function
  const onSwipePerformed = (action: any) => {
    console.log(
      '================================= action =================================',
    );
    console.log('action: ', action);
    switch (action) {
      case 'left': {
        setSelectedOption('upcoming');
        console.log('left Swipe performed', action);
        break;
      }
      case 'right': {
        setSelectedOption('live');
        console.log('right Swipe performed');
        break;
      }
      /* case 'up': {
        console.log('up Swipe performed');
        break;
      }
      case 'down': {
        console.log('down Swipe performed');
        break;
      } */
      default: {
        console.log('Undeteceted action');
      }
    }
  };

  // console.log("banner: ", banner);


  return (
    <>
      <Container statusBarStyle="light-content" statusBarBackgroundColor={colors.black}>
        <LinearGradient colors={[colors.black, colors.black]} locations={[0.65, 1]} useAngle angle={215} angleCenter={{ x: -0.2, y: 0.1 }} style={{ flex: 1 }}>
          <Box flexDirection="row" alignItems="center" justifyContent="space-between" px={moderateScale(20)} h={moderateScale(70)}>
            <Box flexDirection="row" alignItems="center" gap={10}>
              <Pressable onPress={() => navigation.navigate(NavigationString.Setting)}>
                <Box h={moderateScale(35)} w={moderateScale(35)} borderRadius={moderateScale(40)}>
                  {/* <Image alt='icon' source={imagePaths.userIcon} h={'100%'} w={'100%'} resizeMode='contain' /> */}
                  <AvatarImage source={{ uri: userInfo?.profile ? userInfo?.profile : 'https://cdn-icons-png.flaticon.com/512/219/219988.png', }} alt="profile image" />
                </Box>
                <Box position="absolute" alignItems="center" justifyContent="center" borderRadius={10} w={moderateScale(20)} h={moderateScale(20)} bottom={0} left={0} ml={-6} mt={10}>
                  <HamburgerIcon />
                </Box>
              </Pressable>

              <Text fontFamily={'$poppinsSemiBold'} fontSize={16} lineHeight={18} color={colors.gold} numberOfLines={1}>WonByBid</Text>
            </Box>

            <Box flexDirection="row" alignItems="center" gap={moderateScale(10)}>
              <Pressable onPress={() => navigation.navigate(NavigationString.Notification)}>
                <Box flexDirection="row" alignItems="center" py={8} px={7} borderRadius={10} gap={10}>
                  <Icon as={BellIcon} color={colors.white} w="$5" h="$5" />
                </Box>
              </Pressable>

              <Pressable onPress={() => navigation.navigate(NavigationString.Winners)}>
                <Box flexDirection="row" alignItems="center" py={8} px={7} borderRadius={10} gap={10}><WinnerIcon /></Box>
              </Pressable>
              <Pressable onPress={() => navigation.navigate(NavigationString.MyWallet)}>
                <Box flexDirection="row" alignItems="center" py={8} px={7} borderRadius={10} gap={10}>
                  <WalletIcon />
                  <Text fontFamily={'$poppinsMedium'} fontSize={12} lineHeight={16} color={colors.white} numberOfLines={1}>{'₹'}{' '}{walletInfoData?.data?.newBalance?.balance.toFixed(2) ?? '0'}</Text>
                </Box>
              </Pressable>
            </Box>
          </Box>
          {/* ================================= topbar bottom =================================== */}
          {/* <SwipeGesture onSwipePerformed={onSwipePerformed} > */}
          <Box flexDirection="row" alignItems="center" gap={10} px={moderateScale(15)} bgColor={colors.black} borderTopLeftRadius={10} borderTopRightRadius={10}>
            <Pressable onPress={() => setSelectedOption('upcoming')} flex={1}>
              <Box alignItems="center" justifyContent="center" py={15} borderBottomWidth={selectedOption === 'upcoming' ? 3 : 0} borderBottomColor={colors.gold}>
                <Text fontFamily={selectedOption === 'upcoming' ? '$poppinsSemiBold' : '$poppinsMedium'} fontSize={14} lineHeight={16} color={selectedOption === 'upcoming' ? colors.gold : colors.white} numberOfLines={1}>Upcomings</Text>
              </Box>
            </Pressable>

            <Pressable onPress={() => setSelectedOption('live')} flex={1}>
              <Box alignItems="center" justifyContent="center" py={15} borderBottomWidth={selectedOption === 'live' ? 3 : 0} borderBottomColor={colors.gold}>
                <Text fontFamily={selectedOption === 'live' ? '$poppinsSemiBold' : '$poppinsMedium'} fontSize={14} lineHeight={16} color={selectedOption === 'live' ? colors.gold : colors.white} numberOfLines={1}>Live</Text>
              </Box>
            </Pressable>
            <Pressable onPress={() => setSelectedOption('winnings')} flex={1}>
              <Box alignItems="center" justifyContent="center" py={15} borderBottomWidth={selectedOption === 'winnings' ? 3 : 0} borderBottomColor={colors.gold}>
                <Text fontFamily={selectedOption === 'winnings' ? '$poppinsSemiBold' : '$poppinsMedium'} fontSize={14} lineHeight={16} color={selectedOption === 'winnings' ? colors.gold : colors.white} numberOfLines={1}>Winnings{' '}</Text>
              </Box>
            </Pressable>
          </Box>

          {/* =================================== banner carousel =================================== */}
          <Box h={180} w={'94%'} borderRadius={10} my={moderateScaleVertical(15)} alignSelf="center" overflow="hidden">
            {/* <Carousel style={{ width: '100%', height: '100%', alignSelf: 'center', borderWidth: 0.5, borderRadius: 14, borderStyle: 'dashed', }} showsControls={false} loop={true} autoplay={true} autoplayInterval={1500}> */}
            <Carousel
              key={banner?.map(b => b._id).join(',')} // 👈 force re-render on data change
              style={{
                width: '100%',
                height: '100%',
                alignSelf: 'center',
                borderWidth: 0.5,
                borderRadius: 14,
                borderStyle: 'dashed',
              }}
              showsControls={false}
              loop={true}
              autoplay={true}
              autoplayInterval={1500}
            >
              {banner?.map((el: any) => (
                <Pressable key={el?._id} onPress={() => {
                  if ((el?.url?.startsWith('http://') || el?.url?.startsWith('https://')) && !el.isEnternalRoute && el.url?.trim()) {
                    Linking.openURL(el.url).catch(err => console.error('Failed to open URL:', err),);
                  } else if (el?.enternalRoute?.trim()) {
                    if (el.enternalRoute == "TopRefers") {
                      navigation?.navigate(NavigationString.Winners, { cardFrom: 'TopRefers' })
                      return
                    }
                    if (el.enternalRoute == "ReferEarnScreen") {
                      navigation.navigate(NavigationString.ReferEarn)
                      return
                    }
                    navigation?.navigate(el.enternalRoute)
                  }
                }}>
                  {el?.imageUrl && <Image alt="SliderIcon" source={{ uri: el.imageUrl }} w="99%" h="100%" resizeMode="cover" borderRadius={14} />}
                </Pressable>
              ))}
            </Carousel>
          </Box>

          {/* =================================== card component =================================== */}

          {selectedOption === 'live' ? (
            <FlatList
              // live flat list
              data={contests?.live?.length > 0 ? contests?.live : []}
              renderItem={({ item, index }: { item: any; index: number }) => (
                <HomeSportCard key={index} item={item} index={index} cardShadowColor={colors.deepPurple}
                  onPress={() => {
                    socketServices.emit('Join_Category', { joinCategoryId: item?._id, categoryStatus: 'live', });
                    // console.log("================================================== onPress ==================================================");
                    navigation.navigate(NavigationString.HomeContestList, { cardFrom: 'live', categoryName: item?.title, itemId: item?._id, });
                  }}
                  cardFrom={'live'}
                />
              )}
              keyExtractor={(item: any) => item?._id}
              style={{ flex: 1, marginTop: responsiveHeight(1.5) }}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={() => {
                return (
                  <Box flex={1} justifyContent="center" alignItems="center">
                    <Text fontSize={18} color={colors.gold} lineHeight={22} fontFamily="$poppinsSemiBold">No Contest Found</Text>
                  </Box>
                );
              }}
              contentContainerStyle={{
                gap: responsiveWidth(5),
                marginHorizontal: responsiveWidth(4),
                flexGrow: 1,
              }}
            />
          ) : selectedOption === 'upcoming' ? (
            <FlatList data={contests?.upcoming?.length > 0 ? contests?.upcoming : []} renderItem={({ item, index }: { item: any; index: number }) => (
              <HomeSportCard key={item?._id} item={item} index={index} cardShadowColor={'#ff4757'}
                onPress={() => {
                  socketServices.emit('Join_Category', {
                    joinCategoryId: item?._id,
                    categoryStatus: 'upcoming',
                  });
                  navigation.navigate(NavigationString.HomeContestList, {
                    cardFrom: 'upcoming',
                    categoryName: item?.title,
                    itemId: item?._id,
                  });
                }}
                cardFrom={'upcoming'}
              />
            )}
              keyExtractor={(item: any) => item?._id}
              style={{ flex: 1, marginTop: responsiveHeight(1.5) }}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={() => {
                return (
                  <Box flex={1} justifyContent="center" alignItems="center">
                    <Text fontSize={18} color={colors.gold} lineHeight={22} fontFamily="$poppinsSemiBold">No Contest Found</Text>
                  </Box>
                );
              }}
              contentContainerStyle={{
                gap: responsiveWidth(4),
                marginHorizontal: responsiveWidth(4),
                flexGrow: 1,
              }}
            />
          ) : (
            <FlatList data={contests?.wining?.length > 0 ? contests?.wining : []} renderItem={({ item, index }: { item: any; index: number }) => (
              <HomeSportCard key={item} item={item} index={index}
                onPress={() => {
                  socketServices.emit('Join_Category', {
                    joinCategoryId: item?._id,
                    categoryStatus: 'wining',
                  });
                  navigation.navigate(NavigationString.HomeContestList, {
                    cardFrom: 'wining',
                    categoryName: item?.title,
                    itemId: item?._id,
                  });
                }}
                cardFrom={'winnings'}
              />
            )}
              keyExtractor={(item: any) => item?._id}
              style={{ marginTop: responsiveHeight(1.5) }}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={() => {
                return (
                  <Box flex={1} justifyContent="center" alignItems="center">
                    <Text fontSize={18} color={colors.gold} lineHeight={22} fontFamily="$poppinsSemiBold">No Contest Found</Text>
                  </Box>
                );
              }}
              contentContainerStyle={{
                gap: responsiveWidth(5),
                marginHorizontal: responsiveWidth(4),
                flexGrow: 1,
              }}
            />
          )}
        </LinearGradient>
      </Container>
    </>
  );
};

export default Home;
