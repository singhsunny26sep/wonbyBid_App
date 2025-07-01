import { Toast, ToastTitle, useToast } from "@gluestack-ui/themed";
import { useMutation } from "@tanstack/react-query";
import kycService from "../../services/kyc-service";


export default function usePersonalInfo() {
  const toast = useToast()

  return useMutation({
    mutationFn: kycService.updatePersonalInfo,
    onError: (error: any) => {
      // console.log("bank kyc: ", error);
      // console.log("bank kyc: ", error?.response?.data?.message);
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