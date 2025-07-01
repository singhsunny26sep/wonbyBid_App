import { useMutation } from "@tanstack/react-query";
import { Toast, ToastTitle, useToast } from "@gluestack-ui/themed";
import homeServices from "../../services/home-services";


export default function useProfileUpdate() {
  const toast = useToast()

  return useMutation({
    mutationFn: homeServices.updateProfile,
    onError: (error: any) => {
      // console.log(error);

      toast.show({
        placement: "bottom",
        render: ({ id }) => {
          const toastId = "toast-" + id
          return (
            <Toast nativeID={toastId} variant="accent" action="error">
              <ToastTitle>Something went wrong while updating user data?</ToastTitle>
            </Toast>
          );
        },
      })
    },
  });

}