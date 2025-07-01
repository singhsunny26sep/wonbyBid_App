import { useMutation } from "@tanstack/react-query";
import { Toast, ToastTitle, useToast } from "@gluestack-ui/themed";

import AuthService from '../../services/auth-service';


export default function useUserLogin() {
  const toast = useToast()

  return useMutation({
    mutationFn: AuthService.userLogin,
    onError: (error: any) => {
      console.log("error: ", error);

      toast.show({
        placement: "bottom",
        render: ({ id }: any) => {
          const toastId = "toast-" + id
          return (
            <Toast nativeID={toastId} variant="accent" action="error">
              <ToastTitle>Something went wrong while Login</ToastTitle>
            </Toast>
          );
        },
      })
    },
  });

}