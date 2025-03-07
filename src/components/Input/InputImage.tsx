import { FC, PropsWithChildren, ReactNode, Ref, useState } from "react";

interface InputBaseProps<T> {
  label?: string | boolean;
  removable?: boolean;
  value?: T;
  autoFocus?: boolean;
  placeholder?: string;
  onChange?: (newValue: File, imageURL: string) => void;
  prependOn?: ReactNode;
  appendOn?: ReactNode;
  Input: FC<any>;
  inputProps?: any;
  required?: boolean;
  helper?: ReactNode;
  error?: ReactNode;
  ref?: Ref<HTMLInputElement>;
}

export interface InputTextProps extends Omit<InputBaseProps<string>, "Input"> {
  multiline?: boolean;
  rows?: number;
  count?: boolean;
  onChange?: (newValue: File, imageURL: string) => void;
  setImagePreview?: (newValue: string) => void;
  value?: string;
  imagePreview?: string;
}

export const InputImage: FC<PropsWithChildren<InputTextProps>> = (props) => {
  const [, setPreviewUrl] = useState<string | null>(null);
  const [fileLimitErrorMessage, setFileLimitErrorMessage] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const fileSizeLimitMB = parseFloat(import.meta.env.VITE_MAX_IMAGE_SIZE_MB || "1"); // Read size in MB
    const fileSizeLimitBytes = fileSizeLimitMB * 1024 * 1024;
    if (file) {
      if (file.size > fileSizeLimitBytes) {
        setFileLimitErrorMessage(`Please upload a file less than ${fileSizeLimitMB}MB`);
      } else {
        setFileLimitErrorMessage("");
      }
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
      props.onChange?.(file, fileUrl);
    }
  };
  
  return (
    <div className=" flex flex-col">
      <p className="text-primaryColor pb-1">{fileLimitErrorMessage}</p>
      <div className="border relative border-[#d0d5dd] bg-primaryColorText rounded-[0.75rem] flex text-center items-center justify-center px-8 py-16 overflow-hidden">
        {props?.imagePreview ? (
          <img src={props?.imagePreview} alt="Preview" className="max-w-full max-h-full cursor-pointer" />
        ) : (
          props.children
        )}
        <input
          type="file"
          className="absolute top-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileChange}
          value={props.value}
          accept="image/*"
        />
      </div>
      {props?.imagePreview && (
        <label className="text-primaryColor relative text-[0.875rem] mt-3 w-fit cursor-pointer">
          <p className=" cursor-pointer -z-10 ">Repick photo</p>
          <input
            type="file"
            className="absolute top-0 left-0 w-full z-30 h-full opacity-0 cursor-pointer"
            onChange={handleFileChange}
            value={props.value}
            accept="image/*"
          ></input>
        </label>
      )}
    </div>
  );
};
