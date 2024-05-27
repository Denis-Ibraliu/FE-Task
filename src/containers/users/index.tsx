import { Button, Col, Empty, Row, Skeleton, Table, Typography } from "antd";
import { useQuery } from "../../utils/useQuery";
import { columns } from "./config";
// import { useMemo } from "react";
import { PlusOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function Users() {
  const { data: users, loading } = useQuery({
    url: "users",
  });

  if (loading) return <Skeleton active />;

  if (!users) return <Empty />;

  // const usersColumns = useMemo(() => {
  //   return {
  //     ...columns,
  //     actions: {
  //       key: "actions",
  //       title: "Actions",
  //       render: (_, record: any) => {
  //         return <>hi</>;
  //       },
  //     },
  //   };
  // }, []);

  return (
    <Row gutter={[16, 16]} justify="end">
      <Col xs={24}>
        <Title level={2}>Users</Title>
      </Col>
      <Col>
        <Button icon={<PlusOutlined />} danger type="primary">
          Create New User
        </Button>
      </Col>
      <Col xs={24}>
        <Table columns={columns} dataSource={[...users]} />
      </Col>
    </Row>
  );
}
