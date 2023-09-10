import { useMemo } from "react";
import DateData from "./DateData";
import SaleBlock from "./SaleBlock";
import Vtable from "../../Shared/Vtabel/Vtable";
import { UserOutlined } from "@ant-design/icons";

const OrdersTable = ({ text, dateData }: any) => {
  console.log(dateData)
  const fltData: any = useMemo(() => {
    if (dateData?.data?.order) {
      if (text) {
        return dateData?.data?.order.filter((el: any) =>
          el?.serverName?.includes(text)
        );
      }
      return dateData?.data?.order;
    }
  }, [text, dateData]);

  const getDateFormate = (myDate: any) => {
    const dateObj = new Date(myDate);
    const options: any = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return dateObj.toLocaleDateString("en-US", options);
  };

  const getOrderCols = (customArray: any, customDate: any) => {
    return {
      data: () => {
        let data = [];
        for (let i = 0; i < customArray.length; i++) {
          const elx = customArray[i];
          const { itemName, itemCategory, itemPrice, itemQuantity }: any = elx;
          data.push({
            itemName,
            itemCategory,
            itemPrice,
            itemQuantity,
            createdAt: getDateFormate(customDate),
          });
        }
        return data;
      },
      cols: () => {
        return [
          {
            title: "item Name",
            dataIndex: "itemName",
            width: 250,
          },
          {
            title: "Item Category",
            dataIndex: "itemCategory",
          },
          {
            title: "Item Price",
            dataIndex: "itemPrice",
          },
          {
            title: "Item Quantity",
            dataIndex: "itemQuantity",
          },
          {
            title: "Date",
            dataIndex: "createdAt",
          },
        ];
      },
    };
  };

  return (
    <div>
      {dateData?.searchedDate && <DateData dateData={dateData} />}
      <SaleBlock
        isDate={dateData?.searchedDate}
        dateData={dateData}
      />

      {!!fltData?.length &&
        fltData.map((el: any, index: number) => (
          <div key={index} style={{ marginTop: 120 }}>
            <div style={{ display: "flex", gap: 10 }}>
              <div className="serverChip">
                <UserOutlined style={{ fontSize: 20 }} />
                <span>Server: {el.serverName}</span>
              </div>

              <div className="serverChip">
                <UserOutlined style={{ fontSize: 20 }} />
                <span>Table: {el.tableNo}</span>
              </div>
            </div>

            <br />
            <Vtable getCols={getOrderCols(el.orderDetails, el.createdAt)} />
          </div>
        ))}
    </div>
  );
};

export default OrdersTable;
