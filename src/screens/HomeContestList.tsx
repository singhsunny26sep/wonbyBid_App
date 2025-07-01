import {useContext, useEffect, useState} from 'react';
import {FlatList, LogBox, ToastAndroid} from 'react-native';
import {Modal, StyleSheet, TouchableOpacity} from 'react-native';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  Box,
  ChevronDownIcon,
  ChevronUpIcon,
  Pressable,
  Spinner,
  Text,
  Toast,
  ToastTitle,
  useToast,
  View,
} from '@gluestack-ui/themed';
import DatePicker, {
  getToday,
  getFormatedDate,
} from 'react-native-modern-datepicker';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ParamListBase, useNavigation, useRoute} from '@react-navigation/native';
import {
  format,
  parse,
  parseISO,
  subDays,
  isBefore,
  isAfter,
  formatDate,
} from 'date-fns';
import {CloseIcon} from '@gluestack-ui/themed';
import {Icon} from '@gluestack-ui/themed';
import Tooltip from 'rn-tooltip';
import {Slider} from '@narodejesus/react-native-slider';

import Body from '../components/Body/Body';
import {AppBar} from '../components/AppBar';
import {Container} from '../components/Container';
import ContestListCard from '../components/ContestListCard/ContestListCard';
import {colors} from '../constants/colors';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../utils/responsiveSize';
import {
  BackButton,
  FilterIcon,
  MLetterIcon,
  MyMatch15Icon,
  RupeeCircleGreenIcon,
  SingleLetterIcon,
  WalletIcon,
  WinnerIcon,
} from '../components/Icons';
import {NavigationString} from '../navigation/navigationStrings';
import {
  CatergoryTimeSlotTypes,
  deviceHeight,
  formatAmount,
  shadowStyle,
} from '../constants/constant';
import PrimaryButton from '../components/Button/PrimaryButton';
import {BellIcon} from '@gluestack-ui/themed';
import useGetAllContestByCategory from '../hooks/home/get-all-contest-by-category';
import socketServices from '../utils/socketService';
import {FavouriteIcon} from '@gluestack-ui/themed';

import {CheckCircleIcon} from '@gluestack-ui/themed';
import {Image} from '@gluestack-ui/themed';
import {imgIcon} from '../assets/icons';
import CountDown from 'new-react-native-countdown-component';
import CenterLoader from '../components/CenterLoader';
import {AuthContext} from '../utils/authContext';
import CardTimer from '../utils/CardTimer';
import LinearGradient from 'react-native-linear-gradient';
import {
  useNotifyContestInMyMatches,
  useSaveContestInMyMatches,
} from '../hooks/home/save-contest-in-mymatch';
import DateTimePicker from '@react-native-community/datetimepicker';
import Loader from '../components/Loader';
interface MAIN_CATEGORY {
  _id: string;
  category: CATEGORY;
  contests: CONTEST[];
}

interface CONTEST {
  _id: string;
  bonusCashAmount: number;
  bonusCashPercentage: number;
  entryAmount: number;
  isBotSessionIsActive: boolean;
  isUserJoinContest: boolean;
  platformFeeAmount: number;
  platformFeePercentage: number;
  prizeDistribution: {
    prizeAmount: number;
    rank: number;
  }[];
  prizeDistributionAmount: number;
  prizeDistributionPercentage: number;
  rankCount: number;
  rankDistribution: {
    amount: number;
    percentage: number;
    rank: number;
  }[];
  rankPercentage: number;
  slots: number;
  slotsContestFillInfo: {
    slotsFillCount: number;
  };
  state: string;
  timeSlots: {
    _id: string;
    endTime: string;
    startTime: string;
    status: string;
  };
  totalAmount: number;
  type: string;
  typeCashBonus: string;
  upto: number;
  isUserBookMarked: boolean;
  isNotificationActive: boolean;
}

interface CATEGORY {
  __v: number;
  _id: string;
  auctioncategory: string;
  createdAt: string;
  name: string;
  updatedAt: string;
}

