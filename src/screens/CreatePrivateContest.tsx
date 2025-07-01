import { useFormik } from 'formik'
import { ActivityIndicator, Image, Modal, StyleSheet, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import { ArrowDownIcon, Box, ChevronDownIcon, CircleIcon, CloseIcon, HStack, Icon, Pressable, Radio, RadioGroup, RadioIndicator, RadioLabel, Text, Toast, ToastTitle, useToast, } from '@gluestack-ui/themed'
import { Dropdown } from 'react-native-element-dropdown'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { RadioIcon } from '@gluestack-ui/themed'
import DatePicker, { getToday, getFormatedDate } from 'react-native-modern-datepicker';
import { addMinutes, format, parse, parseISO, } from 'date-fns'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { Container } from '../components/Container'
import { colors } from '../constants/colors'
import { AppBar } from '../components/AppBar'
import { moderateScale, moderateScaleVertical, textScale } from '../utils/responsiveSize'
import { EditPencil } from '../components/Icons'
import InputText from '../components/TextInput/InputText'
import PrimaryButton from '../components/Button/PrimaryButton'
import Body from '../components/Body/Body'
import { CatergoryTimeSlotTypes, CatergoryTypes, deviceHeight, formatAmount, shadowStyle } from '../constants/constant'
import { NavigationString } from '../navigation/navigationStrings'
import useCreatePrivateContest from '../hooks/private/create-private-contest'
import useGetCategories from '../hooks/home/get-all-categories'
import { formatInTimeZone } from 'date-fns-tz'
import { craetePrivateContestMultiSchema, craetePrivateContestSingleSchema } from '../utils/validators'
import useGetSettings from '../hooks/private/use-get-settings'
import rankDistribution from '../hooks/private/usePriceDistribution'
import { ToastAndroid } from 'react-native'

const CreatePrivateContest = () => {
  // init
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const today = new Date();
  const startDate = format(today, 'yyyy-MM-dd');
  const toast = useToast()

  // state
  const [selectedRadio, setSelectedRadio] = useState('multiple');
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [datePickerModel, setDatePickerModel] = useState(false)
  const [showPrizePoll, setShowPrizePoll] = useState(false)
  const [mainCate, setMainCate] = useState([])

  // api
  const useCreatePrivateContestMutation = useCreatePrivateContest()

  const createDisctribution = rankDistribution()


  const { data: mainCategoriesData, isLoading: mainCatIsLoading } = useGetCategories()
  const { data: settings, isLoading } = useGetSettings()

  // let isLoading = true

  const [rankData, setRankData] = useState<any>([])

  let setting = settings?.data?.data
  // console.log({mainCategoriesData?.data?.data});
  // console.log("useGetSettings: ", settings?.data?.data);
  const minimumSlotCount = Number(settings?.data?.data?.minimum_slot_count) || 0;

  // console.log("settings: ", setting);

  const showToast = (message: string) => {
    return ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  // formik 
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { entryfee: "", spots: "", winners: "", teamallowed: "", teammultiplelimit: '', selectcategory: { label: '', value: '' }, selectcategorytime: "", slotdateday: '' },
    validationSchema: selectedRadio === 'single' ? craetePrivateContestSingleSchema : craetePrivateContestMultiSchema,

    validate: (values: any) => {
      const errors: any = {};

      if (!values.spots) {
        errors.spots = "Spots is required";
      } else if (Number(values.spots) < minimumSlotCount) {
        errors.spots = `Spots must be ${minimumSlotCount}`;
      }

      if (!values.winners) {
        errors.winners = "Winners is required";
      } else if (Number(values.winners) < Number(setting?.winners_minimum_percent)) {
        errors.winners = `Winners must be above  ${Number(setting?.winners_minimum_percent)}%`;
      } else if (Number(values.winners) > Number(setting?.winnerMaxPercent)) {
        errors.winners = `Winners must be below or equal ${Number(setting?.winnerMaxPercent)}%`;
      }


      if (!values.teammultiplelimit) {
        errors.teammultiplelimit = "Bid Limit is required ";
        // console.log("setting",setting.numberof_bids,Number(values.teammultiplelimit) > Number(setting?.numberof_bids))
      } else if (Number(values.teammultiplelimit) < Number(Number(values.spots) * (setting?.numberof_bids / 100))) {
        errors.teammultiplelimit = `Bid Limit must be above ${Number(values.spots * (setting?.numberof_bids / 100))}`;
      }
      else if (Number(values.teammultiplelimit) > Number(Number(values.spots) * (setting?.maxPercentageOfBits / 100))) {
        errors.teammultiplelimit = `Bid Limit must be below or equal ${Number(values.spots * (setting?.maxPercentageOfBits / 100))}`;
      }

      // Add validation for other fields as needed

      return errors;
    },


    onSubmit: (values) => {
      // const date = parse(formik.values.slotdateday, 'yyyy-MM-dd', new Date());
      const label = formik.values?.selectcategory?.label;

      const timeAdd = typeof label === 'string' ? label.match(/\d+/)?.[0] : null;

      const updatedDate = addMinutes(new Date(formik.values.slotdateday), Number(timeAdd));

      // Format the date in UTC
      // const utcDateString = formatInTimeZone(date, 'UTC', "yyyy-MM-dd'T'HH:mm:ss'Z'");
      // console.log(utcDateString);

      // console.log("formik.values?.selectcategory?.value", formik.values?.selectcategory?.label);


      const payload = {
        category: formik.values?.selectcategory?.value as string,
        createdwiningPercentage: Number(formik.values?.winners),
        createdPrizePool: Number(formik.values?.spots) * Number(formik.values?.entryfee),
        createdEntryFee: Number(formik?.values?.entryfee),
        createdSlots: Number(formik?.values?.spots),
        createdUpto: selectedRadio === 'single' ? 10 : Number(formik.values?.teammultiplelimit),
        startDateTime: formatInTimeZone(new Date(formik.values.slotdateday), 'UTC', "yyyy-MM-dd'T'HH:mm:ss'Z'"),
        endDateTime: formatInTimeZone(updatedDate, 'UTC', "yyyy-MM-dd'T'HH:mm:ss'Z'"),
        prizeDistributionPercentage: setting?.distirbytionpercent,
        categoryName: formik.values?.selectcategory?.label,
        influencerfee:setting?.influencerfee
      }
      // console.log(payload)
      // console.log("============================== payload ============================");
      // console.log("Payload: ", payload);
      useCreatePrivateContestMutation.mutate(payload, {
        onSuccess: (data: any) => {
          toast.show({
            placement: "bottom",
            render: ({ id }) => {
              const toastId = "toast-" + id
              return (
                <Toast nativeID={toastId} variant="accent" action='success'>
                  <ToastTitle>Created successfully</ToastTitle>
                </Toast>
              );
            },
          })
        }
      })
      navigation.navigate("ShareContests")
    }
  });

  const getDistributionRank = async () => {
    // console.log("====================== getDistributionRank =============================");
    if (!formik.values.winners || !formik.values.entryfee || !formik.values.spots) {
      showToast("Please enter enter fee, spots and winners")
      return
    }


    let payload = {
      winingPercentage: formik.values.winners,
      entryFees: formik.values.entryfee,
      spots: formik.values.spots,
      prizedistribution: setting?.distirbytionpercent
    }
    createDisctribution.mutate(payload, {
      onSuccess(data: any) {
        setRankData(data?.data?.data)
        setShowPrizePoll(true)
        // console.log("Got distribution: ", data?.data);

      }
    })
  }

  const showDatePicker = () => {
    setDatePickerModel(true);
  };

  const hideDatePicker = () => {
    setDatePickerModel(false);
  };

  const handleConfirm = (date: any) => {

    const utcDate = new Date(date);

    // Get the local date string
    const localDateString = utcDate.toISOString();
    // console.log("A date has been picked: ", utcDate,localDateString);
    formik.setFieldValue('slotdateday', localDateString)

    hideDatePicker();
  };



  useEffect(() => {
    if (setting?.privateCategory && !isLoading) {
      const updatedData = setting?.privateCategory?.map((item: any) => {
        return { label: item?.title, value: item?._id }
      })
      setMainCate(updatedData)

    }
  }, [mainCatIsLoading])



  return (
    <Container statusBarStyle='light-content' statusBarBackgroundColor={colors.themeRed} backgroundColor={colors.black}>
      <AppBar back title='Create Contest' />
      <Box flexDirection='row' alignItems='center' alignSelf='center' bgColor={colors.black} style={shadowStyle}>
        <Pressable onPress={() => navigation.navigate(NavigationString.CreatePrivateContest)} flex={1} alignItems='center'>
          <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.white} borderBottomWidth={2} borderBottomColor={colors.gold} numberOfLines={1} py={10}>Create Contest</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate(NavigationString.JoinPrivateContest)} flex={1} alignItems='center'>
          <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} py={10}>Join Contest</Text>
        </Pressable>
        {/* <Pressable onPress={() => navigation.navigate(NavigationString.PrivateContestParticipate)} flex={1} alignItems='center'>
          <Text fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} py={10}>Participants</Text>
        </Pressable> */}
      </Box>

      <Body>

        {/* <Box backgroundColor={colors.paleGray} h={moderateScale(60)} px={15} flexDirection='row' alignItems='center' justifyContent='space-between'>
          <Box gap={4}>
            <Text fontFamily='$robotoRegular' fontSize={14} lineHeight={16} color={colors.grayish} numberOfLines={1} >Contest Name</Text>
            <Text fontFamily={'$robotoMedium'} fontSize={16} lineHeight={18} color={colors.black} numberOfLines={1} >club701006's Contest</Text>
          </Box>

          <Pressable onPress={() => setDatePickerModel(true)}>
            <Icon as={EditPencil} size='lg' />
          </Pressable>
        </Box> */}

        <Box mx={15} mt={20}>
          <InputText label='Entry Fee' textInputProps={{ placeholder: 'Enter Fee', value: formik.values.entryfee, onChangeText: formik.handleChange('entryfee'), onBlur: formik.handleBlur('entryfee'), keyboardType: "numeric", }} />
          {(formik.errors.entryfee && formik.touched.entryfee) ? <Text fontFamily='$poppinsMedium' fontSize={12} lineHeight={14} color={colors.red}>{formik.errors.entryfee}</Text> : null}

          <Box flexDirection='row' alignItems='center' gap={moderateScale(10)} mt={15}>
            <Box flex={1}>
              <InputText label='Spots' textInputProps={{ placeholder: 'Enter Spots', value: formik.values.spots, onChangeText: formik.handleChange('spots'), onBlur: formik.handleBlur('spots'), keyboardType: "numeric", }} />
              {(formik.errors.spots && formik.touched.spots) ? <Text fontFamily='$poppinsMedium' fontSize={12} lineHeight={14} color={colors.red}>{formik.errors.spots}</Text> : null}
            </Box>

            <Box flex={1}>
              <InputText label='Winners' textInputProps={{ placeholder: 'Enter Winners percent', value: formik.values.winners, onChangeText: formik.handleChange('winners'), onBlur: formik.handleBlur('winners'), keyboardType: "numeric", }} />
              {(formik.errors.winners && formik.touched.winners) ? <Text fontFamily='$poppinsMedium' fontSize={12} lineHeight={14} color={colors.red}>{formik.errors.winners}</Text> : null}
            </Box>
          </Box>
        </Box>

        {/* <Box flexDirection='row' alignItems='center' justifyContent='space-between' mx={15} my={moderateScaleVertical(20)}>
          <Text fontFamily='$robotoMedium' fontSize={14} lineHeight={16} color={colors.black} numberOfLines={1} >Teams Allowed</Text>

          <RadioGroup value={selectedRadio} onChange={setSelectedRadio}>
            <HStack space="2xl">
              <Radio value="single">
                <RadioIndicator mr="$2" borderColor={colors.greenText}>
                  <RadioIcon as={CircleIcon} color={colors.themeRed} />
                </RadioIndicator>
                <RadioLabel fontFamily='$robotoRegular'>Single</RadioLabel>
              </Radio>
              <Radio value="multiple">
                <RadioIndicator mr="$2" borderColor={colors.greenText}>
                  <RadioIcon as={CircleIcon} color={colors.themeRed} />
                </RadioIndicator>
                <RadioLabel fontFamily='$robotoRegular'>Multiple</RadioLabel>
              </Radio>
            </HStack>
          </RadioGroup>
        </Box> */}

        <Box display={selectedRadio === 'multiple' ? 'flex' : 'none'} px={15} my={15}>
          <InputText label='Enter Bid Limit' textInputProps={{ value: formik.values.teammultiplelimit, onChangeText: formik.handleChange('teammultiplelimit'), onBlur: formik.handleBlur('teammultiplelimit'), placeholder: 'Enter limit', keyboardType: "numeric" }} />
          {(formik.errors.teammultiplelimit && formik.touched.teammultiplelimit) ? <Text fontFamily='$poppinsMedium' fontSize={12} lineHeight={14} color={colors.red}>{formik.errors.teammultiplelimit}</Text> : null}
        </Box>


        <Box mx={15}>
          <Text fontFamily='$robotoMedium' fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} >Select Category</Text>

          {/* <Box flexDirection='row' alignItems='center' gap={10}>
            <Dropdown
              style={localStyles.dropdown}
              placeholderStyle={localStyles.placeholderStyle}
              selectedTextStyle={localStyles.selectedTextStyle}
              data={mainCate}
              disable={!(!!mainCate)}
              labelField="label"
              valueField="value"
              placeholder={'Select Category'}
              // value={formik.values.bookingfor}
              onChange={(item: any) => { formik.setFieldValue('selectcategory', item) }}
              renderRightIcon={() => <Icon as={ChevronDownIcon} size="sm" mr='$2' />}
              selectedTextProps={{ numberOfLines: 1 }}
              renderItem={(item) => { return (<Text fontFamily='$robotoMedium' color='white' fontSize={14} lineHeight={16} numberOfLines={1} style={{ paddingHorizontal: responsiveWidth(2.5), paddingVertical: responsiveHeight(1.5) }} >{item?.label ?? 'N/A'}</Text>) }}
              itemTextStyle={localStyles.selectedTextStyle}
              itemContainerStyle={localStyles.itemContainerStyle}
            />
          </Box> */}
          <Box flexDirection="row" alignItems="center" gap={10}>
          <Dropdown
  style={[
    localStyles.dropdown,
    { 
      backgroundColor: 'black',
      borderColor: 'gold',
      borderEndWidth: 1,
    }
  ]}
  placeholderStyle={[localStyles.placeholderStyle]}
  selectedTextStyle={[localStyles.selectedTextStyle, { color: 'white' }]}
  data={mainCate}
  disable={!(!!mainCate)}
  labelField="label"
  valueField="value"
  placeholder="Select Category"
  onChange={(item: any) => formik.setFieldValue('selectcategory', item)}
  renderRightIcon={() => (
    <Icon as={ChevronDownIcon} size="sm" mr="$2" color="white" />
  )}
  selectedTextProps={{ numberOfLines: 1 }}
  renderItem={(item) => (
    <Box backgroundColor="black">
      <Text
        fontFamily="$robotoMedium"
        color="white"
        fontSize={14}
        lineHeight={16}
        numberOfLines={1}
        style={{
          paddingHorizontal: responsiveWidth(2.5),
          paddingVertical: responsiveHeight(1.5),
        }}
      >
        {item?.label ?? 'N/A'}
      </Text>
    </Box>
  )}
  itemTextStyle={[localStyles.selectedTextStyle, { color: 'white' }]}
  itemContainerStyle={[localStyles.itemContainerStyle, { backgroundColor: 'black' }]}
