// import { Button } from "@mui/material";
// import Autocomplete from "@mui/material/Autocomplete";
// import TextField from "@mui/material/TextField";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
// import Chip from "@mui/material/Chip";
import { wholeMenu } from "../Menu";
// import {DeleteOutlined} from "@ant"
import { DeleteOutlined } from "@ant-design/icons";

// import DeleteIcon from "@mui/icons-material/Delete";
// import OrderBy from "../crud/OrderBy";
// const OrderItems = ({
//   handleAdd,
//   getDonex,
//   userData,
//   handleOrderFormMui,
//   handleSize,
//   handleOrderForm,
//   deleteItem,
//   handleForm,
//   submit
// }: any) => {
//     console.log(userData)
//   return (
//     <div className="parent-server">
//         <OrderBy submit={submit} handleForm={handleForm} userData={userData} />

//       <h1>Order Items</h1>

//       {userData.order.map((el: any, index: number) => {
//         return (
//           <div key={index} style={{ marginBottom: 30 }}>
//             <div key={index} className="order-item shadow-box">
//               <div className="form-group">
//                 <label
//                   style={{ display: "flex" }}
//                   htmlFor={`itemName-${index}`}
//                 >
//                   Select Food Item
//                 </label>
//                 <br />
//                 <Autocomplete
//                   placeholder="Select Value"
//                   disablePortal
//                   id="combo-box-demo"
//                   options={wholeMenu}
//                   sx={{ width: 300 }}
//                   renderInput={(params) => (
//                     <TextField name="itemName" {...params} />
//                   )}
//                   onChange={(e, val) => handleOrderFormMui(e, val, index)}
//                 />
//               </div>
//               {el?.itemData?.price?.small && (
//                 <FormControl fullWidth style={{ marginLeft: 50 }}>
//                   <label
//                     style={{ display: "flex" }}
//                     htmlFor={`itemName-${index}`}
//                   >
//                     Select Size
//                   </label>
//                   <br />
//                   <Select
//                     labelId="demo-simple-select-standard-label"
//                     id="demo-simple-select-standard"
//                     value={el?.size}
//                     onChange={(e) => handleSize(e.target.value, index)}
//                     name="Size"
//                     defaultValue={"large"}
//                   >
//                     <MenuItem value={"small"}>Small</MenuItem>
//                     <MenuItem value={"large"}>Large</MenuItem>
//                   </Select>
//                 </FormControl>
//               )}

//               <div className="form-group" style={{ marginLeft: 50 }}>
//                 <label
//                   style={{ display: "flex" }}
//                   htmlFor={`itemQuantity-${index}`}
//                 >
//                   Quantity
//                 </label>
//                 <br />
//                 <TextField
//                   id="outlined-number"
//                   name="itemQuantity"
//                   type="number"
//                   value={el.itemQuantity}
//                   InputProps={{ inputProps: { min: 1, max: 10 } }}
//                   onChange={(e) => handleOrderForm(e, index)}
//                   InputLabelProps={{
//                     shrink: true,
//                   }}
//                 />
//               </div>

//               <Chip
//                 label={`RS - ${getDonex(
//                   el.itemData?.value,
//                   el.itemQuantity,
//                   el?.size
//                 )}`}
//                 style={{
//                   marginLeft: 220,
//                   height: 40,
//                   width: 160,
//                   fontSize: 20,
//                 }}
//                 variant="outlined"
//               />
//               <DeleteIcon
//                 style={{ cursor: "pointer", color: "darkred" }}
//                 onClick={() => deleteItem(el)}
//               />
//             </div>
//           </div>
//         );
//       })}
//       <div className="form-group add">
//         <Button variant="contained" className="add-button" onClick={handleAdd}>
//           +
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default OrderItems;

import { Button, Form, InputNumber, Select, Statistic, Row } from "antd";
import { AutoComplete } from "antd";
import { useState } from "react";
import { Card } from "antd";

const OrderItems = ({
  handleOrderForm,
  handleSize,
  userData,
  getDonex,
  handleAdd,
  handleOrderFormMui,
  deleteItem,
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
              {el?.itemData?.price?.small && (
                <Form.Item label="Size">
                  <Select
                    defaultValue="large"
                    value={el?.size}
                    style={{ width: 120 }}
                    onChange={(e) => handleSize(e, index)}
                    options={[
                      { value: "small", label: "Small" },
                      { value: "large", label: "Large" },
                    ]}
                  />
                </Form.Item>
              )}

              <Statistic
                title="Price"
                value={`RS - ${getDonex(
                  el.itemData?.value,
                  el.itemQuantity,
                  el?.size
                )}`}
                style={{ marginLeft: el?.itemData?.price?.small ? 15 : 210 }}
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
