import { SVGProps } from "react";

const ArrowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    {...props}>
    <path
      fill="none"
      stroke={props.stroke || "currentColor"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m17 14l-5-5m0 0l-5 5"
    />
  </svg>
);

export default ArrowIcon;
