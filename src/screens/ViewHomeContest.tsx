import { Box, Pressable, CheckCircleIcon, CloseIcon, Icon, Image, Text, DownloadIcon, useToast, Toast, ToastTitle, Spinner, ShareIcon } from '@gluestack-ui/themed'
import { Slider } from '@narodejesus/react-native-slider'
import { ParamListBase, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { NavigationString } from '../navigation/navigationStrings'
import { useCallback, useContext, useEffect, useState } from 'react'
import { Container } from '../components/Container'
import { AppBar } from '../components/AppBar'
import { colors } from '../constants/colors'
import PrimaryButton from '../components/Button/PrimaryButton'
import { moderateScale, moderateScaleVertical } from '../utils/responsiveSize'
import { imgIcon } from '../assets/icons'
import { MLetterIcon, MyMatch15Icon, MyMatchYellowColorIcon, RupeeCircleGreenIcon, RupeeCircleIcon, SingleLetterIcon, WLetterIcon } from '../components/Icons'
import Body from '../components/Body/Body'
import { deviceHeight, formatAmount, shadowStyle } from '../constants/constant'
import { Switch } from '@gluestack-ui/themed'
import Tooltip from 'rn-tooltip'
import { imagePaths } from '../assets/images'
import useGetSignleContestDetailHome from '../hooks/home/get-single-contest-detail-home'
import useGetCheckAlreadyJoin from '../hooks/home/get-check-already-join'
import useJoinContestHome from '../hooks/home/join-contest-home'
import socketServices from '../utils/socketService'
import { AuthContext } from '../utils/authContext'
import { Modal, ScrollView, TouchableOpacity } from 'react-native'
import { format } from 'date-fns'
import CardTimer from '../utils/CardTimer'
import Loader from '../components/Loader'

const ViewHomeContest = () => {
  // init
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute()
  const toast = useToast()
  const authContext: any = useContext(AuthContext);
  const { flexible, cardFrom, contestId, slotId, isUserJoinContest, isDeclare }: any = route.params

  // console.log("=========================================== route.params: viewhomecontest 
  // ===============================================================");
  // console.log("route.params: ", route);



  // states
  const [selectLeaderBoard, setSelectLeaderBoard] = useState<string>('wining')
  const [selectedFill, setSelectedFill] = useState('max')
  // const [contestStateData, setContestStateData] = useState([])

  const [slotTimes, setSlotTimes] = useState([])
  const [slotTimeLoading, setSlotTimeLoading] = useState(false)
  const [timeSlot, setTimeSlot] = useState(false)
  const [selectedTime, setSelectedTime] = useState(contestData?.data?.data?.timeSlots || "")
  console.log("Join Scree.........",{ contestId: contestId, timeslotId: slotId })
  const [ranksArray, setRanksArray] = useState([])
  const [loading, setLoading] = useState(false)  // api
  const { data: contestData, isLoading: contestIsLoading, refetch } = useGetSignleContestDetailHome({ contestId: contestId, timeslotId: slotId })
  // const { data: checkAlreadyJoinData, isLoading: checkAlreadyJoinDataIsLoading } = useGetCheckAlreadyJoin({ contestId: contestId, timeslotId: slotId })
  const useJoinContestHomeMutation = useJoinContestHome()
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        await refetch();
      };
      fetchData();
  
      return () => {
        // Cleanup logic (if needed)
      };
    }, [])
  );

  useEffect(() => {
    // Define the handler function for the leaderboard
    const handleWinningLeaderBoard = (data: any) => {
      setRanksArray(data?.slotHistory?.userranks);
      setSlotTimes(data?.contest?.timeSlots);
    };
  
    // Clean up any previous listeners to avoid duplication
    socketServices.removeListener("getWiningLeaderBord");
    socketServices.removeListener("postWiningLeaderBord");

    // Register the socket event listener
    socketServices.on("getWiningLeaderBord", handleWinningLeaderBoard);
  
    // Emit the event to fetch data when required
    if (contestId || selectedTime) {
      socketServices.emit("postWiningLeaderBord", {
        contestId: contestId,
        timeSlotId: selectedTime ? selectedTime._id : slotId,
      });
    }
  
    // Cleanup: Remove the specific listener when the component unmounts
    return () => {
      socketServices.removeListener("getWiningLeaderBord");
      socketServices.removeListener("postWiningLeaderBord");
      setLoading(false);
    };
  }, [contestId, selectedTime]);
  
  
  


  // let fillSlotNo = contestData?.data?.data?.history?.slotsFill?.length
  // const slots = Number(contestData?.data?.data?.slots) || 0;
  // const fillSlotNoValue = Number(fillSlotNo) || 0;

  // console.log("slots: ", slots);
  // console.log("fillSlotNo: ", fillSlotNoValue);

  // console.log("contestData?.data?.data?.slots: ", contestData?.data?.data);

  useEffect(() => {
    if (isDeclare) {
      setSelectLeaderBoard("leaderboard")
    }
  }, [isDeclare])

  function getRangeLength(rangeStr:string) {
  const [start, end] = rangeStr.split('-').map(Number);
  return end - start; // exclusive of 'end'
}

