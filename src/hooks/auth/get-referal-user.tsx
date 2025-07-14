import { useMutation, useQuery } from "@tanstack/react-query";
import { Toast, ToastTitle, useToast } from "@gluestack-ui/themed";

import AuthService from '../../services/get-referal';

export default function useUserReferal() {
  return useQuery({
    queryKey: [AuthService.queryKeys.getUserReferal],
    queryFn: AuthService.getReferals,
  });
}


export const useGetReferData = () => {
  return useQuery({
    queryKey: [AuthService.queryKeys.getReferData],
    queryFn: AuthService.getReferData,
  });
}


export const useGetBannerRefer = ({ screenName }: any) => {
  return useQuery({
    queryKey: [AuthService.queryKeys.getBannerScreenName, { screenName }],
    queryFn: () => AuthService.getBannerScreenName({ screenName }),
  });
}