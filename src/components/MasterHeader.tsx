import { FC, PropsWithChildren } from "react";


export interface MasterHeaderProps { }

export const MasterHeader: FC<PropsWithChildren<MasterHeaderProps>> = () => {

  return <div className="px-5 pt-12 pb-5 flex items-center justify-between">
    <div className="flex items-center gap-3">
      <img src="https://placehold.it/36" alt="avatar" className="rounded-full w-12 h-12 object-cover" />
      <div>
        <div className="text-sm">Farum Azula</div>
        <div className="text-base font-bold">233.456.000रु</div>
      </div>
    </div>
    <div>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.0014 22.5C10.3087 22.5 9.0014 21.625 9.0014 20H15.0014C15.0014 21.625 13.6941 22.5 12.0014 22.5ZM17.9954 14.7096C17.9954 16.4239 20.1428 16.8525 20.1428 17.7096C20.1428 18.5668 19.7143 18.9954 18 18.9954H5.99997C4.28569 18.9954 3.85712 18.5668 3.85712 17.7096C3.85712 16.8525 5.99997 16.4239 5.99997 14.7096V11.7096C5.99997 7.42393 7.71426 3.85714 11.1428 3.85714C11.1428 3.21429 11.5714 3 12 3C12.4285 3 12.8571 3.21429 12.8571 3.85714C16.2857 3.85714 17.9954 7.42393 17.9954 11.7096V14.7096Z" fill="white" />
      </svg>
    </div>
  </div>
}