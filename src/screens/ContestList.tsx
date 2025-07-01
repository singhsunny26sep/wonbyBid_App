import { useState } from 'react'
import { FlatList } from 'react-native';
import { Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { ArrowDownIcon, Box, ChevronDownIcon, ChevronUpIcon, Pressable, Text } from '@gluestack-ui/themed'
import DatePicker, { getToday, getFormatedDate } from 'react-native-modern-datepicker';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ParamListBase, useNavigation, useRoute } from '@react-navigation/native'
import { addDays, format, parse, subDays } from 'date-fns';
import { Dropdown } from 'react-native-element-dropdown'
import { CloseIcon } from '@gluestack-ui/themed';
import { Icon } from '@gluestack-ui/themed';

import Body from '../components/Body/Body'
import { AppBar } from '../components/AppBar'
import { Container } from '../components/Container'
import ContestListCard from '../components/ContestListCard/ContestListCard'
import { colors } from '../constants/colors'
import { moderateScale, moderateScaleVertical, textScale } from '../utils/responsiveSize'
import { BackButton, FilterIcon, WalletIcon, WinnerIcon } from '../components/Icons'
import { NavigationString } from '../navigation/navigationStrings'
import { CatergoryTimeSlotTypes, deviceHeight, shadowStyle } from '../constants/constant'
import PrimaryButton from '../components/Button/PrimaryButton';
import { BellIcon } from '@gluestack-ui/themed';

