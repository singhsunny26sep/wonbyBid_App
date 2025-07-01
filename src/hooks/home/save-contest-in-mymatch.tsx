import { useMutation } from "@tanstack/react-query";
import { Toast, ToastTitle, useToast } from "@gluestack-ui/themed";
import homeServices from "../../services/home-services";


 function useSaveContestInMyMatches() {
  const toast = useToast()

  return useMutation({
    mutationFn: homeServices.saveContestInMyMatches,
    onError: (error: any) => {   
      // console.log(error);
         
      toast.show({
        placement: "bottom",
        render: ({ id }) => {
          const toastId = "toast-" + id
          return (
            <Toast nativeID={toastId} variant="accent" action="error">
              <ToastTitle>Something went wrong while saving contest</ToastTitle>
            </Toast>
          );
        },
      })
    },
  });

}


 function useNotifyContestInMyMatches() {
  const toast = useToast()

  return useMutation({
    mutationFn: homeServices.saveContestInMyMatches,
    onError: (error: any) => {   
      // console.log(error);
         
      toast.show({
        placement: "bottom",
        render: ({ id }) => {
          const toastId = "toast-" + id
          return (
            <Toast nativeID={toastId} variant="accent" action="error">
              <ToastTitle>Something went wrong while saving contest</ToastTitle>
            </Toast>
          );
        },
      })
    },
  });

}
export {useNotifyContestInMyMatches,useSaveContestInMyMatches}