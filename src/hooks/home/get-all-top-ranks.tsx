import { useQuery } from '@tanstack/react-query';
import topRanks from '../../services/topRanks';

function useGetAllTopRanks() {
  return useQuery({
    queryKey: [topRanks.getTopRanks],
    queryFn: () => topRanks.getTopRanks(),
  });
}

export default useGetAllTopRanks;