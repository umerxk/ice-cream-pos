import { Button } from "antd";
import Vtable from "../../Shared/Vtabel";

export default function ItemDetails({ myOrder, handleDel }: any) {
  const getOrderCols = () => {
    return {
      data: () => {
        const data: any = [];
        myOrder.forEach((row: any) => {
          data.push({
            key: row.label,
            items: row.label,
            quantity: row.count,
            price: row?.price * row?.count,
            action: (<div style={{ display: "flex", gap: 10 }}>
              <Button onClick={() => handleDel(row?.value, "minus")} type="primary">-</Button>
              <Button onClick={() => handleDel(row?.value, "add")} type="primary">+</Button>
            </div>)
          });
        });
        return data;
      },
      cols: () => {
        return [
          {
            title: "Items",
            dataIndex: "items",
          },
          {
            title: "Quantity",
            dataIndex: "quantity",
          },
          {
            title: "Prices",
            dataIndex: "price",
          },
          {
            title: "Action",
            dataIndex: "action",
          },
        ];
      },
    };
  };

  return (
    <>
      <Vtable getCols={getOrderCols()} />
      <br />
      <br />
    </>
  );
}
