import { FC } from "react";


export interface LoadingProps {
  inline?: boolean;
}


export const Loading: FC<LoadingProps> = (props) => {

  if (props.inline) {
    return (
      <div className="flex items-center">
        <svg width={50} height={50} version="1.1" id="L6" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="0 0 100 100" enableBackground="new 0 0 100 100" xmlSpace="preserve">
          <rect fill="none" stroke="currentColor" strokeWidth="4" x="25" y="25" width="50" height="50">
            <animateTransform
              attributeName="transform"
              dur="0.5s"
              from="0 50 50"
              to="180 50 50"
              type="rotate"
              id="strokeBox"
              attributeType="XML"
              begin="rectBox.end" />
          </rect>
          <rect x="27" y="27" fill="currentColor" width="46" height="50">
            <animate
              attributeName="height"
              dur="1.3s"
              attributeType="XML"
              from="50"
              to="0"
              id="rectBox"
              fill="freeze"
              begin="0s;strokeBox.end" />
          </rect>
        </svg>
        Loading ...
      </div>
    );
  }

  return (
    <div className="z-[100] text-primaryColor bg-[#000] bg-opacity-50 fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center">
      <svg width={200} height={200} version="1.1" id="L6" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 100 100" enableBackground="new 0 0 100 100" xmlSpace="preserve">
        <rect fill="none" stroke="currentColor" strokeWidth="4" x="25" y="25" width="50" height="50">
          <animateTransform
            attributeName="transform"
            dur="0.5s"
            from="0 50 50"
            to="180 50 50"
            type="rotate"
            id="strokeBox"
            attributeType="XML"
            begin="rectBox.end" />
        </rect>
        <rect x="27" y="27" fill="currentColor" width="46" height="50">
          <animate
            attributeName="height"
            dur="1.3s"
            attributeType="XML"
            from="50"
            to="0"
            id="rectBox"
            fill="freeze"
            begin="0s;strokeBox.end" />
        </rect>
      </svg>
    </div>
  );
}