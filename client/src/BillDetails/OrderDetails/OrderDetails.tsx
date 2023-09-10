import Vtable from "../../Shared/Vtabel";

export default function OrderDetails({ userData, grandTotal }: any) {
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
          },
          {
            title: "Table Number",
            dataIndex: "tableNumber",
          },
          {
            title: "Grand Total",
            dataIndex: "grandTotal",
          },
        ];
      },
    };
  };

  return (
    <>
      <h3>Order Details</h3>
      <Vtable getCols={getPriceCols()} />
    </>
  );
}
