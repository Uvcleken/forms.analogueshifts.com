export const shareContent = async (
  title: string,
  text: string,
  url: string,
  notifyUser: any
) => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: title,
        text: text,
        url: url,
      });
    } catch (error) {
      notifyUser("error", "There was a problem with your request.", "right");
    }
  } else {
    notifyUser("error", "Sharing not supported on this device.", "right");
  }
};