const HomeContestList = () => {
  // init
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute();
  const authContext: any = useContext(AuthContext);
  const {cardFrom, catId, categoryName, itemId}: any = route.params;
  const today = new Date();
  const nextDay = subDays(today, 1);
  const toast = useToast();

  const Filter = format(today, 'yyyy-MM-dd');

  // api
  const useSaveContestInMyMatchesMutation = useSaveContestInMyMatches();
  const useNotifyContestInMyMatchesMutation = useNotifyContestInMyMatches();

  // useStates
  const [selectedContestScreen, setSelectedContestScreen] = useState(
    cardFrom === 'mywinnings' || cardFrom === 'mylive' ? 'my' : 'all',
  );
  const [selectedSortBy, setSelectedSortBy] = useState('');
  const [datePickerModel, setDatePickerModel] = useState(false);
  const [datePickerModelEnd, setDatePickerModelEnd] = useState(false);
  const [showFilterModel, setShowFilterModel] = useState(false);
  const [contests, setContests] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [unfavorite, setUnfavorite] = useState(false);
  const [enterFilter, setEnteryFilter] = useState<any>();
  const [spotsFilter, setSpotFilter] = useState<any>(); //spots means slots
  const [prizePoolFilter, setPrizePoolFilter] = useState<any>();
  const [winnerFilter, setwinnerFilter] = useState<any>();

  const [contestTypeFilter, setContestTypeFilter] = useState<
    string | undefined
  >('');

  // filter modal states
  const [startDateFilter, setStartDateFilter] = useState<string | null>('');
  const [endDate, setEndDate] = useState<string | null>('');
  const [slotMin, setSlotMin] = useState<number | null>();
  const [slotMax, setSlotMax] = useState<number | null>();
  const [prizeMin, setPrizeMin] = useState<number | null>();
  const [prizeMax, setPrizeMax] = useState<number | null>();
  const [time, setTime] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  const handleConfirm = (event, selectedTime) => {
    setShowPicker(false);
    if (selectedTime) {
      const formattedTime = selectedTime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
      setTime(formattedTime);
    }
  };

  const callJoinCategoryEvent = async () => {
    setIsLoading(true);
    socketServices.emit('Join_Category', {
      joinCategoryId: itemId,
      categoryStatus: cardFrom,
      filterObj: {
        sortfilterObj: {
          sortByEntryAmount: enterFilter,
          sortBywiningPercentage: winnerFilter,
          sortBySlotSize: spotsFilter,
          sortByPrizePoll: prizePoolFilter,
          contestType: contestTypeFilter,
        },
        sortByRangeFilterObj: {
          dateFilter: {startDate: startDateFilter, endDate: endDate},
          slotFilter: {min: slotMin, max: slotMax},
          prizePoolFilter: {min: prizeMin, max: prizeMax},
        },
      },
    });
    setIsLoading(false);
  };

  const getFilterCount = () => {
    let count = 0;

    // Check each filter and increment count if it's active
    if (enterFilter) count++;
    if (winnerFilter) count++;
    if (prizePoolFilter) count++;
    if (contestTypeFilter) count++;
    if (spotsFilter) count++;
    if (startDateFilter && endDate) count++; // Treat as one filter
    if (slotMin && slotMax) count++; // Treat as one filter
    if (prizeMin && prizeMax) count++; // Treat as one filter

    return count;
  };

  useEffect(() => {
    callJoinCategoryEvent();
  }, [
    enterFilter,
    spotsFilter,
    prizePoolFilter,
    winnerFilter,
    contestTypeFilter,
  ]);
  useEffect(() => {
    if (cardFrom === 'live') {
      socketServices.on('categoryLiveContestList', (data: any) => {
        setContests([...data]);
        setIsLoading(false);
      });

      return () => {
        socketServices.removeListener('categoryLiveContestList');
      };
    }

    if (cardFrom === 'wining') {
      setIsLoading(true);
      socketServices.on('categoryWiningContestList', (data: any) => {
        setContests([...data]);
        setIsLoading(false);
      });

      return () => {
        socketServices.removeListener('categoryWiningContestList');
      };
    }

    if (cardFrom === 'upcoming') {
      setIsLoading(true);

      socketServices.on('categoryUcomingContestList', (data: any) => {
        setContests([...data]);
        setIsLoading(false);
      });

      return () => {
        socketServices.removeListener('categoryUcomingContestList');
      };
    }
  }, []);

  const handleClearFilter = async () => {
    setEnteryFilter(null);
    setSpotFilter(null);
    setPrizePoolFilter(null);
    setwinnerFilter(null);
    callJoinCategoryEvent();
  };
  const handleSlotFilter = async (min: number, max: number, type: string) => {
    if (type == 'slot') {
      setSlotMin(min);
      setSlotMax(max);
    } else {
      setPrizeMin(min);
      setPrizeMax(max);
    }
    callJoinCategoryEvent();
    setShowFilterModel(false);
  };

  const handleClearFiltterRange = async () => {
    setSlotMin(null);
    setSlotMax(null);
    setPrizeMin(null);
    setPrizeMax(null);
    setStartDateFilter(null);
    setEndDate(null);
    setContestTypeFilter('');
    callJoinCategoryEvent();
    setShowFilterModel(false);
  };

  const showToast = (message: string) => {
    return ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  // console.log(contests.contests)

  const handleSaveContest = (
    contestId: string,
    categoryId: string,
    slotId: string,
  ) => {
    useSaveContestInMyMatchesMutation.mutate(
      {contestId: contestId, categoryId, timeslotId: slotId},
      {
        onSuccess: data => {
          if (data?.data?.success) {
            toast.show({
              placement: 'bottom',
              render: ({id}) => {
                const toastId = 'toast-' + id;
                return (
                  <Toast nativeID={toastId} variant="accent" action="success">
                    <ToastTitle>{data?.data?.message}</ToastTitle>
                  </Toast>
                );
              },
            });
          } else {
            toast.show({
              placement: 'bottom',
              render: ({id}) => {
                const toastId = 'toast-' + id;
                return (
                  <Toast nativeID={toastId} variant="accent" action="error">
                    <ToastTitle>{data?.data?.message}</ToastTitle>
                  </Toast>
                );
              },
            });
          }
        },
      },
    );
  };

  const handleNotifyContest = (
    contestId: string,
    categoryId: string,
    slotId: string,
  ) => {
    useNotifyContestInMyMatchesMutation.mutate(
      {contestId: contestId, categoryId, timeslotId: slotId},
      {
        onSuccess: data => {
          if (data?.data?.success) {
            toast.show({
              placement: 'bottom',
              render: ({id}) => {
                const toastId = 'toast-' + id;
                return (
                  <Toast nativeID={toastId} variant="accent" action="success">
                    <ToastTitle>{data?.data?.message}</ToastTitle>
                  </Toast>
                );
              },
            });
          } else {
            toast.show({
              placement: 'bottom',
              render: ({id}) => {
                const toastId = 'toast-' + id;
                return (
                  <Toast nativeID={toastId} variant="accent" action="error">
                    <ToastTitle>{data?.data?.message}</ToastTitle>
                  </Toast>
                );
              },
            });
          }
        },
      },
    );
  };

  // left icon for top bar
  const LeftAppBar = () => {
    return (
      <Box
        flexDirection="row"
        alignItems="center"
        px={moderateScale(10)}
        gap={moderateScale(15)}>
        <Pressable
          hitSlop={22}
          onPress={() => {
            navigation?.goBack();
          }}>
          <BackButton />
        </Pressable>
        <Box>
          <Text
            fontFamily={'$robotoBold'}
            fontSize={16}
            lineHeight={18}
            color={colors.white}
            numberOfLines={1}>
            {categoryName ?? 'N/A'}
          </Text>
        </Box>
      </Box>
    );
  };

  const RightIcon = () => {
    return (
      <Box
        flexDirection="row"
        alignItems="center"
        gap={15}
        w={moderateScale(250)}>
        <Pressable
          onPress={() => navigation.navigate(NavigationString.Notification)}>
          <Box
            flexDirection="row"
            alignItems="center"
            py={8}
            px={7}
            borderRadius={10}
            gap={10}>
            <Icon as={BellIcon} color={colors.white} w="$5" h="$5" />
          </Box>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate(NavigationString.Winners)}>
          <Box
            flexDirection="row"
            alignItems="center"
            py={8}
            px={7}
            borderRadius={10}
            gap={10}>
            <WinnerIcon />
          </Box>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate(NavigationString.MyWallet)}>
          <Box
            flexDirection="row"
            alignItems="center"
            py={7}
            px={7}
            mr={moderateScale(20)}
            borderRadius={10}
            gap={10}>
            <WalletIcon />
          </Box>
        </Pressable>
      </Box>
    );
  };

  if (!contests) {
    return (
      <Container
        statusBarStyle="light-content"
        statusBarBackgroundColor={colors.themeRed}
        backgroundColor="black">
        <AppBar left={<LeftAppBar />} right={<RightIcon />} />
        <Box
          flex={1}
          backgroundColor="black"
          justifyContent="center"
          alignItems="center">
          {/* <Spinner size={'large'} color={colors.gold} /> */}
          <Loader />
        </Box>
      </Container>
    );
  }

  const newArrayLength = contests.reduce((acc, crr) => {
    if (Array.isArray(crr.contests)) {
      acc += crr.contests.length;
    }
    return acc;
  }, 0);

  return (
    <LinearGradient
      colors={[colors.black, colors.gold2]}
      locations={[0.65, 1]}
      useAngle
      angle={205}
      angleCenter={{x: -0.2, y: 0.1}}
      style={{flex: 1}}>
      <Container
        statusBarStyle="light-content"
        statusBarBackgroundColor={colors.themeRed}
        backgroundColor="black">
        <AppBar left={<LeftAppBar />} right={<RightIcon />} />
        {/* date selection button */}
        <Box
          display={
            cardFrom === 'upcoming' || cardFrom === 'wining' ? 'flex' : 'none'
          }
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          pl={moderateScale(15)}
          pr={moderateScale(10)}
          bgColor={colors.black}
          borderBottomWidth={2}
          borderBottomColor={colors.gray6}>
          <Text
            fontFamily={'$robotoBold'}
            fontSize={12}
            lineHeight={14}
            color={colors.grayish}
            numberOfLines={1}
            py={10}>
            Show Upcoming By :
          </Text>
          <Box flexDirection="row" alignItems="center" gap={1}>
            <Pressable
              flexDirection="row"
              alignItems="center"
              gap={3}
              onPress={() => {
                setDatePickerModel(!datePickerModel);
              }}>
              <Text
                fontFamily={'$robotoMedium'}
                fontSize={12}
                lineHeight={14}
                color={colors.grayish}
                numberOfLines={1}
                py={10}>
                {startDateFilter === '' ? 'Select Date' : `${startDateFilter}`}
              </Text>
              {datePickerModel ? (
                <Icon as={ChevronUpIcon} w="$4" h="$4" color={colors.white} />
              ) : (
                <Icon
                  as={ChevronDownIcon}
                  w="$4"
                  h="$4"
                  color={colors.grayish}
                />
              )}
            </Pressable>
            <Pressable
              flexDirection="row"
              alignItems="center"
              gap={3}
              onPress={() => {
                setDatePickerModelEnd(!datePickerModelEnd);
              }}>
              <Text
                fontFamily={'$robotoMedium'}
                fontSize={12}
                lineHeight={14}
                color={colors.grayish}
                numberOfLines={1}
                py={10}>
                {endDate === '' ? 'Select Time' : `${endDate}`}
              </Text>
              {datePickerModelEnd ? (
                <Icon as={ChevronUpIcon} w="$4" h="$4" color={colors.grayish} />
              ) : (
                <Icon
                  as={ChevronDownIcon}
                  w="$4"
                  h="$4"
                  color={colors.grayish}
                />
              )}
            </Pressable>
            <>
              {/* <Pressable 
        style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10 }} 
        onPress={() => setShowPicker(true)}
      >
        <Text style={{ fontSize: 12, color: 'gray' }}>
          {time === '' ? 'Select Time' : time}
        </Text>
        {showPicker ? <ChevronUpIcon size={4} color="gray" /> : <ChevronDownIcon size={4} color="gray" />}
      </Pressable> */}

              {showPicker && (
                <DateTimePicker
                  value={new Date()}
                  mode="time"
                  display="default"
                  onChange={handleConfirm}
                />
              )}
            </>
          </Box>
        </Box>
        {/* =================================================== filter top bar =================================================== */}
        <Box
          w={'100%'}
          backgroundColor="black"
          flexDirection="row"
          alignItems="center"
          alignContent="center"
          borderBottomWidth={1}
          borderBottomColor={colors.gray5}>
          <Box justifyContent="center" flex={0.9}>
            <Text
              fontFamily={'$robotoBold'}
              fontSize={12}
              pl={moderateScale(20)}
              lineHeight={14}
              color={colors.grayish}
              numberOfLines={1}>
              Sort By:
            </Text>
          </Box>
          <Pressable
            onPress={() => {
              setSelectedSortBy('entry'),
                enterFilter == 'max'
                  ? setEnteryFilter('min')
                  : setEnteryFilter('max');
            }}
            flex={0.5}
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            gap={1}>
            <Text
              fontFamily={'$robotoMedium'}
              fontSize={12}
              lineHeight={14}
              color={colors.grayish}
              borderBottomWidth={selectedSortBy === 'entry' ? 2 : 0}
              borderBottomColor={colors.white}
              numberOfLines={1}
              py={10}>
              ENTRY
            </Text>
            <Icon
              as={enterFilter == 'max' ? ArrowDownIcon : ArrowUpIcon}
              w={moderateScale(13)}
              h={moderateScale(13)}
            />
          </Pressable>
          <Pressable
            onPress={() => {
              setSelectedSortBy('spots'),
                spotsFilter == 'max'
                  ? setSpotFilter('min')
                  : setSpotFilter('max');
            }}
            flex={0.8}
            alignItems="center"
            flexDirection="row"
            justifyContent="center"
            gap={1}>
            <Text
              fontFamily={'$robotoMedium'}
              fontSize={12}
              lineHeight={14}
              color={colors.grayish}
              borderBottomWidth={selectedSortBy === 'spots' ? 2 : 0}
              borderBottomColor={colors.white}
              numberOfLines={1}
              py={10}>
              SPOTS
            </Text>
            <Icon
              as={spotsFilter == 'max' ? ArrowDownIcon : ArrowUpIcon}
              w={moderateScale(13)}
              h={moderateScale(13)}
            />
          </Pressable>
          <Pressable
            onPress={() => {
              setSelectedSortBy('prizepool');
              prizePoolFilter == 'max'
                ? setPrizePoolFilter('min')
                : setPrizePoolFilter('max');
            }}
            flex={0.9}
            alignItems="center"
            flexDirection="row"
            justifyContent="center"
            gap={1}
            bgColor="black" // Background black kar diya
          >
            <Text
              fontFamily="$robotoMedium"
              fontSize={12}
              lineHeight={14}
              color={colors.grayish}
              borderBottomWidth={selectedSortBy === 'prizepool' ? 2 : 0}
              borderBottomColor={
                selectedSortBy === 'prizepool' ? 'gold' : 'transparent'
              } // Active border gold kiya
              numberOfLines={1}
              py={10}>
              PRIZE POOL
            </Text>
            <Icon
              as={prizePoolFilter == 'max' ? ArrowDownIcon : ArrowUpIcon}
              w={moderateScale(13)}
              h={moderateScale(13)}
              color="gold"
            />
          </Pressable>
          <Pressable
            onPress={() => {
              setSelectedSortBy('winners'),
                winnerFilter == 'max'
                  ? setwinnerFilter('min')
                  : setwinnerFilter('max');
            }}
            flex={0.9}
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            gap={1}>
            <Text
              fontFamily={'$robotoMedium'}
              fontSize={12}
              lineHeight={14}
              color={colors.grayish}
              borderBottomWidth={selectedSortBy === 'winners' ? 2 : 0}
              borderBottomColor={colors.themeRed}
              numberOfLines={1}
              py={10}>
              {' '}
              %WINNERS
            </Text>
            <Icon
              as={winnerFilter == 'max' ? ArrowDownIcon : ArrowUpIcon}
              w={moderateScale(13)}
              h={moderateScale(13)}
            />
          </Pressable>
          {/* <Pressable onPress={() => setShowFilterModel(true)} bgColor={colors.black} alignItems='center' justifyContent='center' flex={0.5} py={10}>
            <FilterIcon />
          </Pressable> */}
        </Box>
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          bgColor={colors.black}
          px={moderateScale(15)}
          py={moderateScaleVertical(10)}>
          <Text
            fontFamily={'$robotoMedium'}
            fontSize={12}
            lineHeight={14}
            color={colors.grayish}
            numberOfLines={1}>
            {newArrayLength} contests
          </Text>
          <Box flexDirection="row" alignItems="center" gap={moderateScale(15)}>
            <Text
              fontFamily={'$robotoMedium'}
              fontSize={12}
              lineHeight={14}
              color={colors.grayish}
              numberOfLines={1}>
              {getFilterCount()} Sort Applied
            </Text>
            <TouchableOpacity onPress={handleClearFilter}>
              <Text
                fontFamily={'$robotoBold'}
                fontSize={16}
                lineHeight={18}
                color={colors.gray6}
                numberOfLines={1}>
                CLEAR
              </Text>
            </TouchableOpacity>
          </Box>
        </Box>
        {/* <Box backgroundColor='black' > */}
        <Box flex={1}>
          {isLoading ? (
            <>
              <Box flex={1} justifyContent="center" alignItems="center">
                <Loader />
              </Box>
            </>
          ) : (
            <>
              <FlatList
                data={(contests?.length as number) > 0 ? contests : []}
                renderItem={({
                  item,
                  index,
                }: {
                  item: MAIN_CATEGORY;
                  index: number;
                }) => {
                  const cotegoryId = item?.category?._id;
                  return (
                    <Box
                      key={item?._id}
                      backgroundColor={colors.black}
                      py={moderateScaleVertical(10)}>
                      <Text
                        fontFamily={'$robotoBold'}
                        fontSize={18}
                        lineHeight={20}
                        color={colors.white}
                        numberOfLines={1}
                        px={moderateScale(15)}
                        pb={moderateScaleVertical(10)}>
                        {item?.category?.name}
                      </Text>
                      {isLoading ? (
                        <>
                          <Loader />
                        </>
                      ) : (
                        <>
                          <Box gap={15} backgroundColor="black">
                            {item?.contests?.length > 0 ? (
                              <>
                                {item?.contests?.map(
                                  (item: CONTEST, index: number) => {
                                    const startTimeString =
                                      new Date()?.toISOString();

                                    return (
                                      <Box
                                        backgroundColor="black"
                                        key={item._id}
                                        px={moderateScale(15)}>
                                        <Box
                                          backgroundColor={colors.black}
                                          borderRightWidth={1}
                                          borderLeftWidth={1}
                                          borderStartStartRadius={14}
                                          borderColor={colors.gold}
                                          borderEndEndRadius={1}
                                          pt={10}
                                          gap={8}
                                          borderRadius={10}
                                          overflow="hidden">
                                          <Pressable
                                            gap={8}
                                            onPress={() =>
                                              navigation.navigate(
                                                NavigationString.ViewHomeContest,
                                                {
                                                  flexible: true ? 'Yes' : 'No',
                                                  cardFrom: cardFrom,
                                                  contestId: item?._id,
                                                  slotId: item?.timeSlots?._id,
                                                  isUserJoinContest:
                                                    item?.isUserJoinContest,
                                                },
                                              )
                                            }>
                                            <Box
                                              display={
                                                cardFrom === 'upcoming'
                                                  ? 'flex'
                                                  : 'none'
                                              }
                                              flexDirection="row"
                                              alignItems="center"
                                              justifyContent="space-between"
                                              px={moderateScale(10)}>
                                              <Pressable
                                                style={{
                                                  flexDirection: 'row',
                                                  alignItems: 'center',
                                                  justifyContent: 'center',
                                                }}
                                                hitSlop={20}
                                                onPress={() => {
                                                  handleSaveContest(
                                                    item?._id,
                                                    cotegoryId,
                                                    item?.timeSlots?._id,
                                                  );
                                                }}>
                                                {item?.isFavorite ? (
                                                  <Icon
                                                    as={FavouriteIcon}
                                                    fill={colors.white}
                                                    w="$5"
                                                    h="$5"
                                                    color={colors.white}
                                                  />
                                                ) : (
                                                  <Icon
                                                    fill={colors.black}
                                                    as={FavouriteIcon}
                                                    w="$5"
                                                    h="$5"
                                                    color={colors.white}
                                                  />
                                                )}
                                                <Text
                                                  style={{
                                                    color: colors.white,
                                                    fontSize: 14,
                                                    marginLeft: 5,
                                                    marginBottom: 2,
                                                  }}>
                                                  {item?.favoriteCount}
                                                </Text>
                                              </Pressable>
                                              {/* <Pressable
                                            hitSlop={20}
                                            onPress={() => {
                                              handleSaveContest(
                                                item?._id,
                                                cotegoryId,
                                                item?.timeSlots?._id,
                                              );
                                            }}>
                                            {item?.isNotificationActive ? (
                                              <Icon
                                                as={BellIcon}
                                                fill={colors.white}
                                                w="$5"
                                                h="$5"
                                                color={colors.white}
                                              />
                                            ) : (
                                              <Icon
                                                as={BellIcon}
                                                w="$5"
                                                h="$5"
                                                color={colors.white}
                                              />
                                            )}
                                          </Pressable> */}
                                            </Box>
                                            <Box
                                              flexDirection="row"
                                              alignItems="center"
                                              px={10}>
                                              <Box
                                                flex={0.8}
                                                alignItems="flex-start">
                                                <Text
                                                  fontFamily={'$robotoMedium'}
                                                  fontSize={12}
                                                  lineHeight={14}
                                                  color={colors.gold}
                                                  numberOfLines={1}>
                                                  Prize Pool
                                                </Text>
                                              </Box>
                                              <Box
                                                alignItems="flex-end"
                                                flex={0.6}>
                                                <Box
                                                  flexDirection="row"
                                                  alignItems="center"
                                                  gap={moderateScale(10)}>
                                                  <Text
                                                    fontFamily={'$robotoMedium'}
                                                    fontSize={12}
                                                    lineHeight={14}
                                                    color={colors.gray4}
                                                    numberOfLines={1}>
                                                    Entry
                                                  </Text>
                                                  {(cardFrom === 'live' ||
                                                    cardFrom === 'wining') && (
                                                    <Icon
                                                      as={CheckCircleIcon}
                                                      w="$3"
                                                      h="$3"
                                                      color={colors.greenText}
                                                    />
                                                  )}
                                                </Box>
                                              </Box>
                                            </Box>

                                            <Box
                                              flexDirection="row"
                                              alignItems="center"
                                              px={10}>
                                              <Text
                                                fontFamily={'$robotoBold'}
                                                fontSize={20}
                                                lineHeight={22}
                                                color={colors.white}
                                                numberOfLines={1}
                                                flex={1}
                                                mt={5}>
                                                {'\u20B9'}
                                                {formatAmount(
                                                  Number(
                                                    item?.prizeDistributionAmount,
                                                  ),
                                                )}{' '}
                                              </Text>
                                              <Box alignItems="center" flex={1}>
                                                {cardFrom === 'live' && (
                                                  <>
                                                    <CardTimer
                                                      endTime={
                                                        item?.timeSlots?.endTime
                                                      }
                                                      color={colors.red}
                                                      startTime={
                                                        item?.timeSlots
                                                          ?.startTime
                                                      }
                                                    />
                                                  </>
                                                )}

                                                {cardFrom === 'upcoming' && (
                                                  <>
                                                    <Text
                                                      fontFamily="$robotoMedium"
                                                      fontSize={12}
                                                      lineHeight={14}
                                                      color={colors.dimGray}
                                                      numberOfLines={2}
                                                      textAlign="center">
                                                      {format(
                                                        item?.timeSlots
                                                          ?.startTime,
                                                        'yyyy-MM-dd',
                                                      ) ===
                                                      format(
                                                        new Date(),
                                                        'yyyy-MM-dd',
                                                      ) ? (
                                                        <CardTimer
                                                          endTime={
                                                            item?.timeSlots
                                                              ?.startTime
                                                          }
                                                          color={colors.red}
                                                        />
                                                      ) : (
                                                        format(
                                                          item?.timeSlots
                                                            ?.startTime,
                                                          'hh:mm a',
                                                        )
                                                      )}
                                                    </Text>
                                                    <Text
                                                      fontFamily={
                                                        '$robotoMedium'
                                                      }
                                                      fontSize={12}
                                                      lineHeight={14}
                                                      color={colors.dimGray}
                                                      numberOfLines={2}
                                                      textAlign="center">
                                                      {format(
                                                        item?.timeSlots
                                                          ?.startTime,
                                                        'dd MMM yyyy',
                                                      )}
                                                    </Text>
                                                  </>
                                                )}

                                                {cardFrom === 'wining' && (
                                                  <>
                                                    <Text
                                                      fontFamily={
                                                        '$poppinsMedium'
                                                      }
                                                      fontSize={12}
                                                      lineHeight={14}
                                                      color={'#c20c0d'}
                                                      numberOfLines={1}>
                                                      {formatDate(
                                                        item?.timeSlots
                                                          ?.endTime,
                                                        'hh:mm a',
                                                      )}
                                                    </Text>
                                                    <Text
                                                      fontFamily={
                                                        '$robotoMedium'
                                                      }
                                                      fontSize={12}
                                                      lineHeight={14}
                                                      color={colors.dimGray}
                                                      numberOfLines={2}
                                                      textAlign="center">
                                                      {format(
                                                        item?.timeSlots
                                                          ?.endTime,
                                                        'dd MMM yyyy',
                                                      )}
                                                    </Text>
                                                  </>
                                                )}
                                              </Box>
                                              {true ? (
                                                <Box
                                                  flex={1}
                                                  alignItems="flex-end">
                                                  <Pressable
                                                    onPress={() =>
                                                      navigation.navigate(
                                                        NavigationString.ViewHomeContest,
                                                        {
                                                          flexible: true
                                                            ? 'Yes'
                                                            : 'No',
                                                          cardFrom: cardFrom,
                                                          contestId: item?._id,
                                                          slotId:
                                                            item?.timeSlots
                                                              ?._id,
                                                          isUserJoinContest:
                                                            item?.isUserJoinContest,
                                                        },
                                                      )
                                                    }
                                                    height={moderateScale(32)}
                                                    width={moderateScale(75)}
                                                    backgroundColor={
                                                      colors.greenText
                                                    }
                                                    alignItems="center"
                                                    justifyContent="center"
                                                    borderRadius={moderateScale(
                                                      8,
                                                    )}>
                                                    <Text
                                                      fontFamily={
                                                        '$robotoMedium'
                                                      }
                                                      fontSize={16}
                                                      lineHeight={18}
                                                      color={colors.white}
                                                      numberOfLines={1}
                                                      textAlign="center">
                                                      {'\u20B9'}{' '}
                                                      {formatAmount(
                                                        Number(
                                                          item?.entryAmount,
                                                        ),
                                                      )}
                                                    </Text>
                                                  </Pressable>
                                                </Box>
                                              ) : (
                                                <Box
                                                  flex={0.6}
                                                  alignItems="flex-end">
                                                  <Pressable
                                                    flexDirection="row"
                                                    alignItems="center"
                                                    justifyContent="center"
                                                    w={moderateScale(75)}
                                                    h={moderateScale(32)}
                                                    bgColor={colors.greenText}
                                                    borderRadius={moderateScale(
                                                      5,
                                                    )}
                                                    gap={moderateScale(4)}>
                                                    <Image
                                                      alt="icon"
                                                      source={imgIcon.bCoin}
                                                      w={moderateScale(14)}
                                                      h={moderateScale(14)}
                                                      resizeMode="contain"
                                                    />
                                                    <Text
                                                      fontFamily={
                                                        '$robotoMedium'
                                                      }
                                                      fontSize={16}
                                                      lineHeight={18}
                                                      color={colors.white}
                                                      numberOfLines={1}>
                                                      20
                                                    </Text>
                                                  </Pressable>
                                                </Box>
                                              )}
                                            </Box>

                                            <Slider
                                              disabled={true}
                                              minimumValue={0}
                                              maximumValue={item?.slots}
                                              maximumTrackTintColor={'#fdebeb'}
                                              minimumTrackTintColor={
                                                colors.gold
                                              }
                                              maximumTrackStyle={{
                                                height: moderateScale(6),
                                              }}
                                              minimumTrackStyle={{
                                                height: moderateScale(6),
                                              }}
                                              thumbTintColor="transparent"
                                              value={
                                                item?.slotsContestFillInfo
                                                  ?.slotsFillCount
                                              }
                                              onValueChange={value => {}}
                                              containerStyle={{
                                                height: moderateScale(12),
                                                marginHorizontal:
                                                  moderateScale(10),
                                              }}
                                            />
                                            <Box
                                              flexDirection="row"
                                              alignItems="center"
                                              justifyContent="space-between"
                                              px={10}>
                                              <Text
                                                fontFamily={'$robotoMedium'}
                                                fontSize={12}
                                                lineHeight={14}
                                                color={colors.white}
                                                numberOfLines={1}>
                                                {(() => {
                                                  const totalSlots =
                                                    item?.slots ?? 0; // Default to 0 if undefined
                                                  const filledSlots =
                                                    item?.slotsContestFillInfo
                                                      ?.slotsFillCount ?? 0; // Default to 0 if undefined
                                                  const leftSlots =
                                                    totalSlots - filledSlots; // Calculate left slots
                                                  return `${
                                                    leftSlots > 0
                                                      ? leftSlots
                                                      : 0
                                                  } spots left`; // Ensure no negative values
                                                })()}
                                              </Text>
                                              <Text
                                                fontFamily={'$robotoMedium'}
                                                fontSize={12}
                                                lineHeight={14}
                                                color={colors.gray4}
                                                numberOfLines={1}>
                                                {' '}
                                                {item?.slots == 'undefined'
                                                  ? 0
                                                  : item?.slots}{' '}
                                                spots
                                              </Text>
                                            </Box>
                                          </Pressable>
                                          <Box
                                            flexDirection="row"
                                            alignItems="center"
                                            justifyContent="space-between"
                                            backgroundColor={colors.black}
                                            px={10}
                                            py={15}>
                                            <Box
                                              flexDirection="row"
                                              alignItems="center"
                                              gap={10}
                                              backgroundColor="black">
                                              <Tooltip
                                                actionType="press"
                                                withOverlay={false}
                                                backgroundColor={
                                                  colors.themeBlue
                                                }
                                                height={moderateScale(30)}
                                                popover={
                                                  <Text
                                                    fontFamily={'$robotoMedium'}
                                                    fontSize={12}
                                                    lineHeight={14}
                                                    color={colors.white}
                                                    numberOfLines={1}>
                                                    First Prize = {'\u20B9'}
                                                    {formatAmount(
                                                      item?.prizeDistribution[0]
                                                        ?.prizeAmount,
                                                    )}
                                                  </Text>
                                                }>
                                                <Box
                                                  flexDirection="row"
                                                  alignItems="center"
                                                  gap={3}>
                                                  <Image
                                                    alt="icon"
                                                    source={imgIcon.prize1}
                                                    w={moderateScale(15)}
                                                    h={moderateScale(15)}
                                                    resizeMode="contain"
                                                  />
                                                  <Text
                                                    fontFamily={'$robotoMedium'}
                                                    fontSize={12}
                                                    lineHeight={14}
                                                    color={colors.gray4}
                                                    numberOfLines={1}>
                                                    {'\u20B9'}
                                                    {formatAmount(
                                                      item?.rankDistribution[0]
                                                        ?.amount,
                                                    )}
                                                  </Text>
                                                </Box>
                                              </Tooltip>
                                              <Tooltip
                                                actionType="press"
                                                withOverlay={false}
                                                backgroundColor={
                                                  colors.themeBlue
                                                }
                                                height={moderateScale(30)}
                                                width={moderateScale(170)}
                                                popover={
                                                  <Text
                                                    fontFamily={'$robotoMedium'}
                                                    fontSize={12}
                                                    lineHeight={14}
                                                    color={colors.white}
                                                    numberOfLines={1}>
                                                    {
                                                      item?.prizeDistributionPercentage
                                                    }{' '}
                                                    teams win the contest
                                                  </Text>
                                                }>
                                                <Box
                                                  flexDirection="row"
                                                  alignItems="center"
                                                  gap={3}>
                                                  <MyMatch15Icon />
                                                  <Text
                                                    fontFamily={'$robotoMedium'}
                                                    fontSize={12}
                                                    lineHeight={14}
                                                    color={colors.gray4}
                                                    numberOfLines={1}>
                                                    {item?.rankPercentage}%
                                                  </Text>
                                                </Box>
                                              </Tooltip>
                                              <Tooltip
                                                actionType="press"
                                                withOverlay={false}
                                                backgroundColor={
                                                  colors.themeBlue
                                                }
                                                height={moderateScale(50)}
                                                width={moderateScale(170)}
                                                popover={
                                                  <Text
                                                    fontFamily={'$robotoMedium'}
                                                    fontSize={12}
                                                    lineHeight={14}
                                                    color={colors.white}
                                                    numberOfLines={2}>
                                                    Max {item?.upto} entries per
                                                    user in this contest
                                                  </Text>
                                                }>
                                                <Box
                                                  flexDirection="row"
                                                  alignItems="center"
                                                  gap={3}>
                                                  {true ? (
                                                    <MLetterIcon />
                                                  ) : (
                                                    <SingleLetterIcon />
                                                  )}
                                                  <Text
                                                    fontFamily={'$robotoMedium'}
                                                    fontSize={12}
                                                    lineHeight={14}
                                                    color={colors.gray4}
                                                    numberOfLines={1}>
                                                    Upto {item?.upto}
                                                  </Text>
                                                </Box>
                                              </Tooltip>

                                              <Tooltip
                                                actionType="press"
                                                withOverlay={false}
                                                backgroundColor={
                                                  colors.themeBlue
                                                }
                                                height={moderateScale(35)}
                                                width={moderateScale(270)}
                                                popover={
                                                  <Text
                                                    fontFamily={'$robotoMedium'}
                                                    fontSize={12}
                                                    lineHeight={14}
                                                    color={colors.white}
                                                    numberOfLines={2}>
                                                    You can use 4.3 cash bonus
                                                    for every entry
                                                  </Text>
                                                }>
                                                <Box
                                                  flexDirection="row"
                                                  alignItems="center"
                                                  gap={3}>
                                                  <Image
                                                    alt="icon"
                                                    source={imgIcon.bCoin}
                                                    w={moderateScale(12)}
                                                    h={moderateScale(12)}
                                                    alignSelf="baseline"
                                                    resizeMode="contain"
                                                  />
                                                  <Text
                                                    fontFamily={'$robotoMedium'}
                                                    fontSize={12}
                                                    lineHeight={14}
                                                    color={colors.gray4}
                                                    numberOfLines={1}>
                                                    Use{' '}
                                                    {item?.entryAmount *
                                                      (item?.bonusCashPercentage /
                                                        100)}
                                                  </Text>
                                                </Box>
                                              </Tooltip>
                                            </Box>
                                            <Tooltip
                                              actionType="press"
                                              withOverlay={false}
                                              backgroundColor={colors.themeBlue}
                                              height={moderateScale(50)}
                                              width={moderateScale(270)}
                                              popover={
                                                <Text
                                                  fontFamily={'$robotoMedium'}
                                                  fontSize={12}
                                                  lineHeight={14}
                                                  color={colors.white}
                                                  numberOfLines={2}>
                                                  {true
                                                    ? 'Take Place even if 2 spots fill, and the Prize Pool will depend on how many spots are filled.'
                                                    : 'Guaranteed to take place regardless of spots filed.'}
                                                </Text>
                                              }>
                                              <Box
                                                flexDirection="row"
                                                alignItems="center"
                                                gap={5}>
                                                {true ? (
                                                  <RupeeCircleGreenIcon />
                                                ) : (
                                                  <Icon
                                                    as={CheckCircleIcon}
                                                    w="$4"
                                                    h="$4"
                                                    color={colors.greenText}
                                                  />
                                                )}
                                                <Text
                                                  fontFamily={'$robotoBold'}
                                                  fontSize={12}
                                                  lineHeight={14}
                                                  color={colors.dimGray}
                                                  numberOfLines={1}>
                                                  {true
                                                    ? 'Flexible'
                                                    : 'Guaranteed'}
                                                </Text>
                                              </Box>
                                            </Tooltip>
                                          </Box>
                                        </Box>
                                      </Box>
                                    );
                                  },
                                )}
                              </>
                            ) : (
                              <>
                                <Text
                                  style={{
                                    color: colors.gold,
                                    textAlign: 'center',
                                    marginTop: 200,
                                  }}>
                                  NO Contest Found
                                </Text>
                              </>
                            )}
                          </Box>
                        </>
                      )}
                    </Box>
                  );
                }}
                keyExtractor={(item: any, index: number) => index?.toString()}
                style={{flex: 1, backgroundColor: colors.black}}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{gap: responsiveWidth(3), flexGrow: 1}}
                ListEmptyComponent={() => {
                  if (isLoading) {
                    return (
                      <Box flex={1} justifyContent="center" alignItems="center">
                        <Spinner size="large" color={colors.themeRed} />
                      </Box>
                    );
                  }

                  return (
                    <Box flex={1} justifyContent="center" alignItems="center">
                      <Text
                        fontSize={18}
                        color={colors.black}
                        lineHeight={22}
                        fontFamily="$poppinsSemiBold">
                        No Contest Found
                      </Text>
                    </Box>
                  );
                }}
              />
            </>
          )}
        </Box>

        <Modal
          animationType="slide"
          transparent={true}
          visible={unfavorite}
          onRequestClose={() => setUnfavorite(false)}>
          <Box
            flex={1}
            backgroundColor="rgba(0, 0, 0, 0.5)"
            alignItems="center"
            justifyContent="center">
            <Box
              backgroundColor={colors.white}
              borderRadius={10}
              w={'90%'}
              gap={15}
              py={20}>
              {/* Are you sure you want to turn off notifications for these Contest */}
              <Text
                fontFamily={'$robotoMedium'}
                fontSize={16}
                lineHeight={18}
                color={colors.black}
                numberOfLines={3}
                mx={moderateScale(10)}
                textAlign="center">
                Are you sure ,you want to remove this contest from your
                favorites?
              </Text>

              <Box
                flexDirection="row"
                alignItems="center"
                mx={moderateScale(10)}
                gap={moderateScale(15)}>
                <PrimaryButton
                  buttonText="Yes"
                  onPress={() => {
                    setUnfavorite(false);
                  }}
                  backgroundColor={colors.gray7}
                  height={moderateScale(45)}
                  flex={1}
                  alignSelf="center"
                  marginTop={moderateScaleVertical(5)}
                />
                <PrimaryButton
                  buttonText="No"
                  onPress={() => {}}
                  backgroundColor={colors.themeRed}
                  height={moderateScale(45)}
                  flex={1}
                  alignSelf="center"
                  marginTop={moderateScaleVertical(5)}
                />
              </Box>
            </Box>
          </Box>
        </Modal>

        {/* =============================== calender view =============================== */}
        {/* start date */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={datePickerModel}>
          <Box style={localStyles.modalCenterView}>
            <Box style={localStyles.modalView}>
              <DatePicker
                mode="calendar"
                options={{mainColor: colors.themeRed}}
                selected={startDateFilter}
                onDateChange={(propDate: any) => {
                  const parsedDate = parse(propDate, 'yyyy/MM/dd', new Date());
                  const formattedStartDate = format(parsedDate, 'yyyy-MM-dd');

                  if (
                    isAfter(new Date(formattedStartDate), new Date(endDate))
                  ) {
                    ToastAndroid.show(
                      'Start date cannot be later than end date',
                      ToastAndroid.SHORT,
                    ); // Android toast
                    return;
                  }
                  setStartDateFilter(formattedStartDate);
                }}
                minimumDate={Filter}
              />

              <Box
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    setDatePickerModel(false);
                  }}>
                  <Text
                    style={{
                      color: colors.black,
                      fontSize: textScale(12),
                      fontFamily: 'Roboto-medium',
                    }}>
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setDatePickerModel(false);
                    endDate && callJoinCategoryEvent();
                  }}
                  style={{
                    backgroundColor: colors.themeRed,
                    paddingHorizontal: responsiveWidth(2.5),
                    paddingVertical: responsiveHeight(0.5),
                    borderRadius: responsiveWidth(2),
                  }}>
                  <Text
                    style={{
                      color: colors.white,
                      fontSize: textScale(14),
                      fontFamily: 'Roboto-medium',
                    }}>
                    Done
                  </Text>
                </TouchableOpacity>
              </Box>
            </Box>
          </Box>
        </Modal>

        {/* end Date */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={datePickerModelEnd}>
          <Box style={localStyles.modalCenterView}>
            <Box style={localStyles.modalView}>
              <DatePicker
                mode="calendar"
                options={{mainColor: colors.themeRed}}
                selected={endDate}
                onDateChange={(propDate: any) => {
                  const parsedDate = parse(propDate, 'yyyy/MM/dd', new Date());
                  const formattedEndDate = format(parsedDate, 'yyyy-MM-dd');

                  if (
                    isBefore(
                      new Date(formattedEndDate),
                      new Date(startDateFilter),
                    )
                  ) {
                    ToastAndroid.show(
                      'End date cannot be earlier than start date',
                      ToastAndroid.SHORT,
                    ); // Android toast
                    return;
                  }
                  setEndDate(formattedEndDate);
                }}
                minimumDate={Filter}
              />

              <Box
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    setDatePickerModelEnd(false);
                  }}>
                  <Text
                    style={{
                      color: colors.black,
                      fontSize: textScale(12),
                      fontFamily: 'Roboto-medium',
                    }}>
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setDatePickerModelEnd(false);
                    startDateFilter && callJoinCategoryEvent();
                  }}
                  style={{
                    backgroundColor: colors.themeRed,
                    paddingHorizontal: responsiveWidth(2.5),
                    paddingVertical: responsiveHeight(0.5),
                    borderRadius: responsiveWidth(2),
                  }}>
                  <Text
                    style={{
                      color: colors.white,
                      fontSize: textScale(14),
                      fontFamily: 'Roboto-medium',
                    }}>
                    Done
                  </Text>
                </TouchableOpacity>
              </Box>
            </Box>
          </Box>
        </Modal>

        {/* ==================================================== filter modal ==================================================== */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showFilterModel}
          onRequestClose={() => setShowFilterModel(false)}>
          <Box flex={1} backgroundColor="rgba(9, 1, 1, 0.5)">
            <Box
              backgroundColor={colors.black}
              borderTopLeftRadius={10}
              borderTopRightRadius={10}
              w={'100%'}
              gap={15}
              h={moderateScale(640)}
              marginTop={deviceHeight * 0.4}
              overflow="hidden">
              <Box
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                bgColor={colors.black}
                borderWidth={0.3}
                borderColor="white"
                py={moderateScaleVertical(15)}
                px={moderateScale(15)}>
                <Pressable onPress={() => setShowFilterModel(false)}>
                  <Icon as={CloseIcon} size="lg" color={colors.red} />
                </Pressable>
                <Text
                  fontFamily="$robotoBold"
                  fontSize={16}
                  lineHeight={18}
                  color={colors.white}
                  numberOfLines={1}>
                  Filter
                </Text>
                <TouchableOpacity onPress={handleClearFiltterRange}>
                  <Text
                    fontFamily="$robotoBold"
                    fontSize={16}
                    lineHeight={18}
                    color={colors.white}
                    numberOfLines={1}>
                    CLEAR
                  </Text>
                </TouchableOpacity>
              </Box>

              <Body>
                <Box
                  px={moderateScale(15)}
                  borderBottomColor={colors.gray5}
                  py={moderateScaleVertical(15)}>
                  <Text
                    fontFamily="$robotoBold"
                    fontSize={16}
                    lineHeight={18}
                    color={colors.white}
                    numberOfLines={1}>
                    Spots
                  </Text>

                  <Box
                    flexDirection="row"
                    gap={moderateScale(10)}
                    flexWrap="wrap"
                    mt={moderateScaleVertical(10)}>
                    <TouchableOpacity
                      style={{
                        borderRightWidth: 1,
                        borderLeftWidth: 1,
                        borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 10,
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                        borderColor: colors.white,
                        paddingHorizontal: 5,
                        paddingVertical: 6,
                      }}
                      onPress={() => handleSlotFilter(1, 1000, 'slot')}>
                      <Text
                        fontFamily="$robotoMedium"
                        fontSize={14}
                        lineHeight={16}
                        color={colors.white}
                        numberOfLines={1}>
                        0 - 1000
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        borderRightWidth: 1,
                        borderLeftWidth: 1,
                        borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 10,
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                        borderColor: colors.white,
                        paddingHorizontal: 5,
                        paddingVertical: 6,
                      }}
                      onPress={() => handleSlotFilter(10, 10000, 'slot')}>
                      <Text
                        fontFamily="$robotoMedium"
                        fontSize={14}
                        lineHeight={16}
                        color={colors.white}
                        numberOfLines={1}>
                        10 - 10000
                      </Text>
                    </TouchableOpacity>
                  </Box>
                </Box>
                <Box
                  px={moderateScale(15)}
                  borderBottomColor={colors.gray5}
                  py={moderateScaleVertical(15)}>
                  <Text
                    fontFamily="$robotoBold"
                    fontSize={16}
                    lineHeight={18}
                    color={colors.white}
                    numberOfLines={1}>
                    Prize Pool
                  </Text>
                  <Box
                    flexDirection="row"
                    gap={moderateScale(10)}
                    flexWrap="wrap"
                    mt={moderateScaleVertical(10)}>
                    <TouchableOpacity
                      style={{
                        borderRightWidth: 1,
                        borderLeftWidth: 1,
                        borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 10,
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                        borderColor: colors.white,
                        paddingHorizontal: 5,
                        paddingVertical: 6,
                      }}
                      onPress={() => handleSlotFilter(1, 10000, 'priz')}>
                      <Text
                        fontFamily="$robotoMedium"
                        fontSize={14}
                        lineHeight={16}
                        color={colors.white}
                        numberOfLines={1}>
                        {'\u20B9'}1 - {'\u20B9'}10,000
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        borderRightWidth: 1,
                        borderLeftWidth: 1,
                        borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 10,
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                        borderColor: colors.white,
                        paddingHorizontal: 5,
                        paddingVertical: 6,
                      }}
                      onPress={() => handleSlotFilter(10000, 100000, 'priz')}>
                      <Text
                        fontFamily="$robotoMedium"
                        fontSize={14}
                        lineHeight={16}
                        color={colors.white}
                        numberOfLines={1}>
                        {'\u20B9'}10,000 - {'\u20B9'}1 Lakh
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        borderRightWidth: 1,
                        borderLeftWidth: 1,
                        borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 10,
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                        borderColor: colors.white,
                        paddingHorizontal: 5,
                        paddingVertical: 6,
                      }}
                      onPress={() => handleSlotFilter(100000, 1000000, 'priz')}>
                      <Text
                        fontFamily="$robotoMedium"
                        fontSize={14}
                        lineHeight={16}
                        color={colors.white}
                        numberOfLines={1}>
                        {'\u20B9'}1 Lakh - {'\u20B9'}10 Lakh
                      </Text>
                    </TouchableOpacity>
                  </Box>
                </Box>

                <Box
                  px={moderateScale(15)}
                  borderBottomColor={colors.gray5}
                  py={moderateScaleVertical(15)}>
                  <Text
                    fontFamily="$robotoBold"
                    fontSize={16}
                    lineHeight={18}
                    color={colors.white}
                    numberOfLines={1}>
                    Contest Type
                  </Text>

                  <Box
                    flexDirection="row"
                    gap={moderateScale(10)}
                    flexWrap="wrap"
                    mt={moderateScaleVertical(10)}>
                    <TouchableOpacity
                      style={{
                        borderRightWidth: 1,
                        borderLeftWidth: 1,
                        borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 10,
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                        borderColor: colors.white,
                        paddingHorizontal: 5,
                        paddingVertical: 6,
                      }}
                      onPress={() => {
                        setContestTypeFilter('realCash'),
                          setShowFilterModel(false);
                      }}>
                      <Text
                        fontFamily="$robotoMedium"
                        fontSize={14}
                        lineHeight={16}
                        color={colors.white}
                        numberOfLines={1}>
                        Real Cash
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        borderRightWidth: 1,
                        borderLeftWidth: 1,
                        borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 10,
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                        borderColor: colors.white,
                        paddingHorizontal: 5,
                        paddingVertical: 6,
                      }}
                      onPress={() => {
                        setContestTypeFilter('bonusCash'),
                          setShowFilterModel(false);
                      }}>
                      <Text
                        fontFamily="$robotoMedium"
                        fontSize={14}
                        lineHeight={16}
                        color={colors.white}
                        numberOfLines={1}>
                        Bonus Cash
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        borderRightWidth: 1,
                        borderLeftWidth: 1,
                        borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 10,
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                        borderColor: colors.white,
                        paddingHorizontal: 5,
                        paddingVertical: 6,
                      }}
                      onPress={() => {
                        setContestTypeFilter('freeContest'),
                          setShowFilterModel(false);
                      }}>
                      <Text
                        fontFamily="$robotoMedium"
                        fontSize={14}
                        lineHeight={16}
                        color={colors.white}
                        numberOfLines={1}>
                        Free Contest
                      </Text>
                    </TouchableOpacity>
                  </Box>
                </Box>
              </Body>

              <Box
                bgColor={colors.white}
                justifyContent="center"
                h={moderateScale(80)}>
                <PrimaryButton
                  buttonText="APPLY"
                  textColor={colors.grayish}
                  backgroundColor={colors.greenText}
                  height={moderateScale(35)}
                  marginHorizontal={moderateScale(15)}
                />
              </Box>
            </Box>
          </Box>
        </Modal>

        <CenterLoader loading={useSaveContestInMyMatchesMutation?.isPending} />
      </Container>
    </LinearGradient>
  );
};

export default HomeContestList;

const localStyles = StyleSheet.create({
  modalCenterView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: deviceHeight * 0.25,
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
    elevation: 5,
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
});
