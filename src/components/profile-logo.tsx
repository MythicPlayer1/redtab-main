import { FC } from "react";
interface ProfileInterface {
  onClick?: () => void;
  src: string;
  height: number;
  width: number;
}

const ProfileLogo: FC<ProfileInterface> = ({src, height, width, onClick}) => {
  return (
    <div className='h-9 w-9 rounded-full overflow-hidden border-2 cursor-pointer' style={{height: height, width: width}} onClick={onClick}>
        <img src={src} className='h-full w-full object-cover'></img>
    </div>
  )
}

export default ProfileLogo
