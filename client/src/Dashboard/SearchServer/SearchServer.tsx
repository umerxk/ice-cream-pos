import { UserOutlined } from "@ant-design/icons";
import { Input, Row } from "antd";

const SearchServer = ({ onChange }: any) => (
  <Row>
    <div>Search Server</div>
    <Input
      style={{ height: 50 }}
      onChange={onChange}
      placeholder="Search By Server"
      prefix={<UserOutlined />}
    />
  </Row>
);

export default SearchServer;
