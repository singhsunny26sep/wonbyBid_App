import { useMutation } from "@tanstack/react-query";
import { Toast, ToastTitle, useToast } from "@gluestack-ui/themed";
import homeServices from "../../services/home-services";


export default function useJoinBidHome() {
  const toast = useToast()
  // console.log("====================== useJoinBidHome =================");

  return useMutation({
    mutationFn: homeServices.joinBidHome,
    onError: (error: any) => {
      // console.log("error on uesMutation on useJoinBidHome: ", error);

      toast.show({
        placement: "bottom",
        render: ({ id }) => {
          const toastId = "toast-" + id
          return (
            <Toast nativeID={toastId} variant="accent" action="error">
              <ToastTitle>Something went wrong while Biding</ToastTitle>
            </Toast>
          );
        },
      })
    },
  });

}