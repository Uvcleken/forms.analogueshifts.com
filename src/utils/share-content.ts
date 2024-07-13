import { errorToast } from "./error-toast";

export const shareContent = async (
  title: string,
  text: string,
  url: string
) => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: title,
        text: text,
        url: url,
      });
    } catch (error) {
      errorToast(
        "Error sharing content",
        "There was a problem with your request."
      );
    }
  } else {
    errorToast(
      "Sharing not supported on this device.",
      "There was a problem with your request."
    );
  }
};
