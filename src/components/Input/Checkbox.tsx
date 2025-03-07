


import { FC } from "react";
import { useControllableValue } from 'ahooks'

export interface CheckboxProps {
  value?: boolean;
  onChange?: (newValue: boolean) => void;
  disabled?: boolean;
}

export const Checkbox: FC<CheckboxProps> = (props) => {
  const [isChecked] = useControllableValue(props);

  return (
    <div className="checkbox-wrapper">
      <label>
        <input type="checkbox" checked={isChecked} />
        {/* <span>{props.label}</span> */}
      </label>
    </div>
  );
};

