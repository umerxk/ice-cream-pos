import Vtable from "../../Shared/Vtabel";

export default function ItemDetails({ userData, getPrice }: any) {
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

  return (
    <>
      <h3>Item Details</h3>
      <Vtable getCols={getOrderCols()} />
      <br />
      <br />
    </>
  );
}
