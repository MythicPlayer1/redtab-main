import { FC } from "react"
import { InputBase, InputBaseProps } from "./InputBase"

export interface InputSelectProps extends Omit<InputBaseProps<string>, 'Input'> {}

const InputSelectImpl = () => <div></div>

export const InputSelect: FC<InputSelectProps> = (props: InputSelectProps) => {
  return <InputBase
    label={props.label}
    Input={InputSelectImpl}
    value={props.value}
    onChange={props.onChange}
    appendOn={
      <div>sdfdsf</div>
    }
  ></InputBase>
}