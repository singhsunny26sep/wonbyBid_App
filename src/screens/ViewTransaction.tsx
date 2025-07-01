import { Box, Icon, Spinner, Text } from '@gluestack-ui/themed'
import { Dropdown } from 'react-native-element-dropdown'

import { Container } from '../components/Container'
import { AppBar } from '../components/AppBar'
import { colors } from '../constants/colors'
import { moderateScale, moderateScaleVertical, textScale } from '../utils/responsiveSize'
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { deviceHeight, transactionTypes } from '../constants/constant'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { useEffect, useState } from 'react'
import { ChevronDownIcon } from '@gluestack-ui/themed'
import useGetTransactionHistory from '../hooks/auth/get-transactions'
import PrimaryButton from '../components/Button/PrimaryButton'
import { format } from 'date-fns'
import Loader from '../components/Loader'


const TransactionCard = ({ item, index }: { item: any, index: number }) => {
  return (
    <Box backgroundColor="black" py={moderateScaleVertical(10)} px={moderateScale(10)} borderRadius={moderateScale(5)} borderRightWidth={2} borderLeftWidth={2} borderTopRightRadius={moderateScale(10)} borderBottomRightRadius={moderateScale(10)} borderTopLeftRadius={moderateScale(15)} borderBottomLeftRadius={moderateScale(15)} borderColor={colors.gold} marginTop={10} gap={moderateScale(5)}>
      <Box flexDirection='row' alignItems='center'>
        <Text flex={1} fontFamily={'$robotoBold'} fontSize={14} lineHeight={16} color="gray" numberOfLines={1}>Date & Time</Text>
        <Text flex={1} fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color="gray" numberOfLines={1}>{item?.createdAt ? format(new Date(item?.createdAt), "MMM dd, hh:mm a") : 'Aug 01,07:47 PM'}</Text>
      </Box>

      <Box flexDirection='row' alignItems='center'>
        <Text flex={1} fontFamily={'$robotoBold'} fontSize={14} lineHeight={16} color="gray" numberOfLines={1} alignSelf='flex-start'>Description</Text>
        <Text flex={1} fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color="gray" numberOfLines={3}>{item?.description}</Text>
      </Box>

      <Box flexDirection='row' alignItems='center'>
        <Text flex={1} fontFamily={'$robotoBold'} fontSize={14} lineHeight={16} color="gray" numberOfLines={1}>Transaction Amount</Text>
        <Text flex={1} fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color="gray" numberOfLines={1}>{'\u20B9'}{item?.amount}</Text>
      </Box>

      <Box flexDirection='row' alignItems='center'>
        <Text flex={1} fontFamily={'$robotoBold'} fontSize={14} lineHeight={16} color="gray" numberOfLines={1}>Transaction Type</Text>
        <Text flex={1} fontFamily={'$robotoMedium'} fontSize={14} lineHeight={16} color="gray" numberOfLines={1} textTransform='capitalize'>{item?.type}</Text>
      </Box>
    </Box>
  )
}