const ContestList = () => {

	// init
	const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
	const route = useRoute()
	const { cardFrom }: any = route.params
	const today = new Date();
	const nextDay = subDays(today, 1)
	
	const startDate = format(today, 'yyyy-MM-dd');

	// console.log(cardFrom);
	

	// useStates
	const [selectedContestScreen, setSelectedContestScreen] = useState( (cardFrom === 'mywinnings' || cardFrom === 'mylive')  ? 'my' : 'all')
	const [selectedSortBy, setSelectedSortBy] = useState('')
	const [datePickerModel, setDatePickerModel] = useState(false)
	const [selectedDate, setSelectedDate] = useState('')
	const [selectedTime, setSelectedTime] = useState<string>('')
	const [showFilterModel, setShowFilterModel] = useState(false)


	const LeftAppBar = () => {
		return (
			<Box flexDirection='row' alignItems='center' px={moderateScale(10)} gap={moderateScale(15)}>
				<Pressable hitSlop={22} onPress={() => { navigation?.goBack() }}>
					<BackButton />
				</Pressable>

				<Box>
					<Text fontFamily={'$robotoBold'} fontSize={16} lineHeight={18} color={colors.white} numberOfLines={1}>Category Name</Text>
					<Text fontFamily={'$robotoRegular'} fontSize={12} lineHeight={18} color={colors.white} numberOfLines={1}>15 min left</Text>
				</Box>


			</Box>
		)
	}

	const RightIcon = () => {
		return (
			<Box flexDirection='row' alignItems='center' gap={15} w={moderateScale(250)}>
				<Pressable onPress={() => navigation.navigate(NavigationString.Notification)}>
					<Box bgColor='#d2302b' flexDirection='row' alignItems='center' py={8} px={7} borderRadius={10} gap={10}>
						<Icon as={BellIcon} color={colors.white} w="$5" h="$5" />
					</Box>
				</Pressable>

				<Pressable onPress={() => navigation.navigate(NavigationString.Winners)}>
					<Box bgColor='#d2302b' flexDirection='row' alignItems='center' py={8} px={7} borderRadius={10} gap={10}>
						<WinnerIcon />
					</Box>
				</Pressable>
				<Pressable onPress={() => navigation.navigate(NavigationString.MyWallet)}>
					<Box bgColor='#d2302b' flexDirection='row' alignItems='center' py={7} px={7} mr={moderateScale(20)} borderRadius={10} gap={10}>
						<WalletIcon />
					</Box>
				</Pressable>
			</Box>
		)
	}
	return (
		<Container statusBarStyle='light-content' statusBarBackgroundColor={colors.themeRed}>
			<AppBar left={<LeftAppBar />} right={<RightIcon />} />

			{ cardFrom !== 'mywinnings' || cardFrom !== 'mylive' && <Box display={cardFrom === 'live' ? 'flex' : 'none'} flexDirection='row' alignItems='center' alignSelf='center' bgColor={colors.gray10}>
				<Pressable  onPress={() => setSelectedContestScreen('all')} flex={1} alignItems='center' borderBottomWidth={selectedContestScreen === 'all' ? 2 : 0} borderBottomColor={colors.themeRed}>
					<Text fontFamily={selectedContestScreen === 'all' ? '$robotoBold' : '$robotoMedium'} fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} py={10}>{cardFrom === 'live' ? 'All Contests' : 'All Winnings'}</Text>
				</Pressable>
				<Pressable onPress={() => setSelectedContestScreen('my')} flex={1} alignItems='center' borderBottomWidth={selectedContestScreen === 'my' ? 2 : 0} borderBottomColor={colors.themeRed}>
					<Text fontFamily={selectedContestScreen === 'my' ? '$robotoBold' : '$robotoMedium'} fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} py={10}>{cardFrom === 'live' ? 'My Contests' : 'My Winnings'}</Text>
				</Pressable>
			</Box>}

			<Box display={cardFrom === 'upcoming' || cardFrom === 'winnings' ? 'flex' : 'none'} flexDirection='row' alignItems='center' justifyContent='space-between' pl={moderateScale(15)} bgColor={colors.gray10} borderBottomWidth={2} borderBottomColor={colors.white}>
				<Text fontFamily={'$robotoBold'} fontSize={12} lineHeight={14} color={colors.grayish} numberOfLines={1} py={10}>Show Upcoming By :</Text>
				<Box flexDirection='row' alignItems='center' gap={5}>
					<Pressable flexDirection='row' alignItems='center' gap={6} onPress={() => { setDatePickerModel(!datePickerModel) }}>
						<Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.black} numberOfLines={1} py={10}>
							{selectedDate === '' ? 'Select Date' : `${selectedDate} ${selectedTime}`}
							</Text>
						{datePickerModel ? <Icon as={ChevronUpIcon} w="$4" h="$4" color={colors.grayish} /> :
						 <Icon as={ChevronDownIcon} w="$4" h="$4" color={colors.grayish} />}
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

			</Box>

			<Box flexDirection='row' alignItems='center' bgColor={colors.gray10}>
				<Box justifyContent='center' alignItems='center' pl={moderateScale(15)}>
					{/* <Text fontFamily={'$robotoBold'} fontSize={12} lineHeight={14} color={colors.grayish} numberOfLines={1}>Sort By:</Text> */}
				</Box>
				<Pressable onPress={() => setSelectedSortBy('entry')} flex={1} flexDirection='row' alignItems='center' justifyContent='center' gap={3}>
					<Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.grayish} borderBottomWidth={selectedSortBy === 'entry' ? 2 : 0} borderBottomColor={colors.themeRed} numberOfLines={1} py={10}>ENTRY</Text>
					<Icon as={ArrowDownIcon} w={moderateScale(13)} h={moderateScale(13)} />
				</Pressable>
				<Pressable onPress={() => setSelectedSortBy('spots')} flex={1} alignItems='center'>
					<Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.grayish} borderBottomWidth={selectedSortBy === 'spots' ? 2 : 0} borderBottomColor={colors.themeRed} numberOfLines={1} py={10}>SPOTS</Text>
				</Pressable>
				<Pressable onPress={() => setSelectedSortBy('prizepool')} flex={1} alignItems='center'>
					<Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.grayish} borderBottomWidth={selectedSortBy === 'prizepool' ? 2 : 0} borderBottomColor={colors.themeRed} numberOfLines={1} py={10}>PRIZE POOL</Text>
				</Pressable>
				<Pressable onPress={() => setSelectedSortBy('winners')} flex={1} alignItems='center'>
					<Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.grayish} borderBottomWidth={selectedSortBy === 'winners' ? 2 : 0} borderBottomColor={colors.themeRed} numberOfLines={1} py={10}>%WINNERS</Text>
				</Pressable>

				<Pressable onPress={() => setShowFilterModel(true)} bgColor={colors.white} alignItems='center' justifyContent='center' flex={0.5} py={10}>
					<FilterIcon />
				</Pressable>
			</Box>

			<Box flexDirection='row' alignItems='center' justifyContent='space-between' bgColor={colors.white} px={moderateScale(15)} py={moderateScaleVertical(10)}>
				<Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.grayish} numberOfLines={1}>12 contests</Text>

				<Box flexDirection='row' alignItems='center' gap={moderateScale(15)}>
					<Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.grayish} numberOfLines={1}>12 Sort Applied</Text>
					<Text fontFamily={'$robotoBold'} fontSize={16} lineHeight={18} color={colors.black} numberOfLines={1}>CLEAR</Text>
				</Box>
			</Box>

			{(selectedContestScreen === 'all' && (cardFrom !== 'mywinnings' || cardFrom !== 'mylive'))  ? (
				<FlatList
					data={['01', '02', '03',]}
					renderItem={({ item, index }: { item: any, index: number }) => {
						return (
							<>
								{
									item == '01' && (<Box backgroundColor={colors.white} px={15} py={20}>
										<Text fontFamily={'$robotoBold'} fontSize={18} lineHeight={20} color={colors.black} numberOfLines={1} pb={10}>Mega Contest</Text>
										<ContestListCard cardFrom={cardFrom} />
									</Box>)}

								{
									item == '02' && (<Box backgroundColor={colors.white} px={15} py={20}>
										<Text fontFamily={'$robotoBold'} fontSize={18} lineHeight={20} color={colors.black} numberOfLines={1} pb={10}>Only For Beginners</Text>
										<Box gap={15}>
											<ContestListCard flexible={true} cardFrom={cardFrom} />
											<ContestListCard cardFrom={cardFrom} />
										</Box>
									</Box>)}

								{
									item == '03' && (<Box backgroundColor={colors.white} px={15} py={20}>
										<Text fontFamily={'$robotoBold'} fontSize={18} lineHeight={20} color={colors.black} numberOfLines={1} pb={10}>Multiple Contest</Text>
										<Box gap={15}>
											<ContestListCard cardFrom={cardFrom} />
											<ContestListCard cardFrom={cardFrom} />
										</Box>
									</Box>)}

							</>


						)
					}}
					keyExtractor={(item: any) => item}
					style={{ flex: 1, }}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ gap: responsiveWidth(3) }}
				/>
			) : (
		
				<FlatList
					data={[]}
					renderItem={({ item, index }: { item: any, index: number }) => {
						return (
							<>
								{
									item == '01' && (<Box backgroundColor={colors.white} px={15} py={20}>
										<Text fontFamily={'$robotoBold'} fontSize={18} lineHeight={20} color={colors.black} numberOfLines={1} pb={10}>Mega Contest</Text>
										<ContestListCard cardFrom={cardFrom} />
									</Box>)}

								{
									item == '02' && (<Box backgroundColor={colors.white} px={15} py={20}>
										<Text fontFamily={'$robotoBold'} fontSize={18} lineHeight={20} color={colors.black} numberOfLines={1} pb={10}>Only For Beginners</Text>
										<Box gap={15}>
											<ContestListCard flexible={true} cardFrom={cardFrom} />
											<ContestListCard cardFrom={cardFrom} />
										</Box>
									</Box>)}

								{
									item == '03' && (<Box backgroundColor={colors.white} px={15} py={20}>
										<Text fontFamily={'$robotoBold'} fontSize={18} lineHeight={20} color={colors.black} numberOfLines={1} pb={10}>Multiple Contest</Text>
										<Box gap={15}>
											<ContestListCard cardFrom={cardFrom} />
											<ContestListCard cardFrom={cardFrom} />
										</Box>
									</Box>)}

							</>


						)
					}}
					ListEmptyComponent={() => {
						return (
							<Box flex={1} alignItems='center' justifyContent='center'>
								<Text fontFamily={'$robotoBold'} fontSize={18} lineHeight={20} color={colors.black} numberOfLines={1} pb={10}>No Contest Found</Text>

							</Box>
						)
					}}
					keyExtractor={(item: any) => item}
					style={{ flex: 1, backgroundColor: colors.white }}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ gap: responsiveWidth(3), flexGrow: 1 }}
				/>
			
				)}

			<Modal
				animationType='slide'
				transparent={true}
				visible={datePickerModel}
			>

				<Box style={localStyles.modalCenterView} >
					<Box style={localStyles.modalView}>

						{
							 cardFrom === 'upcoming' ? (
								<DatePicker
								mode='calendar'
								options={{
									mainColor: colors.themeRed,
								}}
								selected={selectedDate}
	
								onDateChange={(propDate: any) => {
									// console.log(propDate);
	
									const parsedDate = parse(propDate, 'yyyy/MM/dd', new Date())
									setSelectedDate(format(parsedDate, 'yyyy-MM-dd'))
								}}
								minimumDate={startDate}
								
							/>
							 ) : (
								<DatePicker
								mode='calendar'
								options={{
									mainColor: colors.themeRed,
								}}
								selected={selectedDate}
	
								onDateChange={(propDate: any) => {
									// console.log(propDate);
	
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

			<Modal
				animationType='slide'
				transparent={true}
				visible={showFilterModel}
				onRequestClose={() => setShowFilterModel(false)}>
				<Box flex={1} backgroundColor='rgba(0, 0, 0, 0.5)' >
					<Box backgroundColor={colors.white} borderTopLeftRadius={10} borderTopRightRadius={10} w={'100%'} gap={15} h={moderateScale(640)} marginTop={deviceHeight * 0.2} overflow='hidden'>
						<Box flexDirection='row' justifyContent='space-between' alignItems='center' bgColor={colors.gray10} py={moderateScaleVertical(15)} px={moderateScale(15)}>
							<Pressable onPress={() => setShowFilterModel(false)}>
								<Icon as={CloseIcon} size="lg" color={colors.black} />
							</Pressable>
							<Text fontFamily='$robotoBold' fontSize={16} lineHeight={18} color={colors.black} numberOfLines={1} >Filter</Text>
							<Pressable>
								<Text fontFamily='$robotoBold' fontSize={16} lineHeight={18} color={colors.grayish} numberOfLines={1} >CLEAR</Text>
							</Pressable>
						</Box>
						<Body>

							<Box px={moderateScale(15)} borderBottomWidth={1} borderBottomColor={colors.gray5} py={moderateScaleVertical(15)}>
								<Text fontFamily='$robotoBold' fontSize={16} lineHeight={18} color={colors.black} numberOfLines={1} >Entry</Text>

								<Box flexDirection='row' gap={moderateScale(10)} flexWrap='wrap' mt={moderateScaleVertical(10)}>
									<Box borderWidth={1} borderColor={colors.grayish} py={moderateScaleVertical(6)} px={moderateScale(10)} borderRadius={moderateScale(20)}>
										<Text fontFamily='$robotoMedium' fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} > {'\u20B9'}1 to {'\u20B9'}50</Text>
									</Box>
									<Box borderWidth={1} borderColor={colors.grayish} py={moderateScaleVertical(6)} px={moderateScale(10)} borderRadius={moderateScale(20)}>
										<Text fontFamily='$robotoMedium' fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} > {'\u20B9'}51 to {'\u20B9'}100</Text>
									</Box>
									<Box borderWidth={1} borderColor={colors.grayish} py={moderateScaleVertical(6)} px={moderateScale(10)} borderRadius={moderateScale(20)}>
										<Text fontFamily='$robotoMedium' fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} > {'\u20B9'}101 - {'\u20B9'}1,000</Text>
									</Box>
									<Box borderWidth={1} borderColor={colors.grayish} py={moderateScaleVertical(6)} px={moderateScale(10)} borderRadius={moderateScale(20)}>
										<Text fontFamily='$robotoMedium' fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} > {'\u20B9'}1,001 & above</Text>
									</Box>
								</Box>

							</Box>

							<Box px={moderateScale(15)} borderBottomWidth={1} borderBottomColor={colors.gray5} py={moderateScaleVertical(15)}>
								<Text fontFamily='$robotoBold' fontSize={16} lineHeight={18} color={colors.black} numberOfLines={1} >Spots</Text>

								<Box flexDirection='row' gap={moderateScale(10)} flexWrap='wrap' mt={moderateScaleVertical(10)}>
									<Box borderWidth={1} borderColor={colors.grayish} py={moderateScaleVertical(6)} px={moderateScale(10)} borderRadius={moderateScale(20)}>
										<Text fontFamily='$robotoMedium' fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} >2</Text>
									</Box>
									<Box borderWidth={1} borderColor={colors.grayish} py={moderateScaleVertical(6)} px={moderateScale(10)} borderRadius={moderateScale(20)}>
										<Text fontFamily='$robotoMedium' fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} >3 - 10</Text>
									</Box>
									<Box borderWidth={1} borderColor={colors.grayish} py={moderateScaleVertical(6)} px={moderateScale(10)} borderRadius={moderateScale(20)}>
										<Text fontFamily='$robotoMedium' fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} >11 - 100</Text>
									</Box>
									<Box borderWidth={1} borderColor={colors.grayish} py={moderateScaleVertical(6)} px={moderateScale(10)} borderRadius={moderateScale(20)}>
										<Text fontFamily='$robotoMedium' fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} >101 - 1000</Text>
									</Box>
									<Box borderWidth={1} borderColor={colors.grayish} py={moderateScaleVertical(6)} px={moderateScale(10)} borderRadius={moderateScale(20)}>
										<Text fontFamily='$robotoMedium' fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} >1000 & above</Text>
									</Box>
								</Box>

							</Box>

							<Box px={moderateScale(15)} borderBottomWidth={1} borderBottomColor={colors.gray5} py={moderateScaleVertical(15)}>
								<Text fontFamily='$robotoBold' fontSize={16} lineHeight={18} color={colors.black} numberOfLines={1} >Prize Pool</Text>

								<Box flexDirection='row' gap={moderateScale(10)} flexWrap='wrap' mt={moderateScaleVertical(10)}>
									<Box borderWidth={1} borderColor={colors.grayish} py={moderateScaleVertical(6)} px={moderateScale(10)} borderRadius={moderateScale(20)}>
										<Text fontFamily='$robotoMedium' fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} >{'\u20B9'}1 - {'\u20B9'}10,000</Text>
									</Box>
									<Box borderWidth={1} borderColor={colors.grayish} py={moderateScaleVertical(6)} px={moderateScale(10)} borderRadius={moderateScale(20)}>
										<Text fontFamily='$robotoMedium' fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} >{'\u20B9'}10,000 - {'\u20B9'}1 Lakh</Text>
									</Box>
									<Box borderWidth={1} borderColor={colors.grayish} py={moderateScaleVertical(6)} px={moderateScale(10)} borderRadius={moderateScale(20)}>
										<Text fontFamily='$robotoMedium' fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} >{'\u20B9'}1 Lakh - {'\u20B9'}10 Lakh</Text>
									</Box>
									<Box borderWidth={1} borderColor={colors.grayish} py={moderateScaleVertical(6)} px={moderateScale(10)} borderRadius={moderateScale(20)}>
										<Text fontFamily='$robotoMedium' fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} >{'\u20B9'}10 Lakh - {'\u20B9'}25 Lakh</Text>
									</Box>
								</Box>

							</Box>

							<Box px={moderateScale(15)} borderBottomWidth={1} borderBottomColor={colors.gray5} py={moderateScaleVertical(15)}>
								<Text fontFamily='$robotoBold' fontSize={16} lineHeight={18} color={colors.black} numberOfLines={1} >Contest Type</Text>

								<Box flexDirection='row' gap={moderateScale(10)} flexWrap='wrap' mt={moderateScaleVertical(10)}>
									<Box borderWidth={1} borderColor={colors.grayish} py={moderateScaleVertical(6)} px={moderateScale(10)} borderRadius={moderateScale(20)}>
										<Text fontFamily='$robotoMedium' fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} >Single Entry</Text>
									</Box>
									<Box borderWidth={1} borderColor={colors.grayish} py={moderateScaleVertical(6)} px={moderateScale(10)} borderRadius={moderateScale(20)}>
										<Text fontFamily='$robotoMedium' fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} >Multi Entry</Text>
									</Box>
									<Box borderWidth={1} borderColor={colors.grayish} py={moderateScaleVertical(6)} px={moderateScale(10)} borderRadius={moderateScale(20)}>
										<Text fontFamily='$robotoMedium' fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} >Single Winner</Text>
									</Box>
									<Box borderWidth={1} borderColor={colors.grayish} py={moderateScaleVertical(6)} px={moderateScale(10)} borderRadius={moderateScale(20)}>
										<Text fontFamily='$robotoMedium' fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} >Multi Winner</Text>
									</Box>
									<Box borderWidth={1} borderColor={colors.grayish} py={moderateScaleVertical(6)} px={moderateScale(10)} borderRadius={moderateScale(20)}>
										<Text fontFamily='$robotoMedium' fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} >Guaranteed</Text>
									</Box>
									<Box borderWidth={1} borderColor={colors.grayish} py={moderateScaleVertical(6)} px={moderateScale(10)} borderRadius={moderateScale(20)}>
										<Text fontFamily='$robotoMedium' fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} >Flexible</Text>
									</Box>
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

export default ContestList

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