import type { JSX } from "react";

export const LogoIcon = (props: JSX.IntrinsicElements["svg"]) => {
  return (
    <svg
      viewBox={"0 0 860 836"}
      xmlns={"http://www.w3.org/2000/svg"}
      {...props}
    >
      <title>MrSquaare-Icon</title>
      <g data-name={"MrSquaare-Icon"} id={"MrSquaare-Icon"}>
        <path
          d={
            "M87.8,836,0,549.1l285.8-87.4c-29.2-95.5-58.3-190.7-87.5-286.3L772.3,0c29.3,95.7,58.4,190.9,87.7,286.9L574.2,374.3c29.2,95.5,58.3,190.7,87.5,286.3Z"
          }
        />
      </g>
    </svg>
  );
};
