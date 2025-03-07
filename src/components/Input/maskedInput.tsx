//@ts-nocheck

import { forwardRef } from 'react';
import InputMask from 'react-input-mask';

interface MaskedInputProps {
  value?: string;
  onChange?: (newValue: string) => void;
  disabled?: boolean;
}

// Wrap InputMask with forwardRef
const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(
  ({ value, onChange, disabled }, ref) => (
    <InputMask
      mask="9 9 9  9 9 9"
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      disabled={disabled}
    >
      {(inputProps) => (
        <input
          {...inputProps}
          ref={ref}
          className="text-[1.5rem] placeholder:text-[#98A2B3] border-none w-full"
        />
      )}
    </InputMask>
  )
);

export default MaskedInput;
