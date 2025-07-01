import { useQuery } from '@tanstack/react-query';
import privateService from '../../services/private-service';

 
 function useGetPrivateContestDetailById(data:{contestId:string}) {
  return useQuery({
    queryKey: [privateService.queryKeys.getPrivateContestDetailById + data?.contestId],
    queryFn: () => privateService.getPrivateContestDetailById(data),
    enabled:!!data?.contestId
  });
}

export default useGetPrivateContestDetailById;