import { useContext, useEffect, useState } from 'react';
import { Box, Pressable, Spinner, Text } from '@gluestack-ui/themed';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { FlatList } from 'react-native';

import { AppBar } from '../components/AppBar'
import { Container } from '../components/Container'
import { colors } from '../constants/colors'
import { NavigationString } from '../navigation/navigationStrings';
import SportCard from '../components/SportCard/SportCard';
import { shadowStyle } from '../constants/constant';
import { AuthContext } from '../utils/authContext';
import socketServices from '../utils/socketService';
import PrivateSportCard from '../components/SportCard/PrivateSpostCard';

const PrivateContest = () => {
  // init
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const authContext: any = useContext(AuthContext);

  // useStates
  const [selectedOption, setSelectedOption] = useState('upcoming');
  const [upcomingContest, setUpcomingContest] = useState([])
  const [liveContest, setliveContest] = useState([])
  const [winningContest, setWinningContest] = useState([])

  // console.log("authContext?.authState?.userId: ", authContext?.authState?.userId);


  useEffect(() => {
    const fetch = async () => {
      await emitContestCategory(authContext?.authState?.userId);

      // Listen to specific contest events
    }

    fetch()
    // if (selectedOption == 'live') {
    socketServices.on('private-live-category', (data: any) => {
      console.log('Received live contest data:', data);
      setliveContest(data)
      // setContestData(data); // Update state with the received data
    });

    // } else if (selectedOption == 'upcoming') {
    socketServices.on('private-upcoming-category', (data: any) => {
      console.log('Received upcoming contest data:', data);
      setUpcomingContest(data)
      // setContestData(data); // Update state with the received data
    });
    // } else if (selectedOption == 'winnings') {
    socketServices.on('private-expired-category', (data: any) => {
      console.log('Received expired contest data:', data);
      setWinningContest(data)
      // setContestData(data); // Update state with the received data
    });
    // }



    return () => {
      socketServices.removeListener('mprivate-live-category')
      socketServices.removeListener('private-upcoming-category')
      socketServices.removeListener('private-expired-category')
    }
  }, [])
  // console.log("authContext?.authState?.userId: ", authContext?.authState?.userId);


  const emitContestCategory = (userId: string) => {
    // console.log('Emitting my-contestcategory event with userId:', userId);
    socketServices.emit('get-privatecategory', { userId: userId });
  };


  // if (!(contests?.expiredContests?.length > 0)) {
  //   return (
  //     <Container statusBarStyle='light-content' statusBarBackgroundColor={colors.themeRed}>
  //       <AppBar title='Private Contest' />
  //       <Box flex={1} justifyContent='center' alignItems='center' >
  //         <Spinner size={'large'} color={colors.themeRed} />
  //       </Box>
  //     </Container>
  //   )
  // }

  // console.log("=============================== live ===========================================");
  // console.log("liveContest: ", liveContest);

  // if (!(upcomingContest.length || liveContest.length || winningContest.length)) {
  //   return (
  //     <Container statusBarStyle='light-content' statusBarBackgroundColor={colors.themeRed} backgroundColor='black'>
  //       <AppBar title='Private Contest' />
  //       <Box flexDirection='row' alignItems='center' alignSelf='center' bgColor='black' style={shadowStyle}>
  //         <Pressable onPress={() => navigation.navigate(NavigationString.CreatePrivateContest)} flex={1} alignItems='center'>
  //           <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.gold} numberOfLines={1} py={10}>Create Contest</Text>
  //         </Pressable>

  //         <Pressable onPress={() => navigation.navigate(NavigationString.JoinPrivateContest)} flex={1} alignItems='center'>
  //           <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.gold} numberOfLines={1} py={10}>Join Contest</Text>
  //         </Pressable>

  //         {/* <Pressable onPress={() => navigation.navigate(NavigationString.PrivateContestParticipate)} flex={1} alignItems='center'>
  //         <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} py={10}>Participants</Text>
  //       </Pressable> */}


  //       </Box >
  //       <Box flex={1} justifyContent='center' alignItems='center' >
  //         <Spinner size={'large'} color={colors.themeRed} />
  //       </Box>
  //     </Container >
  //   )
  // }


  return (
    <Container statusBarStyle='light-content' backgroundColor='black' statusBarBackgroundColor={colors.themeRed}>
      <AppBar title='Private Contest' />
      <Box flexDirection='row' alignItems='center' alignSelf='center' bgColor='#ffffff' backgroundColor='black' style={shadowStyle}>
        <Pressable onPress={() => navigation.navigate(NavigationString.CreatePrivateContest)} flex={1} alignItems='center'>
          <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} py={10}>Create Contest</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate(NavigationString.JoinPrivateContest)} flex={1} alignItems='center'>
          <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} py={10}>Join Contest</Text>
        </Pressable>

        {/* <Pressable onPress={() => navigation.navigate(NavigationString.PrivateContestParticipate)} flex={1} alignItems='center'>
          <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} py={10}>Participants</Text>
        </Pressable> */}
      </Box>

      <Box flexDirection='row' alignItems='center' gap={10} px={15} bgColor={colors.black} borderTopLeftRadius={10} borderTopRightRadius={10}>
        <Pressable onPress={() => setSelectedOption('upcoming')} flex={1}>
          <Box alignItems='center' justifyContent='center' py={15} borderBottomWidth={selectedOption === 'upcoming' ? 3 : 0} borderBottomColor={colors.gold}>
            <Text fontFamily={selectedOption === 'upcoming' ? '$poppinsSemiBold' : '$poppinsMedium'} fontSize={14} lineHeight={16} color={selectedOption === 'upcoming' ? colors.gold : colors.gray6} numberOfLines={1} >Upcoming</Text>
          </Box>
        </Pressable >

        <Pressable onPress={() => setSelectedOption('live')} flex={1} >
          <Box alignItems='center' justifyContent='center' py={15} borderBottomWidth={selectedOption === 'live' ? 3 : 0} borderBottomColor={colors.gold}>
            <Text fontFamily={selectedOption === 'live' ? '$poppinsSemiBold' : '$poppinsMedium'} fontSize={14} lineHeight={16} color={selectedOption === 'live' ? colors.gold : colors.gray6} numberOfLines={1} >Live</Text>
          </Box>
        </Pressable >

        <Pressable onPress={() => setSelectedOption('winnings ')} flex={1} >
          <Box alignItems='center' justifyContent='center' py={15} borderBottomWidth={selectedOption === 'winnings ' ? 3 : 0} borderBottomColor={colors.gold}>
            <Text fontFamily={selectedOption === 'winnings ' ? '$poppinsSemiBold' : '$poppinsMedium'} fontSize={14} lineHeight={16} color={selectedOption === 'winnings ' ? colors.gold : colors.gray6} numberOfLines={1} >Winnings </Text>
          </Box>
        </Pressable >
      </Box>
      {/* navigation.navigate(NavigationString.ContestList, { cardFrom: 'privatelive' } */}
      {
        selectedOption === 'live' ? (
          <FlatList
            data={liveContest?.length > 0 ? liveContest : []}
            renderItem={({ item, index }: { item: any, index: number }) => <PrivateSportCard key={item?._id} item={item} index={index} cardShadowColor={'#10ac84'} onPress={() => {
              socketServices.emit('get-private-contest-by-category', {
                userId: authContext?.authState?.userId,
                categoryId: item?.category,
              });
              navigation.navigate(NavigationString.PrivateContestList, { cardFrom: 'live', contestsData: item?.contests, categoryId: item?.category, categoryName: item?.categoryName })
            }} cardFrom={'live'} />}
            keyExtractor={(item: any) => item?._id}
            style={{ flex: 1, marginTop: responsiveHeight(1.5) }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => {
              return (
                <Box flex={1} justifyContent='center' alignItems='center'>
                  <Text fontSize={18} color={colors.black} lineHeight={22} fontFamily='$poppinsSemiBold'>No Contest Found</Text>
                </Box>
              )
            }}
            contentContainerStyle={{ gap: responsiveWidth(5), marginHorizontal: responsiveWidth(4), flexGrow: 1 }}
          />
        ) : selectedOption === 'upcoming' ? (
          <FlatList
            data={upcomingContest?.length > 0 ? upcomingContest : []}
            renderItem={({ item, index }: { item: any, index: number }) => <PrivateSportCard key={item?._id} item={item} index={index} cardShadowColor={'#1dd1a1'} onPress={() => {
              socketServices.emit('get-private-contest-by-category', {
                userId: authContext?.authState?.userId,
                categoryId: item?._id,
              });
              navigation.navigate(NavigationString.PrivateContestList, { cardFrom: 'upcoming', contestsData: item?.contests, categoryId: item?.category, categoryName: item?.categoryName })
            }} cardFrom={'upcoming'} />}
            keyExtractor={(item: any) => item?._id}
            style={{ flex: 1, marginTop: responsiveHeight(1.5) }}
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
            data={winningContest?.length > 0 ? winningContest : []}
            renderItem={({ item, index }: { item: any, index: number }) => <PrivateSportCard key={index} item={item} index={index} cardShadowColor={'#55efc4'} onPress={() => {
              socketServices.emit('get-private-contest-by-category', {
                userId: authContext?.authState?.userId,
                categoryId: item?._id,
              });
              navigation.navigate(NavigationString.PrivateContestList, { cardFrom: 'winnings', contestsData: item?.contests?.reverse(), categoryId: item?.category, categoryName: item?.categoryName })
            }} cardFrom={'winnings'} />}
            keyExtractor={(item: any) => item?._id}
            style={{ flex: 1, marginTop: responsiveHeight(1.5) }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => {
              return (
                <Box flex={1} justifyContent='center' alignItems='center'>
                  <Text fontSize={18} color={colors.black} lineHeight={22} fontFamily='$poppinsSemiBold'>No Contest Found</Text>
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

export default PrivateContest