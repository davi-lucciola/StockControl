import { ReactNode } from "react";
import { BaseProps } from "../BaseProps";

type ModalCloseButtonProps = BaseProps & {
  onClick: () => void;
  type: "submit" | "reset" | "button" | undefined;
  children?: ReactNode;
};

export function ModalCloseButton({
  onClick,
  type,
  className,
  children,
}: ModalCloseButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
      data-bs-dismiss="modal"
      aria-label="Close"
    >
      {children}
    </button>
  );
}
