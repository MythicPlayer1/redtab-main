
import { InputBase, InputBaseProps } from './InputBase';
import { useControllableValue } from 'ahooks'

export interface InputDateProps extends Omit<InputBaseProps<string>, 'Input'> {
  multiline?: boolean;
  rows?: number;
  count?: boolean;
}

interface InputProps {
  placeholder?: string;
  autoFocus?: boolean;
  onChange?: (newValue: string) => void;
  value?: string;
  multiline?: boolean;
  rows?: number;
}
const Input = (props: InputProps) => {
  if (props.multiline) {
    return <textarea placeholder={props.placeholder} autoFocus={props.autoFocus}
      rows={props.rows}
      className="w-full bg-[transparent] focus-visible:outline-none text-[#25282B] text-base font-medium"
      onChange={e => props.onChange?.(e.target.value)} value={props.value} />
  }

  return <input placeholder={props.placeholder} autoFocus={props.autoFocus}
    type="date"
    className="w-full bg-[transparent] focus-visible:outline-none text-[#25282B] text-base font-medium"
    onChange={e => props.onChange?.(e.target.value)} value={props.value} />
}

export const InputDate = (props: InputDateProps) => {

  const [newValue, setValue] = useControllableValue(props, {
    defaultValue: '',
  });

  return (
    <InputBase {...props} inputProps={{
      ...props.inputProps,
      rows: props.rows,
      multiline: props.multiline,
    }} Input={Input} value={newValue} onChange={setValue}
    focusWithinBorder='none'
      appendOn={
        <>
          {props.appendOn}

          {props.count && <span className='text-[#98A2B3] text-xs'>{newValue.length}</span>}
        </>
      }
    />
  );
}