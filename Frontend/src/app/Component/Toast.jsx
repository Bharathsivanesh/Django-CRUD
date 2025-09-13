import { toast } from "react-toastify";
export const showToastMessage = (message, issucess) => {
  if (issucess) {
    toast.success(message, {
      position: "top-right",
    });
  } else {
    toast.error(message, {
      position: "top-right",
    });
  }
};
