import { Table } from "antd";

const Vtable = ({ getCols, isPagination }: any) => {
  const tableStyle = {
    fontSize: 400,
  };

  return (
    <Table
      style={tableStyle}
      columns={getCols.cols()}
      dataSource={getCols.data()}
      scroll={{ y: 240 }}
      pagination={!isPagination ? false : { position: ["bottomRight"] }}
      size="large"
    />
  );
};
export default Vtable;
