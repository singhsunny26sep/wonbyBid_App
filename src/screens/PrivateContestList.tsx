import { useContext, useEffect, useState } from 'react'
import { FlatList, View } from 'react-native';
import { Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { ArrowDownIcon, ArrowUpIcon, Box, ChevronDownIcon, ChevronUpIcon, Pressable, Spinner, Text } from '@gluestack-ui/themed'
import DatePicker, { getToday, getFormatedDate } from 'react-native-modern-datepicker';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ParamListBase, useNavigation, useRoute } from '@react-navigation/native'
import { format, isToday, parse, parseISO, subDays, isBefore, isAfter, formatDate, addDays, } from 'date-fns';
import { Dropdown } from 'react-native-element-dropdown'
import { CloseIcon } from '@gluestack-ui/themed';
import { Icon } from '@gluestack-ui/themed';

import Body from '../components/Body/Body'
import { AppBar } from '../components/AppBar'
import { Container } from '../components/Container'
import ContestListCard from '../components/ContestListCard/ContestListCard'
import { colors } from '../constants/colors'
import { moderateScale, moderateScaleVertical, textScale } from '../utils/responsiveSize'
import { BackButton, FilterIcon, MLetterIcon, MyMatch15Icon, RupeeCircleGreenIcon, SingleLetterIcon, WalletIcon, WinnerIcon } from '../components/Icons'
import { NavigationString } from '../navigation/navigationStrings'
import { CatergoryTimeSlotTypes, deviceHeight, formatAmount, shadowStyle } from '../constants/constant'
import PrimaryButton from '../components/Button/PrimaryButton';
import { BellIcon } from '@gluestack-ui/themed';
import useGetAllContestByCategory from '../hooks/home/get-all-contest-by-category';
import { FavouriteIcon } from '@gluestack-ui/themed';
import { CheckCircleIcon } from '@gluestack-ui/themed';
import { Image } from '@gluestack-ui/themed';
import { imgIcon } from '../assets/icons';
import { Slider } from '@narodejesus/react-native-slider';
import Tooltip from 'rn-tooltip';
import socketServices from '../utils/socketService';
import CountDown from 'new-react-native-countdown-component';
import { ToastAndroid } from 'react-native';
import { AuthContext } from '../utils/authContext';
import CardTimer from '../utils/CardTimer';
import useGetUserWalletInfo from '../hooks/auth/get-user-wallet-info';
import Loader from '../components/Loader';

interface CATEGORY_CONTEST_TYPE {
  _id: string;
  name: string;
  auctioncategory: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  contests: CATEGORY_CONTEST[];
}[];

interface CATEGORY_CONTEST {
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
  contestCode: number;
  updatedAt: string;
}



