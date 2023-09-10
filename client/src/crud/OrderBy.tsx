import { Form, Radio } from "antd";
import type { FormInstance } from "antd/es/form";
import { useRef } from "react";
import {servers} from "../servers";

const OrderBy = ({ submit, handleForm, userData }: any) => {
  const formRef = useRef<FormInstance>(null);

  const onFinish = (values: any) => {
    submit(values);
    console.log("Success:", values);
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
    <div className="parent-server-2" style={{ marginBottom: 30 }}>
      <h2>Server details</h2>
      <Form
        {...layout}
        ref={formRef}
        name="control-ref"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          label="Server"
          name="server"
          rules={[{ required: true, message: "Please input Server name!" }]}
        >
          <Radio.Group name="serverName" value={userData.serverName} onChange={handleForm}>
            {servers.map((el, index) => (
              <Radio.Button value={el} key={index}>{el}</Radio.Button>
            ))}
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Table No"
          name="tableNo"
          rules={[{ required: true, message: "Please input Table number!" }]}
        >
          <Radio.Group name="tableNo" value={userData.serverName} onChange={handleForm}>
            <Radio.Button value="1">One</Radio.Button>
            <Radio.Button value="2">Two</Radio.Button>
            <Radio.Button value="3">Three</Radio.Button>
            <Radio.Button value="4">Four</Radio.Button>
            <Radio.Button value="5">Five</Radio.Button>
            <Radio.Button value="6">Six</Radio.Button>
            <Radio.Button value="7">Seven</Radio.Button>
            <Radio.Button value="8">Eight</Radio.Button>
            <Radio.Button value="car">Car Order</Radio.Button>
            <Radio.Button value="Bike">Bike Order</Radio.Button>
            <Radio.Button value="coustmer">Customer Order</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Form>
    </div>
  );
};

export default OrderBy;
