import { useMutation } from "@tanstack/react-query";
import { Toast, ToastTitle, useToast } from "@gluestack-ui/themed";
import privateService from "../../services/private-service";



export default function useJoinBidPrivate() {
  const toast = useToast()

  return useMutation({
    mutationFn: privateService.joinBidPrivate,
    onError: (error: any) => {
      console.log("error: ", error);
      console.log("error: ", error?.response?.data);

      toast.show({
        placement: "bottom",
        render: ({ id }) => {
          const toastId = "toast-" + id
          return (
            <Toast nativeID={toastId} variant="accent" action="error">
              <ToastTitle>{error?.response?.data?.message || "Something went wrong while Biding"}</ToastTitle>
            </Toast>
          );
        },
      })
    },
  });
}