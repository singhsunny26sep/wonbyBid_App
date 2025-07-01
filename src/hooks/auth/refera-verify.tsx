import { useMutation } from "@tanstack/react-query";
import { Toast, ToastTitle, useToast } from "@gluestack-ui/themed";

import AuthService from '../../services/auth-service';


export default function useOtpVerifing() {
  const toast = useToast()

  return useMutation({
    mutationFn: AuthService.otpVerifing,
    onError: (error: any) => {
      console.log(error)

      toast.show({
        placement: "bottom",
        render: ({ id }) => {
          const toastId = "toast-" + id
          return (
            <Toast nativeID={toastId} variant="accent" action="error">
              <ToastTitle>Something went wrong while OTP Verifing</ToastTitle>
            </Toast>
          );
        },
      })
    },
  })
}