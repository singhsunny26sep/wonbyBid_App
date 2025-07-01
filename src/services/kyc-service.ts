import { AxiosResponse } from 'axios';
import { fetcher } from '../utils/fetcher';

class KycService {
  queryKeys = {
    getKycDetails: 'getKycDetails',
    updateKycDetails: 'updateKycDetails',
    updateBankKyc: 'updateBankKyc',
    updatePersonalInfo: 'updatePersonalInfo',
    useEmailKyc: 'useEmailKyc',
    getBankDetail:"getBankDetailsleinr"
  }

  getKycDetails = async (): Promise<AxiosResponse<any>> => {
    return fetcher({
      url: `/kyc/user/own/kyc`,
      method: 'GET',
    });
  }

  updateKycDetails = async (data: any): Promise<AxiosResponse<any>> => {
    return fetcher({
      url: `/kyc/user/modify/kyc`,
      method: 'post',
      data: data
    });
  }

  updateBankKyc = async (data: any): Promise<AxiosResponse<any>> => {
    return fetcher({
      url: `/bankDetails/update`,
      method: 'post',
      data: data,
    });
  }

  getUpdateBankKyc = async (): Promise<AxiosResponse<any>> => {
    return fetcher({
      url: `/bankDetails/user_data`,
      method: 'get',
    });
  }


  updatePersonalInfo = async (data: any): Promise<AxiosResponse<any>> => {
    return fetcher({
      url: `/kyc/user/personalInfo/kyc`,
      method: 'post',
      data: data,
    });
  }

  useEmailKyc = async (data: any): Promise<AxiosResponse<any>> => {
    return fetcher({
      url: `/kyc/user/email/kyc`,
      method: 'post',
      data: data,
    });
  }
}


export default new KycService();