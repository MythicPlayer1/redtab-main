import { useControllableValue } from "ahooks";

export interface InputDropDownProps {
  label?: string | boolean;
  removable?: boolean;
  value?: string;
  onChange?: (newValue: string) => void;
}

export const InputDropDown = (props: InputDropDownProps) => {
  const [newValue, setValue] = useControllableValue(props, {
    defaultValue: "",
  });

  return (
    <div className="px-[0.75rem] min-h-[3.75rem] py-[0.3rem] border-[1px] border-[#1D2939] rounded-lg flex items-center justify-between">
      <div className="grow">
        {props.label !== false && <label className="text-sm text-[#7A7E83]">{props.label}</label>}
        <input
          className="w-full bg-transparent text-[#25282B] outline-none text-base font-medium"
          onChange={(e) => setValue?.(e.target.value)}
          value={newValue}
        />
      </div>

      {props.removable && (
        <svg
          onClick={() => setValue?.("")}
          className="cursor-pointer"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8ZM4.56347 4.56354C4.212 4.91501 4.212 5.48486 4.56347 5.83633L6.72713 7.99995L4.56348 10.1636C4.212 10.515 4.212 11.0849 4.56347 11.4364C4.91494 11.7878 5.48479 11.7878 5.83626 11.4364L7.99993 9.27274L10.1636 11.4364C10.5151 11.7878 11.0849 11.7878 11.4364 11.4364C11.7879 11.0849 11.7879 10.515 11.4364 10.1636L9.27273 7.99995L11.4364 5.83633C11.7879 5.48486 11.7879 4.91501 11.4364 4.56354C11.0849 4.21206 10.5151 4.21206 10.1636 4.56353L7.99993 6.72717L5.83626 4.56353C5.48478 4.21206 4.91493 4.21206 4.56347 4.56354Z"
            fill="#D0D5DD"
          />
        </svg>
      )}
    </div>
  );
};
