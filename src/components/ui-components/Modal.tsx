import { MouseEventHandler, ReactNode, useRef } from "react";
import { createPortal } from "react-dom";
import CancelButton from "./CancelButton";
import Button from "./Button";

type ModalProps = {
  open: boolean;
  className?: string;
  title: string;
  onCancel: () => unknown;
  onSave: () => unknown;
  children: ReactNode;
  saveText?: string;
  saveIcon?: ReactNode;
  maskClosable?: boolean;
  maskClassName?: string;
};

function Modal(props: ModalProps) {
  const {
    open,
    onCancel,
    onSave,
    title,
    children,
    className = "",
    maskClassName = "",
    maskClosable = false,
    saveIcon = null,
    saveText = "Save",
  } = props;

  const maskRef = useRef<HTMLDivElement>(null);

  const handleClickOutside: MouseEventHandler<HTMLDivElement> = (ev) => {
    if (!maskClosable || ev.target !== maskRef?.current) {
      return;
    }

    onCancel();
  };

  if (!open) {
    return null;
  }

  return createPortal(
    <div
      className={`modal-mask ${maskClassName}`}
      onClick={handleClickOutside}
      ref={maskRef}
    >
      <div className={`modal ${className}`}>
        <div className="modal-header">
          <div className="title">{title}</div>
          <CancelButton onCancel={onCancel} />
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          <Button
            text={saveText}
            icon={saveIcon}
            onClick={() => {
              onSave();
            }}
          />
        </div>
      </div>
    </div>,
    document.body
  );
}

export default Modal;