// Example usage:



  const hanldeJoinContest = () => {
    navigation.navigate(NavigationString.BookHomeBids, { contestId: contestId, slotId: slotId, maxPrice: formatAmount(contestData?.data?.data?.prizeDistributionAmount) })
    /* useJoinContestHomeMutation.mutate({ contestId: contestId, timeslotId: slotId }, {
      onSuccess: (data) => {
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
          socketServices.emit('get-winninguser', {
            userId: authContext?.authState?.userId,
            contestId: contestId,
            timeSlotId: slotId
          });
          navigation.navigate(NavigationString.BookHomeBids, { contestId: contestId, slotId: slotId })

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
        }
      }
    }) */
    // navigation.navigate(NavigationString.BookHomeBids, { contestId: contestId, slotId: slotId })

  }

  if (contestIsLoading) {
    // console.log("loading.....");

    return (
      <Container backgroundColor='black' statusBarStyle='light-content' statusBarBackgroundColor={colors.themeRed}>
        <AppBar title='' back />
        <Box flex={1} backgroundColor='black' justifyContent='center' alignItems='center' >
          {/* <Spinner size={'large'} color={colors.gold} /> */}
          <Loader/>
        </Box>
      </Container>
    )
  }

  // console.log("contestData?.data?.data?.history?.slotsFill?.length: ", contestData?.data?.data?.slots - contestData?.data?.data?.slotFillCount);
  // console.log("contestData?.data?.data?.slots - contestData?.data?.data?.slotFillCount: ", contestData?.data?.data?.slots - contestData?.data?.data?.slotFillCount);

