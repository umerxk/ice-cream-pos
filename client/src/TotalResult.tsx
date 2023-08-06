import Vtable from "./Shared/Vtabel";

export default function TotalResult({ userData, getPrice, grandTotal }: any) {
  const getOrderCols = () => {
    return {
      data: () => {
        const data: any = [];
        userData.order.forEach((row: any) => {
          data.push({
            key: row.itemData.label,
            items: row.itemData.label,
            quantity: row.itemQuantity,
            price:
              getPrice(row.itemData.value, row?.size) *
                parseInt(row.itemQuantity) || 0,
            size: row?.size || "Standard",
          });
        });
        return data;
      },
      cols: () => {
        return [
          {
            title: "Items",
            dataIndex: "items",
            width: 350,
          },
          {
            title: "Quantity",
            dataIndex: "quantity",
            width: 150,
          },
          {
            title: "Price",
            dataIndex: "price",
          },
          {
            title: "Size",
            dataIndex: "size",
          },
        ];
      },
    };
  };

  const getPriceCols = () => {
    return {
      data: () => {
        const data: any = [];
        data.push({
          key: userData.serverName,
          serverName: userData.serverName,
          tableNumber: userData.tableNo,
          grandTotal: `${grandTotal || 0} PKR`,
        });
        return data;
      },
      cols: () => {
        return [
          {
            title: "Served By",
            dataIndex: "serverName",
            width: 200,
          },
          {
            title: "Table Number",
            dataIndex: "tableNumber",
            width: 250,
          },
          {
            title: "Grand Total",
            dataIndex: "grandTotal",
            width: 350,
          },
        ];
      },
    };
  };

  return (
    <>
      <h3>Item Details</h3>
      <Vtable getCols={getOrderCols()} />
      <br />
      <br />

      <h3>Order Details</h3>
      <Vtable getCols={getPriceCols()} />
    </>
  );
}
