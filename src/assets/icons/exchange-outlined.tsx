import { SVGProps } from "react";

export function ExchangeOutlined(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      width="20"
      height="20"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M6 9 2 5l4-4M2 5h16m-4 6 4 4-4 4m4-4H2"
      />
    </svg>
  );
}
