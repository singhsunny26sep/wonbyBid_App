import { useInfiniteQuery } from '@tanstack/react-query';

import homeServices from '../../services/home-services';

function useGetAllContestByCategory(data: { catId: number, catType: string }) {

  return useInfiniteQuery({
    queryKey: [homeServices.queryKeys.getAllContestByCategory + data?.catId + data?.catType],
    queryFn: ({ pageParam = 1 }: any) => homeServices.getAllContestByCategory({
      pageParam: pageParam ?? 1,
      ...data
    }),
    getNextPageParam: (lastPage: any) => {

      if (lastPage?.data?.page < lastPage?.data?.totalPages) {
        const currentPage = Number(lastPage?.data?.page);
        const nextPage = isNaN(currentPage) ? 1 : currentPage + 1;
        return nextPage;
      }

    },
    initialPageParam: 1,
    enabled: !!data?.catId,
  })

}

export default useGetAllContestByCategory;