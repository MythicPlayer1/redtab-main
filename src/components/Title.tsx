import { FC, PropsWithChildren } from "react"
import clsx from 'clsx'

export interface TitleProps {
  className?: string;
}

export const Title: FC<PropsWithChildren<TitleProps>> = (props) => {
  return <div className={clsx("text-lg text-center font-semibold text-[#1D2939]", props.className)}>{props.children}</div>
}