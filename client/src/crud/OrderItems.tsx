import { wholeMenu } from "../Menu";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Form, InputNumber, Statistic, Row } from "antd";
import { AutoComplete } from "antd";
import { useState } from "react";
import { Card } from "antd";
import OrderBy from "./OrderBy";

const OrderItems = ({
  handleOrderForm,
  userData,
  getDonex,
  handleAdd,
  handleOrderFormMui,
  deleteItem,
  handleForm,
  submit
}: any) => {
  const [anotherOptions, setAnotherOptions] =
    useState<{ value: string }[]>(wholeMenu);

  const handleSearch = (values: string) => {
    const filteredOptions = wholeMenu.filter((option) =>
      option.label.toLowerCase().includes(values)
    );
    setAnotherOptions(filteredOptions);
  };

  const [form] = Form.useForm();
  return (
    
    <div className="parent-server">
       {/* <OrderBy
            submit={submit}
            handleForm={handleForm}
            userData={userData}
          /> */}
      <h1>Order Items</h1>

      {userData.order.map((el: any, index: number) => {
        console.log(el);
        return (
          <Card style={{ cursor: "default", width: 840, marginBottom: 20 }}>
            <Form
              key={index}
              layout={"inline"}
              form={form}
              initialValues={{ layout: "inline" }}
              style={{ maxWidth: "none" }}
            >
              <Form.Item label="Item">
                <AutoComplete
                  options={anotherOptions}
                  style={{ width: 200 }}
                  onSearch={handleSearch}
                  onChange={(e, val) => handleOrderFormMui(e, val, index)}
                  value={el.itemData.label}
                  placeholder="Kitkat Blizzerd"
                />
              </Form.Item>

              <Form.Item label="Quantity">
                <InputNumber
                  value={el.itemQuantity}
                  type="number"
                  min={"1"}
                  max={"100"}
                  onChange={(e) => handleOrderForm("itemQuantity", e, index)}
                />
              </Form.Item>
              <Statistic
                title="Price"
                value={`RS - ${getDonex(
                  el.itemData?.value,
                  el.itemQuantity,
                  el?.size
                )}`}
                style={{ marginLeft: 100 }}
              />
              <DeleteOutlined
                style={{
                  marginTop: -12,
                  marginLeft: 16,
                  fontSize: 20,
                  cursor: "pointer",
                  color: "darkred",
                }}
                onClick={() => deleteItem(el)}
              />
            </Form>
          </Card>
        );
      })}
      <Row style={{ justifyContent: "end", marginTop: 20 }}>
        <Button
          onClick={handleAdd}
          size="large"
          style={{ width: 150 }}
          type="primary"
        >
          Add more orders
        </Button>
      </Row>
    </div>
  );
};

export default OrderItems;
