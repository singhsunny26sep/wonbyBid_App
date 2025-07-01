import { useQuery } from "@tanstack/react-query";
import kycService from "../../services/kyc-service";


function useBankDetails() {
  return useQuery({
    queryKey: [kycService.queryKeys.getBankDetail],
    queryFn: () => kycService.getUpdateBankKyc(),
  });
}  

export default useBankDetails;