// console.log(contestData?.data?.data?.prizeDistributionPercentage)

  return (
    <Container statusBarStyle='light-content' statusBarBackgroundColor={colors.themeRed} backgroundColor={colors.black}>
      <AppBar  title={contestData?.data?.data?.subcategoryId?.name ? contestData?.data?.data?.subcategoryId?.name : ''} back />
      <Body>
        <Box backgroundColor={colors.black} width={"95%"} alignSelf='center' marginTop={10} marginBottom={10} borderRightWidth={1} borderLeftWidth={1} borderEndEndRadius={10} borderColor={colors.paleGray} pt={10} gap={8} borderRadius={10} overflow="hidden">
          <Box flexDirection="row" alignItems="center" justifyContent='space-between' px={10}>
            <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.gold} numberOfLines={1}>Prize Pool</Text>
            {flexible === 'Yes' && (<Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.gold} numberOfLines={1}>Max Prize Pool</Text>)}
          </Box>

          {/* {cardFrom === 'live' && <>
                                      <CardTimer endTime={contestData?.timeSlots?.endTime} color={colors.red} startTime={contestData?.timeSlots?.startTime} />
                                    </>} */}

          <Box flexDirection="row" alignItems="center" justifyContent='space-between' px={10}>
            <Text fontFamily={'$robotoBold'} fontSize={20} lineHeight={22} color={colors.white} numberOfLines={1}>{'\u20B9'} {formatAmount(((contestData?.data?.data?.slotFillCount*contestData?.data?.data?.entryAmount)*(contestData?.data?.data?.prizeDistributionPercentage/100)) ?? 0)}</Text>
            {flexible === 'Yes' && (<Text fontFamily={'$robotoBold'} fontSize={20} lineHeight={22} color={colors.white} numberOfLines={1}>{'\u20B9'} {formatAmount(contestData?.data?.data?.prizeDistributionAmount)}</Text>)}
          </Box>


          <Slider
            minimumValue={0}
            // maximumValue={contestData?.data?.data?.slots}
            maximumValue={contestData?.data?.data?.slots}
            maximumTrackTintColor={'#fdebeb'}
            minimumTrackTintColor={colors.gold}
            maximumTrackStyle={{ height: moderateScale(6) }}
            minimumTrackStyle={{ height: moderateScale(6) }}
            thumbTintColor="transparent"
            value={contestData?.data?.data?.slotFillCount}
            onValueChange={(value) => { }}
            containerStyle={{ height: moderateScale(12), marginHorizontal: moderateScale(10) }}
          />

          <Box flexDirection="row" alignItems="center" justifyContent='space-between' px={10}>
            <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.white} numberOfLines={1}>{contestData?.data?.data?.slots - contestData?.data?.data?.slotFillCount} spots left</Text>
            <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.white} numberOfLines={1} >{contestData?.data?.data?.slots} spots</Text>
          </Box>

          {!isUserJoinContest ? <PrimaryButton display={cardFrom === 'live' ? 'flex' : 'none'} buttonText={`Join ${'\u20B9'} ${contestData?.data?.data?.entryAmount}`} onPress={hanldeJoinContest} loading={useJoinContestHomeMutation?.isPending} disabled={useJoinContestHomeMutation?.isPending} height={moderateScale(32)} backgroundColor={colors.greenText} marginHorizontal={moderateScale(10)} marginBottom={moderateScaleVertical(10)} /> :
            <PrimaryButton display={cardFrom === 'live' ? 'flex' : 'none'} buttonText={`Join Contest `} onPress={() => {
              socketServices.emit('get-winninguser', {
                userId: authContext?.authState?.userId,
                contestId: contestId,
                timeSlotId: slotId,
              });
              navigation.navigate(NavigationString.BookHomeBids, { contestId: contestId, slotId: slotId, maxPrice: formatAmount(contestData?.data?.data?.prizeDistributionAmount) })
            }}

              loading={useJoinContestHomeMutation?.isPending} disabled={useJoinContestHomeMutation?.isPending} height={moderateScale(32)} backgroundColor={colors.greenText} marginHorizontal={moderateScale(10)} marginBottom={moderateScaleVertical(10)} />}

          <Box flexDirection="row" alignItems="center" justifyContent='space-between' backgroundColor={colors.black} px={10} >
            <Box flexDirection="row" alignItems="center" gap={10}>
              <Tooltip actionType='press' withOverlay={false} backgroundColor={colors.themeBlue} height={moderateScale(30)} popover={<Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.white} numberOfLines={1} >First Prize = {'\u20B9'}{formatAmount(contestData?.data?.data?.prizeDistribution[0]?.prizeAmount)}</Text>}>
                <Box flexDirection="row" alignItems="center" gap={3}>
                  <Image alt="icon" source={imgIcon.prize1} w={moderateScale(15)} h={moderateScale(15)} resizeMode="contain" />
                  <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.gray4} numberOfLines={1} >{'\u20B9'}{formatAmount(contestData?.data?.data?.prizeDistribution[0]?.prizeAmount)}</Text>
                </Box>
              </Tooltip>

              {/* <Tooltip actionType='press' withOverlay={false} backgroundColor={colors.themeBlue} height={moderateScale(30)} width={moderateScale(170)} popover={<Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.white} numberOfLines={1} >{contestData?.data?.data?.prizeDistributionPercentage}% teams win the contest</Text>}> */}
              <Tooltip actionType='press' withOverlay={false} backgroundColor={colors.themeBlue} height={moderateScale(30)} width={moderateScale(170)} popover={<Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.white} numberOfLines={1} >{contestData?.data?.data?.rankPercentage}% teams win the contest</Text>}>
                <Box flexDirection="row" alignItems="center" gap={3}>
                  <MyMatch15Icon />
                  <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.gray4} numberOfLines={1} >{contestData?.data?.data?.rankPercentage}%</Text>
                </Box>
              </Tooltip>

              <Tooltip actionType='press' withOverlay={false} backgroundColor={colors.themeBlue} height={moderateScale(50)} width={moderateScale(170)} popover={<Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.white} numberOfLines={2} >Max {contestData?.data?.data?.upto} entries per user in this contest</Text>}>
                <Box flexDirection="row" alignItems="center" gap={3}>
                  {flexible ? <MLetterIcon /> : <SingleLetterIcon />}
                  <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.gray4} numberOfLines={1} >Upto {contestData?.data?.data?.upto}</Text>
                </Box>
              </Tooltip>

              <Tooltip actionType='press' withOverlay={false} backgroundColor={colors.themeBlue} height={moderateScale(35)} width={moderateScale(260)} popover={<Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.white} numberOfLines={2} >You can use {contestData?.data?.data?.entryAmount * (contestData?.data?.data?.bonusCashPercentage / 100)} cash bonus for every entry</Text>}>
                <Box flexDirection="row" alignItems="center" gap={3}>
                  <Image alt="icon" source={imgIcon.bCoin} w={moderateScale(12)} h={moderateScale(12)} alignSelf='baseline' resizeMode="contain" />
                  <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.gray4} numberOfLines={1} >Use {contestData?.data?.data?.entryAmount * (contestData?.data?.data?.bonusCashPercentage / 100)}</Text>
                </Box>
              </Tooltip>
            </Box>
            <Box flexDirection="row" alignItems="center" gap={5}>
              {flexible === 'Yes' ? <RupeeCircleGreenIcon /> : <Icon as={CheckCircleIcon} w="$4" h="$4" color={colors.greenText} />}
              <Text fontFamily={'$robotoBold'} fontSize={12} lineHeight={14} color={colors.dimGray} numberOfLines={1} >{flexible === 'Yes' ? 'Flexible' : 'Guaranteed'}</Text>
            </Box>
          </Box>
        </Box>

        <Pressable flexDirection='row' alignItems='center' gap={moderateScale(10)} alignSelf='center' my={moderateScaleVertical(10)}>
          <Icon as={ShareIcon} color={colors.red} w={moderateScale(20)} h={moderateScale(20)} />
          <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.gray6} numberOfLines={1}>Invite your friends and see who comes out on top!</Text>
        </Pressable>


        {/* <Box backgroundColor={'#fdebeb'} flexDirection="row" alignItems="center" justifyContent='space-between' px={15} py={15}>
          <Box flexDirection="row" alignItems="center" >
          <Text fontFamily={'$robotoBold'} fontSize={12} lineHeight={14} color={'#c0392b'} numberOfLines={1}>Earn </Text>
          <Image alt="icon" source={imgIcon.bCoin} w={moderateScale(12)} h={moderateScale(12)} alignSelf='baseline' resizeMode="contain" />
          <Text fontFamily={'$robotoBold'} fontSize={12} lineHeight={14} color={'#c0392b'} numberOfLines={1}> 1 for every contest entry</Text>

          </Box>
          <Icon as={CloseIcon} w={moderateScale(20)} h={moderateScale(20)} color={'#c0392b'} />
        </Box> */}

        {/* button of timing and or wining or laederborad tab */}
        <Box flexDirection='row' alignItems='center' marginTop={10} marginHorizontal={moderateScale(15)} gap={moderateScale(15)} justifyContent={'space-between'}>
          <Box flexDirection='row' gap={moderateScale(15)}>
            <Pressable onPress={() => { setSelectLeaderBoard('wining') }} borderBottomWidth={selectLeaderBoard === 'wining' ? 3 : 0} borderBottomColor={colors.white} width={moderateScale(68)} >
              <Text fontFamily={selectLeaderBoard === 'wining' ? '$robotoBold' : '$robotoMedium'} fontSize={16} lineHeight={18} color={selectLeaderBoard === 'wining' ? colors.white : colors.white} numberOfLines={1} py={10}>Winnings</Text>
            </Pressable>

            <Pressable display={(cardFrom === 'wining' || cardFrom === 'privatewinnings') ? 'flex' : 'none'} onPress={() => { setSelectLeaderBoard('leaderboard') }} borderBottomWidth={selectLeaderBoard === 'leaderboard' ? 3 : 0} borderBottomColor={colors.white} width={moderateScale(95)} >
              <Text fontFamily={selectLeaderBoard === 'leaderboard' ? '$robotoBold' : '$robotoMedium'} fontSize={16} lineHeight={18} color={selectLeaderBoard === 'leaderboard' ? colors.white : colors.grayish} numberOfLines={1} py={10}>LeaderBoard</Text>
            </Pressable>
          </Box>


          {/* <Box display={selectLeaderBoard === 'leaderboard' ? 'flex' : 'none'} >
            <Box flexDirection="row" alignItems="center" justifyContent='flex-end' px={2} py={10} borderTopColor={colors.paleGray} borderBottomColor={colors.paleGray}>
              <PrimaryButton
                onPress={() => setTimeSlot(!timeSlot)}

                buttonText={selectedTime ? `${format(selectedTime?.startTime, "HH:mm:ss")}` : `Select Time`}
        
                bgColor={colors.greenText}
                height={moderateScale(35)}
                width={moderateScale(130)}
              />
            </Box>
          </Box> */}
          {/* <Box display={selectLeaderBoard === 'leaderboard' ? 'flex' : 'none'} >
            <Box flexDirection="row" alignItems="center" justifyContent='flex-end' px={2} py={10} borderTopColor={colors.paleGray} borderBottomColor={colors.paleGray}>
              <PrimaryButton
                onPress={() => setTimeSlot(!timeSlot)}
                buttonText={`${format(contestData?.data?.data?.timeSlots?.startTime, "HH:mm:ss")}`}
                buttonText={selectedTime ? `${format(selectedTime?.startTime, "HH:mm:ss")}` : `Select Time`}
                buttonText={
                  selectedTime
                    ? `${format(selectedTime?.startTime, "HH:mm:ss")}`
                    : `${format(contestData?.data?.data?.timeSlots?.startTime, "HH:mm:ss")}`
                } 
                bgColor={colors.greenText}
                height={moderateScale(35)}
                width={moderateScale(130)}
              />
            </Box>
          </Box> */}
        </Box>
        {/* {(
          <Box borderTopColor={colors.gray5} py={15} px={15}>
            {selectLeaderBoard === 'leaderboard' ? <Box flexDirection='row' alignItems='center' justifyContent='space-between'>
              <Text fontFamily={'$robotoBold'} fontSize={12} lineHeight={14} color={colors.grayish} numberOfLines={1}>Bids Count : <Text fontFamily={'$robotoBold'} fontSize={12} lineHeight={14} color={colors.white} numberOfLines={1}>23</Text></Text>
              <Box flexDirection='row' alignItems='center' gap={5}>
                <MyMatchYellowColorIcon />
                <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={14} color={colors.white} numberOfLines={1}>You have won {'\u20B9'} 200</Text>
              </Box>
            </Box>
              : (
                <Text fontFamily={'$robotoBold'} fontSize={12} lineHeight={14} color={colors.grayish} numberOfLines={1}>'Be the first in your network to join this contest.'</Text>
             
              )
            }
          </Box>)} */}
        <Box display={(flexible === 'Yes' && selectLeaderBoard === 'wining') ? 'flex' : 'none'}
          flexDirection='row' alignItems='center' justifyContent='center'
          gap={10} paddingVertical={moderateScaleVertical(10)}
          borderTopColor={colors.gray5}>
          {/* Max Fill Button */}
          <Pressable onPress={() => setSelectedFill('max')}
            bgColor={selectedFill === 'max' ? 'black' : colors.black}
            w={moderateScale(110)} h={moderateScale(30)}
            alignItems='center' justifyContent='center' borderRadius={5}>
            <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14}
              color={selectedFill === 'max' ? colors.white : 'white'}
              numberOfLines={1}>Max Fill</Text>
            {selectedFill === 'max' && (
              <Box w={moderateScale(50)} h={2} bgColor={colors.gold} mt={2} />
            )}
          </Pressable>

          <Pressable display={cardFrom === 'live' ? 'flex' : 'none'}
            onPress={() => {
              setSelectedFill('current');
              console.log("Selected Fill");
            }}
            bgColor={selectedFill === 'current' ? 'black' : colors.black}
            w={moderateScale(110)} h={moderateScale(30)}
            alignItems='center' justifyContent='center' borderRadius={5}>
            <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={selectedFill === 'current' ? colors.white : colors.gray3} numberOfLines={1}>Current Fill</Text>
            {selectedFill === 'current' && (
              <Box w={moderateScale(50)} h={2} bgColor={colors.gold} mt={2} />
            )}
          </Pressable>
        </Box>
        <Box display={selectLeaderBoard === 'wining' ? 'flex' : 'none'} >
          <Box flexDirection="row" alignItems="center" justifyContent='space-between' px={40} py={10} borderTopColor={colors.paleGray} borderBottomColor={colors.paleGray}>
            <Text fontFamily={'$robotoBold'} fontSize={12} lineHeight={14} color={colors.white} numberOfLines={1}>RANK</Text>
            <Text fontFamily={'$robotoBold'} fontSize={12} lineHeight={14} color={colors.white} numberOfLines={1}>WINNINGS</Text>
          </Box>
          {
            selectedFill === 'max' ? (
              contestData?.data?.data?.rankDistribution?.map((item: any, index: number) => {
                // console.log("item: ", item);
                return (
                  <Box key={index?.toString()} flexDirection='row' justifyContent='space-between' alignItems='center' py={moderateScale(10)} px={40} borderBottomColor={colors.paleGray}>
                    <Text fontFamily='$robotoBold' fontSize={12} lineHeight={16} color={colors.dimGray} numberOfLines={1}># {item?.rank}</Text>
                    <Text fontFamily='$robotoBold' fontSize={12} lineHeight={16} color={colors.dimGray} numberOfLines={1}>{'\u20B9'} 
                      {!`${item?.rank}`?.includes("-")?Number(item?.amount).toFixed(2):(item?.amount/getRangeLength(item?.rank)).toFixed(2)}
                    </Text>
                  </Box>
                )
              })
            ) : (
              contestData?.data?.data?.currentFill?.map((item: any, index: number) => {
                return (
                  <Box key={index?.toString()} flexDirection='row' justifyContent='space-between' alignItems='center' py={moderateScale(10)} px={40} borderBottomColor={colors.paleGray}>
                    <Text fontFamily='$robotoBold' fontSize={12} lineHeight={16} color={colors.dimGray} numberOfLines={1}># {item?.rank}</Text>
                    <Text fontFamily='$robotoBold' fontSize={12} lineHeight={16} color={colors.dimGray} numberOfLines={1}>{'\u20B9'} {formatAmount(item?.prizeAmount)}</Text>
                  </Box>
                )
              })
            )
          }
        </Box>
        {/* ======================================================= timing opening button ====================================== */}
        <Box display={selectLeaderBoard === 'leaderboard' ? 'flex' : 'none'}>
          <Box flexDirection='row' alignItems='center' justifyContent='space-between' px={15} py={8} bgColor={colors.black}>
            {/* <Box w={moderateScale(35)} h={moderateScale(35)} alignItems='center' justifyContent='center' bgColor={colors.white} borderRadius={moderateScale(8)} style={shadowStyle}>
              <Icon as={DownloadIcon} color={colors.mediumBlue} w="$6" h="$6" />
            </Box> */}
            {/* <Box flexDirection='row' alignItems='center' gap={5}>
              <Text fontFamily='$robotoMedium' fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1}>My Friends</Text>
              <Switch size="md" sx={{
                _light: {
                  props: {
                    trackColor: {
                      false: "$backgroundLight300",
                      true: colors.themeRed,
                    },
                  },
                },
              }} isDisabled={false} />
            </Box> */}
          </Box>
          <Box flexDirection="row" py={12} borderTopWidth={1} borderTopColor={colors.paleGray} bgColor={colors.black}>
            <Text flex={1} textAlign="center" fontFamily={'$robotoBold'} fontSize={12} lineHeight={14} color={colors.grayish} numberOfLines={1}>RANK</Text>
            <Text flex={2} textAlign="center" fontFamily={'$robotoBold'} fontSize={12} lineHeight={14} color={colors.grayish} numberOfLines={1}>NAME</Text>
            <Text flex={2} textAlign="center" fontFamily={'$robotoBold'} fontSize={12} lineHeight={14} color={colors.grayish} numberOfLines={1}>WON</Text>
            <Text flex={2} textAlign="center" fontFamily={'$robotoBold'} fontSize={12} lineHeight={14} color={colors.grayish} numberOfLines={1}>BID AMOUNT</Text>
          </Box>

          {selectLeaderBoard === 'leaderboard' && (
            ranksArray?.map((item: any, index: number) => (
              <Box key={index} flexDirection="row" alignItems="center" py={12} borderBottomWidth={3} borderBottomColor={colors.black}>
                <Text flex={1} textAlign="center" fontFamily={'$robotoBold'} fontSize={14} lineHeight={16} color={colors.gold} numberOfLines={1}>{item?.rank}</Text>
                <Text flex={2} textAlign="center" fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1}>{item?.userId?.name}</Text>
                <Text flex={2} textAlign="center" fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.gold} numberOfLines={1}>{'\u20B9'} {Number(item?.WinningAmount)}</Text>
                <Text flex={2} textAlign="center" fontFamily={'$robotoRegular'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1}>{item?.bid}</Text>
              </Box>
            ))
          )}
        </Box>
        {/* {cardFrom === 'live' && selectedFill === 'current' && <>
          <Box mx={15} h={moderateScale(45)} px={5} py={5} justifyContent='center' alignItems='center' borderRadius={6} my={moderateScaleVertical(8)}>
            <Text fontFamily='$robotoBold' textAlign='center' fontWeight='700' fontSize={10} lineHeight={12} color={colors.grayish} numberOfLines={3}>Next winner will be added when 1 more spot fills.</Text>
          </Box>
        </>} */}
        <Box mx={15} h={moderateScale(45)} px={5} py={5} justifyContent='center' alignItems='center' borderRadius={6} my={moderateScaleVertical(15)}>
          <Text fontFamily='$robotoMedium' textAlign='center' fontSize={10} lineHeight={12} color={colors.grayish} numberOfLines={3}>As per the government regulations, starting 1st April 2023 a tax of 30% will be levied at the time of withdrawal or at the end of financial year on the net winnings.</Text>
        </Box>
        <Modal animationType='slide' transparent={true} visible={timeSlot} onRequestClose={() => setTimeSlot(false)}>
          <Box flex={1} backgroundColor='rgba(0, 0, 0, 0.5)'>
            <Box backgroundColor={colors.black} borderTopLeftRadius={10} borderTopRightRadius={10} w={'100%'} gap={15} h={moderateScale(640)} marginTop={deviceHeight * 0.2} overflow='hidden'>
              <Box flexDirection='row' justifyContent='space-between' alignItems='center' bgColor={colors.black} py={moderateScaleVertical(15)} px={moderateScale(15)}>
                <TouchableOpacity onPress={() => setTimeSlot(false)}>
                  <Icon as={CloseIcon} size="lg" color={colors.red} />
                </TouchableOpacity>
                <Text fontFamily='$robotoBold' fontSize={16} lineHeight={18} color={colors.white} numberOfLines={1} >Select Time</Text>
              </Box>
              <ScrollView style={{ marginBottom: 15 }}>
                <Box px={5} alignSelf='center'>
                  {slotTimes?.map((item: any, ind: number) => {
                    return (
                      <TouchableOpacity key={ind} onPress={() => { setTimeSlot(false); setSelectedTime(item); setLoading(true) }}
                        style={{
                          paddingHorizontal: moderateScale(15),
                          paddingVertical: moderateScaleVertical(10),
                          backgroundColor: selectedTime?._id === item?._id ? colors.greenText : colors.black,
                          borderRadius: moderateScale(10),
                          borderRightWidth: selectedTime?._id === item?._id ? 2 : 1,
                          borderLeftWidth: selectedTime?._id === item?._id ? 2 : 1,

                          borderColor: selectedTime?._id === item?._id ? colors.greenText : colors.gold,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginVertical: 5,
                        width:"90%"
                        }}>
                        <Text fontFamily='$robotoBold' fontSize={14} lineHeight={16} color={selectedTime?._id === item?._id ? colors.white : colors.white} numberOfLines={1} >From: {format(item?.startTime, 'HH:MM:SS')} To: {format(item?.endTime, 'HH:MM:SS')}</Text>
                      </TouchableOpacity>
                    )
                  })}
                </Box>
              </ScrollView>
            </Box>
          </Box>
        </Modal>
      </Body>
    </Container>
  )
}

export default ViewHomeContest