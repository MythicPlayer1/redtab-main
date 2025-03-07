import { Switch } from '@headlessui/react'
import { FC } from 'react'
import { useControllableValue } from 'ahooks'

export interface InputSwitchProps {
  value?: boolean;
  onChange?: (newValue: boolean) => void;
  disabled?: boolean;
}

export const InputSwitch: FC<InputSwitchProps> = (props) => {
  const [value, setValue] = useControllableValue(props);

  return (
    <div className='mx-2 my-4'>
      <Switch
        disabled={props.disabled}
        checked={value}
        onChange={setValue}
        className={`${value ? 'bg-primaryColor' : 'bg-[#F2F4F7]'}
          ${props.disabled && 'opacity-40'}
          relative inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer rounded-full border-0 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-white/75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${value ? 'translate-x-5' : 'translate-x-0'}
            pointer-events-none inline-block my-0.5 mx-0.5 h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out bg-[#fff]`}
        />
      </Switch>
    </div>
  )
}
