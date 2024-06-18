"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "../ui/input";

interface IdiomProps {
  title: string;
  label: string;
  description: string;
  open: boolean;
  close: () => void;
  action: () => void;
  emailInput?: boolean;
  onChangeEmailValue?: any;
}

const IdiomProof: React.FC<IdiomProps> = ({
  title,
  description,
  label,
  open,
  action,
  close,
  emailInput,
  onChangeEmailValue,
}) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-primary-boulder950">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-primary-boulder700">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        {emailInput && (
          <Input
            type="email"
            className="text-primary-boulder900 placeholder:text-primary-boulder700"
            placeholder="Enter email"
            onChange={(e: any) => {
              onChangeEmailValue(e.target.value);
            }}
          />
        )}
        <AlertDialogFooter>
          <AlertDialogCancel
            className="outline-white outline-none"
            onClick={close}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={action}
            className="bg-red-600 hover:bg-red-500"
          >
            {label}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default IdiomProof;
