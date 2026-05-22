import type { CSSProperties } from "react";

interface IconProps {
  name: string;
  className?: string;
  fill?: boolean;
  style?: CSSProperties;
}

export function Icon({ name, className = "", fill, style }: IconProps) {
  return (
    <span
      className={`material-symbols-outlined ${fill ? "fill-icon" : ""} ${className}`}
      style={style}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}