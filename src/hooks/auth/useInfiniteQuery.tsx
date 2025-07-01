import { useInfiniteQuery } from '@tanstack/react-query';
import authService from '../../services/auth-service';

function useGetTransactionHistoryPagination() {
  return useInfiniteQuery({
    queryKey: [authService.queryKeys.getTransactionHistory],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await authService.getTransactionHistory(pageParam);
      return response.data; // Ensure you return the `data` property, which contains the payload
    },
    getNextPageParam: (lastPage) => lastPage?.nextPage ?? undefined,
    initialPageParam: 1,
  });
}

export default useGetTransactionHistoryPagination;
