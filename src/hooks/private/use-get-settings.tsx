import { useQuery } from '@tanstack/react-query';
import privateService from "../../services/private-service";

function useGetSettings() {
  return useQuery({
    queryKey: [privateService.queryKeys.getSettings],
    queryFn: () => privateService.getSettings(),
  });
}

export default useGetSettings;