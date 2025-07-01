
import { fetcher } from '../utils/fetcher';

class AuthService {
  queryKeys = {
    getUserReferal: 'userReferaley37',
  };

  getReferals = async () => {
    return fetcher({
      url: '/referrals/all-referals',
      method: 'GET',
    });
  }

}

export default new AuthService();