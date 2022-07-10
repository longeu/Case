export const convertTypeToast = (type: string) => {
  switch (type) {
    case "error":
      return {
        color: "red",
        border: "1px solid red",
      };
    case "warning":
      return {
        color: "#ffc107",
        border: "1px solid #ffc107",
      };
    case "success":
      return {
        color: "#198754",
        border: "1px solid #198754",
      };
    case "primary":
      return {
        color: "#0d6efd",
        border: "1px solid #0d6efd",
      };
    default:
      return {
        color: "#198754",
        border: "1px solid #198754",
      };
  }
};
