import { useMutation } from "@tanstack/react-query";
import { Toast, ToastTitle, useToast } from "@gluestack-ui/themed";
import privateService from "../../services/private-service";


export default function rankDistribution() {
  const toast = useToast()

  return useMutation({
    mutationFn: privateService.rankDistribution,
    onError: (error: any) => {
      console.log('error.message', error);

      toast.show({
        placement: "bottom",
        render: ({ id }) => {
          const toastId = "toast-" + id
          return (
            <Toast nativeID={toastId} variant="accent" action="error">
              <ToastTitle>Something went wrong while creating discribution price of private contest</ToastTitle>
            </Toast>
          );
        },
      })
    },
  });

}