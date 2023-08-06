import { Card, Col, Row } from "antd";

const SaleBlock = ({ dateData, totalClients, isDate }: any) => {
  console.log(dateData);
  return (
    <Row
      gutter={16}
      style={{ marginBottom: 120, marginTop: isDate ? 10 : 100 }}
    >
      <Col span={8}>
        <Card hoverable title="Total Sale" bordered={false}>
          PKR {dateData?.totalSale?.totalPrice || 0}
        </Card>
      </Col>
      <Col span={8}>
        <Card hoverable title="Total Customers" bordered={false}>
          {totalClients}
        </Card>
      </Col>
      <Col span={8}>
        <Card hoverable color="black" title="Total Items sold" bordered={false}>
          {dateData?.totalItemsSold?.totalCount || 0}
        </Card>
      </Col>

      <Col span={8} style={{ marginTop: 20 }}>
        <Card hoverable color="black" title="Total Items sold" bordered={false}>
          Name: {dateData?.mostSellingUnit?._id || 0}
          <br/>
          <span>
            Count: {dateData?.mostSellingUnit?.itemCount || 0}

          </span>
        </Card>
      </Col>
    </Row>
  );
};

export default SaleBlock;
