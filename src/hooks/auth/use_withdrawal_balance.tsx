import {  useQuery } from "@tanstack/react-query";

import AuthService from '../../services/auth-service';


export default function useGetWithdrawal_Balance() {
  return useQuery({
    queryKey: [AuthService.queryKeys.getWithdrawalBalance],
    queryFn: AuthService.getWithdrawal_Balance,
  });
}

