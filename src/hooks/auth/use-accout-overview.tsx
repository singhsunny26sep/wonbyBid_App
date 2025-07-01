import { useQuery } from '@tanstack/react-query';
import authService from '../../services/auth-service';

function useAccountOverView() {
  return useQuery({
    queryKey: [authService.queryKeys.getAccountOverView],
    queryFn: authService.getAccountOverView,
  });
}

export default useAccountOverView;