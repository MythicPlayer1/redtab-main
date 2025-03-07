


// // <div className="min-h-[80vh] relative">
// // <div className="flex items-center flex-col">
// //   <div className="text-[1.25rem] font-black mb-8 mt-8">
// //     {t('questionBizType', { defaultValue: 'What is your business type?' })}
// //   </div>
// //   <BizType />
// // </div>

// // <div className="absolute bottom-0 left-0 right-0 p-5">
// //   <ButtonPrimary disabled onClick={() => { }} className="w-full" size="large">{t('next', { defaultValue: 'Next' })}</ButtonPrimary>
// // </div>
// // </div>


// import { FC, PropsWithChildren, useState } from 'react'
// import { useTranslation } from 'react-i18next'
// import { Layout } from "./Layout";
// import { Selection } from '../Selection';

// export interface InputBizTypeStepProps {
//   onAction?: (action: string) => void;
//   onSubmit?: (newState: any) => void;
// }

// const BizTypeSelection: FC<any> = ({ value, onChange }: any) => {
//   const { t } =useTranslation('BizTypeSelection');

//   return <Selection value={value} onChange={onChange} items={[
//     {
//       value: "hotel",
//       label: t('hotel', { defaultValue: 'Hotel/ Guesthouse' }),
//     },
//     {
//       value: "restaurant",
//       label: t('restaurant', { defaultValue: 'Restaurant' }),
//     },
//     {
//       value: "cafe",
//       label: t('cafe', { defaultValue: 'Cafe/ Canteen' }),
//     },
//     {
//       value: "productSupplier",
//       label: t('productSupplier', { defaultValue: 'Product Supplier' }),
//     },
//     {
//       value: "bankInsurance",
//       label: t('bankInsurance', { defaultValue: 'Bank/ Insurance' }),
//     },
//     {
//       value: "serviceSupplier",
//       label: t('serviceSupplier', { defaultValue: 'Service Supplier' }),
//     },
//   ]} />
// }

// const BizCategory: FC<any> = ({ value, onChange }: any) => {
//   return <Selection value={value} onChange={onChange}
//     items={[
//       {
//         label: 'Sub category 1',
//         value: 'sub1'
//       },
//       {
//         label: 'Sub category 2',
//         value: 'sub2'
//       }
//     ]}
//   ></Selection>
// }

// export const InputBizTypeStep: FC<PropsWithChildren<InputBizTypeStepProps>> = () => {
//   const { t } = useTranslation('InputOTPStep');

//   const [biz, setBiz] = useState<string>();
//   const [category, setCategory] = useState<string>();
//   const [selectDetail, setSelectDetail] = useState(false);

//   if (selectDetail) {
//     return (
//       <Layout
//         arrowBack={
//           selectDetail &&
//           <div className='min-h-20 py-4'>
//             <svg onClick={() => {
//               setSelectDetail(false)
//             }} className='cursor-pointer' width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path d="M5.79289 14.7071L12.7929 21.7071C13.1834 22.0976 13.8166 22.0976 14.2071 21.7071C14.5676 21.3466 14.5953 20.7794 14.2903 20.3871L14.2071 20.2929L8.914 15L22.5 15C23.0128 15 23.4355 14.614 23.4933 14.1166L23.5 14C23.5 13.4872 23.114 13.0645 22.6166 13.0067L22.5 13L8.914 13L14.2071 7.70711C14.5676 7.34662 14.5953 6.77939 14.2903 6.3871L14.2071 6.29289C13.8466 5.93241 13.2794 5.90468 12.8871 6.2097L12.7929 6.29289L5.79289 13.2929L5.69634 13.4047L5.62467 13.5159L5.57123 13.6287L5.53585 13.734L5.51102 13.8515L5.50397 13.9107L5.50018 14.0192L5.50397 14.0892L5.52024 14.2007L5.54974 14.3121L5.59367 14.4232L5.646 14.5207L5.71279 14.6167C5.73767 14.6485 5.76443 14.6786 5.79289 14.7071L12.7929 21.7071L5.79289 14.7071Z" fill="#344054"/>
//             </svg>
//           </div>
//         }
//         title={t('letGetStarted', { defaultValue: "What is your business type ?" })}
//         subTitle={`${t('moreInfo', { defaultValue: 'We need to know this to customize your exprience, also we curious too' })}`}>
//         <BizCategory value={category} onChange={(value: any) => setCategory(value)} />
//       </Layout>
//     )
//   }

//   return (
//     <Layout
//       title={t('letGetStarted', { defaultValue: "What is your business type ?" })}
//       subTitle={`${t('moreInfo', { defaultValue: 'We need to know this to customize your exprience, also we curious too' })}`}>
//       <BizTypeSelection value={biz} onChange={(value: any) => {
//         setBiz(value);
//         setSelectDetail(true);
//       }} />
//     </Layout>
//   );
// }