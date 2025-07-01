
import { GET_USER_LOGIN, GET_VERFIED_OTP } from '../types/auth/response-type';
import { fetcher } from '../utils/fetcher';
import { AxiosResponse } from 'axios';

class AuthService {
  queryKeys = {
    userLogin: 'userLogin',
    otpVerifing: 'otpVerifing',
    otpResend: 'otpResend',
    getSettings: 'getSettings',
    getUserWalletInfo: 'getUserWalletInfo',
    addAmountWallet: 'addAmountWallet',
    withdrawWalletAmount: 'withdrawWalletAmount',
    getTransactionHistory: 'getTransactionHistory',
    getAccountOverView: 'getAccountOverView',
    generateOrder: 'generateOrder',
    waletSetting: 'waletSetting',
    getWithdrawalBalance:'getWithdrawalBalance'
  };

  userLogin = async (data: { mobileNumber: string | undefined, number?: number }): Promise<AxiosResponse<GET_USER_LOGIN>> => {
    return fetcher({
      url: '/otp/send-otp ',
      method: 'POST',
      data
    });
  }

  otpVerifing = async (data: { mobile: string, otp: number, fcmToken: string,sessionId:any }): Promise<AxiosResponse<GET_VERFIED_OTP>> => {
    return fetcher({
      url: '/otp/verify-otp',
      method: 'POST',
      data
    });
  }

  getUserWalletInfo = async () => {
    return fetcher({
      url: '/user/wallet',
      method: 'GET',
    });
  }
  getUserWalletSettingInfo = async () => {
    return fetcher({
      url: '/offerRechargeSetting/all_offer_recharge',
      method: 'GET',
    });
  }

  getWithdrawal_Balance = async () => {
    return fetcher({
      url: '/wallet/withdrawal_balance',
      method: 'GET',
    });
  }


  addAmountWallet = async (data: { amount: number, bounusAmount: number, data: any, date: any }) => {
    // console.log(" ================================= addAmountWallet ================================= ");

    // console.log("data: ", data);

    return fetcher({
      url: '/user/wallet/add',
      method: 'POST',
      data
    });
  }

  withdrawWalletAmount = async (data: { amount: number }) => {
    return fetcher({
      // url: '/user/wallet/withdraw',
      url: '/wallet/withdrawal',
      method: 'POST',
      data
    });
  }

  generateOrder = async (data: any) => {
    return fetcher({
      // url: '/user/wallet/withdraw',
      url: '/user/wallet/generate/order',
      method: 'POST',
      data
    });
  }

  getTransactionHistory = async ({ page, limit, selectedTransactionType }: any) => {
    return fetcher({
      url: `/user/transaction/history?page=${page}&limit=${limit}&type=${selectedTransactionType?.value}`,
      method: 'GET',
    });
  };

  getAccountOverView = async () => {
    return fetcher({
      url: '/wallet/walet-dashbord',
      method: 'GET',
    });
  }
}

export default new AuthService();