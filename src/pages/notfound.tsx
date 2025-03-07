import { FC } from "react";


const ErrorBoundary: FC = (props: any) => {
  return (
    <div>
      <h1>ErrorBoundary</h1>
      {JSON.stringify(props)}
    </div>
  )
}

export default ErrorBoundary;