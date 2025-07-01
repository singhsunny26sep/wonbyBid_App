
import { fetcher } from '../utils/fetcher';
import { AxiosResponse } from 'axios';

class AuthService {
  queryKeys = {
    topUserRanks: 'topUserRanks',
  };
  getTopRanks = async () => {
    return fetcher({
      url: '/user/top-Ranks',
      method: 'GET',
    });
  }
}

export default new AuthService();