import { useQuery } from '@tanstack/react-query';
import privateService from "../../services/private-service";

function useGetYourBid(contestId: string) {
  return useQuery({
    queryKey: [privateService.queryKeys.yourBidding],
    queryFn: () => privateService.yourBidding(contestId),
  });
}

export default useGetYourBid;