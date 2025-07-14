
import { fetcher } from '../utils/fetcher';

class AuthService {
  queryKeys = {
    getUserReferal: 'userReferaley37',
    getReferData: 'getReferData',
    getBannerScreenName: 'getBannerScreenName',
  };

  getReferals = async () => {
    return fetcher({
      url: '/referrals/all-referals',
      method: 'GET',
    });
  }
  getReferData = async () => {
    return fetcher({
      url: '/referal_controller',
      method: 'GET',
    });
  }

  getBannerScreenName = async ({ screenName }: any) => {
    return fetcher({
      url: '/banner/refer&earn',
      method: 'GET',
      params: { screenName }
    });
  }

}

export default new AuthService();