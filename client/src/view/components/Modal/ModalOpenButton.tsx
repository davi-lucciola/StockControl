import { ReactNode } from "react";

type ModalOpenButtonProps = {
  className: string;
  type: "submit" | "reset" | "button" | undefined;
  targetId: string;
  onClick?: () => void;
  children: ReactNode;
};

export function ModalOpenButton({
  onClick,
  targetId,
  className,
  type,
  children,
}: ModalOpenButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={className}
      data-bs-toggle="modal"
      data-bs-target={`#${targetId}`}
    >
      {children}
    </button>
  );
}
