import { SVGProps } from "react";
const TrashcanIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    {...props}>
    <path
      fill={props.fill || "currentColor"}
      d="M20.725 5.275h-4.69v-.89a2.4 2.4 0 0 0-.7-1.68 2.38 2.38 0 0 0-1.69-.7h-3.26a2.38 2.38 0 0 0-1.69.7 2.4 2.4 0 0 0-.69 1.68v.89h-4.69a.75.75 0 1 0 0 1.5h1.42v11.76a3.45 3.45 0 0 0 1 2.46 3.5 3.5 0 0 0 2.45 1h7.62a3.5 3.5 0 0 0 2.45-1 3.45 3.45 0 0 0 1-2.46V6.775h1.43a.75.75 0 0 0 0-1.5zm-11.2-.89a.87.87 0 0 1 .26-.62.9.9 0 0 1 .62-.26h3.26a.88.88 0 0 1 .63.26.9.9 0 0 1 .26.62v.89h-5zm1.33 12.61a1 1 0 1 1-2 0v-5.43a1 1 0 0 1 2 0zm4.36 0a1 1 0 0 1-2 0v-5.43a1 1 0 0 1 2 0z"
    />
  </svg>
);
export default TrashcanIcon;