const ViewTransaction = () => {

  // states
  const [selectedTransactionType, setSelectedTransactionType] = useState<string>('')
  // const {data: transactionHistory, isLoading: transactionHistoryIsLoading } = useGetTransactionsQuery({page, limit});
  const [page, setPage] = useState(1); // Start with page 1
  const limit = 10; // Set the limit of items per page

  // api
  const { data: transactionHistory, isLoading: transactionHistoryIsLoading } = useGetTransactionHistory({ page, limit, selectedTransactionType });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // console.log("transactionHistory: ", transactionHistory?.data);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage((prevPage) => prevPage - 1);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
    setSelectedTransactionType({ "_index": 0, "label": "All", "value": "All" })
  }, [isLoading])
  if (isLoading) {
    return (
      <Container backgroundColor='black' statusBarStyle='light-content' statusBarBackgroundColor={colors.themeRed}>
        <AppBar back title='View Transactions' />
        <Box flex={1} backgroundColor='black' justifyContent='center' alignItems='center' >
          {/* <Spinner size={'large'} color={colors.gold} /> */}
          <Loader />
        </Box>
      </Container>
    )
  }
  return (
    <Container statusBarStyle='light-content' statusBarBackgroundColor={colors.themeRed} backgroundColor={colors.black}>
      <AppBar back title='View Transactions' />
      <Box flexDirection='row' alignItems='center' justifyContent='space-between' mx={moderateScale(15)} py={moderateScaleVertical(10)} borderBottomWidth={1} borderBottomColor={colors.gray3} mt={moderateScaleVertical(10)}>
        <Text fontFamily={'$robotoBold'} fontSize={18} lineHeight={20} color={colors.white} numberOfLines={1} >Account Details</Text>
        {/* <Text fontFamily={'$robotoMedium'} fontSize={16} lineHeight={18} color={colors.white} numberOfLines={1} >Documents & Invoices</Text> */}
      </Box>

      <Box mx={moderateScale(15)} mb={moderateScaleVertical(5)}>
        <Dropdown
          style={localStyles.dropdown}
          placeholderStyle={localStyles.placeholderStyle}
          selectedTextStyle={localStyles.selectedTextStyle}
          data={transactionTypes}
          labelField="label"
          valueField="value"
          placeholder={'Select Transaction Type'}
          // value={formik.values.bookingfor}
          onChange={(item: any) => { setSelectedTransactionType(item) }}
          renderRightIcon={() => <Icon as={ChevronDownIcon} size="sm" mr='$2' color="white" />}

          selectedTextProps={{ numberOfLines: 1 }}
          renderItem={(item) => { return (<Text fontFamily='$robotoMedium' padding={5} fontSize={12} lineHeight={16} numberOfLines={1} style={{ paddingHorizontal: responsiveWidth(2.5), paddingVertical: responsiveHeight(1.5) }} >{item?.label}</Text>) }}
          itemTextStyle={localStyles.selectedTextStyle}
          itemContainerStyle={localStyles.itemContainerStyle}
        />
      </Box>


      <FlatList
        data={transactionHistory?.data?.data}
        renderItem={({ item, index }: { item: any, index: number }) => <TransactionCard key={item?._id} item={item} index={index} />}
        keyExtractor={(item) => item?._id}
        showsVerticalScrollIndicator={false}
        style={{}}
        contentContainerStyle={{ marginHorizontal: moderateScale(15), gap: moderateScale(15), marginTop: moderateScaleVertical(5), }}
        ListFooterComponent={() => (
          <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
            {/* Previous Page Button */}
            <PrimaryButton buttonText="Previous Page" onPress={handlePreviousPage} loading={transactionHistoryIsLoading} disabled={transactionHistory?.data?.currentPage === 1} backgroundColor={transactionHistory?.data?.currentPage === 1 ? colors.gray : colors.greenText} height={moderateScaleVertical(40)} marginHorizontal={moderateScale(0)} marginBottom={moderateScaleVertical(10)} />

            {/* Current Page Display */}
            <Box borderWidth={1} borderRadius={8} w={moderateScale(35)} height={moderateScaleVertical(35)} marginBottom={moderateScaleVertical(10)} alignItems="center" justifyContent="center">
              <Text fontFamily="$robotoMedium" fontSize={12} lineHeight={14} color={colors.white} numberOfLines={1} >{transactionHistory?.data?.currentPage} / {transactionHistory?.data?.totalPages}</Text>
            </Box>

            {/* Next Page Button */}
            <PrimaryButton buttonText={`Next Page ${transactionHistory?.data?.totalPages}`} onPress={handleNextPage} loading={transactionHistoryIsLoading} disabled={transactionHistory?.data?.currentPage === transactionHistory?.data?.totalPages} backgroundColor={transactionHistory?.data?.currentPage === transactionHistory?.data?.totalPages ? colors.gray : colors.greenText} height={moderateScaleVertical(40)} marginHorizontal={moderateScale(0)} marginBottom={moderateScaleVertical(10)} />
          </Box>
        )}
      />

      <Box mb={moderateScale(5)}>

      </Box>

    </Container>
  )
}

export default ViewTransaction

// and also need to check addCash function there is showing error while payment
/* ListFooterComponent={() => (
            <Box display='flex' flexDirection='row' justifyContent={'space-between'} alignItems='center'>
              <PrimaryButton buttonText={`Previous Page`} onPress={handlePreviousPage} loading={transactionHistoryIsLoading} backgroundColor={colors.greenText} height={moderateScaleVertical(40)} marginHorizontal={moderateScale(0)} marginBottom={moderateScaleVertical(10)} />

              <Box borderWidth={1} borderRadius={8} w={moderateScale(35)} height={moderateScaleVertical(35)} marginBottom={moderateScaleVertical(10)} alignItems='center' justifyContent='center'>
                <Text fontFamily={'$robotoMedium'} fontSize={12} lineHeight={14} color={colors.black} numberOfLines={1}>{transactionHistory?.data?.currentPage}</Text>
              </Box>

              <PrimaryButton buttonText={`Next Page ${transactionHistory?.data?.totalPages}`} loading={transactionHistoryIsLoading} onPress={handleNextPage} backgroundColor={colors.greenText} height={moderateScaleVertical(40)} marginHorizontal={moderateScale(0)} marginBottom={moderateScaleVertical(10)} />
            </Box>
          )} */

const localStyles = StyleSheet.create({

  dropdown: {
    borderRadius: moderateScale(6),
    height: moderateScale(30),
    backgroundColor: colors.black,
    marginTop: moderateScaleVertical(10),
    paddingLeft: moderateScale(10),
    borderWidth: 1,
    borderColor: colors.grayish,
    color: colors.white

  },
  labelStyle: {
    // ...styles.mt15,

  },
  placeholderStyle: {
    fontSize: textScale(12),
    fontFamily: 'Roboto-Medium',
    color: colors.white,
  },
  selectedTextStyle: {
    fontSize: textScale(12),
    fontFamily: 'Roboto-Medium',
    color: colors.white,
    // ...typography.fontSizes.f12,
    // ...typography.fontWeights.Medium,
    // color: colors.black,
  },
  itemContainerStyle: {
    // borderBottomWidth: 1,
    backgroundColor: colors.black,
    color: colors.white
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