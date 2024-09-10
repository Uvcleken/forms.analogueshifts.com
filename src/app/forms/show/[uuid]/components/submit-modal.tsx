"use client";
import { Fragment, useRef } from "react";
import { useToast } from "@/contexts/toast";
import { checkValidEmail } from "@/utils/show-form/helper-functions";
import { Transition, Dialog } from "@headlessui/react";

import Image from "next/image";
import Spinner from "@/assets/images/spinner.svg";
import { Input } from "@/components/ui/input";

interface IdiomProps {
  open: boolean;
  loading: boolean;
  email: string;
  setEmail: any;
  submit: any;
}

const SubmitModal: React.FC<IdiomProps> = ({
  open,
  email,
  setEmail,
  loading,
  submit,
}) => {
  const cancelButtonRef = useRef(null);
  const { notifyUser }: any = useToast();
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[3100]"
        initialFocus={cancelButtonRef}
        onClose={close}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-300 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white w-full px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex w-full sm:items-start">
                    <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Timeout
                      </Dialog.Title>
                      <div className="mt-2 w-full flex flex-col">
                        <p className="text-sm text-primary-boulder400">
                          Please Confirm Your Submition Email and Submit.
                        </p>
                        <Input
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          className="mt-5 w-full rounded-xl h-12 text-sm font-normal placeholder:text-primary-boulder300 text-primary-boulder500"
                          placeholder="Enter submission email"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" px-4 pb-6 pt-4 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    disabled={loading}
                    type="button"
                    className={`inline-flex items-center gap-1.5 w-full justify-center rounded-xl  h-10  text-xs font-semibold text-primary-boulder50  sm:ml-3 sm:w-auto px-10 bg-background-darkYellow`}
                    onClick={() => {
                      if (checkValidEmail(email)) {
                        submit();
                      } else {
                        notifyUser("error", "Invalid Email", "right");
                      }
                    }}
                  >
                    {loading ? (
                      <Image
                        src={Spinner}
                        alt=""
                        className="w-6 animate-spin"
                      />
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SubmitModal;
