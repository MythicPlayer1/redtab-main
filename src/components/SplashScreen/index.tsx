import { FC, PropsWithChildren, useState } from "react"
import { useTimeout} from 'usehooks-ts'



export interface SplashScreenProps { }

export const SplashScreen: FC<PropsWithChildren<SplashScreenProps>> = ({ children }) => {
  const [visible, setVisible] = useState(false)

  useTimeout(() => {
    setVisible(true);

  }, 1000)
 
  if (!visible) {
    return (
      <div className="w-screen h-screen text-primaryColorText bg-primaryColor flex items-center justify-center">
        <div className="font-black text-[2.315rem] welcome-redtab">Redtab</div>
      </div>
    )
  }

  

  return children
}