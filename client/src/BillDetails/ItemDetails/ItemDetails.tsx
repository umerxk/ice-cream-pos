import Vtable from "../../Shared/Vtabel";

export default function ItemDetails({ myOrder }: any) {
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
            title: "Price",
            dataIndex: "price",
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
