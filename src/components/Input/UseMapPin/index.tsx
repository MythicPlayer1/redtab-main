import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import MapPicker from 'react-google-map-picker'
import image from './nepalLow.svg'
import { ActivityLayout } from '../../ActivityLayout';
import { IconBack } from '../../IconBack';
import { ButtonPrimary } from '../../Button/ButtonPrimary';

const DefaultLocation = { lat: 10, lng: 106 };
const DefaultZoom = 10;

export interface UseMapPinProps {
    value?: any;
    onChange?: (value: any) => void;
}

export const UseMapPin: FC<UseMapPinProps> = (props) => {
    const [showMap, setShowMap] = useState(false);
    const { t } = useTranslation('UseMapPin')

    const [search, setSearch] = useState('');

    const [defaultLocation] = useState(DefaultLocation);

    const [location, setLocation] = useState(defaultLocation);
    const [zoom, setZoom] = useState(DefaultZoom);

    function handleChangeLocation(lat: any, lng: any) {
        setLocation({ lat: lat, lng: lng });
    }

    function handleChangeZoom(newZoom: any) {
        setZoom(newZoom);
    }

    // function handleResetLocation() {
    //   setDefaultLocation({ ...DefaultLocation });
    //   setZoom(DefaultZoom);
    // }

    return (
        <>
            <div className="rounded-lg relative bg-[#2a2a2a] min-h-[16rem] flex items-center justify-end flex-col">
                <div className='shadow-lg px-4 py-2 z-10 bg-[#fff] mb-4 rounded-full text-primaryColor font-bold cursor-pointer' onClick={() => setShowMap(true)}>{t('useMap', { defaultValue: 'Use map Pin' })}</div>
                <img className="absolute w-full top-0 h-full object-cover" src={image} />
            </div>

            {
                showMap && (
                    <div className='fixed z-20 top-0 left-0 right-0 bottom-0 bg-[#ffffff]'>
                        <div className='h-screen'>
                            <ActivityLayout
                                noMy
                                arrowBack={
                                    <div className='px-5 py-5 min-h-20 flex justify-between items-center'>
                                        <button onClick={() => setShowMap(false)}>
                                            <IconBack />
                                        </button>

                                        <div className='text-base font-bold'>{t('title', { defaultValue: 'Adjust Pin' })}</div>

                                        <div>&nbsp;</div>
                                    </div>
                                }
                                title={
                                    <div className='bg-[#fff] pb-5 rounded-3xl z-20 relative'>
                                        <div className='bg-[#F5F6F7] rounded-full flex items-center mx-5'>
                                            <svg className='ml-4 mr-2' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M9.5 4.5C6.73858 4.5 4.5 6.73858 4.5 9.5C4.5 12.2614 6.73858 14.5 9.5 14.5C12.2614 14.5 14.5 12.2614 14.5 9.5C14.5 6.73858 12.2614 4.5 9.5 4.5ZM3 9.5C3 5.91015 5.91015 3 9.5 3C13.0899 3 16 5.91015 16 9.5C16 11.0247 15.475 12.4268 14.596 13.5353L17.7803 16.7197C18.0732 17.0126 18.0732 17.4874 17.7803 17.7803C17.4874 18.0732 17.0126 18.0732 16.7197 17.7803L13.5353 14.596C12.4268 15.475 11.0247 16 9.5 16C5.91015 16 3 13.0899 3 9.5Z" fill="#98A2B3" />
                                            </svg>

                                            <input value={search} onChange={e => setSearch(e.target.value)} className='py-4 bg-[transparent] text-[0.75rem] grow' placeholder={t('searchPlaceholder', { defaultValue: 'Type your search ...' })} />

                                            <svg onClick={() => setSearch('')} className='mr-4 ml-4 cursor-pointer' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8ZM4.56347 4.56354C4.212 4.91501 4.212 5.48486 4.56347 5.83633L6.72713 7.99995L4.56348 10.1636C4.212 10.515 4.212 11.0849 4.56347 11.4364C4.91494 11.7878 5.48479 11.7878 5.83626 11.4364L7.99993 9.27274L10.1636 11.4364C10.5151 11.7878 11.0849 11.7878 11.4364 11.4364C11.7879 11.0849 11.7879 10.515 11.4364 10.1636L9.27273 7.99995L11.4364 5.83633C11.7879 5.48486 11.7879 4.91501 11.4364 4.56354C11.0849 4.21206 10.5151 4.21206 10.1636 4.56353L7.99993 6.72717L5.83626 4.56353C5.48478 4.21206 4.91493 4.21206 4.56347 4.56354Z" fill="#98A2B3" />
                                            </svg>
                                        </div>
                                    </div>
                                }
                            >
                                <div className='-mt-[1rem] relative grow h-[calc(100%+2rem)]'>
                                    <MapPicker className='absolute top-0 w-full bottom-0 pb-4' defaultLocation={defaultLocation}
                                        zoom={zoom}
                                        style={{ height: '100%' }}
                                        onChangeLocation={handleChangeLocation}
                                        onChangeZoom={handleChangeZoom}
                                        apiKey='AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8' />
                                </div>

                                <div className='absolute bottom-0 w-full px-5 pb-5'>
                                    <ButtonPrimary onClick={() => {
                                        props.onChange?.(location);
                                        setShowMap(false);
                                    }} className="w-full">{t('next', { defaultValue: 'Continue' })}</ButtonPrimary>
                                </div>
                            </ActivityLayout>
                        </div>
                    </div>
                )
            }
        </>
    );
}