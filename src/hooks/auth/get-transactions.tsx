import { useQuery } from '@tanstack/react-query';
import authService from '../../services/auth-service';

function useGetTransactionHistory({ page, limit, selectedTransactionType }: any) {
  return useQuery({
    queryKey: [authService.queryKeys.getTransactionHistory, { page, limit, selectedTransactionType }],
    queryFn: () => authService.getTransactionHistory({ page, limit, selectedTransactionType }),
  });
}

export default useGetTransactionHistory;
