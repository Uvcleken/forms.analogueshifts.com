export const convertDateFormat = (date: string) => {
  const dateStr = date;
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const formatted = `${dateStr} 00:00:00`;
    return formatted;
  } else {
    return "";
  }
};

export interface FormDetailsProps {
  title: string;
  description: string;
  timeout: string;
  multiResponse: string;
  deadline: string;
  uuid: string;
}
