import { FC, PropsWithChildren, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Layout } from "./Layout";
import { ButtonSecondary } from '../Button/ButtonSecondary';
import { ButtonPrimary } from '../Button/ButtonPrimary';
import MaskedInput from '../Input/maskedInput';

export interface InputCheckEmailStepProps {
  onAction?: (action: string) => void;
  onSubmit?: (newState: any) => void;
  phone: string;
}

interface InputEmailProps {
  value?: string;
  onChange?: (newValue: string) => void;
  disabled?: boolean;
}

const InputEmail: FC<InputEmailProps> = (props) => {
  return (
    <div className="flex items-center gap-4 w-full">
      <div className='flex items-center w-full'>
        {/* <InputMask autoFocus mask="9 9 9  9 9 9" value={props.value} onChange={(e) => props.onChange?.(e.target.value)} className='text-[1.5rem] placeholder:text-[#98A2B3] border-none w-full' />
         */}
         <MaskedInput value={props.value} onChange={props.onChange} disabled={props.disabled} />
      </div>
    </div>
  );
}


export const InputCheckEmailStep: FC<PropsWithChildren<InputCheckEmailStepProps>> = (props) => {
  const { t } = useTranslation('InputOTPStep');
  const [otp, setOtp] = useState<string>();

  return (
    <Layout
      title={t('letGetStarted', { defaultValue: "Enter OTP code" })}
      subTitle={`${t('otpSent', { defaultValue: 'We sent an OTP to ' })} ${props.phone}`}

      footer={<>
        <ButtonSecondary onClick={() => props.onAction?.('usePhone')} className="w-full" size="large">{t('changeNumber', { defaultValue: 'Change number' })}</ButtonSecondary>
        <ButtonPrimary disabled={!otp} className="w-full" size="large" onClick={() => props?.onSubmit?.({
          otp
        })}>{t('resendCode', { defaultValue: 'Resend Code' })}</ButtonPrimary>
      </>}>

      <InputEmail value={otp} onChange={setOtp} />
    </Layout>
  );
}