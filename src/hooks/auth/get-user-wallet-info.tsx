import { useQuery } from '@tanstack/react-query';
import authService from '../../services/auth-service';

function useGetUserWalletInfo() {
  return useQuery({
    queryKey: [authService.queryKeys.getUserWalletInfo],
    queryFn: authService.getUserWalletInfo,
  });
}

function useGetUserWalletWaletSetting() {
  return useQuery({
    queryKey: [authService.queryKeys.waletSetting],
    queryFn: authService.getUserWalletSettingInfo,
  });
}

function usePaymentGatway() {
  return useQuery({
    queryKey: [authService.queryKeys.getPaymentGetway],
    queryFn: authService.getPaymentGetway,
  });
}
function usePaymentGuid() {
  return useQuery({
    queryKey: [authService.queryKeys.getPaymentGuid],
    queryFn: authService.getPaymentGuid,
  });
}


export default useGetUserWalletInfo;
export { useGetUserWalletWaletSetting, usePaymentGatway, usePaymentGuid }