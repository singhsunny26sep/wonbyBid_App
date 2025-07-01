import { useQuery } from '@tanstack/react-query';
import homeServices from '../../services/home-services';

function useUserDashboard(data?: { userId?: string; categoryId?: string }) {
  return useQuery({
    queryKey: [
      homeServices.queryKeys.useUserDashboard, 
      data?.categoryId ?? '',  // Provide default empty string if undefined
      data?.userId ?? ''
    ],
    queryFn: () => homeServices.useUserDashboard(data!),
    enabled: !!data?.userId && !!data?.categoryId, // Ensure both values exist
  });
}

export default useUserDashboard;