/>

          </Box>


          {(formik.errors.selectcategory && formik.touched.selectcategory) ? <Text fontFamily='$poppinsMedium' fontSize={12} lineHeight={14} color={colors.red}>{formik.errors.selectcategory as string}</Text> : null}
        </Box>

        <Pressable onPress={() => setDatePickerModel(true)} my={moderateScaleVertical(20)} gap={moderateScale(10)}>
          <Box
            mx={15}
            bgColor={colors.black}
            py={18}
            borderRadius={10}
            borderColor={colors.gold}
            borderRightWidth={1}
            pl={10}
            borderEndEndRadius={10}
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            pr={10} // Add padding-right to avoid cutting the icon
          >
            <Text
              fontFamily="$robotoMedium"
              fontSize={14}
              lineHeight={16}
              color={!!formik?.values.slotdateday ? colors.white : colors.grayish}
              numberOfLines={1}
            >
              {!!formik?.values.slotdateday
                ? format(parseISO(formik?.values?.slotdateday), "dd/MM/yyyy hh:mm a")
                : "Select Date"}
            </Text>
            <Image style={{ width: 12, height: 12 }} source={require("../assets/images/down.png")} />
          </Box>
          {formik.errors.slotdateday && formik.touched.slotdateday ? (
            <Text fontFamily="$poppinsMedium" fontSize={12} lineHeight={14} color={colors.red} pl={moderateScale(15)}>
              {formik.errors.slotdateday}
            </Text>
          ) : null}
        </Pressable>


        <Box backgroundColor='#fff7e0' mx={15} borderRadius={moderateScale(10)} overflow='hidden'>
          <Box flexDirection='row' alignItems='center'>
            <Pressable flex={1} onPress={getDistributionRank}>
              <Box flex={1} alignItems='center' py={moderateScaleVertical(20)}>
                <Text fontFamily='$robotoMedium' fontSize={12} lineHeight={14} color={colors.gray6} numberOfLines={1} >Prize Distribution Pool</Text>
                <Box flexDirection='row' alignItems='center'>
                  {/* winners */}
                  <Text fontFamily='$robotoMedium' fontSize={20} lineHeight={22} color={colors.black} numberOfLines={1} >{'\u20B9'} {formatAmount(((Number(formik.values.entryfee) * Number(formik.values.spots)) * (Number(setting?.distirbytionpercent) / 100)))}</Text>
                  <Icon as={ChevronDownIcon} size="lg" />
                </Box>

              </Box>
            </Pressable>

            {/* enter fee * spots = prize poll */}
            {/* (enter fee * spots)*(winner/100) = prize Distribution poll */}

            <Box borderRightWidth={1} borderRightColor={colors.gray3} h={moderateScale(40)}></Box>
            <Box flex={1} alignItems='center' py={moderateScaleVertical(20)}>
              <Text fontFamily='$robotoMedium' fontSize={12} lineHeight={14} color={colors.gray6} numberOfLines={1} >Prize Max Pool</Text>
              <Text fontFamily='$robotoMedium' fontSize={20} lineHeight={22} color={colors.black} numberOfLines={1} >{'\u20B9'} {formatAmount(Number(formik.values.entryfee) * Number(formik.values.spots))}</Text>
            </Box>
          </Box>

          {/* influencerfee */}
          {/* (enter fee * spots)*(influencerfee/100) = prize Distribution poll */}
          <Box backgroundColor='#ffefc3' h={moderateScale(30)} alignItems='center' justifyContent='center'>
            <Text fontFamily='$robotoMedium' fontSize={14} lineHeight={14} color={colors.black} numberOfLines={1} >You will earn {'\u20B9'} {formatAmount((Number(formik.values.entryfee) * Number(formik.values.spots) * (Number(setting?.influencerfee) / 100)))}</Text>
          </Box>
        </Box>

        <PrimaryButton onPress={formik.handleSubmit} disabled={useCreatePrivateContestMutation.isPending} loading={useCreatePrivateContestMutation.isPending} bgColor={colors.mediumBlue} buttonText='Create Contest' marginHorizontal={moderateScale(15)} marginTop={moderateScaleVertical(20)} />


        <Box bgColor={colors.black} mx={moderateScale(15)} h={moderateScale(45)} px={5} py={5} justifyContent='center' alignItems='center' borderRadius={6} my={moderateScaleVertical(15)}>
          <Text fontFamily='$robotoMedium' textAlign='center' fontSize={10} lineHeight={12} color={colors.white} numberOfLines={3}>
            ⚠️ Contests with a prize pool above ₹1 Lakh require approval before going live.
          </Text>
          <Text fontFamily='$robotoMedium' textAlign='center' fontSize={10} lineHeight={12} color={colors.white} numberOfLines={3} marginTop={14}>
            Once submitted, the contest will be sent for approval. As soon as it gets approved, it will automatically comes live! 🚀
          </Text>
        </Box>
      </Body>

      {/* <Modal
        animationType='slide'
        transparent={true}
        visible={datePickerModel}
      >

        <Box style={localStyles.modalCenterView} >
          <Box style={localStyles.modalView}>
            <DatePicker
              mode='datepicker'
              options={{
                mainColor: colors.themeRed,
              }}
              onSelectedChange={(propDate: any) => {
                console.log(propDate, ' chhhkk');

                const parsedDate = parse(propDate, 'yyyy/MM/dd HH:mm', new Date());
                // const utcDateString = formatInTimeZone(parsedDate, 'UTC', "yyyy-MM-dd'T'HH:mm:ss'Z'");
                // Convert to ISO string (UTC format)
                const utcDateString = parsedDate.toISOString();;
                console.log(utcDateString, ' chhh');
                // const parsedDate = parse(propDate, 'yyyy/MM/dd', new Date())
                // formik.setFieldValue('slotdateday', format(parsedDate, 'yyyy-MM-dd'))

              }}
              selected={formik.values.slotdateday}
              onTimeChange={(propDate: any) => {
                // console.log(propDate, ' time');

                // const parsedDate = parse(propDate, 'yyyy/MM/dd', new Date())
                // formik.setFieldValue('slotdateday', format(parsedDate, 'yyyy-MM-dd'))

              }}
              onDateChange={(propDate: any) => {
                // console.log(propDate, 'date');

                // const parsedDate = parse(propDate, 'yyyy/MM/dd', new Date())
                // formik.setFieldValue('slotdateday', format(parsedDate, 'yyyy-MM-dd'))

              }}
              minimumDate={startDate}
            />
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
      </Modal> */}

      <Modal animationType='slide' transparent={true} visible={showPrizePoll} onRequestClose={() => setShowPrizePoll(false)}>
        <Box flex={1} backgroundColor='rgba(0, 0, 0, 0.5)' >
          <Box backgroundColor={colors.black} borderRadius={10} w={'100%'} gap={15} py={20} h={moderateScale(460)} marginTop={deviceHeight * 0.43}>
            <Box flexDirection='row' justifyContent='space-between' alignItems='center' px={15}>
              <Text fontFamily='$robotoBold' fontSize={16} lineHeight={18} color={colors.Purple} numberOfLines={1} >Prize Break-up</Text>
              <Pressable onPress={() => setShowPrizePoll(false)}>
                <Icon as={CloseIcon} size="lg" color={colors.red} />
              </Pressable>
            </Box>
            <Body>

              <Box flexDirection='row' justifyContent='space-between' alignItems='center' backgroundColor={colors.black} h={moderateScale(60)} mb={15} px={15}>
                <Box>
                  <Text fontFamily='$robotoMedium' fontSize={12} lineHeight={16} color={colors.white} numberOfLines={1}>Total winnings</Text>
                  <Text fontFamily='$robotoBold' fontSize={16} lineHeight={18} color={colors.white} numberOfLines={1} >{'\u20B9'} {formatAmount(((Number(formik.values.entryfee) * Number(formik.values.spots)) * (Number(setting?.distirbytionpercent) / 100)))}</Text>
                </Box>

                <Box>
                  <Text fontFamily='$robotoMedium' fontSize={12} lineHeight={16} color={colors.white} numberOfLines={1}>Winners</Text>
                  <Text fontFamily='$robotoBold' fontSize={16} lineHeight={18} color={colors.white} numberOfLines={1} >{Number(formik.values.spots) * (Number(formik.values.winners) / 100)}</Text>
                </Box>

                <Box>
                  <Text fontFamily='$robotoMedium' fontSize={12} lineHeight={16} color={colors.white} numberOfLines={1}>Entry Fee</Text>
                  <Text fontFamily='$robotoBold' fontSize={16} lineHeight={18} color={colors.white} numberOfLines={1} textAlign='right'>{'\u20B9'} {formatAmount(Number(formik.values.entryfee))}</Text>
                </Box>
              </Box>

              <Box>
                <Box flexDirection='row' justifyContent='space-between' alignItems='center' py={moderateScale(10)} px={15}>
                  <Text fontFamily='$robotoMedium' fontSize={12} lineHeight={16} color={colors.white} numberOfLines={1}>Ranks</Text>
                  <Text fontFamily='$robotoMedium' fontSize={12} lineHeight={16} color={colors.white} numberOfLines={1}>Prizes</Text>
                </Box>
                <Box borderBottomWidth={1} borderBottomColor={colors.gray5}></Box>

                {isLoading ? <Box flexDirection='row' justifyContent='center' w={'100%'} py={moderateScale(10)} px={15}>
                  <ActivityIndicator size='small' color={colors.white} />
                </Box> :
                  rankData?.map((item: any, ind: number) => {
                    return (
                      <Box key={ind} flexDirection='row' justifyContent='space-between' alignItems='center' py={moderateScale(10)} px={15}>
                        <Text fontFamily='$robotoMedium' fontSize={12} lineHeight={16} color={colors.white} numberOfLines={1}>{ind + 1}</Text>
                        <Text fontFamily='$robotoMedium' fontSize={12} lineHeight={16} color={colors.white} numberOfLines={1}>{'\u20B9'} {formatAmount(Number(item))}</Text>
                      </Box>
                    )
                  })
                }
                {/* {
                  ['1', '2', '3', '4', '5', '6 - 10', '11-20', '20-30', '30-40']?.map((item, index) => {
                    return (
                      <Box key={item} flexDirection='row' justifyContent='space-between' alignItems='center' py={moderateScale(10)} px={15}>
                        <Text fontFamily='$robotoMedium' fontSize={12} lineHeight={16} color={colors.white} numberOfLines={1}>{item}</Text>
                        <Text fontFamily='$robotoMedium' fontSize={12} lineHeight={16} color={colors.white} numberOfLines={1}>{'\u20B9'} 40,000</Text>
                      </Box>
                    )
                  })
                } */}

                <Text fontFamily='$robotoMedium' fontSize={12} lineHeight={16} color={colors.white} numberOfLines={3} px={15} py={10}><Text fontFamily='$robotoMedium' fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1}>Note : </Text>As per the government regulations, starting 1st April 2023 a tax of 30% will be levied at the time of withdrawal or at the end of finacial year on the net winnings.</Text>

                <Box bgColor={colors.paleGray} mx={15} h={moderateScale(30)} justifyContent='center' alignItems='center' borderRadius={6}>
                  <Text fontFamily='$robotoMedium' fontSize={10} lineHeight={12} color={colors.black} numberOfLines={1}>There will be fewer winners if less then 1000( how many slots) bids placed.</Text>
                </Box>

                <Box bgColor={colors.black} mx={15} h={moderateScale(30)} w={moderateScale(150)} justifyContent='center' alignItems='center' alignSelf='center' borderRadius={6} mt={10}>
                  <Text fontFamily='$robotoMedium' fontSize={10} lineHeight={12} color={colors.white} numberOfLines={1}>This is flexible contest.</Text>
                </Box>

              </Box>

            </Body>
          </Box>
        </Box>
      </Modal>

      <DateTimePickerModal isVisible={datePickerModel} mode='datetime' date={new Date()} onConfirm={handleConfirm} onCancel={hideDatePicker} minimumDate={today} />

    </Container>
  )
}

export default CreatePrivateContest

const localStyles = StyleSheet.create({

  dropdown: {
    borderRadius: moderateScale(6),
    height: moderateScale(50),
    backgroundColor: colors.black,
    marginTop: moderateScaleVertical(10),
    paddingLeft: moderateScale(10),
    flex: 1,
    borderEndEndRadius: 10,
    borderRightWidth: 1,
    borderColor: colors.white
  },
  labelStyle: {
    // ...styles.mt15,
  },
  placeholderStyle: {
    fontSize: textScale(12),
    fontFamily: 'Roboto-Medium',
    color: colors.grayish,
  },
  selectedTextStyle: {
    // ...typography.fontSizes.f12,
    // ...typography.fontWeights.Medium,
    // color: colors.black,
  },
  itemContainerStyle: {
    // borderBottomWidth: 1,
  },
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
})