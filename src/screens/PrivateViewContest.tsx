import { Box, Pressable, CheckCircleIcon, CloseIcon, Icon, Image, Text, DownloadIcon, Spinner, Toast, ToastTitle, useToast } from '@gluestack-ui/themed'
import { Slider } from '@narodejesus/react-native-slider'
import { ParamListBase, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { NavigationString } from '../navigation/navigationStrings'
import { useEffect, useState } from 'react'

import { Container } from '../components/Container'
import { AppBar } from '../components/AppBar'
import { colors } from '../constants/colors'
import PrimaryButton from '../components/Button/PrimaryButton'
import { moderateScale, moderateScaleVertical } from '../utils/responsiveSize'
import { imgIcon } from '../assets/icons'
import { MLetterIcon, MyMatch15Icon, MyMatchYellowColorIcon, RupeeCircleIcon, SingleLetterIcon, WLetterIcon } from '../components/Icons'
import Body from '../components/Body/Body'
import { formatAmount, shadowStyle } from '../constants/constant'
import { Switch } from '@gluestack-ui/themed'
import Tooltip from 'rn-tooltip'
import { imagePaths } from '../assets/images'
import socketServices from '../utils/socketService'
import useGetPrivateContestDetailById from '../hooks/private/get-private-contest-details'
import useJoinPrivateContest from '../hooks/private/join-private-contest'
import Loader from '../components/Loader'

interface CONTEST {
  __v: number;
  _id: string;
  activeStatus: string;
  bids: any[];
  category: string;
  categoryDetails: {
    __v: number;
    _id: string;
    createdAt: string;
    duration: string;
    title: string;
    updatedAt: string;
  };
  createdAt: string;
  createdEntryFee: number;
  createdPrizePool: number;
  createdSlots: number;
  createdUpto: number;
  endDateTime: string;
  influencer: string;
  isApproved: boolean;
  isComplete: boolean;
  ranks: any[];
  startDateTime: string;
  totalbidAmount: number;
  updatedAt: string;
}

const PrivateViewContest = () => {
  // init
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute()
  const { flexible, cardFrom, contestId, isDeclare }: any = route.params
  const toast = useToast()

  // states
  const [selectLeaderBoard, setSelectLeaderBoard] = useState<string>('winnings')
  const [selectedFill, setSelectedFill] = useState('max')

  // api
  const { data, isLoading } = useGetPrivateContestDetailById({ contestId: contestId })
  const useJoinPrivateContestMutation = useJoinPrivateContest()

  const [winingData, setWiningData] = useState<any>()

  // console.log("contestId: ", contestId);

  useEffect(() => {
    socketServices.emit("private_contest_info", { privateContestId: contestId })
    socketServices.on('Get_private_contest_info', (data: any) => {
      console.log("================= get_private_contest_info ==================");
      console.log("data: ", data);
      setWiningData(data);
      // setSelectLeaderBoard(data?.data?.leaderboardType)
      // setSelectedFill(data?.data?.fillType)

    })

    return () => {
      socketServices.removeListener("Get_private_contest_info")
    }
  }, [])

  // console.log("winings: ", winingData);


  const handleJoinPrivateContest = () => {
    navigation.navigate(NavigationString.BookPrivateBids, { contestId: contestId })
    /* useJoinPrivateContestMutation.mutate({ contestId: contestId }, {
      onSuccess: (data) => {
        console.log("handleJoinPrivateContest: ", data?.data);
        if (data?.data?.success) {
          toast.show({
            placement: "bottom",
            render: ({ id }) => {
              const toastId = "toast-" + id
              return (
                <Toast nativeID={toastId} variant="accent" action='success'>
                  <ToastTitle>Join Successfully</ToastTitle>
                </Toast>
              );
            },
          })
          navigation.navigate(NavigationString.BookPrivateBids, { contestId: contestId })

        } else {
          toast.show({
            placement: "bottom",
            render: ({ id }) => {
              const toastId = "toast-" + id
              return (
                <Toast nativeID={toastId} variant="accent" action='error'>
                  <ToastTitle>{data?.data?.message}</ToastTitle>
                </Toast>
              );
            },
          })
          navigation.navigate(NavigationString.BookPrivateBids, { contestId: contestId })
        }
      }
    }) */
  }
  useEffect(() => {
    if (isDeclare) {
      setSelectLeaderBoard("leaderboard")
    }
  }, [isDeclare])


  if (isLoading) {
    return (
      <Container statusBarStyle='light-content' statusBarBackgroundColor={colors.themeRed} backgroundColor={colors.black}>
        <AppBar title='' back />
        <Box flex={1} backgroundColor='black' justifyContent='center' alignItems='center' >
          {/* <Spinner size={'large'} color={colors.gold} /> */}
          <Loader/>
        </Box>
      </Container>
    )
  }
  // console.log("data?.data?.maxPrizePool: ", data?.data);


  return (
    <Container statusBarStyle='light-content' statusBarBackgroundColor={colors.themeRed} backgroundColor={colors.black}>
      <AppBar title='Winning' back />
      <Body>
        <Box backgroundColor={colors.black} borderLeftWidth={1} borderRightWidth={1} borderColor={colors.gold} pt={10} gap={8} borderRadius={10} overflow="hidden">
          <Box flexDirection="row" alignItems="center" justifyContent='space-between' px={10}>
            <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.gold} numberOfLines={1}>Prize Pool</Text>
            {flexible === 'Yes' && (<Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.gold} numberOfLines={1}>Max Prize Pool</Text>)}
          </Box>

          <Box flexDirection="row" alignItems="center" justifyContent='space-between' px={10}>
            <Text fontFamily={'$robotoBold'} fontSize={20} lineHeight={22} color={colors.white} numberOfLines={1}>{'\u20B9'} {data?.data?.createdPrizePool}</Text>
            {flexible === 'Yes' && (<Text fontFamily={'$robotoBold'} fontSize={20} lineHeight={22} color={colors.white} numberOfLines={1}>{'\u20B9'} {formatAmount(winingData?.maxPrizePool)}</Text>)}

          </Box>
          <Slider
            minimumValue={0}
            maximumValue={data?.data?.createdSlots}
            maximumTrackTintColor={'#fdebeb'}
            minimumTrackTintColor={colors.gold}
            maximumTrackStyle={{ height: moderateScale(6) }}
            minimumTrackStyle={{ height: moderateScale(6) }}
            thumbTintColor="transparent"
            value={winingData?.slotFill}
            onValueChange={(value) => { }}
            containerStyle={{ height: moderateScale(12), marginHorizontal: moderateScale(10) }}
          />

          <Box flexDirection="row" alignItems="center" justifyContent='space-between' px={10}>
            <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.white} numberOfLines={1}>{data?.data?.createdSlots - winingData?.slotFill} spots left</Text>
            <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.gray4} numberOfLines={1} >{data?.data?.createdSlots} spots</Text>
          </Box>

          <PrimaryButton display={cardFrom === 'live' ? 'flex' : 'none'} buttonText={`Join ${'\u20B9'} ${formatAmount(Number(data?.data?.createdEntryFee))}`} onPress={handleJoinPrivateContest} loading={useJoinPrivateContestMutation?.isPending} disabled={useJoinPrivateContestMutation?.isPending} height={moderateScale(32)} backgroundColor={colors.greenText} marginHorizontal={moderateScale(10)} marginBottom={moderateScaleVertical(10)} />

          <Box flexDirection="row" alignItems="center" justifyContent='space-between' backgroundColor={colors.black} px={10} py={15}>
            <Box flexDirection="row" alignItems="center" gap={10}>
              <Tooltip actionType='press' withOverlay={false} backgroundColor={colors.themeBlue} height={moderateScale(30)} popover={<Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.white} numberOfLines={1} >First Prize = {'\u20B9'}{winingData?.maxFill[0]}</Text>}>
                <Box flexDirection="row" alignItems="center" gap={3}>
                  <Image alt="icon" source={imgIcon.prize1} w={moderateScale(15)} h={moderateScale(15)} resizeMode="contain" />
                  <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.gray4} numberOfLines={1} >{'\u20B9'}{formatAmount(winingData?.maxPrizePool)}</Text>
                </Box>
              </Tooltip>

              <Tooltip actionType='press' withOverlay={false} backgroundColor={colors.themeBlue} height={moderateScale(30)} width={moderateScale(170)} popover={<Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.white} numberOfLines={1} >7,516 teams win the contest</Text>}>
                <Box flexDirection="row" alignItems="center" gap={3}>
                  <MyMatch15Icon />
                  <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.gray4} numberOfLines={1} >{winingData?.winingPercentage}%</Text>
                </Box>
              </Tooltip>

              <Tooltip actionType='press' withOverlay={false} backgroundColor={colors.themeBlue} height={moderateScale(50)} width={moderateScale(170)} popover={<Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.white} numberOfLines={2} >Max 20 entries per user in this contest</Text>}>
                <Box flexDirection="row" alignItems="center" gap={3}>
                  {flexible ? <MLetterIcon /> : <SingleLetterIcon />}
                  <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.gray4} numberOfLines={1} >Upto {data?.data?.createdUpto}</Text>
                </Box>
              </Tooltip>

              {/* <Tooltip actionType='press' withOverlay={false} backgroundColor={colors.themeBlue} height={moderateScale(35)} width={moderateScale(260)} popover={<Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.white} numberOfLines={2} >You can use 4.3 cash bonus for every entry</Text>}>
                <Box flexDirection="row" alignItems="center" gap={3}>
                  <Image alt="icon" source={imgIcon.bCoin} w={moderateScale(12)} h={moderateScale(12)} alignSelf='baseline' resizeMode="contain" />
                  <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.gray4} numberOfLines={1} >Use 4.3</Text>
                </Box>
              </Tooltip> */}
            </Box>
            <Box flexDirection="row" alignItems="center" gap={5}>
              {flexible === 'Yes' ? <RupeeCircleIcon /> : <Icon as={CheckCircleIcon} w="$4" h="$4" color={colors.greenText} />}
              <Text fontFamily={'$robotoBold'} fontSize={12} lineHeight={14} color={colors.dimGray} numberOfLines={1} >{flexible === 'Yes' ? 'Flexible' : 'Guaranteed'}</Text>
            </Box>
          </Box>

        </Box>


        <Box flexDirection='row' alignItems='center' marginHorizontal={moderateScale(15)} gap={moderateScale(15)}>

          <Pressable onPress={() => { setSelectLeaderBoard('winnings') }} borderBottomWidth={selectLeaderBoard === 'winnings' ? 3 : 0} borderBottomColor={colors.gold} width={moderateScale(68)} >
            <Text fontFamily={selectLeaderBoard === 'winnings' ? '$robotoBold' : '$robotoMedium'} fontSize={16} lineHeight={18} color={selectLeaderBoard === 'winnings' ? colors.gold : colors.gray7} numberOfLines={1} py={10}>Winnings</Text>
          </Pressable>

          <Pressable display={(cardFrom === 'winnings') ? 'flex' : 'none'} onPress={() => { setSelectLeaderBoard('leaderboard') }} borderBottomWidth={selectLeaderBoard === 'leaderboard' ? 3 : 0} borderBottomColor={colors.themeRed} width={moderateScale(95)} >
            <Text fontFamily={selectLeaderBoard === 'leaderboard' ? '$robotoBold' : '$robotoMedium'} fontSize={16} lineHeight={18} color={selectLeaderBoard === 'leaderboard' ? colors.gold : colors.gray7} numberOfLines={1} py={10}>LeaderBoard</Text>
          </Pressable>

        </Box>


        {(
          <Box borderTopColor={colors.gold} py={15} px={15}>

            {selectLeaderBoard === 'leaderboard' ? <Box flexDirection='row' alignItems='center' justifyContent='space-between'>
              <Text fontFamily={'$robotoBold'} fontSize={12} lineHeight={14} color={colors.grayish} numberOfLines={1}>Bids Count : <Text fontFamily={'$robotoBold'} fontSize={12} lineHeight={14} color={colors.black} numberOfLines={1}>23</Text></Text>
              <Box flexDirection='row' alignItems='center' gap={5}>
                <MyMatchYellowColorIcon />
                <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={14} color={colors.gold} numberOfLines={1}>You have won {'\u20B9'} 200</Text>
              </Box>
            </Box>

              : (
                // <Text fontFamily={'$robotoBold'} fontSize={12} lineHeight={14} color={colors.grayish} numberOfLines={1}>'Be the first in your network to join this contest.'</Text>
                null

              )
            }

          </Box>)}

        <Box display={(flexible === 'Yes' && selectLeaderBoard === 'winnings') ? 'flex' : 'none'} flexDirection='row' alignItems='center' justifyContent='center' gap={10} paddingVertical={moderateScaleVertical(10)}  borderTopColor={colors.gold}>
          <Pressable onPress={() => setSelectedFill('max')} bgColor={selectedFill === 'max' ? '#2f3542' : colors.paleGray} w={moderateScale(110)} h={moderateScale(30)} alignItems='center' justifyContent='center' borderRadius={5}>
            <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={selectedFill === 'max' ? colors.white : '#2f3542'} numberOfLines={1}>Max Fill</Text>
          </Pressable>
          {selectLeaderBoard == "winnings" ? null : (<>

            <Pressable onPress={() => setSelectedFill('current')} bgColor={selectedFill === 'current' ? '#2f3542' : colors.paleGray} w={moderateScale(110)} h={moderateScale(30)}  borderTopColor={colors.gold} alignItems='center' justifyContent='center' borderRadius={5}>
              <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={selectedFill === 'current' ? colors.white : '#2f3542'} numberOfLines={1}>Current Fill</Text>
            </Pressable>
          </>)}
        </Box>

        <Box display={selectLeaderBoard === 'winnings' ? 'flex' : 'none'} >

          {selectedFill === 'max' && winingData?.maxFill?.map((item: any, ind: number) => {
            return (
              <Box key={ind} flexDirection='row' justifyContent='space-between' alignItems='center' py={moderateScale(10)} px={40} borderBottomColor={colors.paleGray}>
                <Text fontFamily='$robotoBold' fontSize={12} lineHeight={16} color={colors.dimGray} numberOfLines={1}># {ind + 1}</Text>
                <Text fontFamily='$robotoBold' fontSize={12} lineHeight={16} color={colors.dimGray} numberOfLines={1}>{'\u20B9'} {formatAmount(item)}</Text>
              </Box>
            )
          })}

          {selectedFill === 'current' && winingData?.currentFill?.map((item: any, ind: number) => {
            return (
              <Box key={ind} flexDirection='row' justifyContent='space-between' alignItems='center' py={moderateScale(10)} px={40} borderBottomWidth={1} borderBottomColor={colors.paleGray}>
                <Text fontFamily='$robotoBold' fontSize={12} lineHeight={16} color={colors.dimGray} numberOfLines={1}># {ind + 1}</Text>
                <Text fontFamily='$robotoBold' fontSize={12} lineHeight={16} color={colors.dimGray} numberOfLines={1}>{'\u20B9'} {formatAmount(item)}</Text>
              </Box>
            )
          })}
        </Box>

        <Box display={selectLeaderBoard === 'leaderboard' ? 'flex' : 'none'}>
          <Box flexDirection='row' alignItems='center' justifyContent='space-between' px={15} py={8} bgColor={colors.black}>
            <Box w={moderateScale(35)} h={moderateScale(35)} alignItems='center' justifyContent='center' bgColor={colors.white} borderRadius={moderateScale(8)} style={shadowStyle}>
              <Icon as={DownloadIcon} color={colors.gold} w="$6" h="$6" />
            </Box>

            <Box flexDirection='row' alignItems='center' gap={5}>
              <Text fontFamily='$robotoMedium' fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1}>My Friends</Text>
              <Switch size="md" sx={{
                _light: {
                  props: {
                    trackColor: {
                      false: "$backgroundLight300",
                      true: colors.white,
                    },
                  },
                },
              }} isDisabled={false} />
            </Box>
          </Box>

          <Box flexDirection="row" px={15} py={12} borderTopWidth={1} borderTopColor={colors.paleGray} bgColor={colors.black}>
            <Text fontFamily={'$robotoBold'} fontSize={12} lineHeight={14} color={colors.grayish} numberOfLines={1} flex={1} textAlign='left'>RANK</Text>
            <Text fontFamily={'$robotoBold'} fontSize={12} lineHeight={14} color={colors.grayish} numberOfLines={1} flex={1} textAlign='left'>NAME</Text>
            <Text fontFamily={'$robotoBold'} fontSize={12} lineHeight={14} color={colors.grayish} numberOfLines={1} flex={1} textAlign='center'>WON</Text>
            <Text fontFamily={'$robotoBold'} fontSize={12} lineHeight={14} color={colors.grayish} numberOfLines={1} flex={1} textAlign='right'>BID AMOUNT</Text>
          </Box>
        </Box>

        {selectLeaderBoard === 'leaderboard' &&
          winingData?.leaderBord && winingData?.leaderBord?.length > 0 && winingData?.leaderBord?.map((item: any, ind: number) => {
            return (
              <Box key={ind} flexDirection="row" alignItems="center" justifyContent='space-between' px={15} py={12}  borderBottomColor={colors.white} bgColor={item?.isInWiningRange ? colors?.black : colors.black} >
                <Text fontFamily={'$robotoBold'} fontSize={14} lineHeight={16} color={colors.gold} numberOfLines={1} flex={1} textAlign='left'>{item?.rank}</Text>
                <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} flex={1} textAlign='left'>{item?.userId?.name}</Text>
                <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.gold} numberOfLines={1} flex={1} textAlign='center'>{'\u20B9'} {Number(item?.WinningAmount)}</Text>
                <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} flex={1} textAlign='right'>{'\u20B9'} {item?.bid}</Text>
              </Box>
            )
          })
        }
        {/* {selectLeaderBoard === 'leaderboard' && <>
          {['1', '2', '3', '4', '5']?.map((item, index) => {
            return (
              <Box key={item} flexDirection="row" alignItems="center" justifyContent='space-between' px={15} py={12} borderBottomWidth={3} borderBottomColor={colors.white} bgColor={index === 2 || index === 0 ? '#fff9eb' : colors.gray10}>
                <Text fontFamily={'$robotoBold'} fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} flex={1} textAlign='left'>{item}</Text>
                <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} flex={1} textAlign='left'>champ{item}</Text>
                <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.greenText} numberOfLines={1} flex={1} textAlign='center'>{'\u20B9'} {(204 + Number(item))}</Text>
                <Text fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} flex={1} textAlign='right'>{'\u20B9'} 10</Text>
              </Box>
            )
          })}
        </>
        } */}

        <Box bgColor={colors.black} mx={15} h={moderateScale(45)} px={5} py={5} justifyContent='center' alignItems='center' borderRadius={6} my={moderateScaleVertical(15)}>
          <Text fontFamily='$robotoMedium' textAlign='center' fontSize={10} lineHeight={12} color={colors.grayish} numberOfLines={3}>As per the government regulations, starting 1st April 2023 a tax of 30% will be levied at the time of withdrawal or at the end of financial year on the net winnings.</Text>
        </Box>



      </Body>
    </Container >
  )
}

export default PrivateViewContest