import "@/styles/Swal.css";
import Swal from "sweetalert2";

export const Toast = Swal.mixin({
  toast: true,
  position: "center",
  iconColor: "white",
  color: "#FFFFFF",
  showConfirmButton: false,
  customClass: {
    popup: "toast-color",
  },
  timer: 3000,
  timerProgressBar: true,
});

export const PromptBox = Swal.mixin({
  position: "center",
  showConfirmButton: true,
  customClass: {
    popup: "PromptBox",
  },
});
