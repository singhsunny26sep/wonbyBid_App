import { useQuery } from '@tanstack/react-query';
import homeServices from '../../services/home-services';

function useNotification(data: { userId: string }) {
  console.log("useNoatification userId: ", data);

  return useQuery({
    queryKey: [homeServices.queryKeys.getNotification],
    queryFn: () => homeServices.getNotification(data),
    enabled: !!data?.userId
  });
  /* const { isLoading, error } = useQuery({
    queryKey: [homeServices.queryKeys.getNotification, data?.userId],
    queryFn: () => homeServices.getNotification(data),
    enabled: !!data?.userId,
  });

  console.log("Loading:", isLoading);
  console.log("Error:", error); */
}

export default useNotification;

/* import { useQuery } from '@tanstack/react-query';
import homeServices from '../../services/home-services';

function useUserDashboard(data: { userId: string }) {
  return useQuery({
    queryKey: [homeServices.queryKeys.useUserDashboard],
    queryFn: () => homeServices.useUserDashboard(data),
    enabled: !!data?.userId
  });
}

export default useUserDashboard; */