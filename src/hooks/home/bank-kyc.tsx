import { Toast, ToastTitle, useToast } from "@gluestack-ui/themed";
import { useMutation } from "@tanstack/react-query";
import kycService from "../../services/kyc-service";


export default function useBankKyc() {
  const toast = useToast()

  return useMutation({
    mutationFn: kycService.updateBankKyc,
    onError: (error: any) => {
      console.log("bank kyc: ", error);
      console.log("bank kyc: ", error?.response?.data?.message);
      toast.show({
        placement: "bottom",
        render: ({ id }) => {
          const toastId = "toast-" + id
          return (
            <Toast nativeID={toastId} variant="accent" action="error">
              <ToastTitle>{error?.response?.data?.message ? error?.response?.data?.message : "Something went wrong while updating user data?"}</ToastTitle>
            </Toast>
          );
        },
      })
    },
  })
}




/* export default function useKycUpdateDetails() {
  const toast = useToast()

  return useMutation({
    mutationFn: kycService.updateKycDetails,
    onError: (error: any) => {
      console.log("update kyc: ", error);
      console.log("update kyc: ", error?.response?.data?.message);
      toast.show({
        placement: "bottom",
        render: ({ id }) => {
          const toastId = "toast-" + id
          return (
            <Toast nativeID={toastId} variant="accent" action="error">
              <ToastTitle>{error?.response?.data?.message ? error?.response?.data?.message : "Something went wrong while updating user data?"}</ToastTitle>
            </Toast>
          );
        },
      })
    },
  });

} */