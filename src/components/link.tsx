import { ReactElement } from "react";

export default function Link({
  label,
  icon,
}: {
  label: string;
  icon: ReactElement;
}) {
  return (
    <li>
      <a
        href="#"
        className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-primary text-white hover:text-secondary border-l-4 border-transparent hover:border-secondary pr-6"
      >
        <span className="inline-flex justify-center items-center ml-4">
          {icon}
        </span>
        <span className="ml-2 text-sm tracking-wide truncate">{label}</span>
      </a>
    </li>
  );
}
