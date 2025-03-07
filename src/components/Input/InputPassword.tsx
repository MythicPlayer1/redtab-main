
import { useControllableValue } from 'ahooks'
import { useState } from 'react';
import { InputBase } from '.';

export interface InputPasswordProps {
  label?: string | boolean;
  removable?: boolean;
  value?: string;
  autoFocus?: boolean;
  placeholder?: string;
  onChange?: (newValue: string) => void;
}


interface InputProps {
  placeholder?: string;
  autoFocus?: boolean;
  onChange?: (newValue: string) => void;
  value?: string;
  type: string;
}

const Input = (props: InputProps) => {
  return <input
    type={props.type}
    placeholder={props.placeholder} autoFocus={props.autoFocus}
    className="w-full bg-[transparent] focus-visible:outline-none text-[#25282B] text-base font-medium"
    onChange={e => props.onChange?.(e.target.value)} value={props.value} />
}

export const InputPassword = (props: InputPasswordProps) => {
  const [visible, setVisible] = useState(false);

  const [newValue, setValue] = useControllableValue(props, {
    defaultValue: '',
  })

  return <InputBase {...props}
    inputProps={{
      type: visible ? 'text' : 'password',
    }}
    Input={Input} {...props} appendOn={
      <svg onClick={() => setVisible(!visible)} className='cursor-pointer' width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.5 0C14.4516 0 19 3.76418 19 6.6087C19 9.45321 14.4516 13.2174 9.5 13.2174C4.54839 13.2174 0 9.45321 0 6.6087C0 3.76418 4.54839 0 9.5 0ZM9.5 1.65217C5.39908 1.65217 1.65217 4.75306 1.65217 6.6087C1.65217 8.46433 5.39908 11.5652 9.5 11.5652C13.6009 11.5652 17.3478 8.46433 17.3478 6.6087C17.3478 4.75306 13.6009 1.65217 9.5 1.65217ZM9.5 3.30435C11.3249 3.30435 12.8043 4.78375 12.8043 6.6087C12.8043 8.43364 11.3249 9.91304 9.5 9.91304C7.67506 9.91304 6.19565 8.43364 6.19565 6.6087C6.19565 4.78375 7.67506 3.30435 9.5 3.30435ZM9.5 4.95652C8.58753 4.95652 7.84783 5.69623 7.84783 6.6087C7.84783 7.52117 8.58753 8.26087 9.5 8.26087C10.4125 8.26087 11.1522 7.52117 11.1522 6.6087C11.1522 5.69623 10.4125 4.95652 9.5 4.95652Z" fill="#98A2B3" />
      </svg>
    }
    value={newValue}
    onChange={setValue}
  />
}