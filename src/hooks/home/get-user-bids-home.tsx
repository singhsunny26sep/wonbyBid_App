import { useQuery } from '@tanstack/react-query';
import homeServices from '../../services/home-services';

function useGetUserBidsHome(data: { contestId: string, timeslotId: string }) {
  return useQuery({
    queryKey: [homeServices.queryKeys.getUserBidsHome + data?.contestId + data?.timeslotId],
    queryFn: () => homeServices.getUserBidsHome(data),
    enabled: !!data?.contestId
  });
}

export default useGetUserBidsHome;