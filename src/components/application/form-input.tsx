interface FormInputProps {
  label: string;
  value: string;
  type: string;
  placeholder: string;
  icon: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  icon,
  value,
  type,
  placeholder,
  onChange,
}) => {
  return (
    <div className="w-full pb-5 flex flex-col gap-2.5">
      <p className="text-base font-normal text-content-grayText">{label}</p>
      <div className={`w-full relative flex items-center h-12`}>
        <i
          className={
            "absolute left-5  text-base text-content-grayText w-8 " + icon
          }
        ></i>

        <input
          className={` w-full bg-transparent rounded-2xl border border-black/10 outline-1 outline-background-lightYellow h-full pl-12 pr-4  text-base font-normal text-gray-400`}
          placeholder={placeholder}
          value={value}
          type={type}
          onChange={onChange}
          required
        />
      </div>
    </div>
  );
};

export default FormInput;
