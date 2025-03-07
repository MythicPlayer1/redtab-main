import { FC, PropsWithChildren, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Layout } from "./Layout";
import { ButtonSecondary } from '../Button/ButtonSecondary';
import { ButtonPrimary } from '../Button/ButtonPrimary';

export interface InputPhoneStepProps {
  onAction?: (action: string) => void;
  onSubmit?: (newValue: any) => void;
}



interface InputEmailProps {
  value?: string;
  onChange?: (newValue: string) => void;
  disabled?: boolean;
}

const InputEmail: FC<InputEmailProps> = (props) => {
  const { t } = useTranslation('InputEmail');

  return (
    <div className="flex items-center gap-4 w-full">
      <div className='flex items-center w-full'>
        <input placeholder={t('placeholder', { defaultValue: 'Your Email' })} autoFocus className="text-[1.5rem] placeholder:text-[#98A2B3] border-none w-full" value={props.value} onChange={(e) => props.onChange?.(e.target.value)} />
        {props.value && (
          <svg className='cursor-pointer' width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => props.onChange?.('')}>
            <rect width="40" height="40" fill="white" />
            <path fillRule="evenodd" clipRule="evenodd" d="M28 20C28 15.5817 24.4183 12 20 12C15.5817 12 12 15.5817 12 20C12 24.4183 15.5817 28 20 28C24.4183 28 28 24.4183 28 20ZM16.5635 16.5635C16.212 16.915 16.212 17.4849 16.5635 17.8363L18.7271 20L16.5635 22.1636C16.212 22.515 16.212 23.0849 16.5635 23.4364C16.9149 23.7878 17.4848 23.7878 17.8363 23.4364L19.9999 21.2727L22.1636 23.4364C22.5151 23.7878 23.0849 23.7878 23.4364 23.4364C23.7879 23.0849 23.7879 22.515 23.4364 22.1636L21.2727 20L23.4364 17.8363C23.7879 17.4849 23.7879 16.915 23.4364 16.5635C23.0849 16.2121 22.5151 16.2121 22.1636 16.5635L19.9999 18.7272L17.8363 16.5635C17.4848 16.2121 16.9149 16.2121 16.5635 16.5635Z" fill="#98A2B3" />
          </svg>
        )}
      </div>
    </div>
  );
}


export const InputEmailStep: FC<PropsWithChildren<InputPhoneStepProps>> = (props) => {
  const { t } = useTranslation('InputEmailStep');

  const [email, setEmail] = useState<string>();

  return (
    <Layout
      title={t('letGetStarted', { defaultValue: "Let's get started!" })}
      subTitle={t('enterEmail', { defaultValue: 'Please enter your email' })}

      footer={<>
        <ButtonSecondary onClick={() => props.onAction?.('useEmail')} className="w-full" size="large">{t('useEmail', { defaultValue: 'Use phone number' })}</ButtonSecondary>
        <ButtonPrimary disabled={!email} className="w-full" size="large" onClick={() => props.onSubmit?.({ email })}>{t('createAccount', { defaultValue: 'Continue' })}</ButtonPrimary>
      </>}>

      <InputEmail value={email} onChange={setEmail} />
    </Layout>
  );
}