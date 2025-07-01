import { useQuery } from '@tanstack/react-query';
import homeServices from '../../services/home-services';

function useGetSignleContestDetailHome(data: { contestId: string, timeslotId: string }) {
  return useQuery({
    queryKey: [homeServices.queryKeys.getSignleContestDetailHome + data?.contestId + data?.timeslotId],
    queryFn: () => homeServices.getSignleContestDetailHome(data),
    enabled: !!data?.contestId
  });
}

export default useGetSignleContestDetailHome;