const PrivateContestList = () => {

  // init
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const authContext: any = useContext(AuthContext);
  const route = useRoute()
  const { cardFrom, contestsData, categoryId, categoryName }: any = route.params
  const today = new Date();
  const nextDay = subDays(today, 1)
    const { data: walletInfoData, isLoading: walletInfoIsLoading } = useGetUserWalletInfo();

  const startDate = format(today, 'yyyy-MM-dd');
  // console.log(contestsData, 'lllll');
  const Filter = format(today, 'yyyy-MM-dd');



  // useStates
  const [selectedContestScreen, setSelectedContestScreen] = useState((cardFrom === 'mywinnings' || cardFrom === 'mylive') ? 'my' : 'all')
  const [selectedSortBy, setSelectedSortBy] = useState('')
  const [datePickerModel, setDatePickerModel] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')
  const [showFilterModel, setShowFilterModel] = useState(false)
  const [contests, setContests] = useState<any>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [datePickerModelEnd, setDatePickerModelEnd] = useState(false)


  // filter state
  const [enterFilter, setEnteryFilter] = useState<any>()
  const [spotsFilter, setSpotFilter] = useState<any>() //spots means slots
  const [prizePoolFilter, setPrizePoolFilter] = useState<any>()
  const [winnerFilter, setwinnerFilter] = useState<any>()


  // filter modal states
  const [startDateFilter, setStartDateFilter] = useState<string | null>('')
  const [endDate, setEndDate] = useState<string | null>('')
  const [slotMin, setSlotMin] = useState<number | null>()
  const [slotMax, setSlotMax] = useState<number | null>()
  const [prizeMin, setPrizeMin] = useState<number | null>()
  const [prizeMax, setPrizeMax] = useState<number | null>()

  useEffect(() => {
    console.log("=====================useEffect================");
    /* setContests([])
    if (cardFrom === 'live') {
      socketServices.on('private-live-contest', (data: any) => {
        setContests((prevContests: any) => ([
          ...data,
        ]));
      })

      return () => {
        socketServices.removeListener('private-live-contest')
      }
    }
    if (cardFrom === 'wining') {
      socketServices.on('private-upcoming-contest', (data: any) => {
        setContests((prevContests: any) => ([
          ...data,
        ]));
      })

      return () => {
        socketServices.removeListener('private-upcoming-contest')
      }
    }
    if (cardFrom === 'upcoming') {
      socketServices.on('private-expired-contes', (data: any) => {
        setContests((prevContests: any) => ([
          ...data,
        ]));
      })

      return () => {
        socketServices.removeListener('private-expired-contes')
      }
    } */

    setContests([])
    if (cardFrom === 'live') {
      console.log("live if calls");

      socketServices.on('private-live-contest', (data: any) => {
        // console.log(cardFrom, 'get private contest data', data);
        setContests((prevContests: any) => ([
          // ...prevContests,
          ...data,
        ]));
      })
    } else if (cardFrom === 'upcoming') {
      console.log("=====================upcoming==========================");

      socketServices.on('private-upcoming-contest', (data: any) => {
        // console.log("=====================upcoming data==========================");
        // console.log(cardFrom, 'get private contest data', data);
        setContests((prevContests: any) => ([
          // ...prevContests,
          ...data,
        ]));
      })
    } else if (cardFrom === 'winnings') {
      socketServices.on('private-expired-contest', (data: any) => {
        // console.log(cardFrom, 'get private contest data', data);
        setContests((prevContests: any) => ([
          // ...prevContests,
          ...data,
        ]));
      })
    }
    setIsLoading(false)

    return () => {
      if (cardFrom === 'live') {
        socketServices.removeListener('private-live-contest')
      } else if (cardFrom === 'upcoming') {
        socketServices.removeListener('private-upcoming-contest')
      } else if (cardFrom === 'winnings') {
        socketServices.removeListener('private-expired-contest')
      }
    }
  }, [])



  // console.log("userId: ", authContext?.authState?.userId);
  // console.log("categoryId: ", categoryId);


  // console.log("enterFilter: ", enterFilter);
  // console.log("prizePoolFilter: ", prizePoolFilter);
  // console.log("spotsFilter: ", spotsFilter);
  // console.log("startDateFilter: ", startDateFilter);
  // console.log("endDate: ", endDate);
  // console.log("slotMin: ", slotMin);
  // console.log("slotMax: ", slotMax);
  // console.log("prizeMin: ", prizeMin);
  // console.log("prizeMax: ", prizeMax);


  // filter function
  const callJoinCategoryEvent = async () => {

    // setIsLoading(true)
    socketServices.emit('get-private-contest-by-category', {
      userId: authContext?.authState?.userId,
      categoryId: categoryId,
      filterObj: {
        sortfilterObj: {
          sortByEntryAmount: enterFilter,
          sortBySlotSize: spotsFilter,
          sortByPrizePoll: prizePoolFilter,
        },
        sortByRangeFilterObj: {
          dateFilter: { startDate: startDateFilter, endDate: endDate },
          slotFilter: { min: slotMin, max: slotMax },
          prizePoolFilter: { min: prizeMin, max: prizeMax }
        }
      }
      /* filterObj: {
        sortfilterObj: {
          sortByEntryAmount: enterFilter == "undefined" ? "" : enterFilter,
          sortBySlotSize: spotsFilter == "undefined" ? "" : spotsFilter,
          sortByPrizePoll: prizePoolFilter == "undefined" ? "" : prizePoolFilter,
        },
        sortByRangeFilterObj: {
          dateFilter: { startDate: startDateFilter == "undefined" ? "" : startDateFilter, endDate: endDate == "undefined" ? "" : endDate },
          slotFilter: { min: slotMin == "undefined" ? "" : slotMin, max: slotMax == "undefined" ? "" : slotMax },
          prizePoolFilter: { min: prizeMin == "undefined" ? "" : prizeMin, max: prizeMax == "undefined" ? "" : prizeMax }
        }
      } */
    });
  }


  /* const handleRangeFilter = async() => {
  
  } */
  const handleSlotFilter = async (min: number, max: number, type: string) => {
    if (type == 'slot') {
      setSlotMin(min)
      setSlotMax(max)
    } else {
      setPrizeMin(min)
      setPrizeMax(max)
    }
    callJoinCategoryEvent()
    setShowFilterModel(false)
  }

  const handleClearFiltterRange = async () => {
    setSlotMin(null)
    setSlotMax(null)
    setPrizeMin(null)
    setPrizeMax(null)
    setStartDateFilter('')
    setEndDate('')
    // setContestTypeFilter('')
    callJoinCategoryEvent()
    setShowFilterModel(false)
  }

  const handleClearFilter = async () => {
    setSpotFilter(null)
    setPrizePoolFilter(null)
    setwinnerFilter(null)
    callJoinCategoryEvent()
  }

  const getFilterCount = () => {
    let count = 0;

    // Check each filter and increment count if it's active
    if (enterFilter) count++;
    if (winnerFilter) count++;
    if (prizePoolFilter) count++;
    // if (contestTypeFilter) count++;
    if (spotsFilter) count++;
    if (startDateFilter && endDate) count++; // Treat as one filter
    if (slotMin && slotMax) count++; // Treat as one filter
    if (prizeMin && prizeMax) count++; // Treat as one filter

    return count;
  };

  useEffect(() => {
    callJoinCategoryEvent()
  }, [enterFilter, spotsFilter, prizePoolFilter, winnerFilter])

  const showToast = (message: string) => {
    return ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  if (!contests?.length || !contests) {


  }


  const LeftAppBar = () => {
    return (
      <Box flexDirection='row' alignItems='center' px={moderateScale(10)} gap={moderateScale(15)}>
        <Pressable hitSlop={22} onPress={() => { navigation?.goBack() }}>
          <BackButton />
        </Pressable>
        <Box>
          <Text fontFamily={'$robotoBold'} fontSize={16} lineHeight={18} color={colors.white} numberOfLines={1}>{categoryName ? categoryName : "Category Name"}</Text>
          {/* <Text fontFamily={'$robotoRegular'} fontSize={12} lineHeight={18} color={colors.white} numberOfLines={1}>15 min left</Text> */}
        </Box>
      </Box>
    )
  }

  const RightIcon = () => {
    return (
      <Box flexDirection='row' alignItems='center' gap={15} w={moderateScale(250)}>
        {/* <Pressable onPress={() => navigation.navigate(NavigationString.Notification)}>
          <Box bgColor={colors.gold} flexDirection='row' alignItems='center' py={8} px={7} borderRadius={10} gap={10}>
            <Icon as={BellIcon} color={colors.white} w="$5" h="$5" />
          </Box>
        </Pressable> */}
        {/* 
        <Pressable onPress={() => navigation.navigate(NavigationString.Winners)}>
          <Box bgColor={colors.gold} flexDirection='row' alignItems='center' py={8} px={7} borderRadius={10} gap={10}>
            <WinnerIcon />
          </Box>
        </Pressable> */}
        <Pressable onPress={() => navigation.navigate(NavigationString.MyWallet)}>
          <Box bgColor={colors.black} flexDirection='row' alignItems='center' py={7} px={7} mr={moderateScale(2)} borderRadius={10} gap={10}>
            <WalletIcon />
          </Box>
        </Pressable>
        <Text style={{ color: colors.gold }}>{'₹'} {walletInfoData?.data?.newBalance?.balance.toFixed(2) ?? 0}</Text>
      </Box>
    )
  }

  if (!contests) {

    return (
      <Container statusBarStyle='light-content' backgroundColor='black' statusBarBackgroundColor={colors.themeRed}>
        <AppBar left={<LeftAppBar />} right={<RightIcon />} />
        <Box flex={1} backgroundColor='black' justifyContent='center' alignItems='center' >
          {/* <Spinner size={'large'} color={colors.gold} /> */}
          <Loader/>
        </Box>
      </Container>
    )
  }

  // console.log("cardFrom: ", "================", cardFrom, "=====================");

  return (
    <Container statusBarStyle='light-content' statusBarBackgroundColor={colors.themeRed} backgroundColor={colors.black}>
      <AppBar left={<LeftAppBar />} right={<RightIcon />} />

      {cardFrom !== 'mywinnings' || cardFrom !== 'mylive' && <Box display={cardFrom === 'live' ? 'flex' : 'none'} flexDirection='row' alignItems='center' alignSelf='center' bgColor={colors.gray10}>
        <Pressable onPress={() => setSelectedContestScreen('all')} flex={1} alignItems='center' borderBottomWidth={selectedContestScreen === 'all' ? 2 : 0} borderBottomColor={colors.themeRed}>
          <Text fontFamily={selectedContestScreen === 'all' ? '$robotoBold' : '$robotoMedium'} fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} py={10}>{cardFrom === 'live' ? 'All Contests' : 'All Winnings'}</Text>
        </Pressable>
        <Pressable onPress={() => setSelectedContestScreen('my')} flex={1} alignItems='center' borderBottomWidth={selectedContestScreen === 'my' ? 2 : 0} borderBottomColor={colors.themeRed}>
          <Text fontFamily={selectedContestScreen === 'my' ? '$robotoBold' : '$robotoMedium'} fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} py={10}>{cardFrom === 'live' ? 'My Contests' : 'My Winnings'}</Text>
        </Pressable>
      </Box>}

      {/* <Box display={cardFrom === 'upcoming' || cardFrom === 'winnings' ? 'flex' : 'none'} flexDirection='row' alignItems='center' justifyContent='space-between' pl={moderateScale(15)} bgColor={colors.gray10} borderBottomWidth={2} borderBottomColor={colors.white}>
        <Text fontFamily={'$robotoBold'} fontSize={12} lineHeight={14} color={colors.grayish} numberOfLines={1} py={10}>Show Upcoming By :</Text>
        <Box flexDirection='row' alignItems='center' gap={5}>
          <Pressable flexDirection='row' alignItems='center' gap={6} onPress={() => { setDatePickerModel(!datePickerModel) }}>
            <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.black} numberOfLines={1} py={10}>{selectedDate === '' ? 'Select Date' : `${selectedDate} ${selectedTime}`}</Text>
            {datePickerModel ? <Icon as={ChevronUpIcon} w="$4" h="$4" color={colors.grayish} /> : <Icon as={ChevronDownIcon} w="$4" h="$4" color={colors.grayish} />}
          </Pressable>

          <Dropdown
            style={localStyles.dropdown}
            placeholderStyle={localStyles.placeholderStyle}
            selectedTextStyle={localStyles.selectedTextStyle}
            data={CatergoryTimeSlotTypes}
            labelField="label"
            valueField="value"
            placeholder={'Select Time Slot'}
            value={selectedTime}
            onChange={(item: any) => { setSelectedTime(item) }}
            renderRightIcon={() => <Icon as={ChevronDownIcon} size="sm" mr={moderateScale(20)} />}
            selectedTextProps={{ numberOfLines: 1 }}
            renderItem={(item) => { return (<Text fontFamily='$robotoMedium' fontSize={14} color={colors.black} lineHeight={16} numberOfLines={1} style={{ paddingHorizontal: responsiveWidth(2.5), paddingVertical: responsiveHeight(1.5) }} >{item?.label}</Text>) }}
            itemTextStyle={localStyles.selectedTextStyle}
            itemContainerStyle={localStyles.itemContainerStyle}
          />
        </Box>
      </Box> */}
      {/* date selection button */}
      <Box display={cardFrom === 'upcoming' || cardFrom === 'winnings' ? 'flex' : 'none'} flexDirection='row' alignItems='center' justifyContent='space-between' pl={moderateScale(15)} pr={moderateScale(10)} bgColor={colors.black} borderBottomWidth={2} borderBottomColor={colors.white}>
        <Text fontFamily={'$robotoBold'} fontSize={12} lineHeight={14} color={colors.grayish} numberOfLines={1} py={10}>Show Upcoming By :</Text>
        <Box flexDirection='row' alignItems='center' gap={1}>
          <Pressable flexDirection='row' alignItems='center' gap={3} onPress={() => { setDatePickerModel(!datePickerModel) }}>
            <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.gray6} numberOfLines={1} py={10}>{startDateFilter === '' ? 'Select Date' : `${startDateFilter}`}</Text>
            {datePickerModel ? <Icon as={ChevronUpIcon} w="$4" h="$4" color={colors.grayish} /> : <Icon as={ChevronDownIcon} w="$4" h="$4" color={colors.grayish} />}
          </Pressable>

          {/* <Pressable flexDirection='row' alignItems='center' gap={3} onPress={() => { setDatePickerModelEnd(!datePickerModelEnd) }}>
            <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.white} numberOfLines={1} py={10}>{endDate === '' ? 'Select Time' : `${endDate}`}</Text>
            {datePickerModelEnd ? <Icon as={ChevronUpIcon} w="$4" h="$4" color={colors.grayish} /> : <Icon as={ChevronDownIcon} w="$4" h="$4" color={colors.grayish} />}
          </Pressable> */}
        </Box>

      </Box>

      {/* ============================================================== top bar filter ============================================================== */}
      <Box w={'100%'} flexDirection='row' alignItems='center' alignContent='center' bgColor={colors.black} borderBottomWidth={1} borderBottomColor={colors.black} >
        <Box justifyContent='center' flex={0.9}>
          <Text fontFamily={'$robotoBold'} fontSize={12} pl={moderateScale(20)} lineHeight={14} color={colors.grayish} numberOfLines={1}>Sort By:</Text>
        </Box>

        <Pressable onPress={() => { setSelectedSortBy('entry'), enterFilter == 'max' ? setEnteryFilter("min") : setEnteryFilter("max") }} flex={0.5} flexDirection='row' alignItems='center' justifyContent='center' gap={1}>
          <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.grayish} borderBottomWidth={selectedSortBy === 'entry' ? 2 : 0} borderBottomColor={colors.themeRed} numberOfLines={1} py={10}>ENTRY</Text>
          <Icon as={enterFilter == 'max' ? ArrowDownIcon : ArrowUpIcon} w={moderateScale(13)} h={moderateScale(13)} color={colors.gold} />
        </Pressable>

        <Pressable onPress={() => { setSelectedSortBy('spots'), spotsFilter == "max" ? setSpotFilter("min") : setSpotFilter("max") }} flex={0.8} alignItems='center' flexDirection='row' justifyContent='center' gap={1}>
          <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.grayish} borderBottomWidth={selectedSortBy === 'spots' ? 2 : 0} borderBottomColor={colors.themeRed} numberOfLines={1} py={10}>SPOTS</Text>
          <Icon as={spotsFilter == 'max' ? ArrowDownIcon : ArrowUpIcon} w={moderateScale(13)} h={moderateScale(13)} color={colors.gold} />
        </Pressable>

        <Pressable onPress={() => { setSelectedSortBy('prizepool'), prizePoolFilter == 'max' ? setPrizePoolFilter("min") : setPrizePoolFilter("max") }} flex={0.9} alignItems='center' flexDirection='row' justifyContent='center' gap={1} bgColor={colors.black}>
          <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.grayish} borderBottomWidth={selectedSortBy === 'prizepool' ? 2 : 0} borderBottomColor={colors.themeRed} numberOfLines={1} py={10}>PRIZE POOL</Text>
          <Icon as={prizePoolFilter == 'max' ? ArrowDownIcon : ArrowUpIcon} w={moderateScale(13)} h={moderateScale(13)} color={colors.gold} />
        </Pressable>
        <Pressable onPress={() => { setSelectedSortBy('winners'), winnerFilter == "max" ? setwinnerFilter("min") : setwinnerFilter("max") }} flex={0.9} flexDirection='row' alignItems='center' justifyContent='center' gap={1}>
          <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.grayish} borderBottomWidth={selectedSortBy === 'winners' ? 2 : 0} borderBottomColor={colors.themeRed} numberOfLines={1} py={10}> %WINNERS</Text>
          <Icon as={winnerFilter == 'max' ? ArrowDownIcon : ArrowUpIcon} w={moderateScale(13)} h={moderateScale(13)} color={colors.gold}  />
        </Pressable>
        <Pressable onPress={() => setShowFilterModel(true)} bgColor={colors.black} alignItems='center' justifyContent='center' flex={0.5} py={10}>
          <FilterIcon />
        </Pressable>
      </Box>
      <Box flexDirection='row' alignItems='center' justifyContent='space-between' bgColor={colors.black} px={moderateScale(15)} py={moderateScaleVertical(10)}>
        <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.grayish} numberOfLines={1}>{contests?.length} contests</Text>
        <Box flexDirection='row' alignItems='center' gap={moderateScale(15)}>
          <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.grayish} numberOfLines={1}>{getFilterCount()} Sort Applied</Text>
          <TouchableOpacity onPress={handleClearFilter}>
            <Text fontFamily={'$robotoBold'} fontSize={16} lineHeight={18} color={colors.gray6} numberOfLines={1}>CLEAR</Text>
          </TouchableOpacity>
        </Box>
      </Box>
       
      <FlatList
        data={contests?.length > 0 ? contests : []}
        renderItem={({ item, index }: { item: CATEGORY_CONTEST, index: number }) => {
          return <Box backgroundColor='black' key={item?._id} py={moderateScaleVertical(10)}>
            <Text fontFamily={'$robotoBold'} fontSize={18} lineHeight={20} color={colors.gold} numberOfLines={1} px={moderateScale(15)} pb={moderateScaleVertical(10)}>Created By: {item?.name}</Text>
            {item.privateContest.map((item) => {

              const currentDate = new Date();

              // Parse the given UTC date string
              const givenDate = new Date(item?.startDateTime);

              // Calculate the difference in milliseconds
              const timeDifference: any = Number(new Date(item?.endDateTime)) - Number(currentDate); // Difference in milliseconds

              // Convert the difference into seconds
              const diffInSeconds = Math.floor(timeDifference / 1000);

              // Parse the given UTC date string
              // const givenDate = parseISO(givenDateString);

              // Format the time
              const formattedTime = format(givenDate, "h:mm a");

              // Format the date as dd-MMM-yy
              const formattedDate = format(givenDate, "d-MMM-yy");

              let contestDate;

              // Check if the given date is today
              if (isToday(givenDate)) {
                contestDate = formattedTime; // Show time only if today
              } else {
                contestDate = `${formattedDate}`; // Show date and time if not today
              }

              return <Box key={item?._id} backgroundColor={colors.black} py={moderateScaleVertical(10)}>
                <Box px={moderateScale(15)}>
                  <Box backgroundColor={colors.black} borderEndWidth={1} borderLeftWidth={1} borderColor={colors.gold} pt={10} gap={8} borderRadius={10} overflow="hidden">
                    <Pressable gap={8} onPress={() => navigation.navigate(NavigationString.PrivateViewContest, { flexible: 'Yes', cardFrom: cardFrom, contestId: item?._id, isDeclare: false })} >
                      <Box display={cardFrom === 'upcoming' ? 'flex' : 'none'} flexDirection='row' alignItems='center' justifyContent="space-between" px={moderateScale(10)}>
                        <Icon as={FavouriteIcon} w="$5" h="$5" color={colors.white} />
                        <Icon as={BellIcon} w="$5" h="$5" color={colors.white} />
                      </Box>
                      <Box flexDirection="row" alignItems="center" justifyContent='space-between' px={10}>
                        <Box >
                          <Text fontFamily={'$robotoMedium'} textAlign="center" fontSize={12} lineHeight={14} color={colors.gray4} numberOfLines={1}>{item?.contestCode}</Text>
                          <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.gold} numberOfLines={1}>Prize Pool</Text>

                        </Box>
                        {/* <Box flex={0.7} alignItems="center">
                        <Text fontFamily={'$poppinsMedium'} fontSize={12} lineHeight={14} color={'#c20c0d'} numberOfLines={1} >{format(new Date() as any, 'hh:mm a')}</Text>
                      </Box> */}
                        <Box >
                          <Box flexDirection="row" alignItems="center" gap={moderateScale(10)}>
                            <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.gray4} numberOfLines={1} >Entry</Text>
                            {cardFrom === 'live' && <Icon as={CheckCircleIcon} w="$3" h="$3" color={colors.greenText} />}
                          </Box>
                        </Box>
                      </Box>
                      <Box flexDirection="row" alignItems="center" px={10}>
                        <Text fontFamily={'$robotoBold'} fontSize={20} lineHeight={22} color={colors.white} numberOfLines={1} flex={0.8}>{'\u20B9'}{formatAmount(Number(item?.createdPrizePool))}</Text>
                        {/* <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.dimGray} flex={0.7} numberOfLines={2} textAlign="center">{cardFrom === 'privatelive' ? `Next contest is at ${contestDate}` : cardFrom === 'privateupcoming' ? `Upcoming at ${contestDate}` : `${contestDate}`}</Text> */}
                        <Box alignItems='center' flex={1} flexDirection="row" >
                          {cardFrom === 'live' && <>
                            <CardTimer endTime={item?.endDateTime} color={colors.red} startTime={item?.startDateTime} />
                            {/* <Text fontFamily={'$robotoMedium'} fontSize={12} lneHeight={14} color={colors.dimGray} numberOfLines={2} textAlign="center">{format(item?.timeSlots?.endTime, "dd MMM yyyy")}</Text> */}
                          </>}
                          {cardFrom === 'upcoming' &&
                            <Box flexDirection='column'>
                              <Text fontFamily="$robotoMedium" fontSize={12} lineHeight={14} color={colors.dimGray} numberOfLines={2} textAlign="center">
                                {format(item?.startDateTime, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd") ? <CardTimer endTime={item?.startDateTime} color={colors.red} /> : format(item?.endDateTime, "hh:mm a")}
                              </Text>
                              <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.dimGray} numberOfLines={2} textAlign="center">{format(item?.startDateTime, "dd MMM yyyy")}</Text>
                            </Box>
                          }

                          {cardFrom === 'winnings' && <Box flexDirection='column'>
                            <Text fontFamily={'$poppinsMedium'} fontSize={12} lineHeight={14} color={'#c20c0d'} numberOfLines={1} >{formatDate(item?.endDateTime, "hh:mm a")}</Text>
                            <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.dimGray} numberOfLines={2} textAlign="center">{format(item?.endDateTime, "dd MMM yyyy")}</Text>
                          </Box>}
                        </Box>
                        {/* <Box alignItems='center' flex={1} ></Box> */}
                        <Box flex={0.5}>
                          <Pressable onPress={() => navigation.navigate(NavigationString.PrivateViewContest, { flexible: 'Yes', cardFrom: cardFrom, contestId: item?._id, isDeclare: false })} height={moderateScale(32)} width={moderateScale(75)} backgroundColor={colors.greenText} alignItems="center" justifyContent="center" borderRadius={moderateScale(8)}>
                            <Text fontFamily={'$robotoMedium'} fontSize={16} lineHeight={18} color={colors.white} numberOfLines={1} textAlign="center">{'\u20B9'} {formatAmount(Number(item?.createdEntryFee))}</Text>
                          </Pressable>
                        </Box>
                      </Box>

                      <Slider
                        disabled={true}
                        minimumValue={0}
                        maximumValue={item?.createdSlots}
                        maximumTrackTintColor={'#fdebeb'}
                        minimumTrackTintColor={colors.gold}
                        maximumTrackStyle={{ height: moderateScale(6) }}
                        minimumTrackStyle={{ height: moderateScale(6) }}
                        thumbTintColor="transparent"
                        value={item?.ranks?.length}
                        onValueChange={(value) => { }}
                        containerStyle={{ height: moderateScale(12), marginHorizontal: moderateScale(10) }}
                      />
                      <Box flexDirection="row" alignItems="center" justifyContent='space-between' px={10}>
                        <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.white} numberOfLines={1}>{item?.createdSlots - item?.ranks?.length} spots left</Text>
                        <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.gray4} numberOfLines={1} >{item?.createdSlots} spots</Text>
                      </Box>
                    </Pressable>

                    <Box flexDirection="row" alignItems="center" justifyContent='space-between' backgroundColor={colors.black} px={10} py={8}>
                      <Box flexDirection="row" alignItems="center" gap={10}>
                        <Tooltip actionType='press' withOverlay={false} backgroundColor={colors.themeBlue} height={moderateScale(30)} popover={<Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.white} numberOfLines={1} >First Prize = {'\u20B9'}25,000</Text>}>
                          <Box flexDirection="row" alignItems="center" gap={3}>
                            <Image alt="icon" source={imgIcon.prize1} w={moderateScale(15)} h={moderateScale(15)} alignSelf='baseline' resizeMode="contain" />
                            <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.gray4} numberOfLines={1} >{'\u20B9'}{formatAmount(item?.createdPrizePool)}</Text>
                          </Box>
                        </Tooltip>
                        <Tooltip actionType='press' withOverlay={false} backgroundColor={colors.themeBlue} height={moderateScale(30)} width={moderateScale(170)} popover={<Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.white} numberOfLines={1} >7,516 teams win the contest</Text>}>
                          <Box flexDirection="row" alignItems="center" gap={3}>
                            <MyMatch15Icon />
                            <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.gray4} numberOfLines={1} >{item?.createdUpto}%</Text>
                          </Box>
                        </Tooltip>
                        <Tooltip actionType='press' withOverlay={false} backgroundColor={colors.themeBlue} height={moderateScale(50)} width={moderateScale(170)} popover={<Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.white} numberOfLines={2} >Max 20 entries per user in this contest</Text>}>
                          <Box flexDirection="row" alignItems="center" gap={3}>
                            {true ?  <MLetterIcon /> :<SingleLetterIcon />}
                            <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.gray4} numberOfLines={1} >Upto {item?.createdUpto}</Text>
                          </Box>
                        </Tooltip>

                        {/* <Tooltip actionType='press' withOverlay={false} backgroundColor={colors.themeBlue} height={moderateScale(35)} width={moderateScale(270)} popover={<Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.white} numberOfLines={2} >You can use 4.3 cash bonus for every entry</Text>}>
                        <Box flexDirection="row" alignItems="center" gap={3}>
                          <Image alt="icon" source={imgIcon.bCoin} w={moderateScale(12)} h={moderateScale(12)} alignSelf='baseline' resizeMode="contain" />
                          <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.gray4} numberOfLines={1} >Use 4.3</Text>
                        </Box>
                      </Tooltip> */}

                      </Box>
                      <Tooltip actionType='press' withOverlay={false} backgroundColor={colors.themeBlue} height={moderateScale(50)} width={moderateScale(270)} popover={<Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.white} numberOfLines={2} >{true ? 'Take Place even if 2 spots fill, and the Prize Pool will depend on how many spots are filled.' : 'Guaranteed to take place regardless of spots filed.'}</Text>}>

                        <Box flexDirection="row" alignItems="center" gap={5}>
                          {true ? <RupeeCircleGreenIcon /> : <Icon as={CheckCircleIcon} w="$4" h="$4" color={colors.greenText} />}
                          <Text fontFamily={'$robotoBold'} fontSize={12} lineHeight={14} color={colors.dimGray} numberOfLines={1} >{'Flexible'}</Text>
                        </Box>
                      </Tooltip>
                    </Box>
                  </Box>
                </Box>
              </Box>
            })
            }
          </Box>
        }}

        keyExtractor={(item: CATEGORY_CONTEST, index: number) => item?._id?.toString()}
        style={{ flex: 1, backgroundColor: colors.black }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: responsiveWidth(3), flexGrow: 1 }}

        ListEmptyComponent={() => {
          return (
            <Box backgroundColor='black' flex={1} justifyContent='center' alignItems='center' >
              {/* <Spinner size={'large'} color={colors.gold} /> */}
              <Loader/>
            </Box>
          )
        }}


      />
    

      <Modal animationType='slide' transparent={true} visible={datePickerModel}>

        <Box style={localStyles.modalCenterView} >
          <Box style={localStyles.modalView}>

            {cardFrom === 'upcoming' ? (<DatePicker mode='calendar' options={{ mainColor: colors.themeRed, }} selected={selectedDate}
              onDateChange={(propDate: any) => {
                console.log(propDate);

                const parsedDate = parse(propDate, 'yyyy/MM/dd', new Date())
                setSelectedDate(format(parsedDate, 'yyyy-MM-dd'))
              }}
              minimumDate={startDate}
            />
            ) : (
              <DatePicker
                mode='calendar'
                options={{ mainColor: colors.themeRed, }}
                selected={selectedDate}

                onDateChange={(propDate: any) => {
                  console.log(propDate);
                  const parsedDate = parse(propDate, 'yyyy/MM/dd', new Date())
                  setSelectedDate(format(parsedDate, 'yyyy-MM-dd'))
                }}

                maximumDate={startDate}
              />
            )
            }

            <Box style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
              <TouchableOpacity activeOpacity={0.6} onPress={() => { setDatePickerModel(false) }} >
                <Text style={{ color: colors.black, fontSize: textScale(12), fontFamily: 'Roboto-medium' }} >Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => { setDatePickerModel(false) }} style={{ backgroundColor: colors.themeRed, paddingHorizontal: responsiveWidth(2.5), paddingVertical: responsiveHeight(0.5), borderRadius: responsiveWidth(2) }} >
                <Text style={{ color: colors.white, fontSize: textScale(14), fontFamily: 'Roboto-medium' }} >Done</Text>
              </TouchableOpacity>
            </Box>
          </Box>
        </Box>
      </Modal>

      {/* =============================== calender view =============================== */}
      {/* start date */}
      <Modal animationType='slide' transparent={true} visible={datePickerModel}>

        <Box style={localStyles.modalCenterView} >
          <Box style={localStyles.modalView}>

            <DatePicker mode='calendar' options={{ mainColor: colors.themeRed, }}
              selected={startDateFilter}
              onDateChange={(propDate: any) => {
                const parsedDate = parse(propDate, 'yyyy/MM/dd', new Date());
                const formattedStartDate = format(parsedDate, 'yyyy-MM-dd');

                if (isAfter(new Date(formattedStartDate), new Date(endDate))) {
                  ToastAndroid.show("Start date cannot be later than end date", ToastAndroid.SHORT); // Android toast
                  return;
                }
                setStartDateFilter(formattedStartDate);
              }}
            // minimumDate={Filter}
            />

            <Box style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
              <TouchableOpacity activeOpacity={0.6} onPress={() => { setDatePickerModel(false) }} >
                <Text style={{ color: colors.black, fontSize: textScale(12), fontFamily: 'Roboto-medium' }} >Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => { setDatePickerModel(false); endDate && callJoinCategoryEvent() }} style={{ backgroundColor: colors.themeRed, paddingHorizontal: responsiveWidth(2.5), paddingVertical: responsiveHeight(0.5), borderRadius: responsiveWidth(2) }} >
                <Text style={{ color: colors.white, fontSize: textScale(14), fontFamily: 'Roboto-medium' }} >Done</Text>
              </TouchableOpacity>
            </Box>
          </Box>
        </Box>
      </Modal>

      {/* end Date */}
      <Modal animationType='slide' transparent={true} visible={datePickerModelEnd}>

        <Box style={localStyles.modalCenterView} >
          <Box style={localStyles.modalView}>

            <DatePicker mode='calendar' options={{ mainColor: colors.themeRed, }}
              selected={endDate}
              /* onDateChange={(propDate: any) => {
                const parsedDate = parse(propDate, 'yyyy/MM/dd', new Date())
                setEndDate(format(parsedDate, 'yyyy-MM-dd'))
              }} */
              onDateChange={(propDate: any) => {
                const parsedDate = parse(propDate, 'yyyy/MM/dd', new Date());
                const formattedEndDate = format(parsedDate, 'yyyy-MM-dd');

                if (isBefore(new Date(formattedEndDate), new Date(startDateFilter))) {
                  ToastAndroid.show("End date cannot be earlier than start date", ToastAndroid.SHORT); // Android toast
                  return;
                }

                setEndDate(formattedEndDate);
              }}
            // minimumDate={Filter}
            />

            <Box style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
              <TouchableOpacity activeOpacity={0.6} onPress={() => { setDatePickerModelEnd(false) }} >
                <Text style={{ color: colors.black, fontSize: textScale(12), fontFamily: 'Roboto-medium' }} >Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => { setDatePickerModelEnd(false); startDateFilter && callJoinCategoryEvent() }} style={{ backgroundColor: colors.themeRed, paddingHorizontal: responsiveWidth(2.5), paddingVertical: responsiveHeight(0.5), borderRadius: responsiveWidth(2) }} >
                <Text style={{ color: colors.white, fontSize: textScale(14), fontFamily: 'Roboto-medium' }} >Done</Text>
              </TouchableOpacity>
            </Box>
          </Box>
        </Box>
      </Modal>

      {/* ==================================================== filter modal ==================================================== */}
      <Modal animationType='slide' transparent={true} visible={showFilterModel} onRequestClose={() => setShowFilterModel(false)}>
        <Box flex={1} backgroundColor='rgba(0, 0, 0, 0.5)' >
          <Box backgroundColor={colors.black} borderTopLeftRadius={10} borderTopRightRadius={10} w={'100%'} gap={15} h={moderateScale(640)} marginTop={deviceHeight * 0.5} overflow='hidden'>
            <Box flexDirection='row' justifyContent='space-between' alignItems='center' bgColor={colors.gray10} py={moderateScaleVertical(15)} px={moderateScale(15)}>
              <Pressable onPress={() => setShowFilterModel(false)}>
                <Icon as={CloseIcon} size="lg" color={colors.black} />
              </Pressable>
              <Text fontFamily='$robotoBold' fontSize={16} lineHeight={18} color={colors.black} numberOfLines={1} >Filter</Text>
              <TouchableOpacity onPress={handleClearFiltterRange}>
                <Text fontFamily='$robotoBold' fontSize={16} lineHeight={18} color={colors.grayish} numberOfLines={1} >CLEAR</Text>
              </TouchableOpacity>
            </Box>

            <Body>
              <Box px={moderateScale(15)} borderBottomWidth={1} borderBottomColor={colors.gray5} py={moderateScaleVertical(15)}>
                <Text fontFamily='$robotoBold' fontSize={16} lineHeight={18} color={colors.white} numberOfLines={1} >Spots</Text>

                <Box flexDirection='row' gap={moderateScale(10)} flexWrap='wrap' mt={moderateScaleVertical(10)}>
                  <TouchableOpacity style={{ borderWidth: 1, borderRadius: 20, borderColor: colors.grayish, paddingHorizontal: 4, paddingVertical: 4 }} onPress={() => handleSlotFilter(1, 1000, "slot")} >
                    <Text fontFamily='$robotoMedium' fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} >0 - 1000</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={{ borderWidth: 1, borderRadius: 20, borderColor: colors.grayish, paddingHorizontal: 4, paddingVertical: 4 }} onPress={() => handleSlotFilter(10, 10000, "slot")} >
                    <Text fontFamily='$robotoMedium' fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} >10 - 10000</Text>
                  </TouchableOpacity>
                </Box>

              </Box>

              <Box px={moderateScale(15)} borderBottomWidth={1} borderBottomColor={colors.gray5} py={moderateScaleVertical(15)}>
                <Text fontFamily='$robotoBold' fontSize={16} lineHeight={18} color={colors.white} numberOfLines={1} >Prize Pool</Text>

                <Box flexDirection='row' gap={moderateScale(10)} flexWrap='wrap' mt={moderateScaleVertical(10)}>

                  <TouchableOpacity style={{ borderWidth: 1, borderRadius: 20, borderColor: colors.grayish, paddingHorizontal: 5, paddingVertical: 6 }} onPress={() => handleSlotFilter(1, 10000, "priz")}>
                    <Text fontFamily='$robotoMedium' fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} >{'\u20B9'}1 - {'\u20B9'}10,000</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={{ borderWidth: 1, borderRadius: 20, borderColor: colors.grayish, paddingHorizontal: 5, paddingVertical: 6 }} onPress={() => handleSlotFilter(10000, 100000, "priz")}>
                    <Text fontFamily='$robotoMedium' fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} >{'\u20B9'}10,000 - {'\u20B9'}1 Lakh</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={{ borderWidth: 1, borderRadius: 20, borderColor: colors.grayish, paddingHorizontal: 5, paddingVertical: 6 }} onPress={() => handleSlotFilter(100000, 1000000, "priz")}>
                    <Text fontFamily='$robotoMedium' fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} >{'\u20B9'}1 Lakh - {'\u20B9'}10 Lakh</Text>
                  </TouchableOpacity>

                </Box>

              </Box>
            </Body>

            <Box bgColor={colors.white} justifyContent='center' h={moderateScale(80)}>
              <PrimaryButton buttonText='APPLY' textColor={colors.grayish} backgroundColor={colors.lavenderGray} height={moderateScale(35)} marginHorizontal={moderateScale(15)} />
            </Box>
          </Box>
        </Box>
      </Modal>

    </Container>
  )
}

export default PrivateContestList

const localStyles = StyleSheet.create({
  modalCenterView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: deviceHeight * 0.25
  },
  modalView: {
    marginHorizontal: responsiveWidth(5),
    marginVertical: responsiveHeight(2.5),
    backgroundColor: colors.white,
    borderRadius: responsiveWidth(5),
    width: '90%',
    paddingHorizontal: responsiveWidth(8),
    paddingVertical: responsiveHeight(3),
    //  alignItems:'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,

    },
    shadowOpacity: 0.25,
    shadowRadius: responsiveWidth(1.5),
    elevation: 5
  },
  dropdown: {
    borderRadius: moderateScale(6),
    height: moderateScale(30),
    backgroundColor: colors.gray10,
    paddingLeft: moderateScale(10),
    width: moderateScale(150),


  },
  labelStyle: {
    // ...styles.mt15,
  },
  placeholderStyle: {
    fontSize: textScale(12),
    fontFamily: 'Roboto-Medium',
    color: colors.black,
  },
  selectedTextStyle: {
    fontFamily: 'Roboto-Medium',
    fontSize: textScale(12),
    color: colors.black,


  },
  itemContainerStyle: {
    // borderBottomWidth: 1,
  },
})