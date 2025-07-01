import { Box, Image, Text, LinearGradient, Pressable, Icon, FavouriteIcon, BellIcon } from '@gluestack-ui/themed'
import { LinearGradient as RNLinearGradient } from "react-native-linear-gradient"

import { moderateScale, moderateScaleVertical } from '../../utils/responsiveSize'
import { colors } from '../../constants/colors'
import { CircleGreenTick, MyMatch15Icon, MyMatchYellowColorIcon } from '../Icons'
import { CheckCircleIcon } from '@gluestack-ui/themed'
import { format, isToday } from 'date-fns'
import CountDown from 'new-react-native-countdown-component'
import React from 'react'


import CardTimer from '../../utils/CardTimer'

interface GET_CATEGORY {
  __v: number;
  _id: string;
  createdAt: string;
  duration: string;
  maxEndDate: string;
  maxStartDate: string;
  state: string;
  title: string;
  updatedAt: string;
  userId:any;
  categoryId:any;
  categoryStatus:any;
  
};

const SportCard = ({ item, index, cardShadowColor, onPress, cardFrom }: { item: GET_CATEGORY, index: number, cardShadowColor?: string, onPress?: () => void, cardFrom?: string }) => {
  // init

  console.log(item, "this is newItem+++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
  const currentDate = new Date();

  // Parse the given UTC date string
  const givenDate = new Date(cardFrom == 'upcoming' ? item?.maxStartDate : item?.maxEndDate);
  let contestDate;
  let diffInSeconds
  let formattedTime
  let formattedDate

  console.log(givenDate, item?.maxStartDate, 'myyyy***************************************');


  if (isNaN(givenDate?.getTime())) {
    // console.log('Invalid date provided:', item?.maxEndDate);
  } else {
    // Calculate the difference in milliseconds
    const timeDifference: any = Math.floor(givenDate?.getTime() / 1000) - Math?.floor(currentDate?.getTime() / 1000); // Difference in milliseconds

    // Convert the difference into seconds
    diffInSeconds = Math.floor(timeDifference / 1000);

    // Format the given time as h:mm a
    formattedTime = format(givenDate, 'h:mm a');

    // Format the given date as dd-MMM-yy
    formattedDate = format(givenDate, 'd-MMM-yy');
    // console.log(givenDate?.toLocaleString());


    // Check if the given date is today
    if (isToday(givenDate)) {
      contestDate = formattedTime; // Show time only if today
    } else {
      contestDate = `${formattedDate}`; // Show date and time if not today
    }

    // console.log('Formatted Time:', formattedTime);
    // console.log('Formatted Date:', formattedDate);
  }

  return (
    <Pressable onPress={onPress}>
      <Box h={moderateScale(133)} w={'100%'} backgroundColor={colors.black} borderRadius={10} borderEndWidth={1} borderLeftWidth={1} borderColor={colors.gold} elevation={2} mb={moderateScaleVertical(15)} overflow='hidden'>
        <Box flexDirection='row' alignItems='center' justifyContent='space-between' h={moderateScale(25)} bgColor={colors.black} py={5} px={15} overflow='hidden'>
          {/* <Box flexDirection='row' alignItems='center' justifyContent='space-between' w={moderateScale(320)}> */}
          <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.deepPurple} >{item?.title}</Text>
          <Box >
          </Box>
          {cardFrom === 'upcoming' && (<Box flexDirection='row' alignItems='center' gap={moderateScale(20)}>
            {/* <Pressable hitSlop={20} onPress={() => { }} >
              <Icon as={FavouriteIcon} w="$4" h="$4" color={colors.white} />
            </Pressable> */}
            {/* <Icon as={BellIcon} w="$4" h="$4" color={colors.white} /> */}
          </Box>)}

          {cardFrom === 'live' && <Box >
            <Icon as={CheckCircleIcon} w="$3" h="$3" color={colors.greenText} />
          </Box>}
          {cardFrom === 'winnings' && <Box >
            <Icon as={CheckCircleIcon} w="$3" h="$3" color={colors.greenText} />
          </Box>}
        </Box>
        <LinearGradient as={RNLinearGradient} colors={[colors.black, 'black']} useAngle={true} angle={172} angleCenter={{ x: -0.2, y: 0.1 }} flexDirection='row' alignItems='center' justifyContent='space-between' px={10} py={moderateScale(18)}>
          <Box></Box>
          {(cardFrom !== 'winnings' && isToday(givenDate)) ? (<Box gap={5} alignItems='center'>
            <CountDown
              id={item?._id}
              until={Number(diffInSeconds)}
              onFinish={() => { }}
              digitStyle={{ backgroundColor: 'black' }}
              digitTxtStyle={{ color: 'white', fontFamily: 'Poppins-SemiBold', fontSize: 16, lineHeight: 24 }}
              timeToShow={['H', 'M', 'S']}
              timeLabels={{ h: undefined, m: undefined, s: undefined }}
              showSeparator
              separatorStyle={{ height: moderateScale(29), color: 'white' }}
              style={{ height: moderateScale(20) }}
            />
            {/* <Text fontFamily={'$poppinsMedium'} fontSize={12} lineHeight={14} textAlign='center' color={'#c20c0d'} bgColor='#fff6fc' py={3} px={4} w={moderateScale(70)}>57m 54s</Text> */}
            <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.white} textAlign='center'>
              {cardFrom === 'upcoming' ? `upcoming contest is at ${contestDate}` : `Next contest is at ${contestDate}`}</Text>
          </Box>) : (
           
             <Box gap={5} alignItems='center'>
                          <Text fontFamily="$robotoMedium" fontSize={12} lineHeight={14} color={colors.red} numberOfLines={2} textAlign="center">
                            {cardFrom === 'upcoming'  ? <CardTimer endTime={item?.startTime} color={colors.red} />
                             : format(item?.startTime, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd") ?<CardTimer endTime={item?.endTime} color={colors.red} /> : format(item?.startTime, "hh:mm a")}
                          </Text>
                          <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.dimGray} numberOfLines={2} textAlign="center">Upcoming contest is at {format(item?.startTime, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd") ? format(item?.endTime, "hh:mm a") : format(item?.endTime, "dd MMM yyyy hh:mm a")}</Text>
                        </Box>
          )}
          
          <Box></Box>
        </LinearGradient>
        <Box flexDirection='row' alignItems='center' justifyContent='space-between' h={moderateScale(35)} py={5} px={10} overflow='hidden'>
          <Box bgColor='black' py={3} px={5} flexDirection='row' borderRadius={10} alignItems='center' justifyContent='center' gap={5}>
            {/* <MyMatchYellowColorIcon /> */}
            {/* <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.white} numberOfLines={1}>{cardFrom === 'upcoming' ? 'Selected Contests : 10' : cardFrom === 'live' ? 'Playing Contests: 12' : 'Played Contests: 12'}</Text> */}
          </Box>
          {/* <Box bgColor='#fdf9e5' py={3} px={8}  borderRadius={10} alignItems='center' justifyContent='center'>
            <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.black} numberOfLines={1}>{cardFrom === 'winnings' ? 'Played Contests: 12' : `Mega \u20B9 3.5 Cr`}</Text>
          </Box> */}

{/* 
          <Box display={cardFrom === 'upcoming' || cardFrom === 'live' ? 'flex' : 'none'} bgColor='#fdf9e5' py={3} px={8} borderRadius={10} alignItems='center' justifyContent='center'>
            <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.black} numberOfLines={1}>{cardFrom === 'upcoming' ? 'Mega \u20B9 3.5 Cr' : `Mega \u20B9 3.5 Cr`}</Text>
          </Box> */}

          <Box display={cardFrom === 'winnings' ? 'flex' : 'none'} bgColor='black' py={3} px={5} flexDirection='row' borderRadius={10} alignItems='center' justifyContent='center' gap={5}>
            <MyMatchYellowColorIcon />
            <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.white} numberOfLines={1}>{cardFrom === 'upcoming' ? `Mega \u20B9 3.5 Cr` : cardFrom === 'live' ? `Mega \u20B9 3.5 Cr` : `You have won \u20B9 3.5 Cr`}</Text>
          </Box>



        </Box>

      </Box>
    </Pressable>
  )
}

export default React.memo(SportCard);