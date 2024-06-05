import { CancelIcon } from "../../assets";

type CancelButtonProps = {
  onCancel: () => unknown;
  className?: string;
};

function CancelButton(props: CancelButtonProps) {
  const { onCancel, className = "" } = props;

  return (
    <button
      role="button"
      onClick={() => {
        onCancel();
      }}
      className={`cancel-button ${className}`}
    >
      <CancelIcon />
    </button>
  );
}

export default CancelButton;
