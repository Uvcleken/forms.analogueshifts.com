import { toast } from "react-toastify";

export const errorToast = (title: string, description: string) => {
  toast.error(
    <div>
      <h4>{title}</h4>
      <p>
        <small>{description}</small>
      </p>
    </div>,
    { position: "top-right" }
  );
};
