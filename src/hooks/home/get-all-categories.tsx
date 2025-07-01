import { useQuery } from '@tanstack/react-query';
import homeServices from '../../services/home-services';
 
 function useGetCategories() {
  return useQuery({
    queryKey: [homeServices.queryKeys.getCategories],
    queryFn: homeServices.getCategories,
  });
}

export default useGetCategories;