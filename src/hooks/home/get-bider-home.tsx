import { useQuery } from '@tanstack/react-query';
import homeServices from '../../services/home-services';

function useGetBidersHome(data: { contestId: string, timeslotId: string }) {
  return useQuery({
    queryKey: [homeServices.queryKeys.getBidersHome + data?.contestId + data?.timeslotId],
    queryFn: () => homeServices.getBidersHome(data),
    enabled: !!data?.contestId
  });
}

export default useGetBidersHome;