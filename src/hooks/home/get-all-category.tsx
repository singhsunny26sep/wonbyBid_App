import { useInfiniteQuery } from '@tanstack/react-query';

import homeServices from '../../services/home-services';

function useGetAllCategory() {

  return useInfiniteQuery({
    queryKey: [homeServices.queryKeys.getAllCategory],
    queryFn: ({ pageParam = 1 }: any) => homeServices.getAllCategory({
      pageParam: pageParam ?? 1,
    }),
    getNextPageParam: (lastPage: any) => {

      if (lastPage?.data?.page < lastPage?.data?.totalPages) {
        const currentPage = Number(lastPage?.data?.page);
        const nextPage = isNaN(currentPage) ? 1 : currentPage + 1;
        return nextPage;
      }
    },
    initialPageParam: 1,
    // enabled: !!data,
  })

}

export default useGetAllCategory;