import { useQuery } from '@tanstack/react-query';
import homeServices from '../../services/home-services';

function useGetOffer() {
  return useQuery({
    queryKey: [homeServices.queryKeys.getOffer],
    queryFn: () => homeServices.getOffer(),
  });
}

export default useGetOffer;