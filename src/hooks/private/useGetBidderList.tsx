

import { useQuery } from '@tanstack/react-query';
import privateService from "../../services/private-service";

function useGetBidderList(contestId: string) {
  return useQuery({
    queryKey: [privateService.queryKeys.bidderList],
    queryFn: () => privateService.bidderList(contestId),
  });
}

export default useGetBidderList;