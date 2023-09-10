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
      {/* <h3>Order Details</h3> */}
      {/* <Vtable getCols={getPriceCols()} /> */}
    </>
  );
}
