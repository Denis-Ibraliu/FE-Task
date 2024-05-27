import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { serverBaseUrl } from "../../../settings";

const { confirm } = Modal;

interface Props {
  onSuccess: () => void;
  record: any;
}

export const DeleteUser = ({ onSuccess, record }: Props) => {
  const handleDelete = async () => {
    try {
      await fetch(`${serverBaseUrl}users/${record.id}`, {
        method: "DELETE",
      });

      onSuccess();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <DeleteOutlined
      onClick={() => {
        confirm({
          title: "Confirm",
          icon: <ExclamationCircleOutlined />,
          content: `Are you sure you want to delete ${record.name} ?`,
          okText: "Confirm",
          cancelText: "Cancel",
          onOk: () => {
            handleDelete();
          },
        });
      }}
      className="clickable-icon"
    />
  );
};
