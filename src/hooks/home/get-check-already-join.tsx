import { useQuery } from '@tanstack/react-query';
import homeServices from '../../services/home-services';

function useGetCheckAlreadyJoin(data: { contestId: string, timeslotId: string }) {
  return useQuery({
    queryKey: [homeServices.queryKeys.getCheckAlreadyJoin + data?.contestId + data?.timeslotId],
    queryFn: () => homeServices.getCheckAlreadyJoin(data),
    enabled: !!data?.contestId
  });
}

export default useGetCheckAlreadyJoin;