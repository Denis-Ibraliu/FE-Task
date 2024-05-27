import {
  Button,
  Col,
  Divider,
  Empty,
  Modal,
  Row,
  Skeleton,
  Space,
  Table,
  Typography,
} from "antd";
import { useQuery } from "../../utils/useQuery";
import { columns } from "./config";
import { useMemo, useState } from "react";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { DeleteUser } from "./components/delete";
import { useBooleanToggle } from "../../utils/useBooleanToggle";
import { CreateOrEditUser } from "./components/create_or_edit";

const { Title } = Typography;

export const Users = () => {
  const {
    data: users,
    loading,
    fetchData,
  } = useQuery({
    url: "users",
  });
  const { enable, disable, active } = useBooleanToggle();
  const [record, setRecord] = useState(null);

  const usersColumns = useMemo(() => {
    return [
      ...columns,
      {
        key: "actions",
        title: "Actions",
        render: (_: any, record: any) => {
          return (
            <>
              <Space>
                <EditOutlined
                  onClick={() => {
                    setRecord(record);
                    enable();
                  }}
                  className="clickable-icon"
                />
                <DeleteUser record={record} onSuccess={fetchData} />
              </Space>
            </>
          );
        },
      },
    ];
  }, []);

  const resetRecord = () => {
    setRecord(null);
  };

  if (loading) return <Skeleton active />;

  if (!users) return <Empty />;

  return (
    <Row gutter={[16, 16]} justify="end">
      <Col xs={24}>
        <Title level={2}>Users</Title>
      </Col>
      <Col>
        <Button onClick={enable} icon={<PlusOutlined />} danger type="primary">
          Create New User
        </Button>
      </Col>
      <Col xs={24}>
        <Table
          className="headless-table"
          pagination={false}
          columns={usersColumns}
          dataSource={[...users]}
        />
      </Col>
      {active && (
        <Modal
          open={active}
          centered
          onCancel={() => {
            resetRecord();
            disable();
          }}
          footer={null}
          title={`${record ? "Edit" : "New"} User Info`}
          destroyOnClose
        >
          <Divider />
          <CreateOrEditUser
            record={record}
            onSuccess={() => {
              fetchData();
              resetRecord();
              disable();
            }}
          />
        </Modal>
      )}
    </Row>
  );
};
