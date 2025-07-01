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


export default useGetUserWalletInfo;
export {useGetUserWalletWaletSetting}