"use client";
import React, { useState, useRef, useEffect, Ref } from "react";
import { useToast } from "../ui/use-toast";

interface FileInputProps {
  value?: any;
  setValue?: any;
  fileType?: string;
}

const FileInput: React.FC<FileInputProps> = ({ value, setValue, fileType }) => {
  const [uploadState, setUploadState] = useState(value ? "Success" : "");
  const fileRef: any = useRef();
  const { toast } = useToast();

  const handleFileChange = (e: any) => {
    const maxFileSize = 5 * 1024 * 1024;
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > maxFileSize) {
      toast({
        variant: "destructive",
        title: "File size exceeds the limit (5 MB)",
      });
      return;
    }
    if (selectedFile) {
      setValue(selectedFile);
    } else {
      setUploadState("");
    }
  };

  useEffect(() => {
    if (value) {
      setUploadState("Success");
    }
  }, [value]);

  return (
    <section>
      {/* The File Input */}
      <input
        accept={
          fileType === "image" ? "image/jpeg,image/png" : "application/pdf"
        }
        onChange={handleFileChange}
        ref={fileRef}
        type="file"
        className="-z-10 hidden opacity-0"
      />
      <div
        onClick={() => fileRef.current.click()}
        className={`max-w-full cursor-pointer py-5 w-full h-auto border-dashed rounded-3xl  px-5 border  flex flex-col items-center ${
          uploadState === "Success"
            ? "border-primary-success"
            : "border-primary-boulder200"
        }`}
      >
        {uploadState !== "Success" ? (
          <>
            <p className="flex text-primary-boulder700 items-center gap-1.5 mb-1">
              <span className="font-medium text-sm">Upload Here</span>
              <i className="fas fa-cloud-arrow-up text-sm"></i>
            </p>
            <p className="font-light text-[13px] text-primary-boulder500 mb-1">
              Supports {fileType === "image" ? "JPG, JPEG, PNG" : "PDF"}
            </p>
            <p className="font-light text-[13px] text-primary-boulder500 mb-1">
              Maximum file size 5mb
            </p>
          </>
        ) : (
          <>
            <p className="flex text-primary-success items-center gap-1.5 mb-1">
              <span className="font-medium text-sm">Upload Successful</span>
              <i className="fas fa-circle-check text-sm"></i>
            </p>
            <p className="font-light text-[13px] text-primary-success mb-1">
              {value?.name}
            </p>
          </>
        )}
      </div>
    </section>
  );
};

export default FileInput;
