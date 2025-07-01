import { TouchableOpacity } from "react-native"
import { Box, CheckCircleIcon, FavouriteIcon, Image, Text, BellIcon, Pressable, Icon } from "@gluestack-ui/themed"
import Tooltip from "rn-tooltip"
import { Slider } from "@narodejesus/react-native-slider"
import { ParamListBase, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

import { colors } from "../../constants/colors"
import PrimaryButton from "../Button/PrimaryButton"
import { moderateScale } from "../../utils/responsiveSize"
import { MLetterIcon, MyMatch15Icon, RupeeCircleGreenIcon, RupeeCircleIcon, SingleLetterIcon, WLetterIcon } from "../Icons"
import { imgIcon } from "../../assets/icons"
import { NavigationString } from "../../navigation/navigationStrings"
import { format, parseISO } from "date-fns"
import { formatAmount } from "../../constants/constant"

interface Props {
  flexible?: boolean;
  cardFrom?: string;
  data?: CATEGORY_CONTEST;

}

interface CATEGORY_CONTEST {
  _id: string;
  entryAmount: number;
  slots: number;
  uptoBid?: number;
  type: string;
  subcategoryId: string;
  platformFeePercentage: number;
  winningsPercentage?: number;
  bonusCashPercentage: number;
  bonusCashPerEntryAmount?: number;
  images?: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  prizePool?: number;
  rankDistribution: {
    rank: (number | string);
    percentage: number;
    amount: number;
  }[];
  bonusCashAmount: number;
  platformFeeAmount: number;
  prizeDistributionAmount: number;
  prizeDistributionPercentage: number;
  rankCount: number;
  rankPercentage: number;
  totalAmount: number;
  typeCashBonus: string;
  upto: number;
  timeSlots: {
    startTime: string;
    endTime: string;
    status: string;
    _id: string;
  }[]
};

const ContestListCard = (props: Props) => {
  // init
  const { flexible = false, cardFrom, data } = props
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
 // console.log(data,"this is data *************************")
  const startTimeString = data?.timeSlots[0]?.startTime;

  const timeOfDate: Date | undefined = startTimeString ? parseISO(startTimeString) : undefined;

  return (

    <Box backgroundColor={colors.white} borderWidth={2} borderColor={colors.paleGray} pt={10} gap={8} borderRadius={10} overflow="hidden">
      <Pressable gap={8} onPress={() => navigation.navigate(NavigationString.ViewContest, { flexible: flexible ? 'Yes' : 'No', cardFrom: cardFrom })} >
      
        <Box display={cardFrom === 'upcoming' ? 'flex' : 'none'} flexDirection='row' alignItems='center' justifyContent="space-between" px={moderateScale(10)}>
          <Icon as={FavouriteIcon} w="$5" h="$5" color={colors.themeRed} />
          <Icon as={BellIcon} w="$5" h="$5" color={colors.themeRed} />
        </Box>

        <Box flexDirection="row" alignItems="center" px={10}>
          <Box flex={0.8} alignItems='flex-start'>
            <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.gray4} numberOfLines={1}>Prize Pool</Text>
          </Box>

          <Box flex={0.7} alignItems="center">
            <Text fontFamily={'$poppinsMedium'} fontSize={12} lineHeight={14} color={'#c20c0d'} numberOfLines={1} >{format(timeOfDate as any, 'hh:mm a')}</Text>
          </Box>

          <Box alignItems="flex-end" flex={0.6} >
            <Box flexDirection="row" alignItems="center" gap={moderateScale(10)}>
              <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.gray4} numberOfLines={1} >Entry</Text>
              {cardFrom === 'live' && <Icon as={CheckCircleIcon} w="$3" h="$3" color={colors.greenText} />}
            </Box>
          </Box>


        </Box>

        <Box flexDirection="row" alignItems="center" px={10}>
          <Text fontFamily={'$robotoBold'} fontSize={20} lineHeight={22} color={colors.black} numberOfLines={1} flex={0.8}>{'\u20B9'}{formatAmount(Number(data?.prizeDistributionAmount))}</Text>
          <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.dimGray} flex={0.7} numberOfLines={2} textAlign="center">{cardFrom === 'live' ? 'Next contest is at 8:30 AM' : cardFrom === 'upcoming' ? 'Upcoming contest is at 8:30 AM' : '20 Aug 2024'}</Text>

          {
            flexible ?
              <Box flex={1} alignItems='flex-end'>
                <Pressable onPress={() => navigation.navigate(NavigationString.ViewContest, { flexible: flexible ? 'Yes' : 'No', cardFrom: cardFrom })} height={moderateScale(32)} width={moderateScale(75)} backgroundColor={colors.greenText} alignItems="center" justifyContent="center" borderRadius={moderateScale(8)}>
                  <Text fontFamily={'$robotoMedium'} fontSize={16} lineHeight={18} color={colors.white} numberOfLines={1} textAlign="center">{'\u20B9'} {formatAmount(Number(data?.entryAmount))}</Text>
                </Pressable>
              </Box>
              :
              <Box flex={0.6} alignItems='flex-end'>
                <Pressable flexDirection="row" alignItems="center" justifyContent="center" w={moderateScale(75)} h={moderateScale(32)} bgColor={colors.greenText} borderRadius={moderateScale(5)} gap={moderateScale(4)}>
                  <Image alt='icon' source={imgIcon.bCoin} w={moderateScale(14)} h={moderateScale(14)} resizeMode='contain' />
                  <Text fontFamily={'$robotoMedium'} fontSize={16} lineHeight={18} color={colors.white} numberOfLines={1}>20</Text>
                </Pressable>
              </Box>
          }


        </Box>

        <Slider
          disabled={true}
          minimumValue={0}
          maximumValue={100}
          maximumTrackTintColor={'#fdebeb'}
          minimumTrackTintColor={colors.gold}
          maximumTrackStyle={{ height: moderateScale(6) }}
          minimumTrackStyle={{ height: moderateScale(6) }}
          thumbTintColor="transparent"
          value={40}
          onValueChange={(value) => { }}
          containerStyle={{ height: moderateScale(12), marginHorizontal: moderateScale(10) }}
        />

        <Box flexDirection="row" alignItems="center" justifyContent='space-between' px={10}>
          <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.themeRed} numberOfLines={1}>8,637 spots left</Text>
          <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.gray4} numberOfLines={1} >{data?.slots} spots</Text>
        </Box>
      </Pressable>
      <Box flexDirection="row" alignItems="center" justifyContent='space-between' backgroundColor={colors.paleGray} px={10} py={8}>
        <Box flexDirection="row" alignItems="center" gap={10}>
          <Tooltip actionType='press' withOverlay={false} backgroundColor={colors.themeBlue} height={moderateScale(30)} popover={<Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.white} numberOfLines={1} >First Prize = {'\u20B9'}25,000</Text>}>
            <Box flexDirection="row" alignItems="center" gap={3}>
              <Image alt="icon" source={imgIcon.prize1} w={moderateScale(15)} h={moderateScale(15)} alignSelf='baseline' resizeMode="contain" />
              <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.gray4} numberOfLines={1} >{'\u20B9'}25,000</Text>
            </Box>
          </Tooltip>


          <Tooltip actionType='press' withOverlay={false} backgroundColor={colors.themeBlue} height={moderateScale(30)} width={moderateScale(170)} popover={<Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.white} numberOfLines={1} >7,516 teams win the contest</Text>}>
            <Box flexDirection="row" alignItems="center" gap={3}>
              <MyMatch15Icon />
              <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.gray4} numberOfLines={1} >62%</Text>
            </Box>
          </Tooltip>

          <Tooltip actionType='press' withOverlay={false} backgroundColor={colors.themeBlue} height={moderateScale(50)} width={moderateScale(170)} popover={<Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.white} numberOfLines={2} >Max 20 entries per user in this contest</Text>}>
            <Box flexDirection="row" alignItems="center" gap={3}>
              {flexible ? <SingleLetterIcon /> : <MLetterIcon />}
              <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.gray4} numberOfLines={1} >Upto 20</Text>
            </Box>
          </Tooltip>

          <Tooltip actionType='press' withOverlay={false} backgroundColor={colors.themeBlue} height={moderateScale(35)} width={moderateScale(270)} popover={<Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.white} numberOfLines={2} >You can use 4.3 cash bonus for every entry</Text>}>
            <Box flexDirection="row" alignItems="center" gap={3}>
              <Image alt="icon" source={imgIcon.bCoin} w={moderateScale(12)} h={moderateScale(12)} alignSelf='baseline' resizeMode="contain" />
              <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.gray4} numberOfLines={1} >Use 4.3</Text>
            </Box>
          </Tooltip>

        </Box>
        <Tooltip actionType='press' withOverlay={false} backgroundColor={colors.themeBlue} height={moderateScale(50)} width={moderateScale(270)} popover={<Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.white} numberOfLines={2} >{flexible ? 'Take Place even if 2 spots fill, and the Prize Pool will depend on how many spots are filled.' : 'Guaranteed to take place regardless of spots filed.'}</Text>}>

          <Box flexDirection="row" alignItems="center" gap={5}>
            {flexible ? <RupeeCircleGreenIcon /> : <Icon as={CheckCircleIcon} w="$4" h="$4" color={colors.greenText} />}
            <Text fontFamily={'$robotoBold'} fontSize={12} lineHeight={14} color={colors.dimGray} numberOfLines={1} >{flexible ? 'Flexible' : 'Guaranteed'}</Text>
          </Box>
        </Tooltip>
      </Box>


    </Box>
  )
}

export default ContestListCard