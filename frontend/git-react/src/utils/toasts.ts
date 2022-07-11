import { toast } from "react-toastify";

export const toastError = (msg: string) => toast.error(msg, {
  position: "top-right",
  autoClose: 10000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  });

  export const toastSuccess = (msg: string) => toast.success(msg, {
    position: "top-right",
    autoClose: 10000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });