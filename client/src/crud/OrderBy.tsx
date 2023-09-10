import type { FormInstance } from "antd/es/form";
import { useRef } from "react";
import { Select, Form } from "antd";
import { servers, tableNo } from "../servers";

const OrderBy = ({ submit, handleForm }: any) => {
  const formRef = useRef<FormInstance>(null);

  const onFinish = (values: any) => {
    submit(values);
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const getOpts = (action: string) => {
    if (action === "server") {
      return servers.map((el) => {
        return {
          value: el,
          label: el,
        };
      });
    } else {
      return tableNo;
    }
  };

  return (
    <div style={{ marginBottom: 30, marginLeft: -150 }}>
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
          <Select
            defaultValue={servers[0]}
            style={{ width: 180 }}
            onChange={(e) => handleForm(e, "serverName")}
            options={getOpts("server")}
          />
        </Form.Item>

        <Form.Item
          label="Table No"
          name="tableNo"
          rules={[{ required: true, message: "Please input Table number!" }]}
        >
          <Select
            defaultValue={tableNo[0].value}
            style={{ width: 180 }}
            onChange={(e) => handleForm(e, "tableNo")}
            options={getOpts("tableNo")}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default OrderBy;
