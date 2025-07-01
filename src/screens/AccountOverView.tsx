import { Box, Spinner, Text } from '@gluestack-ui/themed';

import { Container } from '../components/Container';
import { AppBar } from '../components/AppBar';
import { colors } from '../constants/colors';
import { moderateScale, moderateScaleVertical } from '../utils/responsiveSize';
import { TouchableOpacity, View } from 'react-native';
import { InfoCircleIcon } from '../components/Icons';
import useAccountOverView from '../hooks/auth/use-accout-overview';
import { NavigationString } from '../navigation/navigationStrings';
import { ScrollView } from 'react-native';
import { Modal } from 'react-native';
import { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import Loader from '../components/Loader';

const AccountOverView = ({ navigation }: any) => {
  const { data: result, isLoading } = useAccountOverView();
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  // console.log("result: ", result?.data);

  if (isLoading) {
    return (
      <Container
        statusBarStyle="light-content"
        statusBarBackgroundColor={colors.themeRed}
        backgroundColor={colors.black}>
        <AppBar back title={'Account Overview'} />
        <Box backgroundColor="black" my={moderateScaleVertical(10)} py={moderateScaleVertical(10)}>
          <Text fontFamily="$robotoBold" fontSize={20} lineHeight={22} color={colors.white} numberOfLines={1}>Account Overview</Text>
        </Box>
        <Box flex={1} backgroundColor="black" py={moderateScaleVertical(10)}>
          {/* <Spinner size={'large'} color={colors.gold} /> */}
          <Loader />
        </Box>
      </Container>
    );
  }

  // console.log("result?.data?.data?.totalDepositeBalance ? result?.data?.data?.totalDepositeBalance : 0:", result?.data?.data?.data?.totalDepositeBalance);

  return (
    <Container
      statusBarStyle="light-content"
      statusBarBackgroundColor={colors.themeRed}
      backgroundColor={colors.black}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <AppBar textColor={colors.gold} back title={'Account Overview'} />
        {/* <Box mx={moderateScale(15)} my={moderateScaleVertical(10)} py={moderateScaleVertical(10)} borderBottomColor={colors.gray5}>
        <Text fontFamily='$robotoBold' fontSize={20} lineHeight={22} color={colors.Purple} numberOfLines={1} >Account Overview</Text>
      </Box> */}
        <Box
          mx={moderateScale(15)}
          py={moderateScaleVertical(10)}
          borderBottomWidth={1}
          borderBottomColor={colors.gray5}>
          <Text
            fontFamily="$robotoBold"
            fontSize={16}
            lineHeight={18}
            color={colors.white}
            numberOfLines={1}>
            Cash Account
          </Text>
        </Box>
        <Box gap={moderateScale(15)} my={moderateScaleVertical(15)}>
          <Box flexDirection="row" alignItems="center" mx={moderateScale(15)}>
            <Text
              fontFamily="$robotoRegular"
              flex={1}
              fontSize={14}
              lineHeight={16}
              color={colors.white}
              numberOfLines={1}>
              Total Deposit Balance :
            </Text>
            <Text
              fontFamily="$robotoBold"
              flex={1}
              fontSize={14}
              lineHeight={16}
              color={colors.white}
              numberOfLines={1}>
              {'\u20B9'}
              {result?.data?.data?.totalDepositeBalance
                ? result?.data?.data?.totalDepositeBalance.toFixed(2)
                : 0}
            </Text>
          </Box>
          <Box flexDirection="row" alignItems="center" mx={moderateScale(15)}>
            <Text
              fontFamily="$robotoRegular"
              flex={1}
              fontSize={14}
              lineHeight={16}
              color={colors.white}
              numberOfLines={1}>
              Total Withdrawn Balance :
            </Text>
            <Text
              fontFamily="$robotoBold"
              flex={1}
              fontSize={14}
              lineHeight={16}
              color={colors.white}
              numberOfLines={1}>
              {'\u20B9'}
              {result?.data?.data?.withDrwalBalance}
            </Text>
          </Box>

          <Box flexDirection="row" alignItems="center" mx={moderateScale(15)}>
            <Text
              fontFamily="$robotoRegular"
              flex={1}
              fontSize={14}
              lineHeight={16}
              color={colors.white}
              numberOfLines={1}>
              Wallet Balance :
            </Text>
            <Text
              fontFamily="$robotoBold"
              flex={1}
              fontSize={14}
              lineHeight={16}
              color={colors.white}
              numberOfLines={1}>
              {'\u20B9'}
              {result?.data?.data?.totalWaletAmount ? result?.data?.data?.totalWaletAmount.toFixed(2) : 0}
            </Text>
          </Box>

          <Box flexDirection="row" alignItems="center" mx={moderateScale(15)}>
            <Text
              fontFamily="$robotoRegular"
              flex={1}
              fontSize={14}
              lineHeight={16}
              color={colors.white}
              numberOfLines={1}>
              Winning Balance :
            </Text>
            <Text
              fontFamily="$robotoBold"
              flex={1}
              fontSize={14}
              lineHeight={16}
              color={colors.white}
              numberOfLines={1}>
              {'\u20B9'}
              {result?.data?.data?.totalWinningBalance
                ? result?.data?.data?.totalWinningBalance.toFixed(2)
                : 0}
            </Text>
          </Box>
          <Box flexDirection="row" alignItems="center" mx={moderateScale(15)}>
            <Box flex={1} flexDirection="row">
              <Text
                fontFamily="$robotoRegular"
                fontSize={14}
                lineHeight={16}
                color={colors.white}
                numberOfLines={1}>
                TDS :{' '}
              </Text>
              <TouchableOpacity
                style={{ marginTop: -2 }}
                onPress={() => navigation.navigate('Tds')}>
                <InfoCircleIcon />
              </TouchableOpacity>
            </Box>
            <Text
              fontFamily="$robotoBold"
              flex={1}
              fontSize={14}
              lineHeight={16}
              color={colors.white}
              numberOfLines={1}>
              {'\u20B9'}
              {result?.data?.data?.totalTax
                ? result?.data?.data?.totalTax.toFixed(2)
                : 0}
            </Text>
          </Box>

          {/* <Box flexDirection='row' alignItems='center' mx={moderateScale(15)}>
            <Text fontFamily='$robotoRegular' flex={1} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} >Referral Amount :</Text>
            <Text fontFamily='$robotoBold' flex={1} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} >{'\u20B9'}{result?.data?.data?.referalAmount ? result?.data?.data?.referalAmount.toFixed(2) : 0}</Text>
          </Box> */}
          <Box flexDirection="row" alignItems="center" mx={moderateScale(15)}>
            <Box flex={1} flexDirection="row">
              <Text
                fontFamily="$robotoRegular"
                fontSize={14}
                lineHeight={16}
                color={colors.white}
                numberOfLines={1}>
                Withdrawable Balance :
              </Text>
              {/* <TouchableOpacity style={{ marginTop: -2 }} onPress={toggleModal}>
                <InfoCircleIcon />
              </TouchableOpacity> */}
            </Box>
            <Text
              fontFamily="$robotoBold"
              flex={1}
              fontSize={14}
              lineHeight={16}
              color={colors.white}
              numberOfLines={1}>
              {'\u20B9'}
              {result?.data?.data?.withDrwalBalanceAfterTax
                ? result?.data?.data?.withDrwalBalanceAfterTax.toFixed(2)
                : 0}
            </Text>
          </Box>

          {/* Info Popup Modal */}
          {/* <Modal transparent={true} visible={isModalVisible} animationType="fade">
            <TouchableWithoutFeedback onPress={toggleModal}>
              <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              }}>
                <TouchableWithoutFeedback>
                  <View style={{
                    backgroundColor: 'black',
                    padding: 20,
                    borderRadius: 10,
                    width: '80%',
                    alignItems: 'center',
                  }}>
                    <Text fontSize={18} color='white' fontWeight="bold" mb={4} textAlign="center">
                      Winning Balance After tax + Referral Amount
                    </Text>


                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal> */}

          <Box flexDirection="row" alignItems="center" mx={moderateScale(15)}>
            <Text
              fontFamily="$robotoRegular"
              flex={1}
              fontSize={14}
              lineHeight={16}
              color={colors.white}
              numberOfLines={1}>
              GST Deducted :
            </Text>
            <Text
              fontFamily="$robotoBold"
              flex={1}
              fontSize={14}
              lineHeight={16}
              color={colors.white}
              numberOfLines={1}>
              {'\u20B9'}
              {result?.data?.data?.totalGstDeductAmount
                ? result?.data?.data?.totalGstDeductAmount.toFixed(2)
                : 0}
            </Text>
          </Box>

          {/* <Box flexDirection='row' alignItems='center' mx={moderateScale(15)}>
            <Text fontFamily='$robotoRegular' flex={1} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} >TDS Deducted :</Text>
            <Text fontFamily='$robotoBold' flex={1} fontSize={14} lineHeight={16} color={colors.white} numberOfLines={1} >{'\u20B9'}{result?.data?.data?.tdsDeduct ? result?.data?.data?.tdsDeduct.toFixed(2) : 0}</Text>
          </Box> */}
        </Box>

        <Box
          mx={moderateScale(15)}
          py={moderateScaleVertical(10)}
          borderBottomWidth={1}
          borderBottomColor={colors.gray5}>
          <Text
            fontFamily="$robotoBold"
            fontSize={16}
            lineHeight={18}
            color={colors.white}
            numberOfLines={1}>
            Bonus Cash Account
          </Text>
        </Box>

        <Box gap={moderateScale(15)} my={moderateScaleVertical(15)}>
          <Box flexDirection="row" alignItems="center" mx={moderateScale(15)}>
            <Text
              fontFamily="$robotoRegular"
              flex={1}
              fontSize={14}
              lineHeight={16}
              color={colors.white}
              numberOfLines={1}>
              Bonus Cash Credited :
            </Text>
            <Text
              fontFamily="$robotoBold"
              flex={1}
              fontSize={14}
              lineHeight={16}
              color={colors.white}
              numberOfLines={1}>
              {'\u20B9'}
              {result?.data?.data?.totalCreditBonusCash
                ? result?.data?.data?.totalCreditBonusCash.toFixed(2)
                : 0}
            </Text>
          </Box>
          <Box flexDirection="row" alignItems="center" mx={moderateScale(15)}>
            <Text
              fontFamily="$robotoRegular"
              flex={1}
              fontSize={14}
              lineHeight={16}
              color={colors.white}
              numberOfLines={1}>
              Bonus Cash Used :
            </Text>
            <Text
              fontFamily="$robotoBold"
              flex={1}
              fontSize={14}
              lineHeight={16}
              color={colors.white}
              numberOfLines={1}>
              {'\u20B9'}
              {result?.data?.data?.totalBonusAmountUsed
                ? result?.data?.data?.totalBonusAmountUsed.toFixed(2)
                : 0}
            </Text>
          </Box>

          <Box flexDirection="row" alignItems="center" mx={moderateScale(15)}>
            <Text
              fontFamily="$robotoRegular"
              flex={1}
              fontSize={14}
              lineHeight={16}
              color={colors.white}
              numberOfLines={1}>
              Bonus Cash Expried :
            </Text>
            <Text
              fontFamily="$robotoBold"
              flex={1}
              fontSize={14}
              lineHeight={16}
              color={colors.white}
              numberOfLines={1}>
              {'\u20B9'}
              {result?.data?.data?.totalExpiredBonusAmount
                ? result?.data?.data?.totalExpiredBonusAmount.toFixed(2)
                : 0}
            </Text>
          </Box>

          <Box flexDirection="row" alignItems="center" mx={moderateScale(15)}>
            <Text
              fontFamily="$robotoRegular"
              flex={1}
              fontSize={14}
              lineHeight={16}
              color={colors.white}
              numberOfLines={1}>
              Bonus Cash Remaining :
            </Text>
            <Text
              fontFamily="$robotoBold"
              flex={1}
              fontSize={14}
              lineHeight={16}
              color={colors.white}
              numberOfLines={1}>
              {'\u20B9'}
              {result?.data?.data?.totalNonExpiredBonusAmount
                ? result?.data?.data?.totalNonExpiredBonusAmount.toFixed(2)
                : 0}
            </Text>
          </Box>

          <Box
            marginTop={10}
            mx={moderateScale(15)}
            py={moderateScaleVertical(10)}
            borderBottomWidth={1}
            borderBottomColor={colors.gray5}>
            <Text
              fontFamily="$robotoBold"
              fontSize={16}
              lineHeight={18}
              color={colors.white}
              numberOfLines={1}>
              Formulae
            </Text>
          </Box>
          <Box
            paddingVertical={2}
            flexDirection="row"
            alignItems="center"
            mx={moderateScale(15)}>
            <Text
              fontFamily="$robotoRegular"
              flex={1}
              fontSize={14}
              lineHeight={20}
              color={colors.white}>
              {/* TDS = (Total Withdrawal + Winning Balance – Total Deposits) × 30%{' '} */}
              TDS = (Total Withdrawn Balance + Winning Balance – Total Deposits Balance) × 30%{' '}
              {'\n\n'}
              Withdrawable Balance = Winning Balance - TDS
              {/* Withdrawable Balance = Winning Balance - Winning Balance After Tax */}
            </Text>
          </Box>
        </Box>
        {/* Your existing content here */}
      </ScrollView>
    </Container>
  );
};

export default AccountOverView;
