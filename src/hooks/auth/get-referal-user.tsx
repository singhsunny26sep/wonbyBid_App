import { useMutation, useQuery } from "@tanstack/react-query";
import { Toast, ToastTitle, useToast } from "@gluestack-ui/themed";

import AuthService from '../../services/get-referal';

export default function useUserReferal() {
  return useQuery({
    queryKey: [AuthService.queryKeys.getUserReferal],
    queryFn: AuthService.getReferals,
  });
}